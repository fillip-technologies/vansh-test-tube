// Compact clinic information bar under the hero — text and subtle
// separators, no cards. Each fact may have an optional small label.
export default function ServiceSnapshot({ facts = [] }) {
  if (facts.length === 0) return null
  return (
    <section aria-label="At a glance" className="border-y border-border bg-surface px-4 sm:px-6 lg:px-8">
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6 lg:justify-between lg:py-7">
        {facts.map((fact, i) => (
          <li key={fact.value} className="flex items-center gap-8">
            {i > 0 && <span className="hidden size-1.5 rounded-full bg-primary-300 lg:block" aria-hidden="true" />}
            <span className="text-center">
              {fact.label && <span className="mr-2 text-label text-secondary-500 uppercase">{fact.label}</span>}
              <span className="text-[0.9375rem] font-semibold text-secondary-800 sm:text-base">{fact.value}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
