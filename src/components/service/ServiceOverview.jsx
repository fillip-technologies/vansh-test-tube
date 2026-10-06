import { useRef } from 'react'
import useInView, { revealClasses } from '../../hooks/useInView.js'
import Eyebrow from '../ui/Eyebrow.jsx'
import { Check } from '../ui/icons.jsx'
import { getIcon } from '../ui/iconRegistry.js'
import { Dots } from '../ui/Decor.jsx'

// A simple, data-driven flow of how the treatment works. Each service supplies
// its own steps (label, caption, icon) — nothing here is treatment-specific.
function FlowVisual({ visual }) {
  if (!visual?.steps?.length) return null
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-blush-50 p-7 sm:p-10">
      <Dots className="-top-6 -right-6 h-40 w-56" />
      <p className="text-label text-secondary-600 uppercase">{visual.title}</p>
      <ol className="relative mt-7">
        {visual.steps.map((step, i) => {
          const Icon = getIcon(step.icon)
          const isLast = i === visual.steps.length - 1
          return (
            <li key={step.label} className="relative flex gap-5 pb-8 last:pb-0">
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute top-14 bottom-1 left-7 w-px border-l border-dashed border-primary-300"
                />
              )}
              <span className="relative grid size-14 shrink-0 place-items-center rounded-full border border-primary-100 bg-surface text-primary-500 shadow-float-sm">
                <Icon className="size-5" />
              </span>
              <div className="pt-2">
                <p className="text-card-title text-secondary-800">{step.label}</p>
                <p className="mt-0.5 text-sm text-secondary-600">{step.caption}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default function ServiceOverview({ overview }) {
  const ref = useRef(null)
  const inView = useInView(ref, 0.15)
  return (
    <section
      ref={ref}
      aria-labelledby="overview-heading"
      className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className={revealClasses(inView)}>
          {overview.eyebrow && <Eyebrow>{overview.eyebrow}</Eyebrow>}
          <h2 id="overview-heading" className="mt-5 text-h2 text-balance text-secondary-800">
            {overview.title}
          </h2>
          {(overview.paragraphs ?? [overview.description]).filter(Boolean).map((text) => (
            <p key={text} className="mt-6 max-w-xl text-body text-secondary-600 lg:text-body-lg">
              {text}
            </p>
          ))}
          {overview.keyPoints?.length > 0 && (
            <ul className="mt-8 max-w-xl space-y-4">
              {overview.keyPoints.map((point) => (
                <li key={point} className="flex gap-3.5 text-body text-secondary-700">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-blush-100 text-primary-500">
                    <Check className="size-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          )}
          {overview.note && (
            <p className="mt-8 max-w-xl border-l-2 border-primary-300 pl-5 text-[0.9375rem] leading-relaxed text-secondary-600">
              {overview.note}
            </p>
          )}
        </div>
        <div className={revealClasses(inView)} style={{ transitionDelay: inView ? '150ms' : '0ms' }}>
          <FlowVisual visual={overview.visual} />
        </div>
      </div>
    </section>
  )
}
