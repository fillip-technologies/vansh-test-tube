import SmartLink from './SmartLink.jsx'
import { ArrowRight } from './icons.jsx'

const VARIANTS = {
  primary: {
    button: 'border-transparent bg-primary-500 text-surface shadow-md shadow-primary-500/20 hover:bg-primary-600 focus-visible:outline-primary-500',
    circle: 'bg-surface text-primary-500 group-hover:text-primary-600',
  },
  outline: {
    button: 'border-primary-300 bg-surface/60 text-primary-500 backdrop-blur-md hover:border-primary-500 hover:bg-surface/90 focus-visible:outline-primary-500',
    circle: 'bg-primary-50 text-primary-500 group-hover:bg-primary-100',
  },
  // For dark (deep pink) backgrounds.
  light: {
    button: 'border-transparent bg-surface text-secondary-800 shadow-lg shadow-secondary-900/15 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-secondary-900/20 focus-visible:outline-surface motion-reduce:hover:translate-y-0',
    circle: 'bg-primary-500 text-surface group-hover:bg-primary-600',
  },
}

const SIZES = {
  sm: { button: 'gap-3 py-1.5 pr-1.5 pl-5 text-button-sm', circle: 'size-8', icon: 'size-4' },
  lg: { button: 'gap-4 py-1.5 pr-1.5 pl-6 text-button', circle: 'size-9', icon: 'size-4' },
}

// Rounded pill link with a circular arrow on the right.
export default function ArrowButton({
  href,
  children,
  variant = 'primary',
  size = 'sm',
  className = '',
  ...props
}) {
  const v = VARIANTS[variant]
  const s = SIZES[size]
  return (
    <SmartLink
      href={href}
      className={`group inline-flex items-center justify-between rounded-full border whitespace-nowrap transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${v.button} ${s.button} ${className}`}
      {...props}
    >
      {children}
      <span
        className={`grid shrink-0 place-items-center rounded-full transition-colors duration-200 ${v.circle} ${s.circle}`}
      >
        <ArrowRight
          className={`transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none ${s.icon}`}
        />
      </span>
    </SmartLink>
  )
}
