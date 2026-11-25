import { css, type Handle } from 'remix/component'

import { about, experience, skills, type ExperienceEntry } from '../data/site.ts'
import { CollapseBody, CollapseToggle } from './collapsible.tsx'
import { SectionHeading } from './section-heading.tsx'

export const sectionSpacing = css({
  position: 'relative',
  paddingBlock: 'clamp(110px, 15vw, 220px) 0',
})

export function About() {
  return () => (
    <section id="about" aria-labelledby="about-title" class="container" data-collapsible mix={sectionSpacing}>
      <SectionHeading
        id="about-title"
        index="01"
        label="About"
        title={
          <>
            Engineer by training, <span class="serif">builder</span> by chai.
          </>
        }
      />

      <CollapseBody>
      <div
        mix={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          columnGap: 'var(--col-gap)',
          rowGap: '48px',
          alignItems: 'start',
          '@media (max-width: 960px)': { gridTemplateColumns: '1fr' },
        })}
      >
        <Portrait />
        <div
          mix={css({
            gridColumn: '5 / span 8',
            '@media (max-width: 960px)': { gridColumn: 'auto' },
          })}
        >
          <p
            data-reveal
            mix={css({
              fontSize: 'clamp(1.4rem, 2.4vw, 2.3rem)',
              lineHeight: 1.22,
              letterSpacing: '-0.03em',
              textWrap: 'pretty',
              maxWidth: '26em',
            })}
          >
            {about.lead}
          </p>
          <Facts />
        </div>
      </div>

      <Toolkit />
      <Timeline />
      </CollapseBody>
    </section>
  )
}

function Portrait() {
  return () => (
    <figure
      data-reveal
      mix={css({
        gridColumn: '1 / span 4',
        maxWidth: '440px',
        padding: '8px',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid transparent',
        background: 'var(--bg-raised)',
        boxShadow: 'var(--shadow-border)',
        '& img': {
          width: '100%',
          height: 'auto',
          aspectRatio: '3 / 4',
          objectFit: 'cover',
          borderRadius: '22px', // 30 - 8 padding: concentric
          // better-ui: pure black/white inset outline on content images
          outline: '1px solid var(--image-outline)',
          outlineOffset: '-1px',
        },
        '@media (max-width: 960px)': { gridColumn: 'auto' },
      })}
    >
      <img
        src="/images/gallery/img3-1600.webp"
        srcset="/images/gallery/img3-800.webp 800w, /images/gallery/img3-1600.webp 1600w"
        sizes="(max-width: 960px) 90vw, 32vw"
        alt="Ishaan Pandey"
        width="960"
        height="1280"
        decoding="async"
      />
    </figure>
  )
}

function Facts() {
  return () => (
    <dl
      aria-label="By the numbers"
      mix={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: '24px var(--col-gap)',
        marginTop: 'clamp(48px, 6vw, 88px)',
        paddingTop: '28px',
        borderTop: '1px solid var(--line)',
        '@media (max-width: 700px)': { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
        '& > div': { display: 'flex', flexDirection: 'column' },
        '& dd': {
          order: -1,
          fontSize: 'clamp(2.2rem, 4.4vw, 4rem)',
          lineHeight: 1,
          letterSpacing: '-0.05em',
          fontVariantNumeric: 'tabular-nums',
          marginBottom: '10px',
        },
        '& dd .plus': { color: 'var(--accent-ink)' },
        '& dt': { fontSize: '14px', color: 'var(--fg-muted)' },
      })}
    >
      {about.facts.map((fact, i) => (
        <div key={fact.label} data-reveal style={{ '--i': String(i) }}>
          <dt>{fact.label}</dt>
          <dd>
            {fact.value.replace('+', '')}
            {fact.value.endsWith('+') ? <span class="plus">+</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function SubHeading(handle: Handle<{ index: string; title: string }>) {
  return () => (
    <h3
      data-reveal
      mix={css({
        marginBottom: '28px',
        fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
        letterSpacing: '-0.035em',
        lineHeight: 1.05,
        '& .eyebrow': { color: 'var(--accent-ink)', marginRight: '14px', verticalAlign: 'middle' },
      })}
    >
      <CollapseToggle>
        <span class="eyebrow">({handle.props.index})</span>
        {handle.props.title}
      </CollapseToggle>
    </h3>
  )
}

function Toolkit() {
  return () => (
    <div data-collapsible mix={css({ marginTop: 'clamp(110px, 13vw, 190px)' })}>
      <SubHeading index="A" title="Toolkit" />
      <CollapseBody><ul
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
          '& .v': { gridColumn: '4 / -1', display: 'flex', flexWrap: 'wrap', gap: '8px' },
          '@media (max-width: 700px)': { '& .k, & .v': { gridColumn: '1 / -1' } },
        })}
      >
        {skills.map((group, i) => (
          <li key={group.label} data-reveal style={{ '--i': String(i) }}>
            <span class="k">{group.label}</span>
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
      </ul></CollapseBody>
    </div>
  )
}

function Timeline() {
  return () => (
    <div data-collapsible mix={css({ marginTop: 'clamp(110px, 13vw, 190px)' })}>
      <SubHeading index="B" title="Experience" />
      <CollapseBody>
        <ol aria-label="Experience" mix={css({ borderTop: '1px solid var(--line)' })}>
          {experience.map((entry, i) => (
            <TimelineRow key={entry.org} entry={entry} index={i} />
          ))}
        </ol>
      </CollapseBody>
    </div>
  )
}

function TimelineRow(handle: Handle<{ entry: ExperienceEntry; index: number }>) {
  return () => {
    let { entry, index } = handle.props
    return (
      <li
        data-reveal
        style={{ '--i': String(index % 3) }}
        mix={css({
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          columnGap: 'var(--col-gap)',
          rowGap: '8px',
          paddingBlock: 'clamp(22px, 2.6vw, 32px)',
          borderBottom: '1px solid var(--line)',
          '& .when': { gridColumn: '1 / span 3', display: 'flex', alignItems: 'center', gap: '10px' },
          '& .what': { gridColumn: '4 / -1' },
          '& .role': { fontSize: 'clamp(1.2rem, 1.8vw, 1.55rem)', letterSpacing: '-0.025em', lineHeight: 1.2, fontWeight: 500 },
          '& .org': { color: 'var(--accent-ink)' },
          '& .at': { color: 'var(--fg-subtle)', paddingInline: '0.3em' },
          '& .line': { marginTop: '8px', color: 'var(--fg-muted)', maxWidth: '60ch' },
          '@media (max-width: 800px)': { '& .when, & .what': { gridColumn: '1 / -1' } },
        })}
      >
        <p class="when eyebrow">
          {entry.current ? <span class="pulse" aria-hidden="true" /> : null}
          {entry.period.startsWith('[') ? <span class="ph">{entry.period}</span> : entry.period}
          {entry.current ? <span class="sr-only">(current)</span> : null}
        </p>
        <div class="what">
          <h4 class="role">
            {entry.role}
            <span class="at">/</span>
            <span class="org">{entry.org}</span>
          </h4>
          <p class="line">{entry.points[0]}</p>
        </div>
      </li>
    )
  }
}
