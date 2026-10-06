import { useRef } from 'react'
import { CONSULTATION_HREF } from '../config/site.js'
import { DOCTORS } from '../data/doctors.js'
import useInView, { revealClasses } from '../hooks/useInView.js'
import ArrowButton from './ui/ArrowButton.jsx'
import DoctorPortrait from './doctors/DoctorPortrait.jsx'
import SmartLink from './ui/SmartLink.jsx'
import { ArrowRight } from './ui/icons.jsx'
import { Blob, Curve } from './ui/Decor.jsx'

// Real photo, or an initials monogram — never a stock portrait.
function DoctorPhoto({ doctor, className = '' }) {
  return <DoctorPortrait doctor={doctor} className={className} />
}

function DoctorCard({ doctor, style, className = '' }) {
  return (
    <article
      className={`group flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-border bg-surface transition duration-300 ease-out hover:-translate-y-1 hover:border-primary-200 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto ${className}`}
      style={style}
    >
      <div className="aspect-[4/5] overflow-hidden">
        <DoctorPhoto
          doctor={doctor}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h4 className="text-card-title text-secondary-800">{doctor.name}</h4>
        <p className="mt-1 text-sm text-secondary-600">{doctor.role}</p>
        {doctor.profileHref && (
          <SmartLink
            href={doctor.profileHref}
            aria-label={`View profile: ${doctor.name}`}
            className="mt-auto inline-flex items-center gap-2 pt-4 text-button-sm text-secondary-800 transition-colors duration-300 group-hover:text-primary-500"
          >
            View Profile
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
          </SmartLink>
        )}
      </div>
    </article>
  )
}

export default function CareTeam() {
  const [featured, ...others] = DOCTORS
  const introRef = useRef(null)
  const featureRef = useRef(null)
  const teamRef = useRef(null)
  const ctaRef = useRef(null)
  const introInView = useInView(introRef)
  const featureInView = useInView(featureRef, 0.2)
  const teamInView = useInView(teamRef, 0.15)
  const ctaInView = useInView(ctaRef, 0.4)

  if (!featured) return null

  const imageReveal = `transition duration-1000 ease-out motion-reduce:transition-none ${
    featureInView
      ? 'scale-100 opacity-100'
      : 'scale-[0.98] opacity-0 motion-reduce:scale-100 motion-reduce:opacity-100'
  }`
  const infoReveal = `transition duration-1000 ease-out motion-reduce:transition-none ${
    featureInView
      ? 'translate-0 opacity-100'
      : 'translate-y-5 opacity-0 md:translate-x-5 md:translate-y-0 motion-reduce:translate-0 motion-reduce:opacity-100'
  }`

  return (
    <section
      id="doctors"
      aria-labelledby="doctors-heading"
      className="relative isolate overflow-hidden bg-background px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      {/* Subtle background decoration */}
      <Blob className="top-1/3 -left-40 size-[30rem]" />
      <Curve flip className="inset-x-0 bottom-12 h-48 w-full" />
      <div className="mx-auto max-w-7xl">
        {/* Intro */}
        <div ref={introRef} className={`mx-auto max-w-4xl text-center ${revealClasses(introInView)}`}>
          <p className="inline-flex items-center gap-2.5 text-label text-primary-500 uppercase">
            <span className="size-1.5 rounded-full bg-primary-500" aria-hidden="true" />
            Meet Your Care Team
          </p>
          <h2 id="doctors-heading" className="mt-4 text-h2 text-balance text-secondary-800">
            Experienced Care Begins With the Right <em className="text-primary-500">Conversation.</em>
          </h2>
          <span className="mx-auto mt-6 block h-px w-12 bg-primary-200" aria-hidden="true" />
          <p className="mx-auto mt-6 max-w-xl text-body text-secondary-600 lg:text-body-lg">
            Meet the specialists who help guide your fertility journey with clinical care,
            thoughtful guidance and a patient-first approach.
          </p>
        </div>

        {/* Featured doctor */}
        <div
          ref={featureRef}
          className="mt-14 grid items-center gap-10 sm:mt-16 md:grid-cols-[45fr_55fr] md:gap-12 lg:mt-20 lg:gap-20"
        >
          <div className={imageReveal}>
            <div className="group relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] border border-border md:max-w-none">
              <DoctorPhoto
                doctor={featured}
                className="transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
              />
              <span className="absolute bottom-5 left-5 rounded-full bg-surface/85 px-3.5 py-1.5 text-label text-secondary-800 uppercase backdrop-blur-md">
                Fertility Care
              </span>
            </div>
          </div>

          <div className={infoReveal} style={{ transitionDelay: featureInView ? '150ms' : '0ms' }}>
            <p className="text-label text-primary-500 uppercase">{featured.role}</p>
            <h3 className="mt-3 font-display text-h3 text-secondary-800">{featured.name}</h3>
            {featured.bio && (
              <p className="mt-5 max-w-lg text-body text-secondary-600 lg:text-body-lg">{featured.bio}</p>
            )}

            {featured.specialties.length > 0 && (
              <div className="mt-8 max-w-lg border-t border-border pt-6">
                <h4 className="text-label text-secondary-600 uppercase">Specialities</h4>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {featured.specialties.map((specialty) => (
                    <li
                      key={specialty}
                      className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-secondary-700"
                    >
                      {specialty}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <ArrowButton href={CONSULTATION_HREF} size="lg" className="w-full sm:w-auto">
                Book a Consultation
              </ArrowButton>
              {others.length > 0 && (
                <SmartLink
                  href="/doctors"
                  className="self-center rounded-md text-button text-primary-500 underline decoration-primary-200 underline-offset-4 transition-colors duration-200 hover:text-primary-600 hover:decoration-primary-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
                >
                  Meet the team
                </SmartLink>
              )}
            </div>
          </div>
        </div>

        {/* Additional verified doctors — hidden until more than one exists */}
        {others.length > 0 && (
          <div id="care-team" ref={teamRef} className="mt-20 lg:mt-24">
            <h3 className={`text-card-title-lg text-secondary-800 ${revealClasses(teamInView, 'duration-500')}`}>
              More From Our Care Team
            </h3>
            <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:gap-6">
              {others.map((doctor, i) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  className={revealClasses(teamInView, 'duration-500')}
                  style={{ transitionDelay: teamInView ? `${100 + i * 90}ms` : '0ms' }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Next step */}
        <div
          ref={ctaRef}
          className={`mt-14 flex flex-col items-center gap-5 border-t border-border pt-10 text-center sm:flex-row sm:justify-center sm:gap-8 sm:text-left lg:mt-16 ${revealClasses(ctaInView, 'duration-500')}`}
        >
          <p className="font-display text-[1.625rem] leading-tight text-secondary-800">
            Ready to understand your options?
          </p>
          <ArrowButton href={CONSULTATION_HREF} size="lg" className="w-full sm:w-auto">
            Talk to a Fertility Specialist
          </ArrowButton>
        </div>
      </div>
    </section>
  )
}
