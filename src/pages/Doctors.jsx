import { useRef } from 'react'
import { useLocation } from 'react-router'
import heroImg from '../assets/illustrative/clinic-desk.webp'
import DoctorPortrait from '../components/doctors/DoctorPortrait.jsx'
import ArrowButton from '../components/ui/ArrowButton.jsx'
import { Blob, Rings } from '../components/ui/Decor.jsx'
import Eyebrow from '../components/ui/Eyebrow.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { ArrowRight } from '../components/ui/icons.jsx'
import { CLINIC } from '../config/site.js'
import { DOCTORS } from '../data/doctors.js'
import useInView, { revealClasses } from '../hooks/useInView.js'
import { consultationHrefFor } from '../lib/services.js'

const EXPECT = [
  { title: 'Time to listen', text: 'Your history and concerns are understood before any recommendation is made.' },
  { title: 'Options explained', text: 'Treatment options are discussed clearly, so you can decide with confidence.' },
  { title: 'Emotional counselling', text: 'A dedicated team supports the emotional side of fertility treatment too.' },
]

const section = 'px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24'

// Editorial doctor row — portrait, name, designation, verified qualifications.
function DoctorRow({ doctor, index, inView }) {
  return (
    <li
      className={`border-b border-border ${revealClasses(inView, 'duration-500')}`}
      style={{ transitionDelay: inView ? `${100 + index * 80}ms` : '0ms' }}
    >
      <SmartLink
        href={doctor.profileHref}
        className="group grid items-center gap-5 py-7 sm:grid-cols-[7rem_1fr_auto] sm:gap-8 lg:grid-cols-[8rem_1.1fr_1.3fr_auto] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
      >
        <span className="size-24 overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-[1.03] sm:size-28 lg:size-32">
          <DoctorPortrait doctor={doctor} size="md" />
        </span>
        <span>
          <span className="block font-display text-[1.75rem] leading-tight text-secondary-800 group-hover:text-primary-600 lg:text-[2rem]">
            {doctor.name}
          </span>
          <span className="mt-1.5 block text-label text-primary-600 uppercase">{doctor.designation}</span>
        </span>
        <span className="text-[0.9375rem] leading-relaxed text-secondary-600 sm:col-span-2 sm:col-start-2 lg:col-span-1 lg:col-start-auto">
          {doctor.qualification.join(' · ')}
        </span>
        <span className="inline-flex items-center gap-2 text-button-sm text-secondary-800 group-hover:text-primary-600 sm:col-start-3 sm:row-start-1 lg:col-start-auto lg:row-start-auto">
          View Profile
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </SmartLink>
    </li>
  )
}

