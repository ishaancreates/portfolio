import { clientEntry, css, ref, type Handle } from 'remix/component'

/**
 * "Signal sphere": ~1,100 points on latitude rings, displaced by a travelling
 * wave, with a tilted orbit and a single accent "electron". Plain Canvas 2D:
 * no WebGL, no dependencies.
 *
 * - Pauses when offscreen or the tab is hidden.
 * - Reduced motion: renders one still frame (and redraws on theme change).
 * - Pointer tilts the sphere slightly (fine pointers only).
 */
export const HeroVisual = clientEntry(import.meta.url, function HeroVisual(_handle: Handle) {
  return () => (
    <canvas
      aria-hidden="true"
      mix={[
        ref((node, signal) => mountSphere(node as HTMLCanvasElement, signal)),
        css({
          display: 'block',
          width: '100%',
          height: '100%',
          opacity: 0,
          transition: 'opacity 1.6s var(--ease-out)',
          '&[data-ready]': { opacity: 1 },
        }),
      ]}
    />
  )
})

interface Pt {
  lat: number
  lon: number
}

function buildPoints(): Pt[] {
  let pts: Pt[] = []
  let rings = 34
  for (let i = 0; i < rings; i++) {
    let lat = -Math.PI / 2 + (Math.PI * (i + 0.5)) / rings
    let count = Math.max(6, Math.round(Math.cos(lat) * 78))
    for (let j = 0; j < count; j++) {
      let lon = (Math.PI * 2 * j) / count + ((i % 2) * Math.PI) / count
      pts.push({ lat, lon })
    }
  }
  return pts
}

