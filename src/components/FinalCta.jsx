import { useRef } from 'react'
import { useLocation } from 'react-router'
import { CLINIC } from '../config/site.js'
import { consultationHrefFor } from '../lib/services.js'
import SmartLink from './ui/SmartLink.jsx'
import useInView, { revealClasses } from '../hooks/useInView.js'
import ArrowButton from './ui/ArrowButton.jsx'
import { Phone } from './ui/icons.jsx'

const delay = (inView, ms) => ({ transitionDelay: inView ? `${ms}ms` : '0ms' })

// Deep-pink closing CTA. Defaults are the homepage copy; service pages pass
// their own eyebrow, title, description and button label.
export default function FinalCta({
  eyebrow = 'Your Next Step',
  title = (
    <>
      Your Journey to Parenthood Can Start With a <em className="text-primary-100">Conversation.</em>
    </>
  ),
  description = "You don't need to have all the answers today. Speak with our fertility team, share your concerns and take the first step toward understanding your options.",
  button = 'Book a Consultation',
  // 'specialist' (default), 'call', or { label, href } — the secondary action.
  secondary = 'specialist',
}) {
  const CONSULTATION_HREF = consultationHrefFor(useLocation().pathname)
  const callHref = CLINIC.phone ? `tel:${CLINIC.phone}` : '#contact'
  const panelRef = useRef(null)
  const inView = useInView(panelRef, 0.25)

  return (
    <section aria-labelledby="final-cta-heading" className="bg-background px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
      <div
        ref={panelRef}
        className={`relative isolate mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-primary-800 px-6 py-14 text-center sm:px-12 sm:py-20 lg:rounded-[2.5rem] lg:px-20 lg:py-24 ${revealClasses(inView)}`}
      >
        {/* Background depth — soft blooms and one faint curve */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute -top-40 -right-32 size-[30rem] rounded-full bg-primary-600/50 blur-3xl" />
          <span className="absolute -bottom-48 -left-40 size-[34rem] rounded-full bg-primary-900/50 blur-3xl" />
          <span className="absolute -right-24 -bottom-40 size-[26rem] rounded-full border border-primary-300/15" />
          <svg
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
            fill="none"
            className="absolute inset-0 size-full text-primary-200/10"
          >
            <path
              d="M-20 300 C 250 120, 520 380, 800 220 S 1150 80, 1220 160"
              stroke="currentColor"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="mx-auto max-w-5xl">
          <p
            className={`inline-flex items-center gap-3 text-label text-primary-100 uppercase ${revealClasses(inView, 'duration-500')}`}
            style={delay(inView, 150)}
          >
            <span className="h-px w-6 bg-primary-300/60" aria-hidden="true" />
            {eyebrow}
            <span className="h-px w-6 bg-primary-300/60" aria-hidden="true" />
          </p>

          <h2
            id="final-cta-heading"
            className={`mt-5 text-h2 text-balance text-surface ${revealClasses(inView, 'duration-500')}`}
            style={delay(inView, 220)}
          >
            {title}
          </h2>

          <p
            className={`mx-auto mt-6 max-w-2xl text-body text-primary-100 lg:text-body-lg ${revealClasses(inView, 'duration-500')}`}
            style={delay(inView, 320)}
          >
            {description}
          </p>

          <div
            className={`mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 ${revealClasses(inView, 'duration-500')}`}
            style={delay(inView, 440)}
          >
            <ArrowButton href={CONSULTATION_HREF} size="lg" variant="light" className="w-full sm:w-auto">
              {button}
            </ArrowButton>
            <SmartLink
              href={typeof secondary === 'object' ? secondary.href : secondary === 'call' ? callHref : CONSULTATION_HREF}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-surface/70 px-7 py-3.5 text-button text-surface transition-colors duration-200 hover:border-surface hover:bg-surface/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
            >
              {typeof secondary === 'object' ? (
                secondary.label
              ) : secondary === 'call' ? (
                <>
                  <Phone className="size-4" />
                  Call the Clinic
                </>
              ) : (
                'Talk to a Fertility Specialist'
              )}
            </SmartLink>
          </div>

          <p
            className={`mt-10 text-sm text-primary-100 ${revealClasses(inView, 'duration-500')}`}
            style={delay(inView, 540)}
          >
            Fertility &amp; IVF Care Since {CLINIC.since} <span aria-hidden="true">•</span> {CLINIC.city}
          </p>
        </div>
      </div>
    </section>
  )
}
