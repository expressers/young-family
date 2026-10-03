import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, EASE, reduced } from '../motion'
import { CAST, FEATURES } from '../data'

export default function Elenco() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (reduced()) return
      const q = gsap.utils.selector(root)
      gsap.fromTo(
        q('.el-photo img'),
        { scale: 1.2, yPercent: -6 },
        { scale: 1.02, yPercent: 6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
      q('.credit').forEach((el) => {
        gsap.from(el.querySelectorAll('.cr-reveal'), {
          yPercent: 110,
          duration: 1.1,
          ease: EASE,
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
      gsap.to(q('.marquee-track'), { xPercent: -50, duration: 40, ease: 'none', repeat: -1 })
    },
    { scope: root },
  )

  return (
    <section id="elenco" className="elenco" ref={root} aria-labelledby="el-title">
      <div className="el-grid">
        <div className="el-sticky">
          <figure className="el-photo">
            <img
              src="/media/familia-bw.jpg"
              alt="Membros da Young Family sentados lado a lado, a preto e branco, num camarim."
              loading="lazy"
            />
          </figure>
          <p className="el-photo-cap serif">Fotograma de “Belaire Boyz”</p>
        </div>

        <div className="el-credits">
          <h2 id="el-title" className="display el-title">
            <span className="cr-mask"><span className="cr-reveal">O Elenco</span></span>
          </h2>
          <p className="lede el-lede">
            Uma família não se escolhe — mas esta foi escolhida a dedo. Cada nome tem o seu papel, e alguns têm
            mais do que um nome.
          </p>
          <ul className="credits">
            {CAST.map((m) => (
              <li className="credit" key={m.name}>
                <span className="cr-mask">
                  <span className="cr-reveal cr-name display">{m.name}</span>
                </span>
                {(m.alias || m.note) && (
                  <span className="cr-mask">
                    <span className="cr-reveal cr-role serif">
                      {m.alias ? <>como “{m.alias}”</> : null}
                      {m.alias && m.note ? ' · ' : null}
                      {m.note === 'Don' ? 'um dos Dons' : m.note}
                    </span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="marquee" aria-label="Participações especiais">
        <p className="marquee-label serif">Participações especiais</p>
        <div className="marquee-viewport">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <span className="marquee-row" key={k} aria-hidden={k === 1}>
                {FEATURES.map((f) => (
                  <span className="marquee-item" key={f}>
                    {f}
                    <i aria-hidden="true" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
