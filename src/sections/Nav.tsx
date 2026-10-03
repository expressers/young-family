import { useEffect, useState } from 'react'
import { scrollToId } from '../motion'
import { LINKS } from '../data'
import { ArrowUpRight } from './Icons'

const ITEMS = [
  { id: 'dons', label: 'Don & Don' },
  { id: 'elenco', label: 'A Família' },
  { id: 'filmes', label: 'Filmes' },
  { id: 'contratar', label: 'Contratar' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <header className="nav">
        <button className="nav-mark" onClick={() => go('topo')} aria-label="Young Family, voltar ao início">
          YF
        </button>
        <nav className="nav-links" aria-label="Secções">
          {ITEMS.map((it) => (
            <button key={it.id} onClick={() => go(it.id)}>
              {it.label}
            </button>
          ))}
        </nav>
        <a className="nav-cta" href={LINKS.appleAlbum} target="_blank" rel="noreferrer">
          Ouvir o álbum <ArrowUpRight />
        </a>
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
              <button tabIndex={open ? 0 : -1} onClick={() => go(it.id)}>
                {it.label}
              </button>
            </li>
          ))}
        </ul>
        <a className="menu-foot" tabIndex={open ? 0 : -1} href={LINKS.instagram} target="_blank" rel="noreferrer">
          @youngfamilyoficiall
        </a>
      </div>
    </>
  )
}
