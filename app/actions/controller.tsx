import { createController } from 'remix/router'

import { assets } from '../assets.ts'
import { posts } from '../data/posts.ts'
import { routes } from '../routes.ts'
import { BlogPostPage, NotFoundPage } from './blog-post-page.tsx'
import { GalleryPage } from './gallery-page.tsx'
import { HomePage } from './home-page.tsx'

export default createController(routes, {
  actions: {
    async assets(context) {
      return (await assets.fetch(context.request)) ?? new Response('Not Found', { status: 404 })
    },
    home(context) {
      return context.render(<HomePage />)
    },
    gallery(context) {
      return context.render(<GalleryPage />)
    },
    blogPost(context) {
      let index = posts.findIndex((p) => p.slug === context.params.slug)
      if (index === -1) {
        return context.render(<NotFoundPage />, { status: 404 })
      }
      return context.render(<BlogPostPage index={index} />)
    },
  },
})
