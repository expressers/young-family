import { useRef, Fragment } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, reduced } from '../motion'

type Piece = string | { img: string; alt: string }

const TEXT: Piece[] = [
  'Não',
  'é',
  'um',
  'grupo.',
  { img: '/media/familia-bw.jpg', alt: '' },
  'É',
  'uma',
  'família.',
  'Nascida',
  'em',
  'Luanda,',
  'criada',
  'no',
  'trap,',
  { img: '/media/shadows.jpg', alt: '' },
  'onde',
  'cada',
  'verso',
  'é',
  'negócio',
  'de',
  'família',
  'e',
  'cada',
  'palco',
  'é',
  'território.',
  { img: '/media/champanhe.jpg', alt: '' },
  'Irmãos',
  'de',
  'sangue,',
  'irmãos',
  'de',
  'rua,',
  'irmãos',
  'de',
  'estúdio',
  '—',
  'todos',
  'com',
  'o',
  'mesmo',
  'apelido.',
]

export default function Manifesto() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (reduced()) return
      const q = gsap.utils.selector(root)
      gsap.fromTo(
        q('.mf-w'),
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: { trigger: q('.mf-text')[0], start: 'top 78%', end: 'bottom 45%', scrub: true },
        },
      )
      gsap.from(q('.mf-pill'), {
        width: 0,
        ease: 'none',
        stagger: 0.3,
        scrollTrigger: { trigger: q('.mf-text')[0], start: 'top 80%', end: 'bottom 50%', scrub: true },
      })
    },
    { scope: root },
  )

  return (
    <section className="manifesto" ref={root} aria-label="Manifesto">
      <p className="mf-kicker serif">Cena 1 — Interior. Noite.</p>
      <p className="mf-text">
        {TEXT.map((p, i) =>
          typeof p === 'string' ? (
            <Fragment key={i}>
              <span className="mf-w">{p}</span>{' '}
            </Fragment>
          ) : (
            <Fragment key={i}>
              <span className="mf-pill" style={{ backgroundImage: `url(${p.img})` }} aria-hidden="true" />{' '}
            </Fragment>
          ),
        )}
      </p>
    </section>
  )
}
