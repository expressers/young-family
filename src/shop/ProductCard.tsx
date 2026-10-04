import { useState } from 'react'
import { Link } from '../router'
import HatArt from './HatArt'
import { formatKz, type Product, type Colorway } from './catalog'

export function ProductVisual({ product, color, className }: { product: Product; color: Colorway; className?: string }) {
  const photo = color.photos?.[0]
  if (photo) return <img className={className} src={photo} alt={`${product.name} — ${color.name}`} loading="lazy" />
  return (
    <HatArt
      className={className}
      style={product.style}
      base={color.base}
      accent={color.accent}
      mark={product.mark}
      title={`${product.name} — ${color.name}`}
    />
  )
}

export const STATUS_LABEL = {
  disponivel: 'Disponível',
  'pre-encomenda': 'Pré-encomenda',
  esgotado: 'Esgotado',
} as const

export default function ProductCard({ product }: { product: Product }) {
  const [ci, setCi] = useState(0)
  const color = product.colorways[ci]

  return (
    <article className="pcard">
      <Link to={`/loja/${product.slug}`} className="pcard-stage" aria-label={`${product.name}, ${formatKz(product.price)}`}>
        <ProductVisual product={product} color={color} className="pcard-art" />
        <span className={`pcard-status is-${product.status}`}>{STATUS_LABEL[product.status]}</span>
      </Link>
      <div className="pcard-info">
        <div>
          <h3 className="pcard-name">
            <Link to={`/loja/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="pcard-tag serif">{product.tagline}</p>
        </div>
        <p className="pcard-price">{formatKz(product.price)}</p>
      </div>
      {product.colorways.length > 1 && (
        <div className="swatches" role="radiogroup" aria-label="Cor">
          {product.colorways.map((c, i) => (
            <button
              key={c.id}
              role="radio"
              aria-checked={i === ci}
              aria-label={c.name}
              title={c.name}
              className={`swatch ${i === ci ? 'is-on' : ''}`}
              style={{ ['--sw' as string]: c.base, ['--sw2' as string]: c.accent }}
              onClick={() => setCi(i)}
            />
          ))}
        </div>
      )}
    </article>
  )
}
