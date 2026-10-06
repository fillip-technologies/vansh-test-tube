import { useRef } from 'react'
import useInView, { revealClasses } from '../../hooks/useInView.js'
import Eyebrow from '../ui/Eyebrow.jsx'

// Factors that can influence outcomes — explained, never a success percentage.
export default function ServiceOutcomes({ outcomes }) {
  const ref = useRef(null)
  const inView = useInView(ref, 0.15)
  return (
    <section
      ref={ref}
      aria-labelledby="outcomes-heading"
      className="border-y border-border bg-surface px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className={revealClasses(inView)}>
          {outcomes.eyebrow && <Eyebrow>{outcomes.eyebrow}</Eyebrow>}
          <h2 id="outcomes-heading" className="mt-5 text-h2 text-balance text-secondary-800 lg:text-[2.375rem] lg:leading-[1.1] xl:text-[2.75rem] 2xl:text-[3.125rem]">
            {outcomes.title}
          </h2>
          <p className="mt-6 max-w-md text-body text-secondary-600 lg:text-body-lg">{outcomes.intro}</p>
          {outcomes.note && (
            <p className="mt-8 max-w-md border-l-2 border-primary-300 pl-5 text-[0.9375rem] leading-relaxed text-secondary-700">
              {outcomes.note}
            </p>
          )}
        </div>

        <ul className="grid self-center border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.factors.map((factor, i) => (
            <li
              key={factor.title}
              className={`border-r border-b border-border p-6 sm:p-7 ${revealClasses(inView, 'duration-500')}`}
              style={{ transitionDelay: inView ? `${100 + i * 70}ms` : '0ms' }}
            >
              <span className="text-sm font-semibold text-primary-500 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-card-title text-secondary-800">{factor.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-secondary-600">{factor.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
