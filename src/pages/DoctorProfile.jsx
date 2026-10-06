import { useLocation, useParams } from 'react-router'
import DoctorPortrait from '../components/doctors/DoctorPortrait.jsx'
import ArrowButton from '../components/ui/ArrowButton.jsx'
import { Blob } from '../components/ui/Decor.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { ArrowRight, Check } from '../components/ui/icons.jsx'
import { CLINIC } from '../config/site.js'
import { DOCTORS, getDoctorBySlug } from '../data/doctors.js'
import { consultationHrefFor } from '../lib/services.js'
import { DiscussCta } from './Doctors.jsx'
import NotFound from './NotFound.jsx'

// Reusable doctor profile. Sections render only when verified data exists
// in doctors.json — nothing is filled in by default.
export default function DoctorProfile() {
  const { slug } = useParams()
  const consultHref = consultationHrefFor(useLocation().pathname)
  const doctor = getDoctorBySlug(slug)

  if (!doctor) {
    return <NotFound title="Doctor Not Found" message="We couldn't find that profile. Meet our care team instead." />
  }

  const others = DOCTORS.filter((d) => d.id !== doctor.id)

  return (
    <main key={doctor.id}>
      <title>{`${doctor.name}, ${doctor.designation} | ${CLINIC.name}`}</title>
      <meta name="description" content={`${doctor.name}, ${doctor.designation} at ${CLINIC.name}, Patna.`} />
      <link rel="canonical" href={`${CLINIC.siteUrl || window.location.origin}${doctor.profileHref}`} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-background px-4 pt-28 pb-14 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36 lg:pb-20">
        <Blob className="-top-24 -right-32 size-[30rem]" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] motion-safe:animate-fade-in">
            <DoctorPortrait doctor={doctor} />
          </div>
          <div className="motion-safe:animate-fade-up">
            <nav aria-label="Breadcrumb" className="text-sm text-secondary-500">
              <ol className="flex flex-wrap items-center gap-2">
                <li><SmartLink href="/" className="hover:text-primary-600">Home</SmartLink></li>
                <li aria-hidden="true">/</li>
                <li><SmartLink href="/doctors" className="hover:text-primary-600">Doctors</SmartLink></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-secondary-700">{doctor.name}</li>
              </ol>
            </nav>
            <p className="mt-8 text-label text-primary-600 uppercase">{doctor.designation}</p>
            <h1 className="mt-3 text-hero text-secondary-800 lg:text-[3.5rem] lg:leading-[1.04]">{doctor.name}</h1>
            {doctor.bio ? (
              <p className="mt-6 max-w-xl text-body text-secondary-600 lg:text-body-lg">{doctor.bio}</p>
            ) : (
              <p className="mt-6 max-w-xl text-body text-secondary-600 lg:text-body-lg">
                Part of the Vansh Test Tube Baby care team in Patna, supporting patients through their
                fertility journey.
              </p>
            )}
            <ArrowButton href={consultHref} size="lg" className="mt-8 w-full sm:w-auto">
              Book a Consultation
            </ArrowButton>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="border-t border-border bg-surface px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-h3 text-secondary-800">Qualifications</h2>
            <ul className="mt-6 border-t border-border">
              {doctor.qualification.map((q) => (
                <li key={q} className="flex items-center gap-3 border-b border-border py-3.5 text-body text-secondary-700">
                  <Check className="size-4 shrink-0 text-primary-500" />
                  {q}
                </li>
              ))}
            </ul>
            {doctor.registration && (
              <p className="mt-5 text-sm text-secondary-600">
                <span className="font-semibold text-secondary-800">Registration: </span>
                {doctor.registration}
              </p>
            )}
          </div>
          <div className="space-y-12">
            {doctor.specialization.length > 0 && (
              <div>
                <h2 className="font-display text-h3 text-secondary-800">Specialization</h2>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {doctor.specialization.map((s) => (
                    <li key={s} className="rounded-full bg-blush-100 px-4 py-2 text-sm font-semibold text-secondary-800">{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {doctor.experience && (
              <div>
                <h2 className="font-display text-h3 text-secondary-800">Experience</h2>
                <p className="mt-4 text-body text-secondary-600">{doctor.experience}</p>
              </div>
            )}
            <div className="rounded-[1.5rem] bg-blush-50 p-7">
              <p className="text-label text-secondary-500 uppercase">Role at Vansh</p>
              <p className="mt-2 font-display text-[1.75rem] leading-tight text-secondary-800">{doctor.designation}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary-600">
                {CLINIC.name}, {CLINIC.city}
              </p>
            </div>
          </div>
        </div>
      </section>

      <DiscussCta consultHref={consultHref} />

      {/* Related doctors */}
      {others.length > 0 && (
        <nav aria-labelledby="also-meet" className="border-t border-border bg-surface px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 id="also-meet" className="font-display text-[1.75rem] text-secondary-800">You May Also Meet</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((d) => (
                <li key={d.id}>
                  <SmartLink
                    href={d.profileHref}
                    className="group flex h-full items-center gap-4 rounded-2xl border border-border p-4 transition hover:border-primary-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  >
                    <span className="size-12 shrink-0 overflow-hidden rounded-full">
                      <DoctorPortrait doctor={d} size="sm" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9375rem] font-semibold text-secondary-800 group-hover:text-primary-600">{d.name}</span>
                      <span className="block text-sm text-secondary-600">{d.designation}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-secondary-400 group-hover:text-primary-600" />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </main>
  )
}
