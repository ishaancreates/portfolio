import { clientEntry, css, on, ref, type Handle } from 'remix/component'

import { ArrowUpRight, Moon, Sun } from './icons.tsx'

type SectionId = 'about' | 'projects' | 'blog' | 'gallery'

interface SiteNavProps {
  /** On the home page links are in-page anchors; elsewhere they point back to `/`. */
  onHome: boolean
  /** Section to highlight when not scroll-tracking (e.g. an article page). */
  current?: SectionId
  socials: { label: string; href: string | null }[]
}

const LINKS: { id: SectionId; label: string; index: string; page?: string }[] = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'projects', label: 'Projects', index: '02' },
  { id: 'blog', label: 'Blog', index: '03' },
  { id: 'gallery', label: 'Gallery', index: '04', page: '/gallery' },
]

export const SiteNav = clientEntry(import.meta.url, function SiteNav(handle: Handle<SiteNavProps>) {
  let active: SectionId | null = handle.props.current ?? null
  let menuOpen = false
  let hidden = false
  let scrolled = false

  let listEl: HTMLElement | null = null
  let indicatorEl: HTMLElement | null = null
  let menuButton: HTMLButtonElement | null = null
  let sheetEl: HTMLElement | null = null

  function placeIndicator() {
    if (!listEl || !indicatorEl) return
    let link = active ? listEl.querySelector<HTMLElement>(`[data-section="${active}"]`) : null
    if (!link) {
      indicatorEl.style.opacity = '0'
      return
    }
    indicatorEl.style.opacity = '1'
    indicatorEl.style.width = `${link.offsetWidth}px`
    indicatorEl.style.transform = `translateX(${link.offsetLeft}px)`
  }

  function setActive(next: SectionId | null) {
    if (next === active) return
    active = next
    handle.update().then(placeIndicator)
  }

  function setMenu(open: boolean) {
    if (open === menuOpen) return
    menuOpen = open
    document.documentElement.style.overflow = open ? 'hidden' : ''
    handle.update().then(() => {
      if (open) sheetEl?.querySelector<HTMLElement>('a')?.focus()
      else menuButton?.focus()
    })
  }

  handle.queueTask(() => {
    let signal = handle.signal
    placeIndicator()
    window.addEventListener('resize', placeIndicator, { signal, passive: true })
    document.fonts?.ready.then(placeIndicator)

    // Scroll-spy: the section crossing the middle band of the viewport is active.
    if (handle.props.onHome) {
      let sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
      let visible = new Map<string, boolean>()
      let observer = new IntersectionObserver(
        (entries) => {
          for (let entry of entries) visible.set(entry.target.id, entry.isIntersecting)
          let current = LINKS.find((l) => visible.get(l.id))
          setActive(current?.id ?? null)
        },
        { rootMargin: '-45% 0px -50% 0px' },
      )
      sections.forEach((s) => observer.observe(s))
      signal.addEventListener('abort', () => observer.disconnect())
    }

    // Hide on scroll down, reveal on scroll up; solidify after leaving the top.
    let lastY = window.scrollY
    let ticking = false
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return
        ticking = true
        requestAnimationFrame(() => {
          ticking = false
          let y = window.scrollY
          let nextScrolled = y > 24
          let delta = y - lastY
          let nextHidden = hidden
          if (Math.abs(delta) > 6) nextHidden = delta > 0 && y > 480 && !menuOpen
          lastY = y
          if (nextScrolled !== scrolled || nextHidden !== hidden) {
            scrolled = nextScrolled
            hidden = nextHidden
            handle.update()
          }
        })
      },
      { signal, passive: true },
    )

    document.addEventListener(
      'keydown',
      (event) => {
        if (event.key === 'Escape' && menuOpen) setMenu(false)
      },
      { signal },
    )
    window
      .matchMedia('(min-width: 821px)')
      .addEventListener('change', (e) => e.matches && setMenu(false), { signal })
  })

  return () => {
    let { onHome, socials } = handle.props
    let hrefFor = (id: SectionId) => {
      let page = LINKS.find((l) => l.id === id)?.page
      return page ?? (onHome ? `#${id}` : `/#${id}`)
    }

    return (
      <header
        data-hidden={hidden && !menuOpen ? '' : undefined}
        data-scrolled={scrolled ? '' : undefined}
        mix={[
          on('focusin', () => {
            if (hidden) {
              hidden = false
              handle.update()
            }
          }),
          css({
            position: 'fixed',
            insetInline: 0,
            top: 0,
            zIndex: 60,
            paddingTop: 'max(14px, env(safe-area-inset-top))',
            pointerEvents: 'none',
            transition: 'transform 500ms var(--ease-emph)',
            '&[data-hidden]': { transform: 'translateY(-130%)' },
            '& > .container': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            },
            '& .pill': {
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              height: '52px',
              padding: '5px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid transparent',
              background: 'color-mix(in oklch, var(--bg-raised) 72%, transparent)',
              backdropFilter: 'blur(14px) saturate(140%)',
              WebkitBackdropFilter: 'blur(14px) saturate(140%)',
              boxShadow: 'var(--shadow-float)',
              transition: 'background-color 300ms var(--ease-out)',
            },
            '&[data-scrolled] .pill': {
              background: 'color-mix(in oklch, var(--bg-raised) 88%, transparent)',
            },
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          }),
        ]}
      >
        <div class="container">
          <a
            href={onHome ? '#top' : '/'}
            class="pill"
            aria-label="Ishaan Pandey, home"
            mix={css({
              gap: '10px',
              paddingInline: '5px 18px',
              fontWeight: 500,
              fontSize: '15px',
              letterSpacing: '-0.01em',
              '& .mark': {
                display: 'block',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                background: 'var(--bg-sunken)',
                transition: 'rotate 600ms var(--ease-emph)',
              },
              '& .last': { color: 'var(--fg-subtle)', transition: 'color 200ms var(--ease-out)' },
              '@media (hover: hover)': {
                '&:hover .mark': { rotate: '-12deg' },
                '&:hover .last': { color: 'var(--fg)' },
              },
              '@media (max-width: 420px)': { '& .last': { display: 'none' } },
            })}
          >
            <img class="mark" src="/apple-touch-icon.png" alt="" width="40" height="40" />
            <span>
              Ishaan <span class="last">Pandey</span>
            </span>
          </a>

          <nav aria-label="Primary" class="pill" mix={css({ gap: '4px' })}>
            <ul
              mix={[
                ref((node) => {
                  listEl = node as HTMLElement
                }),
                css({
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  '@media (max-width: 820px)': { display: 'none' },
                }),
              ]}
            >
              <span
                aria-hidden="true"
                mix={[
                  ref((node) => {
                    indicatorEl = node as HTMLElement
                  }),
                  css({
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '40px',
                    width: 0,
                    opacity: 0,
                    borderRadius: 'var(--radius-pill)',
                    background: 'color-mix(in oklch, var(--fg) 9%, transparent)',
                    transition:
                      'transform 450ms var(--ease-emph), width 450ms var(--ease-emph), opacity 250ms var(--ease-out)',
                    '@media (prefers-reduced-motion: reduce)': { transition: 'opacity 150ms ease' },
                  }),
                ]}
              />
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={hrefFor(link.id)}
                    data-section={link.id}
                    aria-current={active === link.id ? 'location' : undefined}
                    mix={css({
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      height: '40px',
                      paddingInline: '18px',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '14.5px',
                      fontWeight: 450,
                      color: 'var(--fg-muted)',
                      transition: 'color 200ms var(--ease-out)',
                      '& .label': { position: 'relative' },
                      // Underline draws in from the left on hover
                      '& .label::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: '-3px',
                        height: '1px',
                        background: 'currentColor',
                        scale: '0 1',
                        transformOrigin: 'right',
                        transition: 'scale 400ms var(--ease-emph)',
                      },
                      '&[aria-current]': { color: 'var(--fg)' },
                      '@media (hover: hover)': {
                        '&:hover': { color: 'var(--fg)' },
                        '&:not([aria-current]):hover .label::after': {
                          scale: '1 1',
                          transformOrigin: 'left',
                        },
                      },
                    })}
                  >
                    <span class="label">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <span
              aria-hidden="true"
              mix={css({
                width: '1px',
                height: '20px',
                background: 'var(--line-strong)',
                marginInline: '6px',
                '@media (max-width: 820px)': { display: 'none' },
              })}
            />

            <ThemeToggle />

            <button
              type="button"
              aria-expanded={menuOpen ? 'true' : 'false'}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              mix={[
                ref((node) => {
                  menuButton = node as HTMLButtonElement
                }),
                on('click', () => setMenu(!menuOpen)),
                css({
                  display: 'none',
                  '@media (max-width: 820px)': { display: 'grid' },
                  placeItems: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--fg)',
                  color: 'var(--bg)',
                  '& i': {
                    gridArea: '1 / 1',
                    display: 'block',
                    width: '14px',
                    height: '1.5px',
                    background: 'currentColor',
                    borderRadius: '2px',
                    transition: 'translate 350ms var(--ease-emph), rotate 350ms var(--ease-emph)',
                  },
                  '& i:first-child': { translate: '0 -3px' },
                  '& i:last-child': { translate: '0 3px' },
                  '&[aria-expanded="true"] i:first-child': { translate: '0 0', rotate: '45deg' },
                  '&[aria-expanded="true"] i:last-child': { translate: '0 0', rotate: '-45deg' },
                }),
              ]}
            >
              <i />
              <i />
            </button>
          </nav>
        </div>

        <MobileSheet
          open={menuOpen}
          hrefFor={hrefFor}
          active={active}
          socials={socials}
          onNavigate={() => setMenu(false)}
          setRef={(node) => {
            sheetEl = node
          }}
        />
      </header>
    )
  }
})

