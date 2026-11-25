import { css, type Handle, type RemixNode } from 'remix/component'

import { CollapseToggle } from './collapsible.tsx'

interface SectionHeadingProps {
  index: string
  label: string
  title: RemixNode
  aside?: RemixNode
  id?: string
}

/**
 * Editorial section opener: a hairline, an index label, an oversized title
 * on the left and a small annotation pinned to the right.
 */
export function SectionHeading(handle: Handle<SectionHeadingProps>) {
  return () => {
    let { index, label, title, aside, id } = handle.props
    return (
      <header
        mix={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          columnGap: 'var(--col-gap)',
          rowGap: '28px',
          paddingTop: '22px',
          borderTop: '1px solid var(--line)',
          marginBottom: 'clamp(48px, 7vw, 104px)',
          '& .label': {
            gridColumn: '1 / span 3',
            display: 'flex',
            gap: '14px',
            alignItems: 'baseline',
          },
          '& .label .i': { color: 'var(--accent-ink)' },
          '& h2': {
            gridColumn: '4 / span 9',
            fontSize: 'clamp(2.6rem, 6.6vw, 7rem)',
            lineHeight: 0.94,
            letterSpacing: '-0.05em',
            fontWeight: 500,
          },
          '& h2 .serif': { letterSpacing: '-0.025em', paddingRight: '0.04em' },
          '& .aside': {
            gridColumn: '4 / span 5',
            color: 'var(--fg-muted)',
            maxWidth: '44ch',
          },
          '@media (max-width: 820px)': {
            '& .label, & h2, & .aside': { gridColumn: '1 / -1' },
          },
        })}
      >
        <p class="label eyebrow" data-reveal>
          <span class="i">({index})</span>
          <span>{label}</span>
        </p>
        <h2 id={id} data-reveal style={{ '--i': '1' }}>
          <CollapseToggle>{title}</CollapseToggle>
        </h2>
        {aside ? (
          <div class="aside" data-reveal style={{ '--i': '2' }}>
            {aside}
          </div>
        ) : null}
      </header>
    )
  }
}
