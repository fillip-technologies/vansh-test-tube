import { useRef } from 'react'
import { DOCTORS } from '../../data/doctors.js'
import useInView, { revealClasses } from '../../hooks/useInView.js'
import ArrowButton from '../ui/ArrowButton.jsx'
import DoctorPortrait from '../doctors/DoctorPortrait.jsx'
import Eyebrow from '../ui/Eyebrow.jsx'
import SmartLink from '../ui/SmartLink.jsx'
import { ArrowRight } from '../ui/icons.jsx'

// Shows doctors assigned via `careTeam.doctorIds`; otherwise introduces the
// whole verified team from data/doctors.json.
export default function ServiceCareTeam({ careTeam, serviceName }) {
  const ref = useRef(null)
  const inView = useInView(ref, 0.15)
  const doctors = (careTeam?.doctorIds ?? [])
    .map((id) => DOCTORS.find((doctor) => doctor.id === id))
    .filter((doctor) => doctor && !doctor.placeholder)

  return (
    <section
      ref={ref}
      aria-labelledby="service-team-heading"
      className="bg-blush-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {doctors.length > 0 ? (
          <>
            <div className={`max-w-2xl ${revealClasses(inView)}`}>
              {careTeam.eyebrow && <Eyebrow>{careTeam.eyebrow}</Eyebrow>}
              <h2 id="service-team-heading" className="mt-5 text-h2 text-balance text-secondary-800">
                {careTeam.title}
              </h2>
            </div>
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {doctors.map((doctor, i) => (
                <li
                  key={doctor.id}
                  className={revealClasses(inView, 'duration-500')}
                  style={{ transitionDelay: inView ? `${120 + i * 90}ms` : '0ms' }}
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-blush-100">
                    {doctor.image && (
                      <img src={doctor.image} alt={`Portrait of ${doctor.name}`} loading="lazy" className="size-full object-cover" />
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-[1.5rem] text-secondary-800">{doctor.name}</h3>
                  {doctor.qualification && <p className="mt-1 text-sm font-semibold text-primary-600">{doctor.qualification}</p>}
                  <p className="mt-1 text-sm text-secondary-600">{doctor.role}</p>
                  {doctor.bio && <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary-600">{doctor.bio}</p>}
                </li>
              ))}
            </ul>
          </>
        ) : (
          // No treatment-specific assignment yet: introduce the whole team.
          <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <div className={revealClasses(inView)}>
              {careTeam?.eyebrow && <Eyebrow>{careTeam.eyebrow}</Eyebrow>}
              <h2 id="service-team-heading" className="mt-5 text-h2 text-balance text-secondary-800">
                {careTeam?.title ?? 'Your Care Team'}
              </h2>
              <p className="mt-6 max-w-md text-body text-secondary-600 lg:text-body-lg">
                Your {serviceName} journey is guided by the Vansh fertility team, with a dedicated team to
                support you through the emotional side of treatment too.
              </p>
              <ArrowButton href="/doctors" size="lg" variant="outline" className="mt-8 w-full sm:w-auto">
                Meet the Doctors
              </ArrowButton>
            </div>
            <ul className={`border-t border-border ${revealClasses(inView)}`} style={{ transitionDelay: inView ? '150ms' : '0ms' }}>
              {DOCTORS.map((doctor) => (
                <li key={doctor.id}>
                  <SmartLink
                    href={doctor.profileHref}
                    className="group flex items-center gap-5 border-b border-border py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  >
                    <span className="size-14 shrink-0 overflow-hidden rounded-full">
                      <DoctorPortrait doctor={doctor} size="sm" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-card-title text-secondary-800 group-hover:text-primary-600">{doctor.name}</span>
                      <span className="mt-0.5 block text-sm text-secondary-600">{doctor.designation}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-secondary-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-600" />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
