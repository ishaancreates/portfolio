import type { Handle, RemixNode } from 'remix/component'
import { unsafeHTML } from 'remix/component'
import { ImportMap } from 'remix/component/server'

import { scriptEntry, stylesheetHref } from '../assets.ts'
import { profile, socials } from '../data/site.ts'
import { Cursor } from '../ui/public/cursor.tsx'

export interface DocumentProps {
  children?: RemixNode
  head?: RemixNode
  title?: string
  description?: string
}

/**
 * Runs before first paint: applies the persisted theme (dark by default) so
 * the wrong theme never flashes, and marks the page as JS-capable so scroll
 * reveals can hide content. If the reveal script never boots, a timer
 * un-hides everything.
 */
const bootScript = `(function(){var d=document.documentElement;var t='dark';try{var s=localStorage.getItem('theme');if(s==='light'||s==='dark')t=s}catch(e){}d.setAttribute('data-theme',t);d.classList.add('js');setTimeout(function(){if(!window.__revealReady)d.classList.add('reveal-fallback')},2500)})();`

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: 'Developer',
  email: `mailto:${profile.email}`,
  alumniOf: { '@type': 'CollegeOrUniversity', name: profile.college },
  address: { '@type': 'PostalAddress', addressLocality: 'Gorakhpur', addressCountry: 'IN' },
  sameAs: socials.filter((s) => s.href?.startsWith('http')).map((s) => s.href),
})

export function Document(handle: Handle<DocumentProps>) {
  return () => {
    let {
      children,
      head,
      title = `${profile.name} — Developer & Builder`,
      description = profile.description,
    } = handle.props
    let { href, importMap, preloads } = scriptEntry

    return (
      <html lang="en" data-theme="dark">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          {/* Declared first so generated component styles (rmx) slot between base and app. */}
          <style innerHTML={unsafeHTML('@layer reset, base, rmx, app;')} />
          <script innerHTML={unsafeHTML(bootScript)} />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="author" content={profile.name} />
          <meta name="color-scheme" content="dark light" />
          <meta name="theme-color" content="#0c0d0a" media="(prefers-color-scheme: dark)" />
          <meta name="theme-color" content="#f6f4ee" media="(prefers-color-scheme: light)" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content={profile.name} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Geist:wght@300..700&display=swap"
          />
          <link rel="stylesheet" href={stylesheetHref} />
          <script type="application/ld+json" innerHTML={unsafeHTML(jsonLd)} />
          {head}
          <ImportMap value={importMap} />
          {preloads.map((preloadHref) => (
            <link key={preloadHref} rel="modulepreload" href={preloadHref} />
          ))}
          <script type="module" src={href}></script>
        </head>
        <body>
          <a class="skip-link" href="#main">
            Skip to content
          </a>
          {children}
          <Cursor />
        </body>
      </html>
    )
  }
}
