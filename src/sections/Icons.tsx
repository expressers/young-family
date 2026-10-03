type P = { className?: string }

export const ArrowUpRight = ({ className }: P) => (
  <svg className={`icon ${className ?? ''}`} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </svg>
)

export const ArrowRight = ({ className }: P) => (
  <svg className={`icon ${className ?? ''}`} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12h16M13.5 5.5 20 12l-6.5 6.5" />
  </svg>
)

export const Play = ({ className }: P) => (
  <svg className={`icon icon-fill ${className ?? ''}`} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5.5v13l10.5-6.5z" />
  </svg>
)

export const Close = ({ className }: P) => (
  <svg className={`icon ${className ?? ''}`} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)
