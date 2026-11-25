import { clientEntry, css, on, type Handle } from 'remix/component'

import { PostCover } from './covers.tsx'
import { ArrowUpRight } from './icons.tsx'

export interface JournalPost {
  slug: string
  title: string
  excerpt: string
  category: string
  dateISO: string
  dateLabel: string
  readingMinutes: number
  featured?: boolean
}

interface JournalIndexProps {
  posts: JournalPost[]
  categories: string[]
}

export const JournalIndex = clientEntry(
  import.meta.url,
  function JournalIndex(handle: Handle<JournalIndexProps>) {
    let filter = 'All'
    let generation = 0

    return () => {
      let { posts, categories } = handle.props
      let visible = filter === 'All' ? posts : posts.filter((p) => p.category === filter)
      let featured = visible.find((p) => p.featured) ?? visible[0]
      let rest = visible.filter((p) => p !== featured)
      let options = ['All', ...categories]

      return (
        <div>
          <div
            role="group"
            aria-label="Filter entries by category"
            mix={css({
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: 'clamp(28px, 4vw, 44px)',
            })}
          >
            {options.map((option) => {
              let count = option === 'All' ? posts.length : posts.filter((p) => p.category === option).length
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={filter === option ? 'true' : 'false'}
                  mix={[
                    on('click', () => {
                      if (filter === option) return
                      filter = option
                      generation++
                      handle.update()
                    }),
                    css({
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      height: '36px',
                      paddingInline: '14px 12px',
                      borderRadius: 'var(--radius-pill)',
                      border: '1px solid transparent',
                      boxShadow: 'var(--shadow-border)',
                      fontSize: '14px',
                      color: 'var(--fg-muted)',
                      transition:
                        'background-color 200ms var(--ease-out), color 200ms var(--ease-out), box-shadow 200ms var(--ease-out)',
                      '& .n': {
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--fg-subtle)',
                        transition: 'color 200ms var(--ease-out)',
                      },
                      '@media (hover: hover)': {
                        '&:hover': { color: 'var(--fg)', boxShadow: 'var(--shadow-border-hover)' },
                      },
                      '&[aria-pressed="true"]': {
                        background: 'var(--fg)',
                        color: 'var(--bg)',
                        boxShadow: 'none',
                      },
                      '&[aria-pressed="true"] .n': { color: 'color-mix(in oklch, var(--bg) 60%, transparent)' },
                      '&:active': { scale: '0.97' },
                    }),
                  ]}
                >
                  {option}
                  <span class="n">{String(count).padStart(2, '0')}</span>
                </button>
              )
            })}
          </div>

          <div
            mix={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
              gap: 'var(--col-gap)',
              alignItems: 'start',
              '@media (max-width: 960px)': { gridTemplateColumns: '1fr' },
            })}
          >
            {featured ? <FeaturedPost key={`${generation}-${featured.slug}`} post={featured} /> : null}
            <ol
              aria-label="Recent entries"
              mix={css({
                gridColumn: '8 / span 5',
                borderTop: '1px solid var(--line)',
                '@media (max-width: 960px)': { gridColumn: 'auto' },
              })}
            >
              {rest.length === 0 ? (
                <li mix={css({ paddingBlock: '28px', color: 'var(--fg-subtle)' })}>
                  No other entries in this category yet.
                </li>
              ) : (
                rest.map((post, i) => (
                  <PostRow key={`${generation}-${post.slug}`} post={post} index={i} />
                ))
              )}
            </ol>
          </div>
        </div>
      )
    }
  },
)

function Meta(handle: Handle<{ post: JournalPost }>) {
  return () => {
    let { post } = handle.props
    return (
      <p
        class="eyebrow"
        mix={css({
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '6px 10px',
          '& .dot': { width: '3px', height: '3px', borderRadius: '50%', background: 'currentColor', opacity: 0.6 },
          '& .cat': { color: 'var(--accent-ink)' },
        })}
      >
        <span class="cat">{post.category}</span>
        <span class="dot" aria-hidden="true" />
        <time datetime={post.dateISO}>{post.dateLabel}</time>
        <span class="dot" aria-hidden="true" />
        <span>{post.readingMinutes} min read</span>
      </p>
    )
  }
}

