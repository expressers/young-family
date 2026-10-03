import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, EASE, reduced, scrollToId } from '../motion'
import { LINKS } from '../data'
import { ArrowUpRight } from './Icons'

const SOCIAL = [
  { label: 'Instagram', href: LINKS.instagram },
  { label: 'TikTok', href: LINKS.tiktok },
  { label: 'YouTube', href: LINKS.youtube },
  { label: 'X', href: LINKS.x },
  { label: 'Apple Music', href: LINKS.appleAlbum },
]

export default function Contratar() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (reduced()) return
      const q = gsap.utils.selector(root)
      gsap.fromTo(
        q('.ct-bg img'),
        { scale: 1.25, filter: 'grayscale(1) brightness(0.35)' },
        {
          scale: 1,
          filter: 'grayscale(0.4) brightness(0.55)',
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top top', scrub: true },
        },
      )
      gsap.from(q('.ct-title .cr-reveal'), {
        yPercent: 110,
        duration: 1.3,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: q('.ct-title')[0], start: 'top 80%' },
      })
    },
    { scope: root },
  )

  return (
    <section id="contratar" className="contratar" ref={root} aria-labelledby="ct-title">
      <div className="ct-bg" aria-hidden="true">
        <img src="/media/crew.jpg" alt="" loading="lazy" />
      </div>
      <div className="ct-inner">
        <h2 id="ct-title" className="ct-title display">
          <span className="cr-mask"><span className="cr-reveal">Leva a família</span></span>
          <span className="cr-mask"><span className="cr-reveal red">para o teu palco.</span></span>
        </h2>
        <p className="lede ct-lede">
          Concertos, festivais, eventos privados e parcerias de marca. Fala directamente com a equipa da Young
          Family.
        </p>
        <div className="ct-actions">
          <a className="btn btn-solid btn-xl" href={LINKS.whatsapp} target="_blank" rel="noreferrer">
            Contratar pelo WhatsApp
            <span className="btn-orb"><ArrowUpRight /></span>
          </a>
          <a className="ct-phone" href={LINKS.phone}>
            {LINKS.phoneLabel}
          </a>
        </div>
      </div>

      <footer className="footer">
        <div className="ft-top">
          <button className="ft-mark display" onClick={() => scrollToId('topo')} aria-label="Voltar ao início">
            Fim.
          </button>
          <ul className="ft-social">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label} <ArrowUpRight />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="ft-bottom">
          <p>© {new Date().getFullYear()} Young Family · Luanda, Angola</p>
          <p>Imagens: fotogramas dos vídeos oficiais da Young Family</p>
          <p>
            Site por{' '}
            <a href="https://expressers.ao" target="_blank" rel="noreferrer">
              Expressers
            </a>
          </p>
        </div>
      </footer>
    </section>
  )
}
