import { css } from 'remix/component'

import { socials } from '../data/site.ts'
import { About } from '../ui/about.tsx'
import { Hero, PodiumTicker } from '../ui/hero.tsx'
import { Journal } from '../ui/journal.tsx'
import { Projects } from '../ui/projects.tsx'
import { SiteNav } from '../ui/public/site-nav.tsx'
import { SiteFooter } from '../ui/site-footer.tsx'
import { Document } from './document.tsx'

export function HomePage() {
  return () => (
    <Document>
      <SiteNav onHome socials={socials} />
      <main id="main" mix={css({ position: 'relative' })}>
        <Hero />
        <PodiumTicker />
        <About />
        <Projects />
        <Journal />
      </main>
      <SiteFooter />
    </Document>
  )
}
