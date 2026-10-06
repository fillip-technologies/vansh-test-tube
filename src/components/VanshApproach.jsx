import { useRef } from 'react'
import approachImg from '../assets/vansh-approach.webp'
import approachImgSmall from '../assets/vansh-approach-1200.webp'
import { CLINIC, CONSULTATION_HREF } from '../config/site.js'
import useInView, { revealClasses } from '../hooks/useInView.js'
import ArrowButton from './ui/ArrowButton.jsx'
import { Layers, MessageCircle, Phone, Route, Stethoscope, UserCheck } from './ui/icons.jsx'
import { Dots, Rings } from './ui/Decor.jsx'

// Supportable statements only — no credentials, years of experience or outcomes.
const VALUES = [
  {
    title: 'Personalized Treatment Planning',
    text: 'Your fertility journey is unique. We focus on understanding your individual needs before planning the next step.',
    Icon: UserCheck,
  },
  {
    title: 'Experienced Fertility Care',
    text: 'Dedicated fertility care focused on helping individuals and couples understand their treatment options.',
    Icon: Stethoscope,
  },
  {
    title: 'Compassionate Guidance',
    text: 'Clear communication and emotional support are an important part of your fertility journey.',
    Icon: MessageCircle,
  },
  {
    title: 'Comprehensive Care',
    text: 'From fertility evaluation to assisted reproductive treatments, care is designed around your individual journey.',
    Icon: Layers,
  },
  {
    title: 'Guidance at Every Step',
    text: 'Understand what comes next, what your options are and how to move forward with greater clarity.',
    Icon: Route,
  },
]

const delay = (inView, ms) => ({ transitionDelay: inView ? `${ms}ms` : '0ms' })

export default function VanshApproach() {
  const introRef = useRef(null)
  const bodyRef = useRef(null)
  const ctaRef = useRef(null)
  const introInView = useInView(introRef)
  const bodyInView = useInView(bodyRef, 0.15)
  const ctaInView = useInView(ctaRef, 0.4)

  const callHref = CLINIC.phone ? `tel:${CLINIC.phone}` : '#contact'

  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="relative isolate overflow-hidden bg-background px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      {/* Subtle background decoration */}
      <Dots className="top-10 right-4 h-48 w-72" />
      <Rings className="-right-56 -bottom-56 hidden size-[34rem] sm:block" />
      <div className="mx-auto max-w-7xl">
        {/* Intro — left-aligned split to change the page rhythm */}
        <div
          ref={introRef}
          className={`grid gap-6 lg:grid-cols-[55fr_45fr] lg:items-end lg:gap-16 xl:gap-20 ${revealClasses(introInView)}`}
        >
          <div>
            <p className="inline-flex items-center gap-3 text-label text-primary-500 uppercase">
              <span className="h-px w-6 bg-primary-200" aria-hidden="true" />
              The Vansh Approach
            </p>
            <h2 id="approach-heading" className="mt-4 max-w-xl text-h2 text-balance text-secondary-800">
              Fertility Care That Feels <em className="text-primary-500">Personal.</em>
            </h2>
          </div>
          <p className="max-w-lg text-body text-secondary-600 lg:pb-1.5 lg:text-body-lg">
            Medical expertise matters. So does how you feel throughout the journey. Our approach
            brings together personalized treatment planning, compassionate guidance and
            comprehensive fertility care.
          </p>
        </div>

        <div
          ref={bodyRef}
          className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-[55fr_45fr] lg:items-center lg:gap-16 xl:gap-20"
        >
          {/* Image */}
          <figure className={revealClasses(bodyInView)}>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-[2rem] bg-blush-100 lg:aspect-square">
                <img
                  src={approachImg}
                  srcSet={`${approachImgSmall} 1200w, ${approachImg} 2400w`}
                  sizes="(min-width: 64rem) 700px, 100vw"
                  alt="A fertility doctor holding a patient's hands as she listens during a consultation"
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover object-center"
                />
              </div>

              <figcaption
                className={`relative mx-4 -mt-12 rounded-2xl border border-border bg-surface p-5 shadow-float sm:mx-6 sm:max-w-sm lg:absolute lg:bottom-6 lg:left-6 lg:m-0 lg:max-w-[18.5rem] ${revealClasses(bodyInView, 'duration-1000')}`}
                style={delay(bodyInView, 300)}
              >
                <span className="block text-label text-primary-500 uppercase">Personalized Care</span>
                <span className="mt-2 block text-sm leading-relaxed text-secondary-700">
                  Your treatment plan begins with understanding your individual needs.
                </span>
              </figcaption>
            </div>
          </figure>

          {/* Value points */}
          <ul className="border-t border-border">
            {VALUES.map(({ title, text, Icon }, i) => (
              <li
                key={title}
                className={revealClasses(bodyInView, 'duration-500')}
                style={delay(bodyInView, 150 + i * 90)}
              >
                <div className="group flex gap-5 border-b border-border py-5 transition-transform duration-300 ease-out hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:hover:translate-x-0 sm:py-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blush-100 text-primary-500 transition-colors duration-300 group-hover:bg-primary-100">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-card-title text-secondary-800 transition-colors duration-300 group-hover:text-primary-500">
                      {title}
                    </h3>
                    <p className="mt-1 text-body text-secondary-600">{text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Next step */}
        <div
          ref={ctaRef}
          className={`mx-auto mt-14 max-w-2xl text-center lg:mt-16 ${revealClasses(ctaInView, 'duration-500')}`}
        >
          <span className="mx-auto block h-px w-16 bg-primary-200" aria-hidden="true" />
          <h3 className="mt-10 font-display text-h3 text-balance text-secondary-800">
            Your next step can start with a conversation.
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-body text-secondary-600">
            Speak with our fertility team and understand what may be right for your journey.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <ArrowButton href={CONSULTATION_HREF} size="lg" className="w-full sm:w-auto">
              Book a Consultation
            </ArrowButton>
            <a
              href={callHref}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-border bg-surface px-6 py-3 text-button text-secondary-800 transition-colors duration-200 hover:border-primary-200 hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
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
