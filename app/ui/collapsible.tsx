import type { Handle, RemixNode } from 'remix/component'

/**
 * Collapsible sections without any visible control.
 *
 * Put `data-collapsible` on the container that holds a heading and its
 * content. Wrap the heading text in <CollapseToggle> (a real <button> styled to
 * look like the heading, so keyboard and screen-reader users get
 * aria-expanded) and wrap the content in <CollapseBody>. Behavior lives in
 * ui/public/behaviors.ts; the open/close animation lives in site.css.
 */
export function CollapseToggle(handle: Handle<{ children?: RemixNode }>) {
  return () => (
    <button type="button" class="c-toggle" aria-expanded="true" data-collapse-toggle>
      {handle.props.children}
    </button>
  )
}

export function CollapseBody(handle: Handle<{ children?: RemixNode }>) {
  return () => (
    <div class="c-body">
      <div class="c-inner">{handle.props.children}</div>
    </div>
  )
}
