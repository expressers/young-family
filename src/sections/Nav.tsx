import { useEffect, useState } from 'react'
import { scrollToId } from '../motion'
import { navigate } from '../router'
import { useCart } from '../shop/cart'

type Item = { id: string; label: string; route?: string }

const ITEMS: Item[] = [
  { id: 'dons', label: 'Don & Don' },
  { id: 'elenco', label: 'A Família' },
  { id: 'filmes', label: 'Filmes' },
  { id: 'loja', label: 'Loja', route: '/loja' },
  { id: 'contratar', label: 'Contratar' },
]

const BagIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 8h14l-1.2 12H6.2z" />
    <path d="M9 10V7a3 3 0 0 1 6 0v3" />
  </svg>
)

export default function Nav({ path }: { path: string }) {
  const [open, setOpen] = useState(false)
  const cart = useCart()
  const inShop = path.startsWith('/loja')

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (it: Item | { id: string; route?: string }) => {
    setOpen(false)
    if (it.route) {
      navigate(it.route)
      return
    }
    if (path !== '/') {
      navigate(`/#${it.id}`)
      return
    }
    scrollToId(it.id)
  }

  return (
    <>
      <header className={`nav ${inShop ? 'nav-shop' : ''}`}>
        <button className="nav-mark" onClick={() => go({ id: 'topo' })} aria-label="Young Family, voltar ao início">
          YF
        </button>
        <nav className="nav-links" aria-label="Secções">
          {ITEMS.map((it) => (
            <button
              key={it.id}
              onClick={() => go(it)}
              className={it.route && inShop ? 'is-on' : ''}
              aria-current={it.route && inShop ? 'page' : undefined}
            >
              {it.label}
            </button>
          ))}
        </nav>
        <button className="nav-bag" onClick={() => cart.setOpen(true)} aria-label={`Abrir saco, ${cart.count} artigos`}>
          <BagIcon />
          <span className="nav-bag-label">Saco</span>
          <span className={`nav-bag-count ${cart.count ? 'has' : ''}`}>{cart.count}</span>
        </button>
        <button
          className={`nav-burger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          <span />
          <span />
        </button>
      </header>
      <div id="menu" className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <ul>
          {ITEMS.map((it, i) => (
            <li key={it.id} style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}>
              <button tabIndex={open ? 0 : -1} onClick={() => go(it)}>
                {it.label}
              </button>
            </li>
          ))}
        </ul>
        <a className="menu-foot" tabIndex={open ? 0 : -1} href="https://www.instagram.com/youngfamilyoficiall/" target="_blank" rel="noreferrer">
          @youngfamilyoficiall
        </a>
      </div>
    </>
  )
}
