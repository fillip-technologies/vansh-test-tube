import { useRef } from 'react'
import useInView, { revealClasses } from '../../hooks/useInView.js'
import Eyebrow from '../ui/Eyebrow.jsx'

// "How long can it take?" — phases of the journey without fixed durations
// (only add durations to the JSON if the clinic has verified them).
export default function ServiceTimeline({ timeline }) {
  const ref = useRef(null)
  const inView = useInView(ref, 0.2)
  const phases = timeline.phases ?? []
  return (
    <section
      ref={ref}
      aria-labelledby="timeline-heading"
      className="bg-surface px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className={`mx-auto max-w-3xl text-center ${revealClasses(inView)}`}>
          {timeline.eyebrow && <Eyebrow center>{timeline.eyebrow}</Eyebrow>}
          <h2 id="timeline-heading" className="mt-5 text-h2 text-balance text-secondary-800">
            {timeline.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-body text-secondary-600 lg:text-body-lg">{timeline.intro}</p>
        </div>

        <ol className="mt-12 grid gap-3 md:grid-cols-5 md:gap-0 lg:mt-16">
          {phases.map((phase, i) => (
            <li
              key={phase.label}
              className={`relative flex items-center gap-4 rounded-2xl bg-blush-50 px-5 py-4 md:block md:rounded-none md:px-6 md:py-7 md:first:rounded-l-[1.75rem] md:last:rounded-r-[1.75rem] ${
                i % 2 === 1 ? 'md:bg-blush-100' : ''
              } ${revealClasses(inView, 'duration-500')}`}
              style={{ transitionDelay: inView ? `${100 + i * 80}ms` : '0ms' }}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-sm font-semibold text-primary-600 shadow-float-sm tabular-nums">
                {i + 1}
              </span>
              <span className="md:mt-4 md:block">
                <span className="block text-[1rem] font-semibold text-secondary-800">{phase.label}</span>
                {phase.text && <span className="mt-0.5 block text-sm text-secondary-600">{phase.text}</span>}
              </span>
            </li>
          ))}
        </ol>

        {timeline.note && (
          <p className="mx-auto mt-8 max-w-2xl text-center text-[0.9375rem] leading-relaxed text-secondary-600">
            {timeline.note}
          </p>
        )}
      </div>
    </section>
  )
}
