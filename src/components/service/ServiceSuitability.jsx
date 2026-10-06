import { useRef } from 'react'
import { CONSULTATION_HREF } from '../../config/site.js'
import useInView, { revealClasses } from '../../hooks/useInView.js'
import ArrowButton from '../ui/ArrowButton.jsx'
import Eyebrow from '../ui/Eyebrow.jsx'

// "Is this treatment right for you?" — large statement + numbered points.
// Wording must never imply the treatment suits everyone.
export default function ServiceSuitability({ suitability }) {
  const ref = useRef(null)
  const inView = useInView(ref, 0.15)
  return (
    <section
      ref={ref}
      aria-labelledby="suitability-heading"
      className="border-t border-border bg-surface px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className={`lg:sticky lg:top-32 lg:self-start ${revealClasses(inView)}`}>
          {suitability.eyebrow && <Eyebrow>{suitability.eyebrow}</Eyebrow>}
          <h2 id="suitability-heading" className="mt-5 text-h2 text-balance text-secondary-800">
            {suitability.title}
          </h2>
          <p className="mt-6 max-w-md text-body text-secondary-600 lg:text-body-lg">{suitability.intro}</p>
          {suitability.note && (
            <p className="mt-8 max-w-md rounded-2xl border-l-2 border-primary-300 bg-blush-50 px-5 py-4 text-[0.9375rem] leading-relaxed text-secondary-700">
              {suitability.note}
            </p>
          )}
          <ArrowButton href={CONSULTATION_HREF} size="lg" variant="outline" className="mt-8 w-full sm:w-auto">
            {suitability.cta ?? 'Discuss Your Situation'}
          </ArrowButton>
        </div>

        <ol className="border-t border-border">
          {suitability.points.map((point, i) => (
            <li
              key={point.title}
              className={`grid grid-cols-[3.5rem_1fr] gap-x-5 border-b border-border py-8 sm:grid-cols-[5rem_1fr] ${revealClasses(inView, 'duration-500')}`}
              style={{ transitionDelay: inView ? `${120 + i * 90}ms` : '0ms' }}
            >
              <span className="font-display text-[2.5rem] leading-none text-primary-200 sm:text-[3rem]" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="pt-1">
                <h3 className="text-card-title text-secondary-800 lg:text-card-title-lg">{point.title}</h3>
                {point.text && <p className="mt-2 max-w-lg text-body text-secondary-600">{point.text}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
