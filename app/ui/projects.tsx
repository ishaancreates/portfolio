import { css, type Handle } from 'remix/component'

import { podiums, projects, type Project } from '../data/site.ts'
import { sectionSpacing } from './about.tsx'
import { EmptySlotCover, ExamGridCover } from './public/covers.tsx'
import { ArrowUpRight, GitHubMark } from './public/icons.tsx'
import { SectionHeading } from './section-heading.tsx'

export function Projects() {
  return () => {
    // Two staggered columns: features on the left, offset companions on the right.
    let left = projects.filter((_, i) => i % 2 === 0)
    let right = projects.filter((_, i) => i % 2 === 1)

    return (
      <section id="projects" aria-labelledby="projects-title" class="container" mix={sectionSpacing}>
        <SectionHeading
          id="projects-title"
          index="02"
          label="Selected work"
          title={
            <>
              Things I’ve <span class="serif">shipped</span>, and won with.
            </>
          }
          aside={
            <p>
              Hackathon winners, production platforms and the tools my campus runs on, picked
              from the past year of building.
            </p>
          }
        />

        <div
          mix={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            columnGap: 'var(--col-gap)',
            alignItems: 'start',
            '& .col': { display: 'flex', flexDirection: 'column', gap: 'clamp(72px, 9vw, 140px)' },
            '& .col-l': { gridColumn: '1 / span 7' },
            '& .col-r': { gridColumn: '8 / span 5', paddingTop: 'clamp(120px, 22vw, 340px)' },
            '@media (max-width: 860px)': {
              gridTemplateColumns: '1fr',
              rowGap: '72px',
              // Flatten the columns so cards follow their numbering
              '& .col': { display: 'contents' },
            },
          })}
        >
          <div class="col col-l">
            {left.map((p) => (
              <ProjectCard key={p.slug} project={p} shape="wide" />
            ))}
          </div>
          <div class="col col-r">
            {right.map((p) => (
              <ProjectCard key={p.slug} project={p} shape="tall" />
            ))}
          </div>
        </div>

        <Podiums />
      </section>
    )
  }
}

function ProjectCard(handle: Handle<{ project: Project; shape: 'wide' | 'tall' }>) {
  return () => {
    let { project, shape } = handle.props
    let href = project.live ?? project.repo
    let titleId = `project-${project.slug}`

    let media = (
      <div class="media">
        {project.image ? (
          <img
            src={`${project.image.base}-1440.webp`}
            srcset={`${project.image.base}-880.webp 880w, ${project.image.base}-1440.webp 1440w`}
            sizes={shape === 'wide' ? '(max-width: 860px) 92vw, 56vw' : '(max-width: 860px) 92vw, 40vw'}
            alt={project.image.alt}
            width="1440"
            height="900"
            loading="lazy"
            decoding="async"
          />
        ) : project.visual === 'grid' ? (
          <ExamGridCover />
        ) : (
          <EmptySlotCover />
        )}
        {project.image ? <span class="shade" aria-hidden="true" /> : null}
        {project.award ? <span class="award">{project.award}</span> : null}
      </div>
    )

    return (
      <article
        aria-labelledby={titleId}
        data-reveal
        style={{ order: String(Number(project.index)) }}
        mix={css({
          position: 'relative',
          '& .frame': {
            display: 'block',
            padding: '10px',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid transparent',
            background: 'var(--bg-raised)',
            boxShadow: 'var(--shadow-border)',
            transition: 'box-shadow 250ms var(--ease-out)',
          },
          '& .media': {
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 'var(--radius-lg)', // 30 - 10: concentric
            aspectRatio: project.placeholder ? '4 / 3' : shape === 'wide' ? '16 / 11' : '4 / 5',
            background:
              'radial-gradient(100% 80% at 80% 0%, var(--glow), transparent 60%), var(--bg-sunken)',
          },
          '& .media img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'left top',
            // better-ui: pure black/white outline, inset, on content images
            outline: '1px solid var(--image-outline)',
            outlineOffset: '-1px',
            borderRadius: 'inherit',
            transition: 'scale 1200ms var(--ease-emph)',
          },
          '& .media svg': { transition: 'scale 1200ms var(--ease-emph)' },
          '& .shade': {
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--shade), transparent 45%)',
            opacity: 0.5,
            transition: 'opacity 500ms var(--ease-out)',
          },
          '& .award': {
            position: 'absolute',
            left: '14px',
            bottom: '14px',
            right: '14px',
            width: 'fit-content',
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '30px',
            padding: '7px 12px',
            lineHeight: 1.3,
            borderRadius: 'var(--radius-pill)',
            background: 'var(--accent)',
            color: 'var(--on-accent)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontWeight: 500,
          },
          '& .head': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '16px',
            marginTop: '26px',
          },
          '& h3': {
            fontSize: shape === 'wide' ? 'clamp(2.2rem, 4.4vw, 4.4rem)' : 'clamp(2rem, 3.4vw, 3.4rem)',
            lineHeight: 0.98,
            letterSpacing: '-0.05em',
            fontWeight: 500,
            marginTop: '10px',
          },
          '& .desc': { marginTop: '16px', color: 'var(--fg-muted)', maxWidth: '52ch' },
          '& .stack': { display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '20px' },
          '& .links': {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 22px',
            marginTop: '22px',
            fontSize: '14.5px',
            fontWeight: 500,
          },
          '& .links a': { display: 'inline-flex', alignItems: 'center', gap: '7px' },
          '& .links svg': { width: '15px', height: '15px' },
          '& .links .ext': { transition: 'translate 300ms var(--ease-emph)' },
          '@media (hover: hover)': {
            '& .frame:hover': { boxShadow: 'var(--shadow-border-hover)' },
            '& .frame:hover img, & .frame:hover svg': { scale: '1.045' },
            '& .frame:hover .shade': { opacity: 1 },
            '& .links a:hover .ext': { translate: '2px -2px' },
          },
          '@media (prefers-reduced-motion: reduce)': {
            '& .media img, & .media svg': { transition: 'none' },
          },
        })}
      >
        {href ? (
          <a
            class="frame"
            href={href}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            aria-hidden="true"
            data-cursor-label={project.live ? 'View project' : 'View code'}
          >
            {media}
          </a>
        ) : (
          <div class="frame">{media}</div>
        )}

        <div class="head">
          <p class="eyebrow">
            <span class="accent-ink">{project.index}</span> — {project.tagline}
          </p>
        </div>
        <h3 id={titleId}>
          {project.placeholder ? <span class="ph">{project.title}</span> : project.title}
        </h3>
        <p class="desc">{project.description}</p>
        <ul class="stack" aria-label="Built with">
          {project.stack.map((s) =>
            s.startsWith('[') ? (
              <li key={s} class="chip" data-placeholder>
                {s}
              </li>
            ) : (
              <li key={s} class="chip">
                {s}
              </li>
            ),
          )}
        </ul>
        <div class="links">
          {project.live ? (
            <a href={project.live} target="_blank" rel="noreferrer" class="link-draw">
              Live site
              <span class="ext">
                <ArrowUpRight stroke={2} />
              </span>
              <span class="sr-only">: {project.title} (opens in a new tab)</span>
            </a>
          ) : (
            <span class="ph">[Live link]</span>
          )}
          {project.repo ? (
            <a href={project.repo} target="_blank" rel="noreferrer" class="link-draw">
              <GitHubMark />
              Source
              <span class="sr-only">: {project.title} on GitHub (opens in a new tab)</span>
            </a>
          ) : (
            <span class="ph">{project.placeholder ? '[Repository]' : '[Repository link]'}</span>
          )}
        </div>
      </article>
    )
  }
}

