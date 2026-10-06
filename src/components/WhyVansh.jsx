import { useEffect, useRef, useState } from 'react'
import ArrowButton from './ui/ArrowButton.jsx'
import { CalendarHeart, HeartHandshake, Stethoscope, UserCheck } from './ui/icons.jsx'
import { Blob, Dots } from './ui/Decor.jsx'

// Trust points. Keep these factual — no invented statistics or claims.
const REASONS = [
  {
    title: 'Fertility Care Since 2014',
    text: 'Dedicated fertility and IVF care in Patna with a patient-first approach.',
    Icon: CalendarHeart,
  },
  {
    title: 'Advanced Treatment Options',
    text: 'Comprehensive fertility treatments designed around individual patient needs.',
    Icon: Stethoscope,
  },
  {
    title: 'Compassionate Guidance',
    text: 'Because fertility treatment is more than a medical process — it is a deeply personal journey.',
    Icon: HeartHandshake,
  },
  {
    title: 'Personalized Care',
    text: 'Treatment planning begins with understanding your individual fertility journey.',
    Icon: UserCheck,
  },
]

// Reveals the section once it scrolls into view.
function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const node = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

const reveal = (inView) =>
  `transition duration-700 ease-out motion-reduce:transition-none ${
    inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
  }`

export default function WhyVansh() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef)

  return (
    <section
      id="why-vansh"
      ref={sectionRef}
      aria-labelledby="why-vansh-heading"
      className="relative isolate overflow-hidden bg-background px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      {/* Subtle background decoration */}
      <Blob className="-top-40 -right-32 size-[26rem] sm:size-[32rem]" />
      <Dots className="bottom-6 -left-6 hidden h-48 w-72 sm:block" />
      <div className="mx-auto max-w-7xl">
        <div className={`mx-auto max-w-2xl text-center ${reveal(inView)}`}>
          <p className="inline-flex items-center gap-3 text-label text-primary-500 uppercase">
            <span className="h-px w-6 bg-primary-200" aria-hidden="true" />
            Why Vansh
            <span className="h-px w-6 bg-primary-200" aria-hidden="true" />
          </p>
          <h2 id="why-vansh-heading" className="mt-4 text-h2 text-balance text-secondary-800">
            Care That Puts Your <em className="text-primary-500">Journey</em> First.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-body text-secondary-600 lg:text-body-lg">
            From your first consultation to every step of treatment, we combine personalized
            fertility care with compassionate guidance.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {REASONS.map(({ title, text, Icon }, i) => (
            <li
              key={title}
              className={reveal(inView)}
              style={{ transitionDelay: inView ? `${120 + i * 90}ms` : '0ms' }}
            >
              <article className="group flex h-full gap-4 rounded-3xl border border-border bg-surface p-5 shadow-float-sm transition duration-300 ease-out hover:-translate-y-1 hover:shadow-float motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:flex-col sm:gap-0 sm:p-6 lg:p-7">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blush-100 text-primary-500 transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-surface">
                  <Icon className="size-[1.375rem]" />
                </span>
                <span className="sm:mt-6">
                  <h3 className="text-card-title text-secondary-800">{title}</h3>
                  <p className="mt-1.5 text-body text-secondary-600 sm:mt-2">{text}</p>
                </span>
              </article>
            </li>
          ))}
        </ul>

        <div
          className={`mt-12 flex justify-center lg:mt-14 ${reveal(inView)}`}
          style={{ transitionDelay: inView ? '520ms' : '0ms' }}
        >
          <div className="flex w-full flex-col items-center gap-4 rounded-3xl border border-border bg-blush-50 p-5 text-center sm:w-auto sm:flex-row sm:gap-6 sm:rounded-full sm:p-2 sm:pl-7 sm:text-left">
            <p className="text-body font-semibold text-secondary-800">Not sure where to begin?</p>
            <ArrowButton href="#book-consultation" size="lg" className="w-full sm:w-auto">
              Talk to a Fertility Specialist
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  )
}
