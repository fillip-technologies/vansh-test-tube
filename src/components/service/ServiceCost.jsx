import { useRef } from 'react'
import { CONSULTATION_HREF } from '../../config/site.js'
import useInView, { revealClasses } from '../../hooks/useInView.js'
import ArrowButton from '../ui/ArrowButton.jsx'
import Eyebrow from '../ui/Eyebrow.jsx'

// Cost information. Shows `prices` only if verified figures are added to the
// JSON; otherwise explains what costs depend on and invites a conversation.
export default function ServiceCost({ cost }) {
  const ref = useRef(null)
  const inView = useInView(ref, 0.2)
  return (
    <section
      ref={ref}
      aria-labelledby="cost-heading"
      className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div
        className={`mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-border bg-surface md:grid-cols-[1.15fr_1fr] ${revealClasses(inView)}`}
      >
        <div className="p-7 sm:p-10 lg:p-14">
          {cost.eyebrow && <Eyebrow>{cost.eyebrow}</Eyebrow>}
          <h2 id="cost-heading" className="mt-5 font-display text-h3 text-balance text-secondary-800">
            {cost.title}
          </h2>
          <p className="mt-5 max-w-lg text-body text-secondary-600 lg:text-body-lg">{cost.intro}</p>

          {cost.prices?.length > 0 && (
            <dl className="mt-7 divide-y divide-border border-y border-border">
              {cost.prices.map((price) => (
                <div key={price.label} className="flex justify-between gap-6 py-3.5">
                  <dt className="text-secondary-700">{price.label}</dt>
                  <dd className="font-semibold text-secondary-800">{price.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <p className="mt-8 text-card-title text-secondary-800">{cost.prompt}</p>
          <ArrowButton href={CONSULTATION_HREF} size="lg" className="mt-4 w-full sm:w-auto">
            {cost.cta}
          </ArrowButton>
        </div>

        <div className="border-t border-border bg-blush-50 p-7 sm:p-10 md:border-t-0 md:border-l lg:p-14">
          <p className="text-label text-secondary-500 uppercase">{cost.factorsTitle}</p>
          <ol className="mt-6 space-y-5">
            {cost.factors.map((factor, i) => (
              <li key={factor} className="flex items-baseline gap-4">
                <span className="text-sm font-semibold text-primary-500 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-body font-medium text-secondary-800">{factor}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
