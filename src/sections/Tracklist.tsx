import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, EASE, reduced } from '../motion'
import { TRACKS, LINKS } from '../data'
import { ArrowUpRight } from './Icons'

export default function Tracklist() {
  const root = useRef<HTMLElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const mover = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      if (preview.current) {
        mover.current = {
          x: gsap.quickTo(preview.current, 'x', { duration: 0.6, ease: 'power3.out' }),
          y: gsap.quickTo(preview.current, 'y', { duration: 0.6, ease: 'power3.out' }),
        }
      }
      if (reduced()) return
      gsap.from(q('.track'), {
        yPercent: 60,
        opacity: 0,
        duration: 1,
        ease: EASE,
        stagger: 0.05,
        scrollTrigger: { trigger: q('.tracks')[0], start: 'top 80%' },
      })
    },
    { scope: root },
  )

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !mover.current) return
    mover.current.x(e.clientX)
    mover.current.y(e.clientY)
  }

  const half = Math.ceil(TRACKS.length / 2)

  return (
    <section className="tracklist" ref={root} aria-labelledby="tl-title" onPointerMove={onMove}>
      <header className="tl-head">
        <h2 id="tl-title" className="display">
          Alinhamento
        </h2>
        <p className="tl-note serif">Don &amp; Don — doze cenas, uma só noite.</p>
      </header>

      <div className="tracks" onPointerLeave={() => setActive(null)}>
        {[TRACKS.slice(0, half), TRACKS.slice(half)].map((side, s) => (
          <div className="tl-side" key={s}>
            <p className="tl-side-label serif">Lado {s === 0 ? 'A' : 'B'}</p>
            <ol start={s * half + 1}>
            {side.map((t) => (
              <li
                key={t.n}
                className={`track ${active === t.n ? 'is-active' : ''} ${active && active !== t.n ? 'is-dim' : ''}`}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(t.n)}
              >
                <a href={LINKS.appleAlbum} target="_blank" rel="noreferrer">
                  <span className="track-n">{String(t.n).padStart(2, '0')}</span>
                  <span className="track-title">{t.title}</span>
                  {t.feat && <span className="track-feat serif">com {t.feat}</span>}
                  <ArrowUpRight className="track-arrow" />
                </a>
              </li>
            ))}
            </ol>
          </div>
        ))}
      </div>

      <div className={`tl-preview ${active ? 'is-on' : ''}`} ref={preview} aria-hidden="true">
        {TRACKS.map((t) => (
          <img key={t.n} src={t.still} alt="" className={active === t.n ? 'on' : ''} loading="lazy" />
        ))}
      </div>
    </section>
  )
}
