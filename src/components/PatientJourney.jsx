import { useRef } from 'react'
import { CLINIC, CONSULTATION_HREF } from '../config/site.js'
import useInView, { revealClasses } from '../hooks/useInView.js'
import ArrowButton from './ui/ArrowButton.jsx'
import { Phone } from './ui/icons.jsx'

// A general outline, not a fixed protocol — wording stays conditional
// ("may recommend", "based on your individual situation").
const STEPS = [
  {
    title: 'Start With a Conversation',
    text: 'Share your concerns, fertility history and what you would like to understand.',
  },
  {
    title: 'Fertility Evaluation',
    text: 'Your doctor may recommend appropriate consultations, investigations or evaluations based on your individual situation.',
  },
  {
    title: 'Understand Your Options',
    text: 'Your care team explains the relevant treatment options and helps you understand the next steps.',
  },
  {
    title: 'Personalized Treatment Plan',
    text: 'Your treatment approach is planned around your individual needs and medical assessment.',
  },
  {
    title: 'Care & Follow-Up',
    text: 'Continue with guidance and follow-up throughout your treatment journey.',
  },
]

const delay = (inView, ms) => ({ transitionDelay: inView ? `${ms}ms` : '0ms' })

export default function PatientJourney() {
  const introRef = useRef(null)
  const stepsRef = useRef(null)
  const ctaRef = useRef(null)
  const introInView = useInView(introRef)
  const stepsInView = useInView(stepsRef, 0.2)
  const ctaInView = useInView(ctaRef, 0.3)

  const callHref = CLINIC.phone ? `tel:${CLINIC.phone}` : '#contact'

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="bg-blush-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Intro */}
        <div
          ref={introRef}
          className={`mx-auto max-w-4xl text-center ${revealClasses(introInView, 'duration-500')}`}
        >
          <p className="inline-flex items-center gap-3 text-label text-primary-500 uppercase">
            <span className="h-px w-6 bg-primary-200" aria-hidden="true" />
            Your Journey With Vansh
            <span className="h-px w-6 bg-primary-200" aria-hidden="true" />
          </p>
          <h2 id="journey-heading" className="mt-4 text-h2 text-balance text-secondary-800">
            From Your First Conversation to the <em className="text-primary-500">Next Step.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-body text-secondary-600 lg:text-body-lg">
            Starting fertility treatment can feel overwhelming. We keep the journey clear,
            supportive and focused on helping you understand your options.
          </p>
        </div>

        {/* Timeline — vertical below lg, horizontal from lg */}
        <div ref={stepsRef} className="relative mx-auto mt-14 max-w-xl lg:mt-20 lg:max-w-none">
          {/* Faint pathway curve behind the desktop timeline */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
            fill="none"
            className={`pointer-events-none absolute inset-x-0 -top-12 hidden h-40 w-full text-primary-200 transition-opacity duration-1000 lg:block ${
              stepsInView ? 'opacity-40' : 'opacity-0'
            }`}
          >
            <path
              d="M0 120 C 200 20, 400 20, 600 80 S 1000 150, 1200 40"
              stroke="currentColor"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Desktop connecting line through the number circles */}
          <span
            aria-hidden="true"
            className={`absolute top-7 right-[10%] left-[10%] hidden h-px origin-left bg-border transition-transform duration-700 ease-out motion-reduce:transition-none lg:block ${
              stepsInView ? 'scale-x-100' : 'scale-x-0 motion-reduce:scale-x-100'
            }`}
          />

          <ol className="relative lg:grid lg:grid-cols-5 lg:gap-8">
            {STEPS.map((step, i) => {
              const number = String(i + 1).padStart(2, '0')
              const isFirst = i === 0
              const isLast = i === STEPS.length - 1
              return (
                <li
                  key={step.title}
                  className="relative grid grid-cols-[3.5rem_1fr] gap-x-5 pb-10 last:pb-0 lg:block lg:pb-0 lg:text-center"
                >
                  {/* Mobile connecting line, kept in the number column */}
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="absolute top-16 bottom-2 left-7 w-px bg-border lg:hidden"
                    />
                  )}

                  <span
                    className={`relative z-10 grid size-14 place-items-center rounded-full border font-display text-xl transition duration-500 ease-out motion-reduce:transition-none lg:mx-auto ${
                      isFirst
                        ? 'border-primary-500 bg-primary-500 text-surface shadow-md shadow-primary-500/20'
                        : 'border-border bg-surface text-secondary-800'
                    } ${
                      stepsInView
                        ? 'scale-100 opacity-100'
                        : 'scale-95 opacity-0 motion-reduce:scale-100 motion-reduce:opacity-100'
                    }`}
                    style={delay(stepsInView, 150 + i * 110)}
                  >
                    <span className="sr-only">Step </span>
                    {number}
                  </span>

                  <div
                    className={`pt-3 lg:mx-auto lg:max-w-[15rem] lg:pt-7 ${revealClasses(stepsInView, 'duration-500')}`}
                    style={delay(stepsInView, 220 + i * 110)}
                  >
                    <h3 className="text-card-title text-secondary-800">{step.title}</h3>
                    <p className="mt-2 text-body text-secondary-600">{step.text}</p>
                  </div>
                </li>
              )
            })}
          </ol>

          <p className="mt-10 text-center text-sm text-secondary-600 lg:mt-14">
            Every journey is different — your care team will guide which steps apply to you.
          </p>
        </div>

        {/* Conversion */}
        <div
          ref={ctaRef}
          className={`mx-auto mt-16 max-w-4xl rounded-[2rem] border border-border bg-surface px-6 py-10 text-center shadow-float-sm sm:px-10 lg:mt-20 lg:px-16 lg:py-14 ${revealClasses(ctaInView, 'duration-500')}`}
        >
          <h3 className="font-display text-h3 text-balance text-secondary-800">
            Ready to take the first step?
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-body text-secondary-600">
            You don't need to have all the answers before you contact us. Start with a
            conversation and let our team guide you from there.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <ArrowButton href={CONSULTATION_HREF} size="lg" className="w-full sm:w-auto">
              Book a Consultation
            </ArrowButton>
            <a
              href={callHref}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-border bg-surface px-6 py-3 text-button text-secondary-800 transition-colors duration-200 hover:border-primary-200 hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              <Phone className="size-4 text-primary-500" />
              Call the Clinic
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
