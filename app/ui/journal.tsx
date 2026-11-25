import { css } from 'remix/component'

import { formatPostDate, postCategories, posts } from '../data/posts.ts'
import { sectionSpacing } from './about.tsx'
import { JournalIndex, type JournalPost } from './public/journal-index.tsx'
import { SectionHeading } from './section-heading.tsx'

export function toJournalPost(post: (typeof posts)[number]): JournalPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    dateISO: post.date,
    dateLabel: formatPostDate(post.date),
    readingMinutes: post.readingMinutes,
    featured: post.featured,
  }
}

export function Journal() {
  return () => (
    <section id="blog" aria-labelledby="blog-title" class="container" mix={sectionSpacing}>
      <SectionHeading
        id="blog-title"
        index="03"
        label="Journal"
        title={
          <>
            Notes from the <span class="serif">workbench</span>.
          </>
        }
        aside={
          <p>
            Short write-ups on what I build and what breaks along the way.{' '}
            <span
              mix={css({
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '12px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                border: '1px dashed var(--line-strong)',
                fontSize: '13px',
                color: 'var(--fg-subtle)',
              })}
            >
              Sample entries: replace with real posts
            </span>
          </p>
        }
      />
      <div data-reveal>
        <JournalIndex posts={posts.map(toJournalPost)} categories={postCategories} />
      </div>
    </section>
  )
}
