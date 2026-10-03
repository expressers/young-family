import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, EASE, reduced } from '../motion'
import { LINKS } from '../data'
import { ArrowUpRight } from './Icons'

const FACTS = [
  {
    when: '05.12.2025',
    what: 'Sai “Don & Don”',
    body: 'Doze faixas, um só nome na capa: os dois irmãos lado a lado. Lil Boy e Lil Mac assinam o primeiro álbum da dupla.',
  },
  {
    when: 'Fevereiro 2026',
    what: 'Topo da Apple Music Angola',
    body: 'Dois meses depois do lançamento, o álbum continuava firme no topo do ranking da Apple Music em Angola.',
  },
  {
    when: 'Belaire',
    what: 'Embaixadores em Angola',
    body: 'A garrafa que aparece no vídeo de “Belaire Boyz” deixou de ser adereço: a dupla tornou-se embaixadora da marca no país.',
  },
  {
    when: 'Remix',
    what: '“Belaire Boyz” com Prodígio',
    body: 'O single ganhou uma segunda vida com a participação de Prodígio — a família a abrir a mesa a quem joga ao mesmo nível.',
  },
]

export default function Dons() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (reduced()) return
      const q = gsap.utils.selector(root)
      gsap.fromTo(
        q('.dons-cover-img'),
        { scale: 1.18 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'center center', scrub: true } },
      )
      gsap.fromTo(
        q('.dons-cover'),
        { clipPath: 'inset(18% 12% 18% 12%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 15%', scrub: true },
        },
      )
      q('.fact').forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          filter: 'blur(6px)',
          duration: 1.2,
          ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
      gsap.from(q('.dons-title .line > span'), {
        yPercent: 105,
        duration: 1.2,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: q('.dons-title')[0], start: 'top 80%' },
      })
    },
    { scope: root },
  )

  return (
    <section id="dons" className="dons" ref={root}>
      <div className="dons-grid">
        <div className="dons-sticky">
          <figure className="dons-cover">
            <img
              className="dons-cover-img"
              src="/media/don-don-cover.jpg"
              alt="Capa do álbum Don & Don: Lil Boy e Lil Mac, a preto e branco, frente a uma parede escura."
              loading="lazy"
              width={1400}
              height={1400}
            />
          </figure>
          <figcaption className="dons-caption">
            <span className="serif">Don &amp; Don</span>
            <span>LilMac &amp; Lil Boy · 12 faixas · 2025</span>
          </figcaption>
        </div>

        <div className="dons-body">
          <h2 className="dons-title display">
            <span className="line"><span>Dois irmãos.</span></span>
            <span className="line"><span>Dois Dons.</span></span>
            <span className="line red"><span>Uma família.</span></span>
          </h2>
          <p className="lede">
            Lil Boy e Lil Mac são irmãos e os pilares da Young Family. Quando se juntaram em dupla, deram-lhe o
            nome do que já eram na rua e no estúdio: <em className="serif">Don &amp; Don</em>. O resultado é trap
            com estética de filme de máfia — balaclavas, coletes, champanhe e sombras projetadas em betão.
          </p>

          <ol className="facts">
            {FACTS.map((f) => (
              <li className="fact" key={f.what}>
                <span className="fact-when">{f.when}</span>
                <h3 className="fact-what">{f.what}</h3>
                <p className="fact-body">{f.body}</p>
              </li>
            ))}
          </ol>

          <div className="dons-actions">
            <a className="btn btn-solid" href={LINKS.appleAlbum} target="_blank" rel="noreferrer">
              Apple Music
              <span className="btn-orb"><ArrowUpRight /></span>
            </a>
            <a className="btn btn-ghost" href={LINKS.lilBoy} target="_blank" rel="noreferrer">
              @lilboy_thedon
              <span className="btn-orb"><ArrowUpRight /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
