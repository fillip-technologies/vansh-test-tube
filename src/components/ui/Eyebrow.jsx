// Small uppercase section label. Used selectively — not every section has one.
export default function Eyebrow({ children, center = false, className = '' }) {
  return (
    <p
      className={`flex items-center gap-3 text-label text-primary-600 uppercase ${
        center ? 'justify-center' : ''
      } ${className}`}
    >
      <span className="h-px w-8 bg-primary-300" aria-hidden="true" />
      {children}
    </p>
  )
}
