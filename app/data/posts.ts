/**
 * Journal entries.
 *
 * placeholder: every post below is a SAMPLE. The titles are topic suggestions
 * drawn from real work, but the dates, reading times and bodies are stand-ins.
 * Replace them with real writing (or delete them) before publishing.
 */

export type PostCategory = 'Engineering' | 'Building' | 'Notes'

export interface Post {
  slug: string
  title: string
  excerpt: string
  category: PostCategory
  /** ISO date */
  date: string
  readingMinutes: number
  featured?: boolean
  sample: true
}

export const postCategories: PostCategory[] = ['Engineering', 'Building', 'Notes']

export const posts: Post[] = [
  {
    slug: 'hybrid-react-native-webview',
    title: 'Native where it matters, web where it ships: notes on a hybrid app',
    excerpt:
      'Sample post. A write-up on combining React Native screens with WebView-embedded pages, covering where the seams show and how to hide them.',
    category: 'Engineering',
    date: '2026-11-10',
    readingMinutes: 8,
    featured: true,
    sample: true,
  },
  {
    slug: 'from-hackathon-to-startup',
    title: 'From hackathon prototype to company',
    excerpt:
      'Sample post. What changes when a hackathon prototype like CuraLynx has to survive real users.',
    category: 'Building',
    date: '2026-10-22',
    readingMinutes: 6,
    sample: true,
  },
  {
    slug: 'running-an-exam-for-140-students',
    title: 'Running a live exam for 140+ students on software we wrote',
    excerpt: 'Sample post. Lessons from building and operating OpenEval for Project INIT.',
    category: 'Engineering',
    date: '2026-09-14',
    readingMinutes: 7,
    sample: true,
  },
  {
    slug: 'electrical-engineer-writing-software',
    title: 'What electrical engineering taught me about writing software',
    excerpt: 'Sample post. Feedback loops, tolerances and why systems thinking transfers.',
    category: 'Notes',
    date: '2026-08-30',
    readingMinutes: 4,
    sample: true,
  },
  {
    slug: 'designing-from-scratch',
    title: 'Designing a visual identity from a blank Figma file',
    excerpt: 'Sample post. Notes from shaping the AI Margdarshak platform, from type to tokens to code.',
    category: 'Building',
    date: '2026-07-18',
    readingMinutes: 5,
    sample: true,
  },
]

export function formatPostDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