function MobileSheet(
  handle: Handle<{
    open: boolean
    active: SectionId | null
    hrefFor: (id: SectionId) => string
    socials: { label: string; href: string | null }[]
    onNavigate: () => void
    setRef: (node: HTMLElement) => void
  }>,
) {
  return () => {
    let { open, hrefFor, socials, onNavigate, setRef, active } = handle.props
    return (
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        data-open={open ? '' : undefined}
        inert={!open}
        mix={[
          ref((node) => setRef(node as HTMLElement)),
          css({
            position: 'fixed',
            inset: 0,
            zIndex: -1,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'calc(var(--nav-h) + 56px) var(--gutter) max(28px, env(safe-area-inset-bottom))',
            background: 'var(--bg)',
            overscrollBehavior: 'contain',
            overflowY: 'auto',
            clipPath: 'inset(0 0 100% 0)',
            visibility: 'hidden',
            transition:
              'clip-path 650ms var(--ease-emph), visibility 0s linear 650ms',
            '&[data-open]': {
              pointerEvents: 'auto',
              clipPath: 'inset(0 0 0% 0)',
              visibility: 'visible',
              transition: 'clip-path 650ms var(--ease-emph), visibility 0s',
            },
            '& li': {
              borderTop: '1px solid var(--line)',
              overflow: 'clip',
            },
            '& li a': {
              display: 'flex',
              alignItems: 'baseline',
              gap: '16px',
              paddingBlock: '14px',
              fontSize: 'clamp(2.75rem, 13vw, 5rem)',
              lineHeight: 1,
              letterSpacing: '-0.045em',
              fontWeight: 500,
              translate: '0 105%',
              transition: 'translate 700ms var(--ease-emph)',
            },
            '& li a[aria-current] .t': { color: 'var(--accent-ink)' },
            '&[data-open] li a': { translate: '0 0' },
            '&[data-open] li:nth-child(2) a': { transitionDelay: '60ms' },
            '&[data-open] li:nth-child(3) a': { transitionDelay: '120ms' },
            '&[data-open] li:nth-child(4) a': { transitionDelay: '180ms' },
            '& .socials': {
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px 20px',
              opacity: 0,
              transition: 'opacity 400ms var(--ease-out)',
            },
            '&[data-open] .socials': { opacity: 1, transitionDelay: '250ms' },
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'visibility 0s linear 200ms, opacity 200ms ease',
              clipPath: 'none',
              opacity: 0,
              '&[data-open]': { clipPath: 'none', opacity: 1, transition: 'opacity 200ms ease' },
              '& li a': { translate: '0 0', transition: 'none' },
            },
          }),
        ]}
      >
        <ul>
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={hrefFor(link.id)}
                aria-current={active === link.id ? 'location' : undefined}
                mix={on('click', onNavigate)}
              >
                <span class="eyebrow">{link.index}</span>
                <span class="t">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div class="socials">
          {socials
            .filter((s) => s.href)
            .map((s) => (
              <a
                key={s.label}
                href={s.href!}
                class="eyebrow"
                target={s.href!.startsWith('http') ? '_blank' : undefined}
                rel={s.href!.startsWith('http') ? 'noreferrer' : undefined}
                mix={css({ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--fg-muted)' })}
              >
                {s.label}
                <ArrowUpRight size={12} />
              </a>
            ))}
        </div>
      </div>
    )
  }
}

function ThemeToggle(handle: Handle) {
  let isLight = false

  handle.queueTask(() => {
    isLight = document.documentElement.dataset.theme === 'light'
    handle.update()
  })

  async function toggle(target: HTMLElement) {
    let root = document.documentElement
    let next = root.dataset.theme === 'light' ? 'dark' : 'light'
    let apply = () => {
      root.dataset.theme = next
      try {
        localStorage.setItem('theme', next)
      } catch {}
      isLight = next === 'light'
      handle.update()
    }

    let reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> }
    }

    if (!doc.startViewTransition || reduce) {
      root.classList.add('theme-fade')
      apply()
      window.setTimeout(() => root.classList.remove('theme-fade'), 500)
      return
    }

    // Circle reveal from the toggle
    let rect = target.getBoundingClientRect()
    let x = rect.left + rect.width / 2
    let y = rect.top + rect.height / 2
    let radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    let transition = doc.startViewTransition(apply)
    await transition.ready
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 700, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
    )
  }

  return () => (
    <button
      type="button"
      aria-label="Dark theme"
      aria-pressed={isLight ? 'false' : 'true'}
      title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      mix={[
        on('click', (event) => toggle(event.currentTarget as HTMLElement)),
        css({
          position: 'relative',
          display: 'grid',
          placeItems: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          color: 'var(--fg-muted)',
          transition: 'color 200ms var(--ease-out), background-color 200ms var(--ease-out)',
          '& svg': {
            gridArea: '1 / 1',
            width: '18px',
            height: '18px',
            transition:
              'opacity 300ms var(--ease-out), scale 450ms var(--ease-emph), rotate 450ms var(--ease-emph), filter 300ms var(--ease-out)',
          },
          // The CSS reads the theme from <html>, so the icon is right before hydration.
          '& .sun svg': { opacity: 0, scale: '0.4', rotate: '-90deg', filter: 'blur(4px)' },
          ':root[data-theme="light"] & .sun svg': { opacity: 1, scale: '1', rotate: '0deg', filter: 'none' },
          ':root[data-theme="light"] & .moon svg': { opacity: 0, scale: '0.4', rotate: '90deg', filter: 'blur(4px)' },
          '@media (hover: hover)': {
            '&:hover': {
              color: 'var(--fg)',
              background: 'color-mix(in oklch, var(--fg) 8%, transparent)',
            },
          },
          '&:active': { scale: '0.94' },
        }),
      ]}
    >
      <span class="moon" mix={css({ display: 'contents' })}>
        <Moon />
      </span>
      <span class="sun" mix={css({ display: 'contents' })}>
        <Sun />
      </span>
    </button>
  )
}
