import { ArrowRight } from './icons.jsx'

// Quiet arrow link — for low-emphasis actions ("Explore IVF →").
export default function TextLink({ href, children, tone = 'dark', className = '', ...props }) {
  const color =
    tone === 'pink'
      ? 'text-primary-600 hover:text-primary-700'
      : 'text-secondary-800 hover:text-primary-600'
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 rounded-sm text-button-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 ${color} ${className}`}
      {...props}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />
    </a>
  )
}
