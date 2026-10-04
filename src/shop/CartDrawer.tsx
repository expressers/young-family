import { useEffect, useRef } from 'react'
import { getLenis } from '../motion'
import { Link, navigate } from '../router'
import { useCart } from './cart'
import { formatKz } from './catalog'
import { ProductVisual } from './ProductCard'
import { Close, ArrowRight } from '../sections/Icons'

export default function CartDrawer() {
  const cart = useCart()
  const panel = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!cart.open) return
    const prev = document.activeElement as HTMLElement | null
    getLenis()?.stop()
    document.documentElement.classList.add('is-locked')
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cart.setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      getLenis()?.start()
      document.documentElement.classList.remove('is-locked')
      prev?.focus?.()
    }
  }, [cart.open]) // eslint-disable-line react-hooks/exhaustive-deps

  const close = () => cart.setOpen(false)

  return (
    <div className={`drawer ${cart.open ? 'is-open' : ''}`} aria-hidden={!cart.open}>
      <div className="drawer-scrim" onClick={close} />
      <div className="drawer-panel" ref={panel} role="dialog" aria-modal="true" aria-label="Saco de compras">
        <header className="drawer-head">
          <h2 className="display">
            O teu saco <span className="drawer-count">{cart.count}</span>
          </h2>
          <button ref={closeBtn} className="lb-close" onClick={close} aria-label="Fechar saco" tabIndex={cart.open ? 0 : -1}>
            <Close />
          </button>
        </header>

        {cart.lines.length === 0 ? (
          <div className="drawer-empty">
            <p className="serif">O saco está vazio.</p>
            <p>A família começa pela cabeça — vê os chapéus da primeira colecção.</p>
            <Link className="btn btn-ghost" to="/loja" onClick={close} tabIndex={cart.open ? 0 : -1}>
              Ver chapéus
              <span className="btn-orb">
                <ArrowRight />
              </span>
            </Link>
          </div>
        ) : (
          <>
            <ul className="drawer-lines">
              {cart.lines.map((l) => (
                <li key={l.key} className="dline">
                  <Link to={`/loja/${l.slug}`} className="dline-art" onClick={close} tabIndex={cart.open ? 0 : -1}>
                    <ProductVisual product={l.product} color={l.color} />
                  </Link>
                  <div className="dline-info">
                    <p className="dline-name">{l.product.name}</p>
                    <p className="dline-meta">
                      {l.color.name} · {l.size}
                    </p>
                    <div className="dline-row">
                      <div className="qty qty-sm">
                        <button onClick={() => cart.setQty(l.key, l.qty - 1)} aria-label="Menos um" tabIndex={cart.open ? 0 : -1}>
                          −
                        </button>
                        <span>{l.qty}</span>
                        <button onClick={() => cart.setQty(l.key, l.qty + 1)} aria-label="Mais um" tabIndex={cart.open ? 0 : -1}>
                          +
                        </button>
                      </div>
                      <span className="dline-price">{formatKz(l.total)}</span>
                    </div>
                    <button className="dline-remove" onClick={() => cart.remove(l.key)} tabIndex={cart.open ? 0 : -1}>
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="drawer-foot">
              <div className="drawer-sub">
                <span>Subtotal</span>
                <span>{formatKz(cart.subtotal)}</span>
              </div>
              <p className="drawer-note">Entrega e pagamento escolhem-se no passo seguinte.</p>
              <button
                className="btn btn-solid btn-block"
                tabIndex={cart.open ? 0 : -1}
                onClick={() => {
                  close()
                  navigate('/loja/checkout')
                }}
              >
                Finalizar encomenda
                <span className="btn-orb">
                  <ArrowRight />
                </span>
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  )
}