export default function Doctors() {
  const consultHref = consultationHrefFor(useLocation().pathname)
  const listRef = useRef(null)
  const listInView = useInView(listRef, 0.05)
  const expectRef = useRef(null)
  const expectInView = useInView(expectRef, 0.2)

  return (
    <main>
      <title>{`Our Doctors | ${CLINIC.name}, Patna`}</title>
      <meta
        name="description"
        content="Meet the doctors and fertility specialists at Vansh Test Tube Baby, Patna, and book a consultation with our care team."
      />
      <link rel="canonical" href={`${CLINIC.siteUrl || window.location.origin}/doctors`} />

      {/* Hero */}
      <section
        aria-labelledby="doctors-page-heading"
        className="relative isolate overflow-hidden bg-background px-4 pt-28 pb-14 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36 lg:pb-20"
      >
        <Blob className="-top-24 -right-32 size-[34rem]" />
        <Rings className="-bottom-40 -left-48 hidden size-[30rem] lg:block" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 xl:gap-20">
          <div className="motion-safe:animate-fade-up">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-primary-100 bg-surface px-4 py-2 text-label text-secondary-800 uppercase">
              <span className="size-1.5 rounded-full bg-primary-500" aria-hidden="true" />
              Our Care Team
            </p>
            <h1 id="doctors-page-heading" className="mt-6 text-hero text-balance text-secondary-800 lg:text-[3.5rem] lg:leading-[1.04] 2xl:text-[4rem]">
              Meet the Specialists Behind Your Fertility <em className="text-primary-500">Care.</em>
            </h1>
            <p className="mt-6 max-w-xl text-body text-secondary-600 lg:text-body-lg">
              Get to know the medical team supporting patients through their fertility journey at Vansh Test
              Tube Baby, Patna.
            </p>
            <ArrowButton href={consultHref} size="lg" className="mt-9 w-full sm:w-auto">
              Book a Consultation
            </ArrowButton>
          </div>
          <div className="aspect-[5/4] overflow-hidden rounded-[2rem] bg-blush-100 motion-safe:animate-fade-in lg:aspect-[4/3]">
            <img src={heroImg} alt="A calm, sunlit consultation desk" fetchPriority="high" decoding="async" className="size-full object-cover" />
          </div>
        </div>
      </section>

      {/* Doctor list */}
      <section ref={listRef} aria-labelledby="team-list-heading" className={`border-t border-border bg-surface ${section}`}>
        <div className="mx-auto max-w-7xl">
          <div className={`flex flex-wrap items-end justify-between gap-4 ${revealClasses(listInView)}`}>
            <div>
              <Eyebrow>Doctors</Eyebrow>
              <h2 id="team-list-heading" className="mt-5 text-h2 text-secondary-800">Our Doctors</h2>
            </div>
            <p className="max-w-sm text-body text-secondary-600">
              Designations and qualifications as registered with the clinic.
            </p>
          </div>
          <ul className="mt-10 border-t border-border">
            {DOCTORS.map((doctor, i) => (
              <DoctorRow key={doctor.id} doctor={doctor} index={i} inView={listInView} />
            ))}
          </ul>
        </div>
      </section>

      {/* What to expect */}
      <section ref={expectRef} aria-labelledby="expect-heading" className={`bg-blush-50 ${section}`}>
        <div className="mx-auto max-w-7xl">
          <div className={revealClasses(expectInView)}>
            <Eyebrow>Working With Our Team</Eyebrow>
            <h2 id="expect-heading" className="mt-5 max-w-2xl text-h2 text-balance text-secondary-800">
              What You Can Expect From Your Care Team
            </h2>
          </div>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {EXPECT.map((item, i) => (
              <li
                key={item.title}
                className={`border-t-2 border-primary-200 pt-6 ${revealClasses(expectInView, 'duration-500')}`}
                style={{ transitionDelay: expectInView ? `${120 + i * 90}ms` : '0ms' }}
              >
                <span className="text-sm font-semibold text-primary-500 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-card-title text-secondary-800 lg:text-card-title-lg">{item.title}</h3>
                <p className="mt-2 text-body text-secondary-600">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <DiscussCta consultHref={consultHref} />
    </main>
  )
}

// Shared closing prompt for the doctors pages.
export function DiscussCta({ consultHref }) {
  return (
    <section aria-labelledby="discuss-heading" className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="relative isolate mx-auto flex max-w-6xl flex-col items-start gap-6 overflow-hidden rounded-[2rem] bg-primary-800 p-8 text-surface sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-14">
        <span aria-hidden="true" className="absolute -top-32 -right-24 -z-10 size-[24rem] rounded-full bg-primary-600/50 blur-3xl" />
        <div>
          <h2 id="discuss-heading" className="font-display text-h3 text-surface">Ready to Discuss Your Options?</h2>
          <p className="mt-3 max-w-xl text-body text-primary-100">
            Start with a conversation with our fertility team — no decisions needed beforehand.
          </p>
        </div>
        <ArrowButton href={consultHref} size="lg" variant="light" className="w-full shrink-0 sm:w-auto">
          Book a Consultation
        </ArrowButton>
      </div>
    </section>
  )
}
