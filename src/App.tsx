import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, startSmoothScroll, reduced, EASE, getLenis, scrollToId } from './motion'
import { usePath } from './router'
import Nav from './sections/Nav'
import Hero from './sections/Hero'
import Manifesto from './sections/Manifesto'
import Dons from './sections/Dons'
import Tracklist from './sections/Tracklist'
import Elenco from './sections/Elenco'
import Filmes from './sections/Filmes'
import LojaTeaser from './sections/LojaTeaser'
import Contratar from './sections/Contratar'
import Lightbox from './sections/Lightbox'
import { CartProvider } from './shop/cart'
import CartDrawer from './shop/CartDrawer'
import ShopIndex from './shop/ShopIndex'
import ProductPage from './shop/ProductPage'
import Checkout from './shop/Checkout'
import ShopFooter from './shop/ShopFooter'
import type { Film } from './data'

// The cinematic intro only plays when the visit starts on the home page.
const LANDED_HOME = window.location.pathname === '/'

function Home({ ready, onPlay }: { ready: boolean; onPlay: (f: Film) => void }) {
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    const jump = () => {
      ScrollTrigger.refresh()
      scrollToId(id, true)
    }
    const t1 = window.setTimeout(jump, 300)
    const t2 = window.setTimeout(jump, 1100)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [])

  return (
    <main className="page">
      <Hero ready={ready} />
      <Manifesto />
      <Dons />
      <Tracklist />
      <Elenco />
      <Filmes onPlay={onPlay} />
      <LojaTeaser />
      <Contratar />
    </main>
  )
}

export default function App() {
  const path = usePath()
  const [introDone, setIntroDone] = useState(() => reduced() || !LANDED_HOME)
  const [film, setFilm] = useState<Film | null>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  useEffect(() => {
    startSmoothScroll()
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  useEffect(() => {
    const l = getLenis()
    if (!introDone) {
      l?.stop()
      document.documentElement.classList.add('is-locked')
    } else {
      l?.start()
      document.documentElement.classList.remove('is-locked')
    }
  }, [introDone])

  // New page: start at the top and let ScrollTrigger re-measure.
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    getLenis()?.resize()
    if (!window.location.hash) {
      getLenis()?.scrollTo(0, { immediate: true, force: true })
      window.scrollTo(0, 0)
    }
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => window.cancelAnimationFrame(id)
  }, [path])

  useGSAP(() => {
    if (introDone || !introRef.current) return
    const q = gsap.utils.selector(introRef)
    const counter = { v: 0 }
    const num = q('.intro-count')[0] as HTMLElement
    gsap
      .timeline({ onComplete: () => setIntroDone(true) })
      .from(q('.intro-line'), { yPercent: 115, duration: 1.1, ease: EASE, stagger: 0.12 })
      .to(
        counter,
        {
          v: 24,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => {
            num.textContent = String(Math.round(counter.v)).padStart(2, '0')
          },
        },
        0.15,
      )
      .to(q('.intro-inner'), { opacity: 0, filter: 'blur(10px)', duration: 0.45, ease: 'power2.in' }, '+=0.15')
  }, [])

  let page: React.ReactNode
  const shopMatch = path.match(/^\/loja(?:\/([^/]+))?\/?$/)
  if (shopMatch) {
    const sub = shopMatch[1]
    page = (
      <>
        {!sub ? <ShopIndex /> : sub === 'checkout' ? <Checkout /> : <ProductPage slug={sub} />}
        <ShopFooter />
      </>
    )
  } else {
    page = <Home ready={introDone} onPlay={setFilm} />
  }

  return (
    <CartProvider>
      {!introDone && path === '/' && (
        <div className="intro" ref={introRef} aria-hidden="true">
          <div className="intro-inner">
            <p className="intro-mask">
              <span className="intro-line serif">uma produção</span>
            </p>
            <p className="intro-mask">
              <span className="intro-line display">Young Family</span>
            </p>
            <p className="intro-mask">
              <span className="intro-line tc">
                fps <span className="intro-count">00</span> · Luanda
              </span>
            </p>
          </div>
        </div>
      )}
      <div className="grain" aria-hidden="true" />
      <Nav path={path} />
      {page}
      <CartDrawer />
      <Lightbox film={film} onClose={() => setFilm(null)} />
    </CartProvider>
  )
}