function FeaturedPost(handle: Handle<{ post: JournalPost }>) {
  return () => {
    let { post } = handle.props
    return (
      <article
        class="intro-fade"
        data-cursor-label="Read entry"
        mix={css({
          gridColumn: 'span 7',
          position: 'relative',
          padding: '10px',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid transparent',
          background: 'var(--bg-raised)',
          boxShadow: 'var(--shadow-border)',
          transition: 'box-shadow 200ms var(--ease-out)',
          '@media (max-width: 960px)': { gridColumn: 'auto' },
          '& .cover': {
            position: 'relative',
            aspectRatio: '16 / 9',
            overflow: 'hidden',
            borderRadius: 'var(--radius-lg)',
            background:
              'radial-gradient(120% 90% at 20% 0%, var(--glow), transparent 60%), var(--bg-sunken)',
          },
          '& .cover svg': { transition: 'scale 900ms var(--ease-emph)' },
          '& .body': { padding: 'clamp(18px, 2.4vw, 30px) clamp(12px, 1.6vw, 22px) 18px' },
          '& h3': {
            marginTop: '14px',
            fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
          },
          '& .excerpt': { marginTop: '14px', color: 'var(--fg-muted)', maxWidth: '56ch' },
          '& .more': {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '22px',
            fontSize: '14px',
            fontWeight: 500,
          },
          '& .more svg': { width: '16px', height: '16px', transition: 'translate 300ms var(--ease-emph)' },
          // Whole card is the link target
          '& h3 a::after': { content: '""', position: 'absolute', inset: 0, borderRadius: 'inherit' },
          '& h3 a:focus-visible': { outline: 'none' },
          '&:has(h3 a:focus-visible)': { outline: '2px solid var(--accent-ink)', outlineOffset: '4px' },
          '@media (hover: hover)': {
            '&:hover': { boxShadow: 'var(--shadow-border-hover)' },
            '&:hover .cover svg': { scale: '1.04' },
            '&:hover .more svg': { translate: '2px -2px' },
          },
        })}
      >
        <div class="cover">
          <PostCover slug={post.slug} category={post.category} />
        </div>
        <div class="body">
          <Meta post={post} />
          <h3>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </h3>
          <p class="excerpt">{post.excerpt}</p>
          <span class="more" aria-hidden="true">
            Read entry <ArrowUpRight stroke={2} />
          </span>
        </div>
      </article>
    )
  }
}

function PostRow(handle: Handle<{ post: JournalPost; index: number }>) {
  return () => {
    let { post, index } = handle.props
    return (
      <li
        class="intro-fade"
        style={{ '--d': String(80 + index * 60) }}
        mix={css({ borderBottom: '1px solid var(--line)' })}
      >
        <a
          href={`/blog/${post.slug}`}
          data-cursor-label="Read entry"
          mix={css({
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '10px 20px',
            paddingBlock: '24px',
            transition: 'padding 400ms var(--ease-emph)',
            '& .title': {
              fontSize: 'clamp(1.15rem, 1.5vw, 1.35rem)',
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              fontWeight: 500,
              textWrap: 'balance',
            },
            '& .arrow': {
              gridRow: '1 / span 2',
              gridColumn: 2,
              alignSelf: 'center',
              display: 'grid',
              placeItems: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid transparent',
              boxShadow: 'var(--shadow-border)',
              color: 'var(--fg-muted)',
              transition:
                'background-color 250ms var(--ease-out), color 250ms var(--ease-out), rotate 400ms var(--ease-emph)',
            },
            '& .arrow svg': { width: '16px', height: '16px' },
            '@media (hover: hover)': {
              '&:hover': { paddingInlineStart: '12px' },
              '&:hover .arrow': {
                background: 'var(--accent)',
                color: 'var(--on-accent)',
                boxShadow: 'none',
                rotate: '45deg',
              },
            },
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          })}
        >
          <span class="title">{post.title}</span>
          <Meta post={post} />
          <span class="arrow" aria-hidden="true">
            <ArrowUpRight />
          </span>
        </a>
      </li>
    )
  }
}
