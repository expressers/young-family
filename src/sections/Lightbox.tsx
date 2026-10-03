import { useEffect, useRef } from 'react'
import type { Film } from '../data'
import { getLenis } from '../motion'
import { Close } from './Icons'

export default function Lightbox({ film, onClose }: { film: Film | null; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!film) return
    const prev = document.activeElement as HTMLElement | null
    getLenis()?.stop()
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      getLenis()?.start()
      prev?.focus()
    }
  }, [film, onClose])

  if (!film) return null

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={film.title} onClick={onClose}>
      <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
        <div className="lb-head">
          <p>
            <span className="display">{film.title}</span>
            <span className="serif"> — {film.credit}</span>
          </p>
          <button ref={closeBtn} className="lb-close" onClick={onClose} aria-label="Fechar vídeo">
            <Close />
          </button>
        </div>
        <div className="lb-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${film.id}?autoplay=1&rel=0&modestbranding=1`}
            title={film.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