function mountSphere(canvas: HTMLCanvasElement, signal: AbortSignal) {
  let ctx = canvas.getContext('2d')
  if (!ctx) return

  let points = buildPoints()
  let reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  let fine = window.matchMedia('(pointer: fine)')

  let w = 0
  let h = 0
  let dpr = 1
  let colorA = '#c9f73a'
  let colorB = '#f3f1ea'
  let running = false
  let inView = true
  let frame = 0
  let start = performance.now()

  // Pointer, smoothed
  let tx = 0
  let ty = 0
  let mx = 0
  let my = 0

  function readColors() {
    let styles = getComputedStyle(document.documentElement)
    colorA = safeColor(ctx!, styles.getPropertyValue('--viz-a').trim(), '#c9f73a')
    colorB = safeColor(ctx!, styles.getPropertyValue('--viz-b').trim(), '#f3f1ea')
  }

  function resize() {
    let rect = canvas.getBoundingClientRect()
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = Math.max(1, Math.round(rect.width * dpr))
    h = Math.max(1, Math.round(rect.height * dpr))
    canvas.width = w
    canvas.height = h
    if (!running) draw(reduce.matches ? 2.2 : (performance.now() - start) / 1000)
  }

  function draw(t: number) {
    let c = ctx!
    c.clearRect(0, 0, w, h)
    let R = Math.min(w, h) * 0.34
    let cx = w / 2
    let cy = h / 2
    let F = R * 3.4

    mx += (tx - mx) * 0.045
    my += (ty - my) * 0.045
    let yaw = t * 0.11 + mx * 0.55
    let pitch = -0.38 + my * 0.32
    let cyw = Math.cos(yaw)
    let syw = Math.sin(yaw)
    let cp = Math.cos(pitch)
    let sp = Math.sin(pitch)

    // Orbit ring: tilted, slowly precessing
    let orbitTilt = 1.12
    let orbitYaw = yaw * 0.6 + 0.6
    let co = Math.cos(orbitTilt)
    let so = Math.sin(orbitTilt)
    let coy = Math.cos(orbitYaw)
    let soy = Math.sin(orbitYaw)
    let ringR = R * 1.36
    let electron = t * 0.75

    let project = (x: number, y: number, z: number) => {
      // pitch around X (yaw already applied by caller)
      let y2 = y * cp - z * sp
      let z2 = y * sp + z * cp
      let p = F / (F - z2)
      return { x: cx + x * p, y: cy + y2 * p, z: z2 }
    }

    let orbitPoint = (a: number) => {
      let x = Math.cos(a) * ringR
      let z = Math.sin(a) * ringR
      // tilt around X, then yaw around Y
      let y1 = -z * so
      let z1 = z * co
      let x2 = x * coy - z1 * soy
      let z2 = x * soy + z1 * coy
      return project(x2, y1, z2)
    }

    let drawOrbit = (front: boolean) => {
      c.fillStyle = colorB
      for (let i = 0; i < 220; i++) {
        let p = orbitPoint((i / 220) * Math.PI * 2)
        if (p.z >= 0 !== front) continue
        let depth = (p.z / ringR + 1) / 2
        c.globalAlpha = 0.08 + depth * 0.32
        let s = (0.6 + depth * 0.9) * dpr
        c.fillRect(p.x - s / 2, p.y - s / 2, s, s)
      }
      // electron + trail
      for (let k = 18; k >= 0; k--) {
        let p = orbitPoint(electron - k * 0.035)
        if (p.z >= 0 !== front) continue
        let depth = (p.z / ringR + 1) / 2
        c.fillStyle = colorA
        c.globalAlpha = (1 - k / 19) * (0.35 + depth * 0.65)
        let s = (k === 0 ? 3.4 : 2 - k * 0.07) * dpr * (0.7 + depth * 0.5)
        c.beginPath()
        c.arc(p.x, p.y, s, 0, Math.PI * 2)
        c.fill()
      }
    }

    drawOrbit(false)

    // Sphere: back hemisphere first, then front
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 0; i < points.length; i++) {
        let { lat, lon } = points[i]
        let wave = Math.sin(lat * 5 + Math.cos(lon * 2 + t * 0.4) * 1.6 - t * 1.25)
        let r = R * (1 + 0.065 * wave)
        let cl = Math.cos(lat)
        let x = r * cl * Math.cos(lon)
        let y = r * Math.sin(lat)
        let z = r * cl * Math.sin(lon)
        let x1 = x * cyw - z * syw
        let z1 = x * syw + z * cyw
        let p = project(x1, y, z1)
        let front = p.z >= 0
        if ((pass === 1) !== front) continue

        let depth = (p.z / R + 1) / 2
        let crest = wave > 0.55
        if (front && crest) {
          c.fillStyle = colorA
          c.globalAlpha = 0.45 + depth * 0.55
        } else {
          c.fillStyle = colorB
          c.globalAlpha = front ? 0.14 + depth * 0.5 : 0.05 + depth * 0.12
        }
        let s = (0.55 + depth * 1.25 + (crest && front ? 0.5 : 0)) * dpr
        c.fillRect(p.x - s / 2, p.y - s / 2, s, s)
      }
    }

    drawOrbit(true)
    c.globalAlpha = 1
  }

  function loop(now: number) {
    if (!running) return
    draw((now - start) / 1000)
    frame = requestAnimationFrame(loop)
  }

  function sync() {
    let shouldRun = inView && !document.hidden && !reduce.matches
    if (shouldRun && !running) {
      running = true
      frame = requestAnimationFrame(loop)
    } else if (!shouldRun && running) {
      running = false
      cancelAnimationFrame(frame)
    }
    if (reduce.matches) draw(2.2)
  }

  readColors()
  resize()
  canvas.setAttribute('data-ready', '')

  let ro = new ResizeObserver(resize)
  ro.observe(canvas)

  let io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting
    sync()
  })
  io.observe(canvas)

  let mo = new MutationObserver(() => {
    readColors()
    if (!running) draw(reduce.matches ? 2.2 : (performance.now() - start) / 1000)
  })
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  document.addEventListener('visibilitychange', sync, { signal })
  reduce.addEventListener('change', sync, { signal })
  window.addEventListener(
    'pointermove',
    (event) => {
      if (!fine.matches) return
      tx = (event.clientX / window.innerWidth) * 2 - 1
      ty = (event.clientY / window.innerHeight) * 2 - 1
    },
    { signal, passive: true },
  )

  sync()

  signal.addEventListener('abort', () => {
    running = false
    cancelAnimationFrame(frame)
    ro.disconnect()
    io.disconnect()
    mo.disconnect()
  })
}

/** Canvas silently ignores colors it can't parse; fall back when that happens. */
function safeColor(ctx: CanvasRenderingContext2D, value: string, fallback: string) {
  if (!value) return fallback
  ctx.fillStyle = '#010203'
  ctx.fillStyle = value
  return ctx.fillStyle === '#010203' ? fallback : value
}
