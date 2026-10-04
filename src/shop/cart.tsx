import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { findProduct, type Product, type Colorway } from './catalog'

export type Line = { key: string; slug: string; colorway: string; size: string; qty: number }
export type ResolvedLine = Line & { product: Product; color: Colorway; total: number }

type Cart = {
  lines: ResolvedLine[]
  count: number
  subtotal: number
  open: boolean
  setOpen: (v: boolean) => void
  add: (slug: string, colorway: string, size: string, qty?: number) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
}

const KEY = 'yf-cart-v1'
const Ctx = createContext<Cart | null>(null)

function load(): Line[] {
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed = raw ? (JSON.parse(raw) as Line[]) : []
    return Array.isArray(parsed) ? parsed.filter((l) => findProduct(l.slug)) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<Line[]>(load)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(raw))
    } catch {
      /* armazenamento indisponível: o carrinho fica só em memória */
    }
  }, [raw])

  const add = useCallback((slug: string, colorway: string, size: string, qty = 1) => {
    const key = `${slug}|${colorway}|${size}`
    setRaw((ls) => {
      const found = ls.find((l) => l.key === key)
      if (found) return ls.map((l) => (l.key === key ? { ...l, qty: Math.min(l.qty + qty, 20) } : l))
      return [...ls, { key, slug, colorway, size, qty }]
    })
  }, [])

  const setQty = useCallback((key: string, qty: number) => {
    setRaw((ls) => (qty <= 0 ? ls.filter((l) => l.key !== key) : ls.map((l) => (l.key === key ? { ...l, qty: Math.min(qty, 20) } : l))))
  }, [])

  const remove = useCallback((key: string) => setRaw((ls) => ls.filter((l) => l.key !== key)), [])
  const clear = useCallback(() => setRaw([]), [])

  const value = useMemo<Cart>(() => {
    const lines = raw
      .map((l) => {
        const product = findProduct(l.slug)!
        const color = product.colorways.find((c) => c.id === l.colorway) ?? product.colorways[0]
        return { ...l, product, color, total: product.price * l.qty }
      })
      .filter(Boolean)
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.total, 0),
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
    }
  }, [raw, open, add, setQty, remove, clear])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart fora do CartProvider')
  return c
}
