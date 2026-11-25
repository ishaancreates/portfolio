
import { formatPostDate, postCategories, posts } from '../data/posts.ts'
import { sectionSpacing } from './about.tsx'
import { JournalIndex, type JournalPost } from './public/journal-index.tsx'
import { CollapseBody } from './collapsible.tsx'
import { SectionHeading } from './section-heading.tsx'

export function toJournalPost(post: (typeof posts)[number]): JournalPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    dateISO: post.date,
    dateLabel: post.date ? formatPostDate(post.date) : undefined,
    readingMinutes: post.readingMinutes,
  }
}

export function Journal() {
  return () => (
    <section id="blog" aria-labelledby="blog-title" class="container" data-collapsible mix={sectionSpacing}>
      <SectionHeading
        id="blog-title"
        index="03"
        label="Journal"
        title={
          <>
            Words I <span class="serif">typed</span>.
          </>
        }
      />
      <CollapseBody>
        <div data-reveal>
          <JournalIndex posts={posts.map(toJournalPost)} categories={postCategories} />
        </div>
      </CollapseBody>
    </section>
  )
}
