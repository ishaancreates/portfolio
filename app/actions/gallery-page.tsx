import { css, type Handle } from 'remix/component'

import { gallerySections, photos, type Photo } from '../data/gallery.ts'
import { profile, socials } from '../data/site.ts'
import { SiteNav } from '../ui/public/site-nav.tsx'
import { CollapseBody, CollapseToggle } from '../ui/collapsible.tsx'
import { SiteFooter } from '../ui/site-footer.tsx'
import { Document } from './document.tsx'

export function GalleryPage() {
  return () => (
    <Document title={`Gallery · ${profile.name}`} description={`Photos by and of ${profile.name}: portraits, travel and street.`}>
      <SiteNav onHome={false} current="gallery" socials={socials} />
      <main id="main">
        <div
          id="top"
          class="container"
          mix={css({ paddingTop: 'calc(var(--nav-h) + clamp(72px, 12vw, 160px))' })}
        >
          <h1
            mix={css({
              fontSize: 'clamp(3.2rem, 10vw, 10rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.058em',
              fontWeight: 500,
            })}
          >
            <span class="line-mask">
              <span class="line" style={{ '--d': '100' }}>
                Gallery<span class="serif">.</span>
              </span>
            </span>
          </h1>

          <nav
            aria-label="Gallery sections"
            class="intro-fade"
            style={{ '--d': '400' }}
            mix={css({ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'clamp(32px, 5vw, 56px)' })}
          >
            {gallerySections.map((section) => (
              <a
                key={section.id}
                href={`#${section.slug}`}
                class="chip"
                mix={css({
                  height: '38px',
                  paddingInline: '16px',
                  fontSize: '14px',
                  '@media (hover: hover)': {
                    '&:hover': { color: 'var(--fg)', boxShadow: 'var(--shadow-border-hover)' },
                  },
                })}
              >
                {section.id}
              </a>
            ))}
          </nav>

          {gallerySections.map((section) => {
            let items = photos.filter((p) => p.section === section.id)
            return (
              <section
                key={section.id}
                id={section.slug}
                aria-labelledby={`${section.slug}-title`}
                data-collapsible
                mix={css({ marginTop: 'clamp(96px, 13vw, 190px)' })}
              >
                <header
                  data-reveal
                  mix={css({
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '16px',
                    paddingTop: '20px',
                    marginBottom: 'clamp(32px, 4vw, 56px)',
                    borderTop: '1px solid var(--line)',
                    '& h2': { fontSize: 'clamp(2.2rem, 5vw, 4.6rem)', lineHeight: 1, letterSpacing: '-0.05em' },
                    '& .eyebrow .i': { color: 'var(--accent-ink)' },
                  })}
                >
                  <h2 id={`${section.slug}-title`}>
                    <CollapseToggle>{section.id}</CollapseToggle>
                  </h2>
                  <p class="eyebrow">
                    <span class="i">({section.index})</span> {String(items.length).padStart(2, '0')} photos
                  </p>
                </header>
                <CollapseBody>
                <ul
                  mix={css({
                    columnCount: 3,
                    columnGap: 'var(--col-gap)',
                    '@media (max-width: 900px)': { columnCount: 2 },
                  })}
                >
                  {items.map((photo, i) => (
                    <PhotoCard key={photo.file} photo={photo} index={i} />
                  ))}
                </ul>
                </CollapseBody>
              </section>
            )
          })}
        </div>
      </main>
      <SiteFooter />
    </Document>
  )
}

function PhotoCard(handle: Handle<{ photo: Photo; index: number }>) {
  return () => {
    let { photo, index } = handle.props
    return (
      <li
        data-reveal
        style={{ '--i': String(index % 3) }}
        mix={css({ breakInside: 'avoid', marginBottom: 'var(--col-gap)' })}
      >
        <a
          href={`/images/gallery/${photo.file}-1600.webp`}
          target="_blank"
          rel="noreferrer"
          data-cursor-label="View"
          mix={css({
            display: 'block',
            overflow: 'hidden',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-sunken)',
            '& img': {
              width: '100%',
              height: 'auto',
              // better-ui: pure black/white inset outline on content images
              outline: '1px solid var(--image-outline)',
              outlineOffset: '-1px',
              borderRadius: 'inherit',
              transition: 'scale 1100ms var(--ease-emph)',
            },
            '@media (hover: hover)': { '&:hover img': { scale: '1.04' } },
            '@media (prefers-reduced-motion: reduce)': { '& img': { transition: 'none' } },
          })}
        >
          <img
            src={`/images/gallery/${photo.file}-800.webp`}
            srcset={`/images/gallery/${photo.file}-800.webp 800w, /images/gallery/${photo.file}-1600.webp 1600w`}
            sizes="(max-width: 900px) 46vw, 31vw"
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            decoding="async"
          />
          <span class="sr-only"> (opens full size in a new tab)</span>
        </a>
      </li>
    )
  }
}
