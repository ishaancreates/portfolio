import { clientEntry, css, ref, type Handle } from 'remix/component'

/**
 * Dot + trailing ring cursor.
 *
 * - Only activates for fine, hover-capable pointers with no reduced-motion
 *   preference. Everywhere else it never renders and the native cursor stays.
 * - Links/buttons expand the ring; `[data-cursor-label="…"]` turns it into a
 *   small accent disc with a label; `[data-magnetic]` pulls the ring toward
 *   the element's centre.
 * - Positions are written straight to `style.transform` inside one rAF loop,
 *   so moving the pointer never triggers a component render.
 */
export const Cursor = clientEntry(import.meta.url, function Cursor(_handle: Handle) {
  return () => (
    <div
      aria-hidden="true"
      data-state="idle"
      mix={[
        ref((root, signal) => mountCursor(root as HTMLElement, signal)),
        css({
          display: 'none',
          '&[data-active]': { display: 'block' },
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          pointerEvents: 'none',
          '& .c-ring, & .c-dot': {
            position: 'fixed',
            top: 0,
            left: 0,
            willChange: 'transform',
            opacity: 0,
            transition: 'opacity 250ms ease',
          },
          '&[data-visible] .c-ring, &[data-visible] .c-dot': { opacity: 1 },
          '& .c-ring-shape': {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '36px',
            height: '36px',
            translate: '-50% -50%',
            borderRadius: '999px',
            border: '1px solid color-mix(in oklch, var(--fg) 38%, transparent)',
            background: 'transparent',
            display: 'grid',
            placeItems: 'center',
            transition:
              'width 380ms var(--ease-emph), height 380ms var(--ease-emph), background-color 260ms var(--ease-out), border-color 260ms var(--ease-out), scale 200ms var(--ease-out)',
          },
          '& .c-label': {
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 500,
            color: 'var(--on-accent)',
            whiteSpace: 'nowrap',
            opacity: 0,
            scale: '0.6',
            transition: 'opacity 200ms var(--ease-out), scale 300ms var(--ease-emph)',
          },
          '& .c-dot-shape': {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '6px',
            height: '6px',
            translate: '-50% -50%',
            borderRadius: '50%',
            background: 'var(--accent)',
            transition: 'scale 260ms var(--ease-emph), opacity 200ms ease',
          },
          ':root[data-theme="light"] & .c-dot-shape': {
            background: 'oklch(0.62 0.19 130)',
          },
          // Hovering an interactive element
          '&[data-state="hover"] .c-ring-shape': {
            width: '58px',
            height: '58px',
            borderColor: 'var(--accent)',
            background: 'var(--accent-soft)',
          },
          '&[data-state="hover"] .c-dot-shape': { scale: '0.5' },
          // Contextual label (project cards, articles)
          '&[data-state="label"] .c-ring-shape': {
            width: '104px',
            height: '104px',
            borderColor: 'transparent',
            background: 'var(--accent)',
            boxShadow: '0 10px 30px -8px oklch(0 0 0 / 0.55)',
          },
          '&[data-state="label"] .c-label': { opacity: 1, scale: '1' },
          '&[data-state="label"] .c-dot-shape': { opacity: 0, scale: '0' },
          '&[data-pressed] .c-ring-shape': { scale: '0.86' },
        }),
      ]}
    >
      <div class="c-ring">
        <div class="c-ring-shape">
          <span class="c-label"></span>
        </div>
      </div>
      <div class="c-dot">
        <div class="c-dot-shape"></div>
      </div>
    </div>
  )
})

const INTERACTIVE = 'a[href], button:not(:disabled), [role="button"], summary, label, [data-magnetic]'

function mountCursor(root: HTMLElement, signal: AbortSignal) {
  let fine = window.matchMedia('(hover: hover) and (pointer: fine)')
  let reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (!fine.matches || reduce.matches) return

  let ringEl = root.querySelector<HTMLElement>('.c-ring')!
  let dotEl = root.querySelector<HTMLElement>('.c-dot')!
  let labelEl = root.querySelector<HTMLElement>('.c-label')!
  let html = document.documentElement

  root.setAttribute('data-active', '')
  html.classList.add('has-cursor')

  let px = -100
  let py = -100
  let dx = px
  let dy = py
  let rx = px
  let ry = py
  let magnet: HTMLElement | null = null
  let frame = 0
  let visible = false

  function setState(target: Element | null) {
    let labelled = target?.closest<HTMLElement>('[data-cursor-label]')
    if (labelled) {
      labelEl.textContent = labelled.dataset.cursorLabel ?? ''
      root.dataset.state = 'label'
      magnet = null
      return
    }
    let interactive = target?.closest<HTMLElement>(INTERACTIVE)
    root.dataset.state = interactive ? 'hover' : 'idle'
    magnet = interactive?.hasAttribute('data-magnetic') ? interactive : null
  }

  function tick() {
    let tx = px
    let ty = py
    if (magnet) {
      let r = magnet.getBoundingClientRect()
      tx = px + (r.left + r.width / 2 - px) * 0.4
      ty = py + (r.top + r.height / 2 - py) * 0.4
    }
    dx += (px - dx) * 0.55
    dy += (py - dy) * 0.55
    rx += (tx - rx) * 0.17
    ry += (ty - ry) * 0.17
    dotEl.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
    ringEl.style.transform = `translate3d(${rx}px, ${ry}px, 0)`

    let settled =
      Math.abs(px - dx) < 0.1 && Math.abs(tx - rx) < 0.1 && Math.abs(ty - ry) < 0.1 && !magnet
    frame = settled ? 0 : requestAnimationFrame(tick)
  }

  function wake() {
    if (!frame) frame = requestAnimationFrame(tick)
  }

  let opts = { signal, passive: true } as const

  window.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse') return
      px = event.clientX
      py = event.clientY
      if (!visible) {
        // Jump to the pointer instead of flying in from the corner
        dx = rx = px
        dy = ry = py
        visible = true
        root.setAttribute('data-visible', '')
      }
      wake()
    },
    opts,
  )

  document.addEventListener('pointerover', (event) => setState(event.target as Element), opts)
  document.addEventListener(
    'pointerout',
    (event) => {
      if (!event.relatedTarget) {
        visible = false
        root.removeAttribute('data-visible')
      }
    },
    opts,
  )
  window.addEventListener('pointerdown', () => root.setAttribute('data-pressed', ''), opts)
  window.addEventListener('pointerup', () => root.removeAttribute('data-pressed'), opts)
  window.addEventListener('scroll', wake, opts)
  window.addEventListener(
    'blur',
    () => {
      visible = false
      root.removeAttribute('data-visible')
    },
    opts,
  )

  // If the user switches to a touch device mode or enables reduced motion, step aside.
  let disable = () => {
    if (fine.matches && !reduce.matches) return
    root.removeAttribute('data-active')
    html.classList.remove('has-cursor')
    cancelAnimationFrame(frame)
  }
  fine.addEventListener('change', disable, { signal })
  reduce.addEventListener('change', disable, { signal })

  signal.addEventListener('abort', () => {
    cancelAnimationFrame(frame)
    html.classList.remove('has-cursor')
  })
}
