/**
 * Page-wide, attribute-driven behaviors. Static, server-rendered sections opt
 * in with data attributes instead of hydrating as components:
 *
 *   data-reveal            fade/rise in when scrolled into view (`--i` staggers)
 *   data-parallax="0.1"    drift against scroll by the given factor
 *   data-magnetic          lean toward the pointer (fine pointers only)
 *
 * All of it is disabled or reduced under `prefers-reduced-motion`.
 */

declare global {
  interface Window {
    __revealReady?: boolean
  }
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

function initReveal() {
  let targets = document.querySelectorAll<HTMLElement>('[data-reveal]')
  window.__revealReady = true
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'))
    return
  }
  let io = new IntersectionObserver(
    (entries) => {
      for (let entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-in')
        io.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  targets.forEach((el) => io.observe(el))
}

function initParallax() {
  let items = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]')).map((el) => ({
    el,
    speed: Number.parseFloat(el.dataset.parallax ?? '0') || 0,
  }))
  if (items.length === 0) return

  let queued = false
  function update() {
    queued = false
    if (reduceMotion.matches) {
      items.forEach(({ el }) => (el.style.translate = ''))
      return
    }
    let vh = window.innerHeight
    for (let { el, speed } of items) {
      let rect = el.getBoundingClientRect()
      if (rect.bottom < -200 || rect.top > vh + 200) continue
      let offset = (rect.top + rect.height / 2 - vh / 2) * -speed
      el.style.translate = `0 ${offset.toFixed(1)}px`
    }
  }
  let schedule = () => {
    if (!queued) {
      queued = true
      requestAnimationFrame(update)
    }
  }
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
  reduceMotion.addEventListener('change', schedule)
  update()
}

function initMagnetic() {
  let els = document.querySelectorAll<HTMLElement>('[data-magnetic]')
  els.forEach((el) => {
    let strength = Number.parseFloat(el.dataset.magnetic || '') || 0.28
    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let frame = 0

    let step = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      el.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.05 ? requestAnimationFrame(step) : 0
      if (!frame && tx === 0 && ty === 0) el.style.translate = ''
    }
    let kick = () => {
      if (!frame) frame = requestAnimationFrame(step)
    }

    el.addEventListener('pointermove', (event) => {
      if (!finePointer.matches || reduceMotion.matches) return
      let rect = el.getBoundingClientRect()
      let max = 12
      tx = Math.max(-max, Math.min(max, (event.clientX - (rect.left + rect.width / 2)) * strength))
      ty = Math.max(-max, Math.min(max, (event.clientY - (rect.top + rect.height / 2)) * strength))
      kick()
    })
    el.addEventListener('pointerleave', () => {
      tx = 0
      ty = 0
      kick()
    })
  })
}

export function initBehaviors() {
  initReveal()
  initParallax()
  initMagnetic()
}
