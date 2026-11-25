import { css } from 'remix/component'

import { profile, socials } from '../data/site.ts'
import { ArrowUp, ArrowUpRight, GitHubMark, InstagramMark, LinkedInMark, Mail } from './public/icons.tsx'
import { CopyEmail } from './public/small-widgets.tsx'

function SocialIcon(label: string) {
  switch (label) {
    case 'GitHub':
      return <GitHubMark />
    case 'LinkedIn':
      return <LinkedInMark />
    case 'Instagram':
      return <InstagramMark />
    default:
      return <Mail />
  }
}

export function SiteFooter() {
  return () => {
    let year = new Date().getFullYear()
    return (
      <footer
        id="contact"
        aria-labelledby="contact-title"
        mix={css({
          position: 'relative',
          marginTop: 'clamp(120px, 16vw, 240px)',
          paddingTop: 'clamp(72px, 9vw, 130px)',
          borderTop: '1px solid var(--line)',
          overflow: 'clip',
          isolation: 'isolate',
          '&::before': {
            content: '""',
            position: 'absolute',
            zIndex: -1,
            left: '50%',
            bottom: '-30vw',
            width: '90vw',
            height: '60vw',
            translate: '-50% 0',
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, var(--glow), transparent)',
          },
        })}
      >
        <div class="container">
          <p class="eyebrow" data-reveal mix={css({ '& .i': { color: 'var(--accent-ink)', marginRight: '14px' } })}>
            <span class="i">(04)</span>Contact
          </p>
          <h2
            id="contact-title"
            data-reveal
            style={{ '--i': '1' }}
            mix={css({
              marginTop: '28px',
              fontSize: 'clamp(3rem, 9vw, 9.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.058em',
              fontWeight: 500,
              '& .l2': { display: 'block', paddingLeft: 'calc((100% + var(--col-gap)) / 12 * 2)' },
              '& .serif': { color: 'var(--accent-ink)', letterSpacing: '-0.03em', paddingRight: '0.05em' },
              '@media (max-width: 820px)': { '& .l2': { paddingLeft: 0 } },
            })}
          >
            Got a questionable idea?
            <span class="l2">
              Perfect. Let’s make it <span class="serif">real.</span>
            </span>
          </h2>

          <div
            data-reveal
            style={{ '--i': '2' }}
            mix={css({
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '16px 20px',
              marginTop: 'clamp(40px, 5vw, 64px)',
              paddingLeft: 'calc((100% + var(--col-gap)) / 12 * 2)',
              '@media (max-width: 820px)': { paddingLeft: 0 },
            })}
          >
            <a
              href={`mailto:${profile.email}`}
              data-magnetic="0.18"
              mix={css({
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                paddingBlock: '6px',
                fontSize: 'clamp(1.3rem, 2.6vw, 2.2rem)',
                letterSpacing: '-0.03em',
                borderBottom: '1px solid var(--line-strong)',
                transition: 'border-color 300ms var(--ease-out)',
                '& .ico': {
                  display: 'grid',
                  placeItems: 'center',
                  width: '1.4em',
                  height: '1.4em',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  color: 'var(--on-accent)',
                  transition: 'rotate 500ms var(--ease-emph)',
                },
                '& .ico svg': { width: '45%', height: '45%' },
                '@media (hover: hover)': {
                  '&:hover': { borderColor: 'var(--fg)' },
                  '&:hover .ico': { rotate: '45deg' },
                },
              })}
            >
              {profile.email}
              <span class="ico" aria-hidden="true">
                <ArrowUpRight stroke={2} />
              </span>
            </a>
            <CopyEmail email={profile.email} />
          </div>

          <div
            mix={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
              columnGap: 'var(--col-gap)',
              rowGap: '40px',
              marginTop: 'clamp(90px, 11vw, 160px)',
              paddingBlock: '28px',
              borderTop: '1px solid var(--line)',
              '& .h': { marginBottom: '14px' },
              '@media (max-width: 820px)': { '& > *': { gridColumn: '1 / -1 !important' } },
            })}
          >
            <nav aria-label="Social" mix={css({ gridColumn: '1 / span 6' })}>
              <p class="eyebrow h">Elsewhere</p>
              <ul
                mix={css({
                  '& li': { borderBottom: '1px solid var(--line)' },
                  '& a, & .disabled': {
                    display: 'grid',
                    gridTemplateColumns: '20px 1fr auto auto',
                    alignItems: 'center',
                    gap: '14px',
                    paddingBlock: '12px',
                    fontSize: '15px',
                  },
                  '& svg': { width: '16px', height: '16px' },
                  '& .handle': { color: 'var(--fg-subtle)', fontSize: '13.5px' },
                  '& .arrow': { color: 'var(--fg-subtle)', transition: 'translate 300ms var(--ease-emph), color 200ms' },
                  '& .disabled': { color: 'var(--fg-subtle)' },
                  '@media (hover: hover)': {
                    '& a:hover .arrow': { translate: '2px -2px', color: 'var(--accent-ink)' },
                    '& a:hover .handle': { color: 'var(--fg-muted)' },
                  },
                })}
              >
                {socials.map((s) => (
                  <li key={s.label}>
                    {s.href ? (
                      <a
                        href={s.href}
                        target={s.href.startsWith('http') ? '_blank' : undefined}
                        rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        {SocialIcon(s.label)}
                        <span>{s.label}</span>
                        <span class="handle">{s.handle}</span>
                        <span class="arrow" aria-hidden="true">
                          <ArrowUpRight />
                        </span>
                      </a>
                    ) : (
                      // placeholder: no URL yet, so this renders as inert text rather than a dead link
                      <span class="disabled" title="Placeholder: add URL in app/data/site.ts">
                        {SocialIcon(s.label)}
                        <span>{s.label}</span>
                        <span class="handle ph">{s.handle}</span>
                        <span />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div
              mix={css({
                gridColumn: '9 / span 4',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                gap: '18px',
              })}
            >
              <a href="#top" class="btn btn-ghost" data-magnetic mix={css({ '--btn-h': '44px', fontSize: '14px' })}>
                Teleport to top
                <span class="btn-icon up" aria-hidden="true">
                  <ArrowUp stroke={2} />
                  <ArrowUp stroke={2} />
                </span>
              </a>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          mix={css({
            position: 'relative',
            marginTop: '12px',
            lineHeight: 0.74,
            fontSize: 'clamp(6rem, 27vw, 30rem)',
            letterSpacing: '-0.075em',
            fontWeight: 600,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            color: 'transparent',
            WebkitTextStroke: '1px var(--line-strong)',
            backgroundImage: 'linear-gradient(to bottom, color-mix(in oklch, var(--fg) 16%, transparent), transparent 90%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            translate: '0 18%',
            userSelect: 'none',
          })}
        >
          Ishaan
        </div>

        <div
          class="container"
          mix={css({
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px 24px',
            paddingBlock: '22px max(22px, env(safe-area-inset-bottom))',
            borderTop: '1px solid var(--line)',
            background: 'var(--bg)',
          })}
        >
          <p class="eyebrow">
            © {year} {profile.name}
          </p>
        </div>
      </footer>
    )
  }
}
