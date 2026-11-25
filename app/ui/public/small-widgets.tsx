import { clientEntry, css, on, type Handle } from 'remix/component'

import { Check, Copy } from './icons.tsx'

/** Live clock in Ishaan's time zone. Server renders a fixed-width stand-in. */
export const LocalTime = clientEntry(
  import.meta.url,
  function LocalTime(handle: Handle<{ timeZone: string; label: string }>) {
    let text = '--:--'

    function tick() {
      text = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: handle.props.timeZone,
      }).format(new Date())
      handle.update()
    }

    handle.queueTask(() => {
      tick()
      let id = window.setInterval(tick, 15_000)
      handle.signal.addEventListener('abort', () => window.clearInterval(id))
    })

    return () => (
      <span mix={css({ fontVariantNumeric: 'tabular-nums' })}>
        <time>{text}</time> {handle.props.label}
      </span>
    )
  },
)

/** Copy-to-clipboard with a cross-faded icon swap and a polite live region. */
export const CopyEmail = clientEntry(
  import.meta.url,
  function CopyEmail(handle: Handle<{ email: string }>) {
    let copied = false
    let timer = 0

    return () => (
      <button
        type="button"
        data-copied={copied ? '' : undefined}
        mix={[
          on('click', async () => {
            try {
              await navigator.clipboard.writeText(handle.props.email)
            } catch {
              window.location.href = `mailto:${handle.props.email}`
              return
            }
            copied = true
            handle.update()
            window.clearTimeout(timer)
            timer = window.setTimeout(() => {
              copied = false
              handle.update()
            }, 1800)
          }),
          css({
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            height: '40px',
            paddingInline: '14px 16px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid transparent',
            boxShadow: 'var(--shadow-border)',
            fontSize: '14px',
            color: 'var(--fg-muted)',
            transition: 'box-shadow 160ms var(--ease-out), color 160ms var(--ease-out)',
            '& .icons': { display: 'grid', width: '16px', height: '16px' },
            '& .icons svg': {
              gridArea: '1 / 1',
              width: '16px',
              height: '16px',
              transition:
                'opacity 200ms var(--ease-out), scale 300ms var(--ease-emph), filter 200ms var(--ease-out)',
            },
            '& .check svg': { opacity: 0, scale: '0.5', filter: 'blur(3px)' },
            '&[data-copied] .copy svg': { opacity: 0, scale: '0.5', filter: 'blur(3px)' },
            '&[data-copied] .check svg': { opacity: 1, scale: '1', filter: 'none', color: 'var(--accent-ink)' },
            '& .icons > span': { display: 'contents' },
            '@media (hover: hover)': {
              '&:hover': { boxShadow: 'var(--shadow-border-hover)', color: 'var(--fg)' },
            },
            '&:active': { scale: '0.97' },
          }),
        ]}
      >
        <span class="icons" aria-hidden="true">
          <span class="copy">
            <Copy />
          </span>
          <span class="check">
            <Check />
          </span>
        </span>
        <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
      </button>
    )
  },
)
