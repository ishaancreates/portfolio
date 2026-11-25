import { css } from 'remix/component'

import { podiums, profile } from '../data/site.ts'
import { HeroVisual } from './public/hero-visual.tsx'
import { ArrowRight } from './public/icons.tsx'

export function Hero() {
  return () => (
    <section
      id="top"
      aria-labelledby="hero-title"
      mix={css({
        position: 'relative',
        isolation: 'isolate',
        minHeight: 'max(100svh, 780px)',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'calc(var(--nav-h) + clamp(56px, 10vh, 120px))',
        paddingBottom: 'clamp(48px, 8vh, 96px)',
        overflow: 'clip',
        '@media (max-width: 820px)': { minHeight: 'auto', paddingBottom: '56px' },
      })}
    >
      <HeroBackdrop />

      <div
        class="container"
        mix={css({
          position: 'relative',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 'clamp(56px, 10vh, 120px)',
        })}
      >
        <p
          class="eyebrow intro-fade"
          mix={css({
            display: 'flex',
            justifyContent: 'space-between',
            gap: '12px 24px',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 2,
            '& .hi': { color: 'var(--fg)' },
          })}
        >
          <span class="hi">Hello, I’m {profile.firstName} (two a’s, no relation to Isaac)</span>
          <span>{profile.coordinates}</span>
        </p>

        <figure
          aria-hidden="true"
          mix={css({
            position: 'absolute',
            zIndex: 0,
            right: 'calc(var(--gutter) * -0.5)',
            top: '50%',
            width: 'min(50vw, 760px)',
            aspectRatio: '1',
            translate: '0 -50%',
            pointerEvents: 'none',
            opacity: 0.9,
            '@media (max-width: 820px)': {
              position: 'relative',
              right: 'auto',
              top: 'auto',
              translate: 'none',
              width: 'min(110vw, 480px)',
              marginInline: 'auto',
              marginBlock: '-8px -22%',
            },
          })}
        >
          <div data-parallax="0.08" mix={css({ position: 'absolute', inset: 0 })}>
            <HeroVisual />
          </div>
        </figure>

        <h1
          id="hero-title"
          mix={css({
            position: 'relative',
            zIndex: 1,
            fontSize: 'clamp(3rem, 8.6vw, 9.4rem)',
            lineHeight: 0.94,
            letterSpacing: '-0.055em',
            fontWeight: 500,
            textWrap: 'initial',
            '& .indent': { paddingLeft: 'calc((100% + var(--col-gap)) / 12 * 1.5)' },
            '@media (max-width: 820px)': {
              fontSize: 'clamp(2.9rem, 14.5vw, 5rem)',
              '& .indent': { paddingLeft: '0' },
            },
          })}
        >
          <span class="line-mask">
            <span class="line" style={{ '--d': '120' }}>
              Building things.
            </span>
          </span>
          <span class="line-mask indent">
            <span class="line" style={{ '--d': '240' }}>
              Breaking them <span class="serif">less.</span>
            </span>
          </span>
        </h1>

        <div
          class="intro-fade"
          style={{ '--d': '600' }}
          mix={css({
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            maxWidth: '480px',
            marginLeft: 'calc((100% + var(--col-gap)) / 12 * 6)',
            '@media (max-width: 1100px)': { marginLeft: 'calc((100% + var(--col-gap)) / 12 * 4)', maxWidth: 'none' },
            '@media (max-width: 820px)': { marginLeft: 0 },
          })}
        >
          <p
            mix={css({
              fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
              lineHeight: 1.5,
              color: 'var(--fg-muted)',
              maxWidth: '38ch',
            })}
          >
            Electrical engineering student, developer and entrepreneur. I turn caffeine and
            curiosity into products, and occasionally into bugs.
          </p>
          <div mix={css({ display: 'flex', flexWrap: 'wrap', gap: '10px' })}>
            <a href="#projects" class="btn btn-primary" data-magnetic>
              Admire my work
              <span class="btn-icon" aria-hidden="true">
                <ArrowRight stroke={2} />
                <ArrowRight stroke={2} />
              </span>
            </a>
            <a href="#contact" class="btn btn-ghost" data-magnetic>
              Slide into my inbox
            </a>
          </div>
          <p
            mix={css({
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '14px',
              color: 'var(--fg-muted)',
            })}
          >
            <span class="pulse" aria-hidden="true" />
            {profile.status.value}
          </p>
        </div>
      </div>
    </section>
  )
}

/** Soft atmospheric glow only. */
function HeroBackdrop() {
  return () => (
    <div
      aria-hidden="true"
      mix={css({
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        '& .glow': {
          position: 'absolute',
          width: '70vw',
          height: '70vw',
          right: '-12vw',
          top: '-14vw',
          borderRadius: '50%',
          background: 'radial-gradient(closest-side, var(--glow), transparent)',
        },
      })}
    >
      <div class="glow" />
    </div>
  )
}

/** Podium finishes as a slow ticker. Duplicated once for a seamless loop. */
export function PodiumTicker() {
  return () => {
    let items = podiums.map((p) => (
      <li key={p.project + p.event} class="item">
        <span class="place">{p.place}</span>
        <span>{p.project}</span>
        <span class="star" aria-hidden="true">
          /
        </span>
      </li>
    ))
    return (
      <section
        aria-label="Hackathon podium finishes"
        mix={css({
          borderBlock: '1px solid var(--line)',
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          '& .track': { display: 'flex', width: 'max-content', animation: 'marquee 40s linear infinite' },
          '@media (hover: hover)': { '&:hover .track': { animationPlayState: 'paused' } },
          '& ul': { display: 'flex' },
          '& .item': {
            display: 'flex',
            alignItems: 'baseline',
            gap: '14px',
            paddingBlock: '20px',
            paddingInline: '0 28px',
            fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          },
          '& .place': { color: 'var(--accent-ink)', fontWeight: 500 },
          '& .star': { color: 'var(--fg-subtle)', marginLeft: '14px' },
          '@media (prefers-reduced-motion: reduce)': {
            overflowX: 'auto',
            '& .track': { animation: 'none' },
          },
        })}
      >
        <div class="track">
          <ul>{items}</ul>
          <ul aria-hidden="true">{items}</ul>
        </div>
      </section>
    )
  }
}
