import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, reduced } from '../motion'
import { FILMS, LINKS, type Film } from '../data'
import { Play, ArrowUpRight } from './Icons'

export default function Filmes({ onPlay }: { onPlay: (f: Film) => void }) {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reduced()) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => {
        const el = track.current!
        const dist = () => el.scrollWidth - window.innerWidth
        const tween = gsap.to(el, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        gsap.utils.toArray<HTMLElement>('.film-img').forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -5 },
            {
              xPercent: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: img.closest('.film'),
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })
        gsap.to('.film-progress i', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${dist()}`, scrub: true },
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section id="filmes" className="filmes" ref={root} aria-labelledby="fm-title">
      <div className="fm-track" ref={track}>
        <header className="fm-intro">
          <h2 id="fm-title" className="display">
            Filmo&shy;grafia
          </h2>
          <p className="lede">
            Mais de oito anos de videoclipes tratados como curtas-metragens. Carrega em qualquer fotograma para ver
            o filme.
          </p>
          <p className="fm-meta">Visualizações no YouTube · Outubro 2026</p>
          <a className="btn btn-ghost" href={LINKS.youtube} target="_blank" rel="noreferrer">
            Canal no YouTube
            <span className="btn-orb"><ArrowUpRight /></span>
          </a>
        </header>

        {FILMS.map((f, i) => (
          <article className={`film ${i % 2 ? 'film-low' : ''}`} key={f.id}>
            <button className="film-frame" onClick={() => onPlay(f)} aria-label={`Ver o vídeo de ${f.title}`}>
              <img className="film-img" src={f.still} alt="" loading="lazy" />
              <span className="film-play">
                <Play />
              </span>
            </button>
            <div className="film-meta">
              <span className="film-year">{f.year}</span>
              <h3 className="film-title display">{f.title}</h3>
              <p className="film-credit serif">{f.credit}</p>
              <p className="film-views">{f.views} visualizações</p>
            </div>
          </article>
        ))}
        <div className="fm-end" aria-hidden="true">
          <span className="display">Continua…</span>
        </div>
      </div>
      <div className="film-progress" aria-hidden="true">
        <i />
      </div>
    </section>
  )
}
