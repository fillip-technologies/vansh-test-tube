// Subtle background decorations. Place inside a `relative isolate overflow-hidden`
// section; every piece sits behind content and ignores the pointer.

const base = 'pointer-events-none absolute -z-10'

// Soft blurred blush glow.
export function Blob({ className = '' }) {
  return <span aria-hidden="true" className={`${base} rounded-full bg-primary-100/70 blur-3xl ${className}`} />
}

// Thin circular outline(s).
export function Rings({ className = '' }) {
  return (
    <span aria-hidden="true" className={`${base} ${className}`}>
      <span className="absolute inset-0 rounded-full border border-primary-100" />
      <span className="absolute inset-[18%] rounded-full border border-primary-100/70" />
    </span>
  )
}

// Fine dot grid that fades out at its edges.
export function Dots({ className = '' }) {
  return <span aria-hidden="true" className={`${base} decor-dots ${className}`} />
}

// One gentle curved line across the section.
export function Curve({ className = '', flip = false }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 300"
      preserveAspectRatio="none"
      fill="none"
      className={`${base} text-primary-200/70 ${flip ? '-scale-x-100' : ''} ${className}`}
    >
      <path
        d="M-20 220 C 260 60, 520 300, 820 150 S 1150 40, 1220 90"
        stroke="currentColor"
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
