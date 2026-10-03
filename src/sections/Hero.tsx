import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, EASE, reduced, scrollToId } from '../motion'
import { BILLING, LINKS } from '../data'
import { ArrowUpRight, ArrowRight } from './Icons'

const pad = (n: number) => String(n).padStart(2, '0')

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const tc = useRef<HTMLSpanElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  // Running timecode, like a monitor on set
  useEffect(() => {
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const s = (now - t0) / 1000
      const f = Math.floor((s % 1) * 25)
      if (tc.current)
        tc.current.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(Math.floor(s) % 60)}:${pad(f)}`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (reduced()) video.current?.pause()
  }, [])

  // Opening: shutters part, title rises
  useGSAP(
    () => {
      if (!ready) return
      const q = gsap.utils.selector(root)
      if (reduced()) {
        gsap.set(q('.shutter'), { autoAlpha: 0 })
        return
      }
      gsap
        .timeline()
        .to(q('.shutter-top'), { yPercent: -100, duration: 1.6, ease: 'expo.inOut' })
        .to(q('.shutter-bottom'), { yPercent: 100, duration: 1.6, ease: 'expo.inOut' }, 0)
        .from(q('.hero-media'), { scale: 1.25, duration: 2.4, ease: EASE }, 0)
        .from(q('.ht-char'), { yPercent: 105, duration: 1.3, ease: EASE, stagger: 0.035 }, 0.75)
        .from(q('.reveal-up'), { y: 24, opacity: 0, duration: 1, ease: EASE, stagger: 0.08 }, 1.05)
    },
    { scope: root, dependencies: [ready] },
  )

  // Leaving: the frame closes to black, like a cut
  useGSAP(
    () => {
      if (reduced()) return
      const q = gsap.utils.selector(root)
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: true },
      })
      tl.to(q('.hero-media'), { scale: 1.14, ease: 'none' }, 0)
        .to(q('.hero-title'), { yPercent: -18, ease: 'none' }, 0)
        .to(q('.hero-copy-fade'), { opacity: 0, ease: 'none', duration: 0.5 }, 0)
        .to(q('.bar'), {
          scaleY: () => (window.innerHeight * 0.5) / (q('.bar')[0] as HTMLElement).offsetHeight,
          ease: 'power2.in',
          duration: 0.7,
        }, 0.3)
    },
    { scope: root },
  )

  const word = (w: string) =>
    w.split('').map((c, i) => (
      <span className="ht-char" key={i}>
        {c}
      </span>
    ))

  return (
    <section id="topo" className="hero" ref={root}>
      <div className="hero-stage">
        <div className="hero-media">
          <video
            ref={video}
            src="/media/hero.mp4"
            poster="/media/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </div>
        <div className="hero-shade" aria-hidden="true" />

        <div className="hero-hud hero-copy-fade" aria-hidden="true">
          <span>Luanda, Angola</span>
          <span className="hud-rec">
            <i /> TC <span ref={tc}>00:00:00:00</span>
          </span>
        </div>

        <div className="hero-copy">
          <p className="billing reveal-up hero-copy-fade">
            <span className="billing-lead">Uma produção Young Family</span>
            {BILLING.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </p>
          <h1 className="hero-title" aria-label="Young Family">
            <span className="ht-line" aria-hidden="true">{word('YOUNG')}</span>
            <span className="ht-line" aria-hidden="true">{word('FAMILY')}</span>
          </h1>
          <div className="hero-foot hero-copy-fade">
            <p className="hero-tag reveal-up">
              Trap angolano filmado como cinema. Irmãos de sangue, irmãos de rua — o mesmo apelido.
            </p>
            <div className="hero-actions reveal-up">
              <a className="btn btn-solid" href={LINKS.appleAlbum} target="_blank" rel="noreferrer">
                Ouvir Don &amp; Don
                <span className="btn-orb"><ArrowUpRight /></span>
              </a>
              <button className="btn btn-ghost" onClick={() => scrollToId('filmes')}>
                Ver os filmes
                <span className="btn-orb"><ArrowRight /></span>
              </button>
            </div>
          </div>
        </div>

        <div className="bar bar-top" aria-hidden="true" />
        <div className="bar bar-bottom" aria-hidden="true" />
        <div className="shutter shutter-top" aria-hidden="true" />
        <div className="shutter shutter-bottom" aria-hidden="true" />
      </div>
    </section>
  )
}
