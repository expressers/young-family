import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, EASE, reduced } from '../motion'
import { Link } from '../router'
import { PRODUCTS, findProduct, formatKz, SHOP } from './catalog'
import { useCart } from './cart'
import ProductCard, { ProductVisual, STATUS_LABEL } from './ProductCard'

export default function ProductPage({ slug }: { slug: string }) {
  const product = findProduct(slug)
  const cart = useCart()
  const root = useRef<HTMLElement>(null)
  const [ci, setCi] = useState(0)
  const [size, setSize] = useState(product?.sizes.length === 1 ? product.sizes[0] : '')
  const [qty, setQty] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setCi(0)
    setQty(1)
    setSize(product?.sizes.length === 1 ? product.sizes[0] : '')
    setSizeError(false)
    if (product) document.title = `${product.name} — Loja Young Family`
    return () => {
      document.title = 'Young Family — YF · Lil Boy, Lil Mac & a família'
    }
  }, [slug, product])

  useGSAP(
    () => {
      if (reduced()) return
      const q = gsap.utils.selector(root)
      gsap.from(q('.pp-stage'), { clipPath: 'inset(10% 10% 10% 10% round 8px)', duration: 1.3, ease: EASE })
      gsap.from(q('.pp-info > *'), { y: 24, opacity: 0, duration: 1, ease: EASE, stagger: 0.05, delay: 0.15 })
    },
    { scope: root, dependencies: [slug] },
  )

  if (!product) {
    return (
      <main className="page shop pp-missing">
        <h1 className="display">Este chapéu não está no catálogo.</h1>
        <Link className="btn btn-solid" to="/loja">
          Voltar à loja
        </Link>
      </main>
    )
  }

  const color = product.colorways[ci]
  const sold = product.status === 'esgotado'
  const related = PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3)

  const addToBag = () => {
    if (!size) {
      setSizeError(true)
      return
    }
    cart.add(product.slug, color.id, size, qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
    cart.setOpen(true)
  }

  return (
    <main className="page shop pp" ref={root} key={slug}>
      <nav className="pp-crumbs" aria-label="Caminho">
        <Link to="/loja">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>Chapéus</span>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="pp-grid">
        <div className="pp-media">
          <div className="pp-stage">
            <ProductVisual product={product} color={color} className="pp-art" />
            <span className="pp-colorname serif">{color.name}</span>
          </div>
          {product.lookbook && (
            <figure className="pp-look">
              <img src={product.lookbook.src} alt="" loading="lazy" />
              <figcaption className="serif">{product.lookbook.caption}</figcaption>
            </figure>
          )}
        </div>

        <div className="pp-info">
          <span className={`pcard-status is-${product.status} pp-status`}>{STATUS_LABEL[product.status]}</span>
          <h1 className="pp-name display">{product.name}</h1>
          <p className="pp-tag serif">{product.tagline}</p>
          <p className="pp-price">{formatKz(product.price)}</p>
          <p className="pp-desc">{product.description}</p>

          <fieldset className="pp-field">
            <legend>
              Cor <span>{color.name}</span>
            </legend>
            <div className="swatches swatches-lg">
              {product.colorways.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={i === ci}
                  aria-label={c.name}
                  title={c.name}
                  className={`swatch ${i === ci ? 'is-on' : ''}`}
                  style={{ ['--sw' as string]: c.base, ['--sw2' as string]: c.accent }}
                  onClick={() => setCi(i)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className={`pp-field ${sizeError ? 'has-error' : ''}`}>
            <legend>Tamanho</legend>
            <div className="sizes">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  className={`size ${size === s ? 'is-on' : ''}`}
                  onClick={() => {
                    setSize(s)
                    setSizeError(false)
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && <p className="field-error">Escolhe um tamanho para continuar.</p>}
          </fieldset>

          <div className="pp-buy">
            <div className="qty" aria-label="Quantidade">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Menos um">
                −
              </button>
              <span aria-live="polite">{qty}</span>
              <button type="button" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Mais um">
                +
              </button>
            </div>
            <button className="btn btn-solid pp-add" type="button" onClick={addToBag} disabled={sold}>
              {sold ? 'Esgotado' : added ? 'Adicionado ao saco' : `Adicionar ao saco · ${formatKz(product.price * qty)}`}
            </button>
          </div>
          {product.status === 'pre-encomenda' && (
            <p className="pp-note">
              Pré-encomenda: confirmamos a data de entrega pelo WhatsApp quando recebermos o teu pedido.
            </p>
          )}

          <details className="pp-acc" open>
            <summary>Detalhes</summary>
            <ul>
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </details>
          <details className="pp-acc">
            <summary>Entrega e pagamento</summary>
            <ul>
              {SHOP.delivery.map((d) => (
                <li key={d.id}>
                  {d.label} — {d.fee === null ? 'a combinar' : d.fee === 0 ? 'grátis' : formatKz(d.fee)}
                </li>
              ))}
              <li>Pagamento: {SHOP.payment.map((p) => p.label).join(', ')}.</li>
            </ul>
          </details>
        </div>
      </div>

      {related.length > 0 && (
        <section className="pp-related" aria-labelledby="rel-title">
          <h2 id="rel-title" className="display">
            Da mesma família
          </h2>
          <div className="pgrid pgrid-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
