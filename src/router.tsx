import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from 'react'

const EVT = 'yf:navigate'

export function navigate(to: string, opts: { replace?: boolean } = {}) {
  if (to === window.location.pathname + window.location.hash) return
  if (opts.replace) window.history.replaceState(null, '', to)
  else window.history.pushState(null, '', to)
  window.dispatchEvent(new Event(EVT))
}

export function usePath() {
  const [path, setPath] = useState(() => window.location.pathname)
  useEffect(() => {
    const on = () => setPath(window.location.pathname)
    window.addEventListener('popstate', on)
    window.addEventListener(EVT, on)
    return () => {
      window.removeEventListener('popstate', on)
      window.removeEventListener(EVT, on)
    }
  }, [])
  return path
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }

export function Link({ to, onClick, ...rest }: LinkProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(to)
  }
  return <a href={to} onClick={handle} {...rest} />
}
