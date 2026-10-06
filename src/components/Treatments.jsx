import { useRef } from 'react'
import useInView, { revealClasses } from '../hooks/useInView.js'
import { TREATMENT_SUMMARIES } from '../data/treatments.js'
import { serviceHref } from '../lib/services.js'
import ArrowButton from './ui/ArrowButton.jsx'
import SmartLink from './ui/SmartLink.jsx'
import {
  ArrowRight,
  CircleDot,
  Droplet,
  FlaskConical,
  Snowflake,
  Sprout,
  Syringe,
} from './ui/icons.jsx'
import { Blob, Curve, Dots } from './ui/Decor.jsx'

// Informational descriptions live in data/treatments.js — no success rates,
// guarantees or claims. Cards open the treatment's service page when one exists.
const CARD_META = {
  ivf: { Icon: FlaskConical, cta: 'Explore IVF', featured: 'Assisted Reproduction' },
  iui: { Icon: Droplet, cta: 'Explore IUI' },
  icsi: { Icon: Syringe, cta: 'Explore ICSI' },
  'ovulation-induction': { Icon: Sprout, cta: 'Explore Treatment' },
  'blastocyst-culture-transfer': { Icon: CircleDot, cta: 'Explore Treatment' },
  'frozen-embryo-transfer': { Icon: Snowflake, cta: 'Explore Treatment' },
}

const TREATMENTS = TREATMENT_SUMMARIES.map((treatment) => ({
  ...treatment,
  ...CARD_META[treatment.slug],
  href: serviceHref(treatment.slug),
}))

function TreatmentCard({ abbr, title, text, cta, href, Icon, featured }) {
  return (
    <SmartLink
      href={href}
      aria-label={`${cta}: ${title}`}
      className={`group relative flex h-full flex-col rounded-3xl border p-6 shadow-float-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-primary-200 hover:shadow-float focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7 ${
        featured ? 'border-primary-100 bg-blush-50' : 'border-border bg-surface'
      }`}
    >
      {/* Abbreviation as a quiet editorial detail */}
      <span
        aria-hidden="true"
        className="absolute top-5 right-6 font-display text-[2rem] leading-none text-blush-300 transition-colors duration-300 group-hover:text-primary-200 sm:top-6 sm:right-7"
      >
        {abbr}
      </span>

      <span
        className={`grid size-11 place-items-center rounded-xl text-primary-500 transition-colors duration-300 group-hover:bg-blush-100 ${
          featured ? 'bg-surface' : 'bg-surface-muted'
        }`}
      >
        <Icon className="size-5" />
      </span>

      {featured && (
        <span className="mt-5 w-fit rounded-full border border-primary-100 bg-surface px-3 py-1 text-label text-primary-500 uppercase">
          {featured}
        </span>
      )}

      <h3 className={`${featured ? 'mt-3' : 'mt-6'} pr-12 text-card-title text-secondary-800 lg:text-card-title-lg`}>
        {title}
      </h3>
      <p className="mt-2.5 text-body text-secondary-600">{text}</p>

      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-button-sm text-secondary-800 transition-colors duration-300 group-hover:text-primary-500">
        {cta}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
      </span>
    </SmartLink>
  )
}

export default function Treatments() {
  const introRef = useRef(null)
  const gridRef = useRef(null)
  const ctaRef = useRef(null)
  const introInView = useInView(introRef)
  const gridInView = useInView(gridRef, 0.1)
  const ctaInView = useInView(ctaRef, 0.3)

  return (
    <section
      id="treatments"
      aria-labelledby="treatments-heading"
      className="relative isolate overflow-hidden bg-background px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      {/* Subtle background decoration */}
      <Curve className="inset-x-0 top-10 h-56 w-full" />
      <Blob className="-top-32 -left-40 size-[26rem]" />
      <Dots className="right-0 bottom-16 hidden h-56 w-80 lg:block" />
      <div className="mx-auto max-w-7xl">
        <div
          ref={introRef}
          className={`mx-auto max-w-2xl text-center ${revealClasses(introInView, 'duration-500')}`}
        >
          <p className="inline-flex items-center gap-3 text-label text-primary-500 uppercase">
            <span className="h-px w-6 bg-primary-200" aria-hidden="true" />
            Fertility Treatments
            <span className="h-px w-6 bg-primary-200" aria-hidden="true" />
          </p>
          <h2 id="treatments-heading" className="mt-4 text-h2 text-balance text-secondary-800">
            Find the Right <em className="text-primary-500">Path</em> Forward.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-body text-secondary-600 lg:text-body-lg">
            Every fertility journey is different. Explore our fertility treatments and understand
            the options available for your individual needs.
          </p>
        </div>

        <ul ref={gridRef} className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {TREATMENTS.map((treatment, i) => (
            <li
              key={treatment.abbr}
              id={`treatment-${treatment.slug}`}
              className={revealClasses(gridInView, 'duration-500')}
              style={{ transitionDelay: gridInView ? `${i * 70}ms` : '0ms' }}
            >
              <TreatmentCard {...treatment} />
            </li>
          ))}
        </ul>

        {/* Guide undecided visitors toward a conversation */}
        <div
          ref={ctaRef}
          className={`mt-12 flex flex-col gap-7 rounded-[2rem] border border-border bg-blush-50 p-7 sm:p-9 lg:mt-16 lg:px-12 lg:py-10 xl:flex-row xl:items-center xl:justify-between xl:gap-12 ${revealClasses(ctaInView, 'duration-500')}`}
        >
          <div className="max-w-2xl">
            <h3 className="font-display text-h3 text-balance text-secondary-800">
              Not sure which treatment is right for you?
            </h3>
            <p className="mt-3 text-body text-secondary-600">
              Our fertility specialists can help you understand your options based on your
              individual needs.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <ArrowButton href="#book-consultation" size="lg" className="w-full sm:w-auto">
              Talk to a Fertility Specialist
            </ArrowButton>
            <a
              href="#book-consultation"
              className="self-center rounded-md text-button text-primary-500 underline decoration-primary-200 underline-offset-4 transition-colors duration-200 hover:text-primary-600 hover:decoration-primary-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
