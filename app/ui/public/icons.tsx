import type { Handle, RemixNode } from 'remix/component'

/**
 * One icon set for the whole site. Stroke icons draw with currentColor and a
 * non-scaling stroke, so `stroke` is the rendered pixel width:
 * 1.5 beside regular text, 2 beside medium (500) labels (better-ui icons.md).
 */
interface IconProps {
  stroke?: number
  size?: number
}

function strokeIcon(paths: RemixNode, viewBox = '0 0 24 24') {
  return function Icon(handle: Handle<IconProps>) {
    return () => {
      let { stroke = 1.5, size } = handle.props
      return (
        <svg
          viewBox={viewBox}
          width={size}
          height={size}
          fill="none"
          stroke="currentColor"
          stroke-width={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          {paths}
        </svg>
      )
    }
  }
}

const ns = 'non-scaling-stroke'

export const ArrowUpRight = strokeIcon(
  <>
    <path vector-effect={ns} d="M7 17 17 7" />
    <path vector-effect={ns} d="M8 7h9v9" />
  </>,
)

export const ArrowRight = strokeIcon(
  <>
    <path vector-effect={ns} d="M4 12h16" />
    <path vector-effect={ns} d="m14 6 6 6-6 6" />
  </>,
)

export const ArrowLeft = strokeIcon(
  <>
    <path vector-effect={ns} d="M20 12H4" />
    <path vector-effect={ns} d="m10 6-6 6 6 6" />
  </>,
)

export const ArrowUp = strokeIcon(
  <>
    <path vector-effect={ns} d="M12 20V4" />
    <path vector-effect={ns} d="m6 10 6-6 6 6" />
  </>,
)

export const ArrowDown = strokeIcon(
  <>
    <path vector-effect={ns} d="M12 4v16" />
    <path vector-effect={ns} d="m6 14 6 6 6-6" />
  </>,
)

export const Sun = strokeIcon(
  <>
    <circle vector-effect={ns} cx="12" cy="12" r="4" />
    <path
      vector-effect={ns}
      d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"
    />
  </>,
)

export const Moon = strokeIcon(
  <path vector-effect={ns} d="M20.5 14.1A8.5 8.5 0 1 1 9.9 3.5a6.6 6.6 0 0 0 10.6 10.6Z" />,
)

export const Copy = strokeIcon(
  <>
    <rect vector-effect={ns} x="8.5" y="8.5" width="12" height="12" rx="2.5" />
    <path vector-effect={ns} d="M15.5 8.5V6A2.5 2.5 0 0 0 13 3.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5" />
  </>,
)

export const Check = strokeIcon(<path vector-effect={ns} d="m4.5 12.5 5 5 10-11" />)

export const Mail = strokeIcon(
  <>
    <rect vector-effect={ns} x="3" y="5" width="18" height="14" rx="3" />
    <path vector-effect={ns} d="m4 7 8 6 8-6" />
  </>,
)

/* Brand marks are filled glyphs; they take color from currentColor too. */

export function GitHubMark(handle: Handle<IconProps>) {
  return () => (
    <svg
      viewBox="0 0 24 24"
      width={handle.props.size}
      height={handle.props.size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

export function LinkedInMark(handle: Handle<IconProps>) {
  return () => (
    <svg
      viewBox="0 0 24 24"
      width={handle.props.size}
      height={handle.props.size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

export const InstagramMark = strokeIcon(
  <>
    <rect vector-effect={ns} x="3" y="3" width="18" height="18" rx="5" />
    <circle vector-effect={ns} cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
  </>,
)
