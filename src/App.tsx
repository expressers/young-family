import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, startSmoothScroll, reduced, EASE, getLenis } from './motion'
import Nav from './sections/Nav'
import Hero from './sections/Hero'
import Manifesto from './sections/Manifesto'
import Dons from './sections/Dons'
import Tracklist from './sections/Tracklist'
import Elenco from './sections/Elenco'
import Filmes from './sections/Filmes'
import Contratar from './sections/Contratar'
import Lightbox from './sections/Lightbox'
import type { Film } from './data'

export default function App() {
  const [introDone, setIntroDone] = useState(() => reduced())
  const [film, setFilm] = useState<Film | null>(null)
  const introRef = useRef<HTMLDivElement>(null)

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

  return (
    <>
      {!introDone && (
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
      <Nav />
      <main className="page">
        <Hero ready={introDone} />
        <Manifesto />
        <Dons />
        <Tracklist />
        <Elenco />
        <Filmes onPlay={setFilm} />
        <Contratar />
      </main>
      <Lightbox film={film} onClose={() => setFilm(null)} />
    </>
  )
}
