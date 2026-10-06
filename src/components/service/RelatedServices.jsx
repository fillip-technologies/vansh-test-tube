import { getTreatmentSummary, serviceHref } from '../../lib/services.js'
import SmartLink from '../ui/SmartLink.jsx'
import { ArrowRight } from '../ui/icons.jsx'

// Compact "you may also explore" navigation row — links, not a card grid.
export default function RelatedServices({ slugs = [], title = 'You May Also Explore' }) {
  const related = slugs.map(getTreatmentSummary).filter(Boolean).slice(0, 3)
  if (related.length === 0) return null
  return (
    <nav aria-labelledby="related-heading" className="border-t border-border bg-surface px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
        <h2 id="related-heading" className="shrink-0 font-display text-[1.75rem] text-secondary-800">
          {title}
        </h2>
        <ul className="grid flex-1 divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-y-0">
          {related.map((treatment) => (
            <li key={treatment.slug}>
              <SmartLink
                href={serviceHref(treatment.slug)}
                className="group flex items-center justify-between gap-4 py-4 transition-colors sm:px-6 sm:py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
              >
                <span>
                  <span className="block text-label text-primary-500 uppercase">{treatment.abbr}</span>
                  <span className="mt-1 block text-[1rem] font-semibold text-secondary-800 group-hover:text-primary-600">
                    {treatment.title}
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-secondary-500 transition-transform group-hover:translate-x-1 group-hover:text-primary-600" />
              </SmartLink>
            </li>
          ))}
        </ul>
        <SmartLink
          href="/#treatments"
          className="shrink-0 text-button-sm text-primary-600 underline decoration-primary-200 underline-offset-4 hover:text-primary-700"
        >
          All treatments
        </SmartLink>
      </div>
    </nav>
  )
}
