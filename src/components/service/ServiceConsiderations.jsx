import { useRef } from 'react'
import useInView, { revealClasses } from '../../hooks/useInView.js'
import Eyebrow from '../ui/Eyebrow.jsx'

// Calm, informational notes — not warnings. Responsible wording only.
export default function ServiceConsiderations({ considerations }) {
  const ref = useRef(null)
  const inView = useInView(ref, 0.2)
  const items = considerations.items ?? []
  return (
    <section
      ref={ref}
      aria-labelledby="considerations-heading"
      className="border-y border-border bg-surface px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className={revealClasses(inView)}>
          {considerations.eyebrow && <Eyebrow>{considerations.eyebrow}</Eyebrow>}
          <h2 id="considerations-heading" className="mt-5 max-w-2xl text-h2 text-balance text-secondary-800">
            {considerations.title}
          </h2>
        </div>
        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {items.map((item, i) => (
            <li
              key={item.label}
              className={revealClasses(inView, 'duration-500')}
              style={{ transitionDelay: inView ? `${120 + i * 80}ms` : '0ms' }}
            >
              <span className="block h-0.5 w-10 rounded-full bg-primary-300" aria-hidden="true" />
              <h3 className="mt-5 text-card-title text-secondary-800">{item.label}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-secondary-600">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
