import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, EASE, reduced } from '../motion'
import { Link } from '../router'
import { PRODUCTS, formatKz } from '../shop/catalog'
import { ProductVisual } from '../shop/ProductCard'
import { ArrowRight } from './Icons'

const FEATURED = ['bone-don-and-don', 'snapback-still-trappin', 'bucket-luanda']

export default function LojaTeaser() {
  const root = useRef<HTMLElement>(null)
  const items = FEATURED.map((s) => PRODUCTS.find((p) => p.slug === s)!).filter(Boolean)

  useGSAP(
    () => {
      if (reduced()) return
      const q = gsap.utils.selector(root)
      gsap.from(q('.lt-title .cr-reveal'), {
        yPercent: 110,
        duration: 1.2,
        ease: EASE,
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
      gsap.from(q('.lt-item'), {
        y: 80,
        opacity: 0,
        rotate: (i) => [-3, 2, -1.5][i] ?? 0,
        duration: 1.3,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: q('.lt-items')[0], start: 'top 85%' },
      })
    },
    { scope: root },
  )

  return (
    <section id="loja" className="loja-teaser" ref={root} aria-labelledby="lt-title">
      <div className="lt-head">
        <h2 id="lt-title" className="lt-title display">
          <span className="cr-mask"><span className="cr-reveal">A loja</span></span>
          <span className="cr-mask"><span className="cr-reveal red">abriu pela cabeça.</span></span>
        </h2>
        <div className="lt-side">
          <p className="lede">
            A família sempre vendeu chapéus — agora há uma loja só para eles. Primeira colecção: bonés, bucket, gorro e a
            balaclava de “Still Trappin”. Encomendas por WhatsApp, pagamento por Multicaixa Express.
          </p>
          <Link className="btn btn-solid" to="/loja">
            Entrar na loja
            <span className="btn-orb">
              <ArrowRight />
            </span>
          </Link>
        </div>
      </div>
      <div className="lt-items">
        {items.map((p) => (
          <Link key={p.slug} to={`/loja/${p.slug}`} className="lt-item">
            <span className="lt-stage">
              <ProductVisual product={p} color={p.colorways[0]} className="lt-art" />
            </span>
            <span className="lt-meta">
              <span className="lt-name">{p.name}</span>
              <span className="lt-price">{formatKz(p.price)}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
