import { useRef } from 'react'
import useInView, { revealClasses } from '../../hooks/useInView.js'
import { Curve } from '../ui/Decor.jsx'
import Eyebrow from '../ui/Eyebrow.jsx'
import { getIcon } from '../ui/iconRegistry.js'

// Treatment process timeline. Any number of steps: a vertical line on mobile,
// rows of four joined by a continuous line on desktop.
export default function ServiceProcess({ process }) {
  const ref = useRef(null)
  const inView = useInView(ref, 0.1)
  const steps = process.steps ?? []
  return (
    <section
      ref={ref}
      aria-labelledby="process-heading"
      className="relative isolate overflow-hidden bg-blush-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
    >
      <Curve className="inset-x-0 top-6 h-48 w-full" />
      <div className="mx-auto max-w-7xl">
        <div className={`grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16 ${revealClasses(inView)}`}>
          <div>
            {process.eyebrow && <Eyebrow>{process.eyebrow}</Eyebrow>}
            <h2 id="process-heading" className="mt-5 max-w-2xl text-h2 text-balance text-secondary-800">
              {process.title}
            </h2>
          </div>
          {process.intro && (
            <p className="max-w-lg text-body text-secondary-600 lg:pb-1.5 lg:text-body-lg">{process.intro}</p>
          )}
        </div>

        <ol className="mt-12 grid lg:mt-16 lg:grid-cols-4 lg:gap-y-16">
          {steps.map((step, i) => {
            const Icon = getIcon(step.icon)
            return (
              <li
                key={step.title}
                className={`relative border-l border-primary-200 pb-10 pl-9 last:border-l-transparent last:pb-0 lg:border-t lg:border-l-0 lg:pt-8 lg:pr-8 lg:pb-0 lg:pl-0 lg:last:border-l-0 ${revealClasses(inView, 'duration-500')}`}
                style={{ transitionDelay: inView ? `${100 + i * 70}ms` : '0ms' }}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 -left-[7px] size-3.5 rounded-full border-2 border-primary-400 bg-blush-50 lg:-top-[7px] lg:left-0"
                />
                <div className="-mt-1 flex items-center gap-3 lg:mt-0">
                  <span className="font-display text-[2.75rem] leading-none text-primary-500 lg:text-[3.5rem]">
                    <span className="sr-only">Step </span>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="grid size-9 place-items-center rounded-full bg-surface text-primary-500" aria-hidden="true">
                    <Icon className="size-4" />
                  </span>
                </div>
                <h3 className="mt-4 text-card-title text-secondary-800 lg:text-card-title-lg">{step.title}</h3>
                <p className="mt-2 max-w-xs text-body text-secondary-600">{step.description}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
