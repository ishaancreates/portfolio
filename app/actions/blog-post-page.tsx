import { css, type Handle } from 'remix/component'

import { formatPostDate, posts } from '../data/posts.ts'
import { profile, socials } from '../data/site.ts'
import { PostCover } from '../ui/public/covers.tsx'
import { ArrowLeft, ArrowRight } from '../ui/public/icons.tsx'
import { SiteNav } from '../ui/public/site-nav.tsx'
import { SiteFooter } from '../ui/site-footer.tsx'
import { Document } from './document.tsx'

const prose = css({
  maxWidth: '680px',
  marginInline: 'auto',
  fontSize: '18px',
  lineHeight: 1.7,
  color: 'var(--fg-muted)',
  '& > * + *': { marginTop: '1.2em' },
  '& h2': {
    marginTop: '2.4em',
    color: 'var(--fg)',
    fontSize: '1.6rem',
    lineHeight: 1.2,
    letterSpacing: '-0.03em',
  },
  '& strong': { color: 'var(--fg)', fontWeight: 500 },
  '& ul': { display: 'grid', gap: '0.5em', paddingLeft: '1.2em', listStyle: 'disc' },
  '& ul li::marker': { color: 'var(--accent-ink)' },
  '& blockquote': {
    margin: '2em 0',
    paddingLeft: '24px',
    borderLeft: '2px solid var(--accent)',
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontSize: '1.6em',
    lineHeight: 1.3,
    color: 'var(--fg)',
  },
  '& pre': {
    padding: '20px 22px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid transparent',
    boxShadow: 'var(--shadow-border)',
    background: 'var(--bg-sunken)',
    overflowX: 'auto',
    overscrollBehaviorX: 'contain',
    fontFamily: 'var(--font-mono)',
    fontSize: '14px',
    lineHeight: 1.6,
    color: 'var(--fg)',
  },
})

