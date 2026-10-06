import { useRef } from 'react'
import useInView, { revealClasses } from '../../hooks/useInView.js'
import Eyebrow from '../ui/Eyebrow.jsx'
import { Check, ClipboardList } from '../ui/icons.jsx'

// "Before starting" — practical preparation: a checklist of what the first
// stage may involve, plus what is helpful to bring to the first appointment.
export default function ServicePreparation({ preparation }) {
  const ref = useRef(null)
  const inView = useInView(ref, 0.15)
  return (
    <section
      ref={ref}
      aria-labelledby="preparation-heading"
      className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className={revealClasses(inView)}>
          {preparation.eyebrow && <Eyebrow>{preparation.eyebrow}</Eyebrow>}
          <h2 id="preparation-heading" className="mt-5 text-h2 text-balance text-secondary-800">
            {preparation.title}
          </h2>
          <p className="mt-6 max-w-md text-body text-secondary-600 lg:text-body-lg">{preparation.intro}</p>

          {preparation.bring?.length > 0 && (
            <div className="mt-10 max-w-md border-t border-border pt-7">
              <p className="flex items-center gap-2.5 text-card-title text-secondary-800">
                <ClipboardList className="size-5 text-primary-500" />
                {preparation.bringTitle}
              </p>
              <ul className="mt-4 space-y-2.5">
                {preparation.bring.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-secondary-600">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div
          className={`rounded-[2rem] border border-border bg-surface p-6 shadow-float-sm sm:p-9 ${revealClasses(inView)}`}
          style={{ transitionDelay: inView ? '150ms' : '0ms' }}
        >
          <p className="text-label text-secondary-500 uppercase">{preparation.checklistTitle}</p>
          <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
            {preparation.items.map((item) => (
              <li key={item.title} className="flex gap-3.5 border-b border-border py-4">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary-500 text-surface">
                  <Check className="size-3.5" />
                </span>
                <span>
                  <span className="block text-[1rem] font-semibold text-secondary-800">{item.title}</span>
                  <span className="mt-1 block text-[0.9375rem] leading-relaxed text-secondary-600">{item.text}</span>
                </span>
              </li>
            ))}
          </ul>
          {preparation.note && (
            <p className="mt-6 rounded-2xl bg-blush-50 px-5 py-4 text-[0.9375rem] leading-relaxed text-secondary-700">
              {preparation.note}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
