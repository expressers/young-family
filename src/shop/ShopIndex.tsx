import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, EASE, reduced } from '../motion'
import { CATEGORIES, PRODUCTS, SHOP, type CategoryId } from './catalog'
import ProductCard from './ProductCard'

export default function ShopIndex() {
  const root = useRef<HTMLElement>(null)
  const [cat, setCat] = useState<CategoryId>('chapeus')
  const list = PRODUCTS.filter((p) => p.category === cat)

  useGSAP(
    () => {
      if (reduced()) return
      const q = gsap.utils.selector(root)
      gsap.from(q('.shop-title .cr-reveal'), { yPercent: 110, duration: 1.2, ease: EASE, stagger: 0.08 })
      gsap.from(q('.shop-intro > *:not(.shop-title)'), { y: 20, opacity: 0, duration: 1, ease: EASE, stagger: 0.06, delay: 0.25 })
      gsap.from(q('.pcard'), { y: 50, opacity: 0, duration: 1.1, ease: EASE, stagger: 0.07, delay: 0.35 })
    },
    { scope: root },
  )

  return (
    <main className="page shop" ref={root}>
      <section className="shop-head">
        <div className="shop-intro">
          <p className="shop-crumb serif">Loja oficial · Young Family</p>
          <h1 className="shop-title display">
            <span className="cr-mask"><span className="cr-reveal">Cabeças</span></span>
            <span className="cr-mask"><span className="cr-reveal red">da família.</span></span>
          </h1>
          <p className="lede">
            A primeira colecção é a que a família sempre usou: chapéus. Bonés, bucket, gorro e a balaclava do
            vídeo — todos com o apelido bordado. Encomendas por WhatsApp, pagamento por Multicaixa Express.
          </p>
          {SHOP.preview && (
            <p className="shop-preview">
              <i aria-hidden="true" /> Pré-lançamento: as imagens são desenhos técnicos dos modelos e os preços são
              provisórios.
            </p>
          )}
        </div>
        <figure className="shop-still">
          <img src="/media/colete.jpg" alt="Fotograma do vídeo Don&Don (Still Trappin): a família num cenário de betão." />
          <figcaption className="serif">Fotograma de “Don&amp;Don (Still Trappin)”</figcaption>
        </figure>
      </section>

      <nav className="shop-cats" aria-label="Categorias">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`shop-cat ${cat === c.id ? 'is-on' : ''}`}
            disabled={c.soon}
            aria-pressed={cat === c.id}
            onClick={() => setCat(c.id)}
          >
            {c.label}
            {c.soon ? <span className="soon">em breve</span> : <span className="count">{PRODUCTS.filter((p) => p.category === c.id).length}</span>}
          </button>
        ))}
      </nav>

      <section className="pgrid" aria-label="Produtos">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </section>

      <section className="shop-info" aria-label="Como funciona">
        <div>
          <h2 className="display">Como encomendar</h2>
        </div>
        <ol className="steps">
          <li>
            <span className="step-n serif">i.</span>
            <h3>Escolhe</h3>
            <p>Junta os chapéus ao saco, com a cor e o tamanho certos.</p>
          </li>
          <li>
            <span className="step-n serif">ii.</span>
            <h3>Envia o pedido</h3>
            <p>Preenches os dados de entrega e o pedido segue pronto para o WhatsApp da equipa.</p>
          </li>
          <li>
            <span className="step-n serif">iii.</span>
            <h3>Paga e recebe</h3>
            <p>Multicaixa Express, transferência ou pagamento na entrega em Luanda. Levantamento também possível.</p>
          </li>
        </ol>
      </section>
    </main>
  )
}
