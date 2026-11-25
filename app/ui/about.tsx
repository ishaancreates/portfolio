import { css, type Handle } from 'remix/component'

import { about, experience, profile, skills, type ExperienceEntry } from '../data/site.ts'
import { SectionHeading } from './section-heading.tsx'

export function About() {
  return () => (
    <section id="about" aria-labelledby="about-title" class="container" mix={sectionSpacing}>
      <SectionHeading
        id="about-title"
        index="01"
        label="About"
        title={
          <>
            Engineer by training, <span class="serif">builder</span> by habit.
          </>
        }
        aside={
          <p>
            {profile.year} · {profile.degree} · {profile.collegeShort}
          </p>
        }
      />

      <div
        mix={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          columnGap: 'var(--col-gap)',
          rowGap: '56px',
          '@media (max-width: 960px)': { gridTemplateColumns: '1fr' },
        })}
      >
        <ProfileCard />

        <div
          mix={css({
            gridColumn: '5 / span 8',
            gridRow: 1,
            '@media (max-width: 960px)': { gridColumn: 'auto', gridRow: 'auto' },
          })}
        >
          <p
            data-reveal
            mix={css({
              fontSize: 'clamp(1.5rem, 2.6vw, 2.5rem)',
              lineHeight: 1.18,
              letterSpacing: '-0.03em',
              fontWeight: 400,
              textWrap: 'pretty',
              '& .muted': { color: 'var(--fg-subtle)' },
            })}
          >
            {about.lead.split('. ')[0]}.{' '}
            <span class="muted">{about.lead.split('. ').slice(1).join('. ')}</span>
          </p>

          <div
            mix={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '44px var(--col-gap)',
              marginTop: 'clamp(48px, 6vw, 80px)',
              '@media (max-width: 640px)': { gridTemplateColumns: '1fr' },
            })}
          >
            {about.paragraphs.map((p, i) => (
              <div
                key={p.title}
                data-reveal
                style={{ '--i': String(i % 2) }}
                mix={css({
                  paddingTop: '18px',
                  borderTop: '1px solid var(--line)',
                  '& h3': {
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'baseline',
                    fontSize: '17px',
                    letterSpacing: '-0.015em',
                    marginBottom: '10px',
                  },
                  '& h3 .eyebrow': { color: 'var(--accent-ink)' },
                  '& p': { color: 'var(--fg-muted)', maxWidth: '46ch' },
                })}
              >
                <h3>
                  <span class="eyebrow">0{i + 1}</span>
                  {p.title}
                </h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Facts />
      <Toolkit />
      <Timeline />
    </section>
  )
}

export const sectionSpacing = css({
  position: 'relative',
  paddingBlock: 'clamp(96px, 14vw, 200px) 0',
})

function ProfileCard() {
  return () => (
    <aside
      aria-label="Profile"
      data-reveal
      mix={css({
        gridColumn: '1 / span 3',
        gridRow: 1,
        alignSelf: 'start',
        position: 'sticky',
        top: 'calc(var(--nav-h) + 40px)',
        '@media (max-width: 960px)': {
          position: 'static',
          gridColumn: 'auto',
          gridRow: 'auto',
          maxWidth: '420px',
        },
      })}
    >
      {/* placeholder: swap for a real portrait (e.g. /images/portrait.webp, 4:5) */}
      <div
        mix={css({
          padding: '8px',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid transparent',
          background: 'var(--bg-raised)',
          boxShadow: 'var(--shadow-border)',
          '& .frame': {
            position: 'relative',
            aspectRatio: '4 / 5',
            borderRadius: '22px', // 30 - 8 concentric
            overflow: 'hidden',
            display: 'grid',
            placeItems: 'center',
            background:
              'radial-gradient(90% 70% at 70% 15%, var(--glow), transparent 70%), repeating-linear-gradient(-45deg, transparent 0 11px, var(--line) 11px 12px), var(--bg-sunken)',
          },
          '& .mono': {
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(7rem, 14vw, 11rem)',
            lineHeight: 1,
            color: 'var(--fg)',
            translate: '-4px 6px',
          },
          '& .note': { position: 'absolute', left: '14px', right: '14px', bottom: '14px' },
          '& .corner': { position: 'absolute', top: '14px', left: '14px' },
        })}
      >
        <div class="frame">
          <span class="mono" aria-hidden="true">
            Ip
          </span>
          <span class="eyebrow corner">Portrait</span>
          <span class="eyebrow note">[Placeholder: add a 4:5 photo]</span>
        </div>
      </div>

      <dl
        mix={css({
          marginTop: '20px',
          fontSize: '14px',
          '& div': {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '16px',
            paddingBlock: '10px',
            borderBottom: '1px solid var(--line)',
          },
          '& dt': { color: 'var(--fg-subtle)' },
          '& dd': { textAlign: 'right' },
        })}
      >
        <div>
          <dt>Studying</dt>
          <dd>B.Tech, Electrical</dd>
        </div>
        <div>
          <dt>College</dt>
          <dd>{profile.collegeShort}</dd>
        </div>
        <div>
          <dt>Batch</dt>
          <dd>{profile.degreeYears}</dd>
        </div>
        <div>
          <dt>CGPA</dt>
          <dd>{profile.cgpa}</dd>
        </div>
        <div>
          <dt>Based in</dt>
          <dd>{profile.location}</dd>
        </div>
      </dl>
    </aside>
  )
}

function Facts() {
  return () => (
    <dl
      aria-label="By the numbers"
      mix={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        marginTop: 'clamp(80px, 10vw, 150px)',
        borderTop: '1px solid var(--line)',
        '& > div': {
          display: 'flex',
          flexDirection: 'column',
          paddingBlock: '26px 8px',
          paddingInline: '0 20px',
          borderRight: '1px solid var(--line)',
          marginRight: '20px',
        },
        '& > div:last-child': { borderRight: 0, marginRight: 0 },
        '@media (max-width: 820px)': {
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          '& > div:nth-child(2n)': { borderRight: 0, marginRight: 0 },
          '& > div:nth-child(-n + 2)': { borderBottom: '1px solid var(--line)', paddingBottom: '26px' },
        },
        '& dd': {
          order: -1,
          fontSize: 'clamp(2.8rem, 6vw, 5.6rem)',
          lineHeight: 1,
          letterSpacing: '-0.055em',
          fontWeight: 400,
          fontVariantNumeric: 'tabular-nums',
          marginBottom: '18px',
        },
        '& dd .plus': { color: 'var(--accent-ink)' },
        '& dt': { fontSize: '15px', fontWeight: 500 },
        '& .note': { marginTop: '4px', color: 'var(--fg-subtle)', fontSize: '13.5px' },
      })}
    >
      {about.facts.map((fact, i) => (
        <div key={fact.label} data-reveal style={{ '--i': String(i) }}>
          <dt>
            {fact.label}
            <span class="note" mix={css({ display: 'block' })}>
              {fact.note}
            </span>
          </dt>
          <dd>
            {fact.value.replace('+', '')}
            {fact.value.endsWith('+') ? <span class="plus">+</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function SubHeading(handle: Handle<{ index: string; title: string; note?: string }>) {
  return () => (
    <div
      data-reveal
      mix={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '16px',
        flexWrap: 'wrap',
        marginBottom: '28px',
        '& h3': {
          fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
          letterSpacing: '-0.035em',
          lineHeight: 1.05,
        },
        '& h3 .eyebrow': { color: 'var(--accent-ink)', marginRight: '14px', verticalAlign: 'middle' },
      })}
    >
      <h3>
        <span class="eyebrow">({handle.props.index})</span>
        {handle.props.title}
      </h3>
      {handle.props.note ? <p class="eyebrow">{handle.props.note}</p> : null}
    </div>
  )
}

function Toolkit() {
  return () => (
    <div mix={css({ marginTop: 'clamp(96px, 12vw, 170px)' })}>
      <SubHeading index="A" title="Toolkit" note="Dashed = to confirm" />
      <ul
        aria-label="Skills"
        mix={css({
          borderTop: '1px solid var(--line)',
          '& > li': {
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            columnGap: 'var(--col-gap)',
            rowGap: '12px',
            paddingBlock: '20px',
            borderBottom: '1px solid var(--line)',
            alignItems: 'baseline',
          },
          '& .k': { gridColumn: '1 / span 3', fontSize: '15px', fontWeight: 500 },
          '& .k .eyebrow': { marginRight: '12px' },
          '& .v': { gridColumn: '4 / -1', display: 'flex', flexWrap: 'wrap', gap: '8px' },
          '@media (max-width: 700px)': { '& .k, & .v': { gridColumn: '1 / -1' } },
          '@media (hover: hover)': {
            '& > li:hover .chip:not([data-placeholder])': { color: 'var(--fg)' },
          },
        })}
      >
        {skills.map((group, i) => (
          <li key={group.label} data-reveal style={{ '--i': String(i) }}>
            <span class="k">
              <span class="eyebrow">0{i + 1}</span>
              {group.label}
            </span>
            <span class="v">
              {group.items.map((item) =>
                item.placeholder ? (
                  <span key={item.name} class="chip" data-placeholder title="Placeholder: confirm or remove">
                    {item.name}
                    <span class="sr-only"> (placeholder, unconfirmed)</span>
                  </span>
                ) : (
                  <span key={item.name} class="chip">
                    {item.name}
                  </span>
                ),
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Timeline() {
  return () => (
    <div mix={css({ marginTop: 'clamp(96px, 12vw, 170px)' })}>
      <SubHeading index="B" title="Experience" note="Most recent first" />
      <ol aria-label="Experience" mix={css({ borderTop: '1px solid var(--line)' })}>
        {experience.map((entry, i) => (
          <TimelineRow key={entry.org} entry={entry} index={i} />
        ))}
      </ol>
    </div>
  )
}

function TimelineRow(handle: Handle<{ entry: ExperienceEntry; index: number }>) {
  return () => {
    let { entry, index } = handle.props
    let isPlaceholderPeriod = entry.period.startsWith('[')
    return (
      <li
        data-reveal
        style={{ '--i': String(index % 3) }}
        mix={css({
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          columnGap: 'var(--col-gap)',
          rowGap: '14px',
          paddingBlock: 'clamp(26px, 3vw, 38px)',
          borderBottom: '1px solid var(--line)',
          // Accent rail that grows in on hover
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 'calc(var(--gutter) * -0.5)',
            top: '-1px',
            bottom: '-1px',
            width: '2px',
            background: 'var(--accent)',
            scale: '1 0',
            transformOrigin: 'top',
            transition: 'scale 500ms var(--ease-emph)',
          },
          '@media (hover: hover)': {
            '&:hover::before': { scale: '1 1' },
            '&:hover .org': { color: 'var(--accent-ink)' },
          },
          '& .when': {
            gridColumn: '1 / span 3',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'flex-start',
          },
          '& .kind': {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            color: 'var(--fg-muted)',
          },
          '& .what': { gridColumn: '4 / span 6' },
          '& .role': {
            fontSize: 'clamp(1.35rem, 2vw, 1.75rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            fontWeight: 500,
          },
          '& .org': { transition: 'color 300ms var(--ease-out)' },
          '& .at': { color: 'var(--fg-subtle)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', paddingInline: '0.2em' },
          '& .points': { marginTop: '14px', display: 'grid', gap: '8px', color: 'var(--fg-muted)', maxWidth: '62ch' },
          '& .points li': { position: 'relative', paddingLeft: '18px' },
          '& .points li::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: '0.72em',
            width: '8px',
            height: '1px',
            background: 'var(--fg-subtle)',
          },
          '& .stack': {
            gridColumn: '10 / -1',
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            gap: '6px',
            justifyContent: 'flex-end',
          },
          '& .stack .chip': { height: '26px', fontSize: '12.5px' },
          '@media (max-width: 960px)': {
            '& .when': { gridColumn: '1 / -1', flexDirection: 'row', alignItems: 'center', gap: '14px' },
            '& .what, & .stack': { gridColumn: '1 / -1' },
            '& .stack': { justifyContent: 'flex-start' },
          },
        })}
      >
        <div class="when">
          <span class={isPlaceholderPeriod ? 'eyebrow ph' : 'eyebrow'}>{entry.period}</span>
          <span class="kind">
            {entry.current ? <span class="pulse" aria-hidden="true" /> : null}
            {entry.kind}
            {entry.current ? <span class="sr-only">(current)</span> : null}
          </span>
        </div>
        <div class="what">
          <h4 class="role">
            {entry.role}
            <span class="at">at</span>
            <span class="org">{entry.org}</span>
          </h4>
          <ul class="points">
            {entry.points.map((point) => (
              <li key={point}>{point.startsWith('[') ? <span class="ph">{point}</span> : point}</li>
            ))}
          </ul>
        </div>
        {entry.stack ? (
          <div class="stack" aria-label="Stack">
            {entry.stack.map((s) => (
              <span key={s} class="chip">
                {s}
              </span>
            ))}
          </div>
        ) : (
          <div class="stack" />
        )}
      </li>
    )
  }
}