export function BlogPostPage(handle: Handle<{ index: number }>) {
  return () => {
    let post = posts[handle.props.index]
    let newer = posts[handle.props.index - 1]
    let older = posts[handle.props.index + 1]

    return (
      <Document title={`${post.title} · ${profile.name}`} description={post.excerpt}>
        <SiteNav onHome={false} current="blog" socials={socials} />
        <main id="main">
          <article
            class="container"
            mix={css({ paddingTop: 'calc(var(--nav-h) + clamp(56px, 9vw, 120px))' })}
          >
            <header mix={css({ maxWidth: '1040px', marginInline: 'auto' })}>
              <a
                href="/#blog"
                class="eyebrow intro-fade"
                mix={css({
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  '& svg': { width: '14px', height: '14px', transition: 'translate 300ms var(--ease-emph)' },
                  '@media (hover: hover)': {
                    '&:hover': { color: 'var(--fg)' },
                    '&:hover svg': { translate: '-3px 0' },
                  },
                })}
              >
                <ArrowLeft />
                Back to journal
              </a>

              <p
                class="eyebrow intro-fade"
                style={{ '--d': '80' }}
                mix={css({
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px 14px',
                  marginTop: '48px',
                  '& .cat': { color: 'var(--accent-ink)' },
                })}
              >
                <span class="cat">{post.category}</span>
                <time datetime={post.date}>{formatPostDate(post.date)}</time>
                <span>{post.readingMinutes} min read</span>
              </p>

              <h1
                mix={css({
                  marginTop: '22px',
                  fontSize: 'clamp(2.5rem, 6.4vw, 6rem)',
                  lineHeight: 0.96,
                  letterSpacing: '-0.052em',
                })}
              >
                <span class="line-mask">
                  <span class="line" style={{ '--d': '120' }}>
                    {post.title}
                  </span>
                </span>
              </h1>

              <p
                class="intro-fade"
                style={{ '--d': '360' }}
                mix={css({
                  marginTop: '28px',
                  maxWidth: '58ch',
                  fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                  color: 'var(--fg-muted)',
                })}
              >
                {post.excerpt}
              </p>
            </header>

            <figure
              class="intro-fade"
              style={{ '--d': '460' }}
              mix={css({
                maxWidth: '1240px',
                marginInline: 'auto',
                marginTop: 'clamp(48px, 7vw, 96px)',
                padding: '10px',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid transparent',
                background: 'var(--bg-raised)',
                boxShadow: 'var(--shadow-border)',
                '& .cover': {
                  position: 'relative',
                  aspectRatio: '21 / 9',
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-lg)',
                  background: 'radial-gradient(120% 90% at 20% 0%, var(--glow), transparent 60%), var(--bg-sunken)',
                },
                '@media (max-width: 700px)': { '& .cover': { aspectRatio: '4 / 3' } },
              })}
            >
              <div class="cover">
                <PostCover slug={post.slug} category={post.category} />
              </div>
            </figure>

            <div mix={[prose, css({ marginTop: 'clamp(56px, 7vw, 96px)' })]}>
              <p
                mix={css({
                  padding: '16px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px dashed var(--line-strong)',
                  fontSize: '15px',
                  lineHeight: 1.55,
                })}
              >
                <strong>Placeholder article.</strong> This page shows how an entry will be laid out.
                Replace the title and metadata in <code>app/data/posts.ts</code> and write the body
                here.
              </p>
              <h2>[Section heading]</h2>
              <p>
                [Opening paragraph: the problem, why it mattered and what you set out to do. Keep it
                concrete and short.]
              </p>
              <ul>
                <li>[A constraint you were working under]</li>
                <li>[A decision you made, and the trade-off]</li>
                <li>[What you would do differently]</li>
              </ul>
              <blockquote>[A pull quote: the one line you want readers to remember.]</blockquote>
              <h2>[Implementation notes]</h2>
              <p>[Walk through the interesting part. Code blocks render like this:]</p>
              <pre>
                <code>{`// [Replace with a real snippet]\nexport function example() {\n  return 'hello'\n}`}</code>
              </pre>
              <p>[Closing thought, plus links to the project or repository.]</p>
            </div>

            <nav
              aria-label="More entries"
              mix={css({
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--col-gap)',
                maxWidth: '1040px',
                marginInline: 'auto',
                marginTop: 'clamp(80px, 10vw, 140px)',
                '& a': {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  minHeight: '100%',
                  padding: '24px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid transparent',
                  boxShadow: 'var(--shadow-border)',
                  transition: 'box-shadow 200ms var(--ease-out), background-color 200ms var(--ease-out)',
                },
                '& .dir': { display: 'inline-flex', alignItems: 'center', gap: '8px' },
                '& .dir svg': { width: '14px', height: '14px', transition: 'translate 300ms var(--ease-emph)' },
                '& .t': { fontSize: '1.25rem', lineHeight: 1.25, letterSpacing: '-0.02em', fontWeight: 500 },
                '& .next': { textAlign: 'right', alignItems: 'flex-end', gridColumn: 2 },
                '@media (max-width: 700px)': { gridTemplateColumns: '1fr', '& .next': { gridColumn: 'auto' } },
                '@media (hover: hover)': {
                  '& a:hover': { boxShadow: 'var(--shadow-border-hover)', background: 'var(--bg-raised)' },
                  '& .prev:hover svg': { translate: '-3px 0' },
                  '& .next:hover svg': { translate: '3px 0' },
                },
              })}
            >
              {newer ? (
                <a href={`/blog/${newer.slug}`} class="prev" data-cursor-label="Read entry">
                  <span class="eyebrow dir">
                    <ArrowLeft /> Newer
                  </span>
                  <span class="t">{newer.title}</span>
                </a>
              ) : null}
              {older ? (
                <a href={`/blog/${older.slug}`} class="next" data-cursor-label="Read entry">
                  <span class="eyebrow dir">
                    Older <ArrowRight />
                  </span>
                  <span class="t">{older.title}</span>
                </a>
              ) : null}
            </nav>
          </article>
        </main>
        <SiteFooter />
      </Document>
    )
  }
}

export function NotFoundPage() {
  return () => (
    <Document title={`Not found · ${profile.name}`}>
      <SiteNav onHome={false} socials={socials} />
      <main
        id="main"
        class="container"
        mix={css({
          minHeight: '80svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '28px',
          paddingTop: 'var(--nav-h)',
        })}
      >
        <p class="eyebrow">Error 404</p>
        <h1 mix={css({ fontSize: 'clamp(3rem, 10vw, 9rem)', lineHeight: 0.9, letterSpacing: '-0.055em' })}>
          Nothing <span class="serif accent-ink">here</span> yet.
        </h1>
        <p>
          <a href="/" class="btn btn-primary">
            Back home
            <span class="btn-icon" aria-hidden="true">
              <ArrowRight stroke={2} />
              <ArrowRight stroke={2} />
            </span>
          </a>
        </p>
      </main>
    </Document>
  )
}
