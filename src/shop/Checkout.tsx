import { useMemo, useState, type FormEvent } from 'react'
import { Link } from '../router'
import { useCart } from './cart'
import { SHOP, formatKz } from './catalog'
import { ProductVisual } from './ProductCard'
import { ArrowUpRight } from '../sections/Icons'

type Form = {
  name: string
  phone: string
  email: string
  delivery: string
  area: string
  address: string
  payment: string
  notes: string
}

const EMPTY: Form = { name: '', phone: '', email: '', delivery: 'luanda', area: '', address: '', payment: 'mcx', notes: '' }

const orderId = () => {
  const d = new Date()
  const stamp = `${String(d.getDate()).padStart(2, '0')}${String(d.getMonth() + 1).padStart(2, '0')}`
  return `YF-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

export default function Checkout() {
  const cart = useCart()
  const [f, setF] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})
  const [sent, setSent] = useState<{ id: string; url: string; total: string } | null>(null)

  const delivery = SHOP.delivery.find((d) => d.id === f.delivery)!
  const needsAddress = f.delivery !== 'levantamento'
  const fee = delivery.fee ?? 0
  const total = cart.subtotal + fee

  const payments = useMemo(
    () => SHOP.payment.filter((p) => !(p.id === 'entrega' && f.delivery !== 'luanda')),
    [f.delivery],
  )

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setF((prev) => {
      const next = { ...prev, [k]: v }
      if (k === 'delivery' && v !== 'luanda' && next.payment === 'entrega') next.payment = 'mcx'
      return next
    })
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const validate = () => {
    const e: typeof errors = {}
    if (f.name.trim().length < 3) e.name = 'Escreve o teu nome completo.'
    const digits = f.phone.replace(/\D/g, '')
    if (digits.length < 9) e.phone = 'Indica um número de telefone com pelo menos 9 dígitos.'
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Este email não parece válido.'
    if (needsAddress && f.area.trim().length < 2) e.area = f.delivery === 'luanda' ? 'Indica o município ou bairro.' : 'Indica a província e o município.'
    if (needsAddress && f.address.trim().length < 5) e.address = 'Indica a morada ou um ponto de referência.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    if (!cart.lines.length || !validate()) {
      const first = document.querySelector('.co-form [aria-invalid="true"]') as HTMLElement | null
      first?.focus()
      return
    }
    const id = orderId()
    const pay = SHOP.payment.find((p) => p.id === f.payment)!
    const lines = cart.lines.map((l) => `• ${l.qty}× ${l.product.name} — ${l.color.name} — ${l.size} — ${formatKz(l.total)}`)
    const msg = [
      `Olá Young Family! Quero fazer uma encomenda na loja do site.`,
      ``,
      `*Pedido ${id}*`,
      ...lines,
      ``,
      `Subtotal: ${formatKz(cart.subtotal)}`,
      `Entrega: ${delivery.label}${delivery.fee === null ? ' (custo a combinar)' : delivery.fee === 0 ? ' (grátis)' : ` (${formatKz(delivery.fee)})`}`,
      `*Total: ${formatKz(total)}${delivery.fee === null ? ' + envio' : ''}*`,
      `Pagamento: ${pay.label}`,
      ``,
      ...[
        `Nome: ${f.name.trim()}`,
        `Telefone: ${f.phone.trim()}`,
        f.email ? `Email: ${f.email.trim()}` : '',
        needsAddress ? `Zona: ${f.area.trim()}` : '',
        needsAddress ? `Morada: ${f.address.trim()}` : '',
        f.notes ? `Notas: ${f.notes.trim()}` : '',
      ].filter(Boolean),
    ]
      .join('\n')
    const url = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank', 'noopener')
    setSent({ id, url, total: `${formatKz(total)}${delivery.fee === null ? ' + envio' : ''}` })
    cart.clear()
    window.scrollTo(0, 0)
  }

  if (sent) {
    return (
      <main className="page shop co co-done">
        <p className="shop-crumb serif">Pedido {sent.id}</p>
        <h1 className="display co-done-title">
          Pedido pronto.
          <br />
          <span className="red">Agora é no WhatsApp.</span>
        </h1>
        <p className="lede">
          Abrimos o WhatsApp com o teu pedido já escrito. Carrega em enviar e a equipa responde com a confirmação, o
          prazo e os dados de pagamento. Total: <strong>{sent.total}</strong>.
        </p>
        <div className="co-done-actions">
          <a className="btn btn-solid" href={sent.url} target="_blank" rel="noreferrer">
            Abrir o WhatsApp de novo
            <span className="btn-orb">
              <ArrowUpRight />
            </span>
          </a>
          <Link className="btn btn-ghost" to="/loja">
            Voltar à loja
            <span className="btn-orb">
              <ArrowUpRight />
            </span>
          </Link>
        </div>
      </main>
    )
  }

  if (!cart.lines.length) {
    return (
      <main className="page shop co co-done">
        <h1 className="display co-done-title">O saco está vazio.</h1>
        <p className="lede">Junta um chapéu ao saco para fazer a encomenda.</p>
        <div className="co-done-actions">
          <Link className="btn btn-solid" to="/loja">
            Ver chapéus
            <span className="btn-orb">
              <ArrowUpRight />
            </span>
          </Link>
        </div>
      </main>
    )
  }

  const field = (k: keyof Form, label: string, props: Record<string, unknown> = {}, hint?: string) => (
    <label className={`fld ${errors[k] ? 'has-error' : ''}`}>
      <span className="fld-label">{label}</span>
      <input
        value={f[k]}
        onChange={(e) => set(k, e.target.value)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `${k}-err` : undefined}
        {...props}
      />
      {hint && !errors[k] && <span className="fld-hint">{hint}</span>}
      {errors[k] && (
        <span className="field-error" id={`${k}-err`}>
          {errors[k]}
        </span>
      )}
    </label>
  )

  return (
    <main className="page shop co">
      <nav className="pp-crumbs" aria-label="Caminho">
        <Link to="/loja">Loja</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Finalizar encomenda</span>
      </nav>
      <h1 className="display co-title">Finalizar encomenda</h1>

      <div className="co-grid">
        <form className="co-form" onSubmit={submit} noValidate>
          <section className="co-sec">
            <h2 className="co-h">Os teus dados</h2>
            {field('name', 'Nome completo', { autoComplete: 'name', required: true })}
            {field('phone', 'Telefone / WhatsApp', { autoComplete: 'tel', inputMode: 'tel', placeholder: '+244 9XX XXX XXX', required: true })}
            {field('email', 'Email (opcional)', { autoComplete: 'email', inputMode: 'email', type: 'email' })}
          </section>

          <section className="co-sec">
            <h2 className="co-h">Entrega</h2>
            <div className="opts" role="radiogroup" aria-label="Entrega">
              {SHOP.delivery.map((d) => (
                <label key={d.id} className={`opt ${f.delivery === d.id ? 'is-on' : ''}`}>
                  <input type="radio" name="delivery" checked={f.delivery === d.id} onChange={() => set('delivery', d.id)} />
                  <span className="opt-main">
                    <span className="opt-label">{d.label}</span>
                    <span className="opt-note">{d.note}</span>
                  </span>
                  <span className="opt-price">{d.fee === null ? 'A combinar' : d.fee === 0 ? 'Grátis' : formatKz(d.fee)}</span>
                </label>
              ))}
            </div>
            {needsAddress && (
              <>
                {field('area', f.delivery === 'luanda' ? 'Município / bairro' : 'Província e município', {
                  autoComplete: 'address-level2',
                  placeholder: f.delivery === 'luanda' ? 'Ex.: Talatona, Kilamba, Maianga…' : 'Ex.: Benguela, Lobito',
                })}
                {field('address', 'Morada ou ponto de referência', { autoComplete: 'street-address' })}
              </>
            )}
          </section>

          <section className="co-sec">
            <h2 className="co-h">Pagamento</h2>
            <div className="opts" role="radiogroup" aria-label="Pagamento">
              {payments.map((p) => (
                <label key={p.id} className={`opt ${f.payment === p.id ? 'is-on' : ''}`}>
                  <input type="radio" name="payment" checked={f.payment === p.id} onChange={() => set('payment', p.id)} />
                  <span className="opt-main">
                    <span className="opt-label">{p.label}</span>
                    <span className="opt-note">{p.note}</span>
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section className="co-sec">
            <label className="fld">
              <span className="fld-label">Notas (opcional)</span>
              <textarea rows={3} value={f.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Horário preferido, prenda, etc." />
            </label>
          </section>

          <button className="btn btn-solid btn-xl btn-block" type="submit">
            Enviar pedido pelo WhatsApp
            <span className="btn-orb">
              <ArrowUpRight />
            </span>
          </button>
          <p className="co-legal">
            Ao enviar, abrimos o WhatsApp com o pedido escrito para confirmares. Os teus dados só seguem nessa mensagem —
            o site não os guarda.
          </p>
        </form>

        <aside className="co-summary" aria-label="Resumo do pedido">
          <h2 className="co-h">Resumo</h2>
          <ul className="co-lines">
            {cart.lines.map((l) => (
              <li key={l.key}>
                <span className="co-art">
                  <ProductVisual product={l.product} color={l.color} />
                  <span className="co-qty">{l.qty}</span>
                </span>
                <span className="co-line-info">
                  <span className="dline-name">{l.product.name}</span>
                  <span className="dline-meta">
                    {l.color.name} · {l.size}
                  </span>
                </span>
                <span className="dline-price">{formatKz(l.total)}</span>
              </li>
            ))}
          </ul>
          <dl className="co-totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{formatKz(cart.subtotal)}</dd>
            </div>
            <div>
              <dt>Entrega</dt>
              <dd>{delivery.fee === null ? 'A combinar' : delivery.fee === 0 ? 'Grátis' : formatKz(delivery.fee)}</dd>
            </div>
            <div className="co-total">
              <dt>Total</dt>
              <dd>
                {formatKz(total)}
                {delivery.fee === null && <small> + envio</small>}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </main>
  )
}
