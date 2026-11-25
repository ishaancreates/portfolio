import { css, type Handle } from 'remix/component'

import { podiums, profile } from '../data/site.ts'
import { HeroVisual } from './public/hero-visual.tsx'
import { ArrowDown, ArrowRight } from './public/icons.tsx'
import { LocalTime } from './public/small-widgets.tsx'

export function Hero() {
  return () => (
    <section
      id="top"
      aria-labelledby="hero-title"
      mix={css({
        position: 'relative',
        isolation: 'isolate',
        minHeight: 'max(100svh, 720px)',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'calc(var(--nav-h) + clamp(40px, 7vh, 88px))',
        paddingBottom: 'clamp(28px, 4vh, 48px)',
        overflow: 'clip',
        '@media (max-width: 820px)': { minHeight: 'auto' },
      })}
    >
      <HeroBackdrop />

      <div
        class="container"
        mix={css({
          position: 'relative',
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          gridTemplateRows: 'auto 1fr auto',
          columnGap: 'var(--col-gap)',
          '@media (max-width: 820px)': { display: 'flex', flexDirection: 'column' },
        })}
      >
        {/* Meta row */}
        <div
          class="intro-fade"
          style={{ '--d': '0' }}
          mix={css({
            gridColumn: '1 / -1',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '12px 24px',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 2,
          })}
        >
          <p
            class="eyebrow"
            mix={css({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: 'var(--fg)',
              '& .rule': { width: '40px', height: '1px', background: 'var(--accent-ink)' },
            })}
          >
            <span>Hello, I’m {profile.firstName}</span>
            <span class="rule" aria-hidden="true" />
          </p>
          <p class="eyebrow" mix={css({ display: 'flex', gap: '10px', flexWrap: 'wrap' })}>
            <span>India</span>
            <span aria-hidden="true">/</span>
            <span>{profile.coordinates}</span>
            <span aria-hidden="true">/</span>
            <LocalTime timeZone={profile.timeZone} label="IST" />
          </p>
        </div>

        {/* Visual */}
        <figure
          aria-hidden="true"
          mix={css({
            position: 'absolute',
            zIndex: 0,
            right: 'calc(var(--gutter) * -0.5)',
            top: '52%',
            width: 'min(52vw, 800px)',
            aspectRatio: '1',
            translate: '0 -50%',
            pointerEvents: 'none',
            '@media (max-width: 820px)': {
              position: 'relative',
              right: 'auto',
              top: 'auto',
              translate: 'none',
              width: 'min(118vw, 520px)',
              marginInline: 'auto',
              marginTop: '-12px',
              marginBottom: '-30%',
            },
          })}
        >
          <div data-parallax="0.08" mix={css({ position: 'absolute', inset: 0 })}>
            <HeroVisual />
          </div>
          <Crosshair />
        </figure>

        {/* Headline */}
        <h1
          id="hero-title"
          mix={css({
            gridColumn: '1 / -1',
            alignSelf: 'center',
            position: 'relative',
            zIndex: 1,
            paddingBlock: 'clamp(40px, 8vh, 96px) clamp(32px, 6vh, 72px)',
            fontSize: 'clamp(3.1rem, 9.6vw, 10.4rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.058em',
            fontWeight: 500,
            textWrap: 'initial',
            '& .indent': { paddingLeft: 'calc((100% + var(--col-gap)) / 12 * 1.5)' },
            '& .serif': {
              color: 'var(--accent-ink)',
              letterSpacing: '-0.03em',
              fontSize: '1.06em',
              lineHeight: 0.8,
              paddingRight: '0.06em',
            },
            '@media (max-width: 820px)': {
              paddingBlock: '0 28px',
              fontSize: 'clamp(3rem, 15.5vw, 5.4rem)',
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
              Making ideas <em class="serif">real.</em>
            </span>
          </span>
        </h1>

        {/* Bottom row */}
        <div
          mix={css({
            gridColumn: '1 / -1',
            display: 'grid',
            gridTemplateColumns: 'subgrid',
            alignItems: 'end',
            rowGap: '32px',
            position: 'relative',
            zIndex: 2,
            '@media (max-width: 820px)': { display: 'flex', flexDirection: 'column-reverse', alignItems: 'stretch' },
          })}
        >
          <div
            class="intro-fade"
            style={{ '--d': '700' }}
            mix={css({
              gridColumn: '1 / span 4',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            })}
          >
            <p
              mix={css({
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                alignSelf: 'flex-start',
                padding: '10px 16px 10px 14px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid transparent',
                boxShadow: 'var(--shadow-border)',
                background: 'color-mix(in oklch, var(--bg-raised) 70%, transparent)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                fontSize: '13.5px',
                lineHeight: 1.3,
                '& .k': { color: 'var(--fg-subtle)' },
              })}
            >
              <span class="pulse" aria-hidden="true" />
              <span>
                <span class="k">{profile.status.label} — </span>
                {profile.status.value}
              </span>
            </p>
            <a
              href="#about"
              class="eyebrow"
              mix={css({
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                alignSelf: 'flex-start',
                '& .ico': {
                  display: 'grid',
                  placeItems: 'center',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '1px solid var(--line-strong)',
                  overflow: 'hidden',
                },
                '& svg': { width: '13px', height: '13px', animation: 'scroll-cue 2.4s var(--ease-in-out) infinite' },
                '@media (hover: hover)': { '&:hover': { color: 'var(--fg)' } },
                '@media (prefers-reduced-motion: reduce)': { '& svg': { animation: 'none' } },
                '@media (max-width: 820px)': { display: 'none' },
              })}
            >
              <span class="ico">
                <ArrowDown />
              </span>
              Scroll to explore
            </a>
          </div>

          <div
            mix={css({
              gridColumn: '7 / span 5',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
              '@media (max-width: 1100px)': { gridColumn: '6 / span 7' },
            })}
          >
            <p
              class="intro-fade"
              style={{ '--d': '520' }}
              mix={css({
                fontSize: 'clamp(1.05rem, 1.35vw, 1.3rem)',
                lineHeight: 1.45,
                letterSpacing: '-0.012em',
                color: 'var(--fg-muted)',
                maxWidth: '40ch',
                '& strong': { color: 'var(--fg)', fontWeight: 450 },
              })}
            >
              I’m an <strong>electrical engineering student</strong>, developer, and entrepreneur
              passionate about building products, solving problems, and exploring technology.
            </p>
            <div
              class="intro-fade"
              style={{ '--d': '620' }}
              mix={css({ display: 'flex', flexWrap: 'wrap', gap: '10px' })}
            >
              <a href="#projects" class="btn btn-primary" data-magnetic>
                Explore my work
                <span class="btn-icon" aria-hidden="true">
                  <ArrowRight stroke={2} />
                  <ArrowRight stroke={2} />
                </span>
              </a>
              <a href="#contact" class="btn btn-ghost" data-magnetic>
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Atmospheric glow + faint column guides. Purely decorative. */
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
          filter: 'blur(20px)',
        },
        '& .glow-2': {
          position: 'absolute',
          width: '50vw',
          height: '40vw',
          left: '-20vw',
          bottom: '-20vw',
          borderRadius: '50%',
          background: 'radial-gradient(closest-side, color-mix(in oklch, var(--fg) 5%, transparent), transparent)',
        },
        '& .guides': {
          position: 'absolute',
          inset: 0,
          maxWidth: 'var(--max)',
          marginInline: 'auto',
          paddingInline: 'var(--gutter)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          maskImage: 'linear-gradient(to bottom, transparent, #000 20%, #000 70%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 20%, #000 70%, transparent)',
        },
        '& .guides span': { borderLeft: '1px solid var(--line)' },
        '& .guides span:last-child': { borderRight: '1px solid var(--line)' },
        '@media (max-width: 820px)': { '& .guides': { gridTemplateColumns: 'repeat(2, 1fr)' } },
      })}
    >
      <div class="glow" />
      <div class="glow-2" />
      <div class="guides">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

/** Registration marks and a figure caption around the visual. */
function Crosshair() {
  return () => (
    <div
      mix={css({
        position: 'absolute',
        inset: '12%',
        '& i': {
          position: 'absolute',
          width: '14px',
          height: '14px',
          borderColor: 'var(--line-strong)',
          borderStyle: 'solid',
          borderWidth: 0,
        },
        '& i:nth-child(1)': { left: 0, top: 0, borderLeftWidth: '1px', borderTopWidth: '1px' },
        '& i:nth-child(2)': { right: 0, top: 0, borderRightWidth: '1px', borderTopWidth: '1px' },
        '& i:nth-child(3)': { left: 0, bottom: 0, borderLeftWidth: '1px', borderBottomWidth: '1px' },
        '& i:nth-child(4)': { right: 0, bottom: 0, borderRightWidth: '1px', borderBottomWidth: '1px' },
        '& .cap': { position: 'absolute', right: 0, bottom: '-28px' },
        '& .cap-l': { position: 'absolute', left: 0, bottom: '-28px' },
        '@media (max-width: 820px)': { display: 'none' },
      })}
    >
      <i />
      <i />
      <i />
      <i />
      <span class="eyebrow cap">Fig. 01 — Signal sphere</span>
    </div>
  )
}

/** Podium finishes as a slow ticker. Duplicated once for a seamless loop. */
export function PodiumTicker() {
  return () => {
    let items = podiums.map((p) => (
      <li key={p.project + p.event} class="item">
        <span class="serif place">{p.place}</span>
        <span>{p.project}</span>
        <span class="event">{p.event}</span>
        <span class="star" aria-hidden="true">
          ✳
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
          '& .track': {
            display: 'flex',
            width: 'max-content',
            animation: 'marquee 48s linear infinite',
          },
          '@media (hover: hover)': { '&:hover .track': { animationPlayState: 'paused' } },
          '& ul': { display: 'flex' },
          '& .item': {
            display: 'flex',
            alignItems: 'baseline',
            gap: '14px',
            paddingBlock: '22px',
            paddingInline: '0 28px',
            fontSize: 'clamp(1.05rem, 1.6vw, 1.4rem)',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          },
          '& .place': { color: 'var(--accent-ink)', fontSize: '1.35em' },
          '& .event': { color: 'var(--fg-subtle)' },
          '& .star': { color: 'var(--fg-subtle)', marginLeft: '14px', fontSize: '0.8em' },
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