function Podiums() {
  return () => (
    <div mix={css({ marginTop: 'clamp(110px, 14vw, 200px)' })}>
      <div
        data-reveal
        mix={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '28px',
          '& h3': { fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', letterSpacing: '-0.035em', lineHeight: 1.05 },
          '& h3 .eyebrow': { color: 'var(--accent-ink)', marginRight: '14px', verticalAlign: 'middle' },
        })}
      >
        <h3>
          <span class="eyebrow">(C)</span>Podium finishes
        </h3>
        <p class="eyebrow">Place · Project · Event · Prize</p>
      </div>
      <ol
        mix={css({
          borderTop: '1px solid var(--line)',
          '& li': {
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            columnGap: 'var(--col-gap)',
            alignItems: 'baseline',
            paddingBlock: '22px',
            borderBottom: '1px solid var(--line)',
            transition: 'background-color 300ms var(--ease-out)',
          },
          '& .place': {
            gridColumn: '1 / span 2',
            fontSize: 'clamp(2rem, 3vw, 2.8rem)',
            lineHeight: 1,
            color: 'var(--accent-ink)',
          },
          '& .proj': { gridColumn: '3 / span 4', fontSize: '1.2rem', letterSpacing: '-0.02em', fontWeight: 500 },
          '& .event': { gridColumn: '7 / span 4', color: 'var(--fg-muted)' },
          '& .prize': { gridColumn: '11 / span 2', textAlign: 'right', fontVariantNumeric: 'tabular-nums' },
          '@media (max-width: 760px)': {
            '& .place': { gridColumn: '1 / span 3' },
            '& .proj': { gridColumn: '4 / -1' },
            '& .event': { gridColumn: '4 / span 6', fontSize: '14px', marginTop: '4px' },
            '& .prize': { gridColumn: '10 / -1', fontSize: '14px' },
          },
        })}
      >
        {podiums.map((p, i) => (
          <li key={p.project} data-reveal style={{ '--i': String(i) }}>
            <span class="place serif">{p.place}</span>
            <span class="proj">{p.project}</span>
            <span class="event">{p.event}</span>
            <span class="prize eyebrow">{p.prize}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
