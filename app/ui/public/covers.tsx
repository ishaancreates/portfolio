import { css, type Handle } from 'remix/component'

/**
 * Generative cover art (SVG) for items without imagery. Everything draws
 * from theme tokens, so covers recolor with the theme automatically.
 */

function hash(input: string) {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

const coverFrame = css({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  color: 'var(--fg)',
  '& .a': { fill: 'var(--accent)' },
  '& .a-stroke': { stroke: 'var(--accent-ink)' },
  '& .faint': { stroke: 'var(--line-strong)' },
  '& text': { fontFamily: 'var(--font-mono)', fill: 'var(--fg-subtle)' },
})

/** OpenEval: a 45-question answer grid and a 120:00 timer, which is the real exam format. */
export function ExamGridCover() {
  return () => {
    let rand = hash('openeval')
    let cols = 9
    let rows = 5
    let cell = 46
    let gap = 10
    let w = cols * cell + (cols - 1) * gap
    let x0 = (800 - w) / 2
    let y0 = 150
    return (
      <svg viewBox="0 0 800 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true" mix={coverFrame}>
        <text x={x0} y="96" font-size="13" letter-spacing="1.5">
          PROJECT INIT — 45 QUESTIONS
        </text>
        <text x={x0 + w} y="96" font-size="13" text-anchor="end" letter-spacing="1.5">
          AI/ML · CP · DEV
        </text>
        {Array.from({ length: rows * cols }, (_, i) => {
          let r = Math.floor(i / cols)
          let c = i % cols
          let v = rand()
          let answered = i < 31
          return (
            <rect
              key={i}
              x={x0 + c * (cell + gap)}
              y={y0 + r * (cell + gap)}
              width={cell}
              height={cell}
              rx="9"
              class={answered && v > 0.55 ? 'a' : undefined}
              fill={answered && v > 0.55 ? undefined : 'none'}
              stroke={answered && v > 0.55 ? 'none' : 'currentColor'}
              stroke-opacity={answered ? 0.35 : 0.12}
              stroke-width="1"
            />
          )
        })}
        <line x1={x0} x2={x0 + w} y1="470" y2="470" class="faint" stroke-width="1" />
        <line x1={x0} x2={x0 + w * 0.69} y1="470" y2="470" class="a-stroke" stroke-width="2" />
        <text x={x0} y="505" font-size="13" letter-spacing="1.5">
          31 / 45 ANSWERED
        </text>
        <text x={x0 + w} y="505" font-size="13" text-anchor="end" letter-spacing="1.5">
          TIME LEFT 37:12 / 120:00
        </text>
      </svg>
    )
  }
}

/** Empty slot: dashed frame with a plus. */
export function EmptySlotCover() {
  return () => (
    <svg viewBox="0 0 800 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true" mix={coverFrame}>
      <rect
        x="60"
        y="60"
        width="680"
        height="440"
        rx="22"
        fill="none"
        stroke="currentColor"
        stroke-opacity="0.22"
        stroke-dasharray="6 8"
      />
      <path d="M400 250v60M370 280h60" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.5" />
      <text x="400" y="360" font-size="13" text-anchor="middle" letter-spacing="1.5">
        RESERVED — ADD A PROJECT
      </text>
    </svg>
  )
}

/** Journal covers: one composition per category, seeded by slug. */
export function PostCover(handle: Handle<{ slug: string; category: string }>) {
  return () => {
    let { slug, category } = handle.props
    let rand = hash(slug)

    if (category === 'Engineering') {
      // Waveform stack: an oscilloscope reading
      let lines = Array.from({ length: 9 }, (_, i) => {
        let amp = 8 + rand() * 46
        let freq = 0.012 + rand() * 0.02
        let phase = rand() * Math.PI * 2
        let y = 90 + i * 46
        let d = ''
        for (let x = 0; x <= 800; x += 8) {
          let env = Math.sin((x / 800) * Math.PI)
          d += `${x === 0 ? 'M' : 'L'}${x} ${(y + Math.sin(x * freq + phase) * amp * env).toFixed(1)}`
        }
        return { d, hot: i === 4 }
      })
      return (
        <svg viewBox="0 0 800 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true" mix={coverFrame}>
          {lines.map((l, i) => (
            <path
              key={i}
              d={l.d}
              fill="none"
              class={l.hot ? 'a-stroke' : undefined}
              stroke={l.hot ? undefined : 'currentColor'}
              stroke-opacity={l.hot ? 1 : 0.2}
              stroke-width={l.hot ? 2 : 1}
            />
          ))}
        </svg>
      )
    }

    if (category === 'Building') {
      // Rising bars: progress over iterations
      let n = 14
      let bw = 34
      let gap = 14
      let x0 = (800 - (n * bw + (n - 1) * gap)) / 2
      let hot = Math.floor(rand() * 4) + n - 5
      return (
        <svg viewBox="0 0 800 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true" mix={coverFrame}>
          {Array.from({ length: n }, (_, i) => {
            let hgt = 60 + (i / n) * 260 + rand() * 70
            return (
              <rect
                key={i}
                x={x0 + i * (bw + gap)}
                y={470 - hgt}
                width={bw}
                height={hgt}
                rx="6"
                class={i === hot ? 'a' : undefined}
                fill={i === hot ? undefined : 'currentColor'}
                fill-opacity={i === hot ? 1 : 0.08 + (i / n) * 0.14}
              />
            )
          })}
          <line x1="60" x2="740" y1="470.5" y2="470.5" class="faint" />
        </svg>
      )
    }

    // Notes: concentric rings with a single accent node
    let angle = rand() * Math.PI * 2
    return (
      <svg viewBox="0 0 800 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true" mix={coverFrame}>
        {Array.from({ length: 8 }, (_, i) => (
          <circle
            key={i}
            cx="400"
            cy="280"
            r={40 + i * 34}
            fill="none"
            stroke="currentColor"
            stroke-opacity={0.08 + (i % 3 === 0 ? 0.14 : 0)}
          />
        ))}
        <circle class="a" cx={400 + Math.cos(angle) * 210} cy={280 + Math.sin(angle) * 210} r="9" />
        <line
          x1="400"
          y1="280"
          x2={400 + Math.cos(angle) * 210}
          y2={280 + Math.sin(angle) * 210}
          class="a-stroke"
          stroke-width="1.5"
        />
        <circle cx="400" cy="280" r="4" fill="currentColor" />
      </svg>
    )
  }
}
