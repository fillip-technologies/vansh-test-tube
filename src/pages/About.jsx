import { useRef } from 'react'
import { useLocation } from 'react-router'
import heroImg from '../assets/vansh-approach.webp'
import storyImg from '../assets/vansh-consultation-1200.webp'
import DoctorPortrait from '../components/doctors/DoctorPortrait.jsx'
import FinalCta from '../components/FinalCta.jsx'
import ArrowButton from '../components/ui/ArrowButton.jsx'
import { Blob, Dots, Rings } from '../components/ui/Decor.jsx'
import Eyebrow from '../components/ui/Eyebrow.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { ArrowRight, FlaskConical } from '../components/ui/icons.jsx'
import { CLINIC } from '../config/site.js'
import { DOCTORS } from '../data/doctors.js'
import { TREATMENT_SUMMARIES } from '../data/treatments.js'
import useInView, { revealClasses } from '../hooks/useInView.js'
import { consultationHrefFor, serviceHref } from '../lib/services.js'

// Facts from the clinic's previous website: established 2014 in Patna;
// IVF and infertility treatment for male and female infertility; a dedicated
// team offering emotional counselling; part of Bihar's fertility network.

const APPROACH = [
  { title: 'Personalized Guidance', text: 'Every plan starts with understanding your history, your concerns and what matters to you.' },
  { title: 'Compassionate Support', text: 'A dedicated team offers emotional counselling, because treatment affects more than the body.' },
  { title: 'Clear Communication', text: 'Options, steps and next decisions are explained plainly, so you can take part in every choice.' },
  { title: 'Care Throughout the Journey', text: 'From the first conversation to follow-up, you are supported at each stage — not just on procedure days.' },
]

const WHY = [
  { title: 'Fertility-focused care', text: 'Vansh is dedicated to fertility and IVF care, and is part of Bihar’s fertility network.' },
  { title: 'Personalized treatment guidance', text: 'Recommendations are based on your individual assessment, not a one-size-fits-all plan.' },
  { title: 'Dedicated support', text: 'A team that stays with you through appointments, questions and decisions.' },
  { title: 'Emotional counselling', text: 'Support for the emotional side of fertility treatment, offered by our dedicated team.' },
  { title: 'Comprehensive fertility services', text: 'Treatment for male and female infertility, from evaluation to assisted reproduction.' },
]

const section = 'px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24'
const delay = (inView, ms) => ({ transitionDelay: inView ? `${ms}ms` : '0ms' })

function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  return [ref, useInView(ref, threshold)]
}

function AboutHero({ consultHref }) {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative isolate overflow-hidden bg-background px-4 pt-28 pb-14 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36 lg:pb-20"
    >
      <Blob className="-top-24 -right-32 size-[34rem]" />
      <Rings className="-bottom-40 -left-48 hidden size-[30rem] lg:block" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:min-h-[68vh] lg:grid-cols-[1fr_1.02fr] lg:gap-16 xl:gap-20">
        <div className="motion-safe:animate-fade-up">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-primary-100 bg-surface px-4 py-2 text-label text-secondary-800 uppercase">
            <span className="size-1.5 rounded-full bg-primary-500" aria-hidden="true" />
            About Vansh
          </p>
          <h1 id="about-heading" className="mt-6 text-hero text-balance text-secondary-800 lg:text-[3.5rem] lg:leading-[1.04] 2xl:text-[4rem]">
            Fertility Care With Experience, Compassion &amp; <em className="text-primary-500">Hope.</em>
          </h1>
          <p className="mt-6 max-w-xl text-body text-secondary-600 lg:text-body-lg">
            Vansh Test Tube Baby has been providing fertility and IVF care in Patna since {CLINIC.since},
            helping individuals and couples understand their treatment options and take the next step in
            their fertility journey.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <ArrowButton href={consultHref} size="lg" className="w-full sm:w-auto">
              Book a Consultation
            </ArrowButton>
            <ArrowButton href="/treatments" size="lg" variant="outline" className="w-full sm:w-auto">
              Explore Treatments
            </ArrowButton>
          </div>
          <dl className="mt-10 flex gap-10 border-t border-border pt-6">
            <div>
              <dt className="text-label text-secondary-500 uppercase">Established</dt>
              <dd className="mt-1 font-display text-[1.75rem] leading-none text-secondary-800">{CLINIC.since}</dd>
            </div>
            <div>
              <dt className="text-label text-secondary-500 uppercase">Location</dt>
              <dd className="mt-1 font-display text-[1.75rem] leading-none text-secondary-800">{CLINIC.city}</dd>
            </div>
          </dl>
        </div>
        <figure className="relative motion-safe:animate-fade-in">
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-blush-100 sm:aspect-[5/4] lg:aspect-auto lg:h-[min(70vh,42rem)]">
            <img
              src={heroImg}
              alt="A fertility doctor holding a patient's hands as she listens"
              fetchPriority="high"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
          <figcaption className="absolute -bottom-5 left-5 rounded-2xl border border-border bg-surface px-5 py-3.5 shadow-float sm:left-8 lg:-left-8 lg:bottom-10">
            <span className="block text-label text-primary-500 uppercase">Since {CLINIC.since}</span>
            <span className="mt-1 block text-sm font-semibold text-secondary-800">Fertility &amp; IVF Care in Patna</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

function Story() {
  const [ref, inView] = useReveal()
  return (
    <section ref={ref} aria-labelledby="story-heading" className={`border-t border-border bg-surface ${section}`}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className={revealClasses(inView)}>
          <div className="aspect-[5/4] overflow-hidden rounded-[2rem] bg-blush-100 lg:aspect-[4/5]">
            <img
              src={storyImg}
              alt="A fertility doctor in conversation with a couple"
              loading="lazy"
              decoding="async"
              className="size-full object-cover object-[45%_center]"
            />
          </div>
        </div>
        <div className={revealClasses(inView)} style={delay(inView, 150)}>
          <Eyebrow>Who We Are</Eyebrow>
          <h2 id="story-heading" className="mt-5 text-h2 text-secondary-800">Our Story</h2>
          <div className="mt-8 flex items-start gap-6 border-y border-border py-6">
            <span className="font-display text-[3.5rem] leading-none text-primary-500">{CLINIC.since}</span>
            <p className="pt-2 text-card-title text-secondary-800">Vansh begins its fertility care journey in Patna.</p>
          </div>
          <p className="mt-7 max-w-xl text-body text-secondary-600 lg:text-body-lg">
            Vansh Test Tube Baby was established in {CLINIC.since} in Patna, Bihar, to provide IVF and
            infertility treatment closer to home for families in the region.
          </p>
          <p className="mt-5 max-w-xl text-body text-secondary-600 lg:text-body-lg">
            Our focus has always been fertility care — treating both male and female infertility, from a
            first consultation and evaluation through to assisted reproductive treatments such as IVF and
            ICSI. Alongside medical care, we recognise how sensitive this journey can be, and our team
            offers emotional counselling and support along the way.
          </p>
        </div>
      </div>
    </section>
  )
}

function WhatWeDo() {
  const [ref, inView] = useReveal()
  const [ivf, ...rest] = TREATMENT_SUMMARIES
  return (
    <section ref={ref} aria-labelledby="what-heading" className={`relative isolate overflow-hidden bg-background ${section}`}>
      <Dots className="top-10 right-6 h-48 w-72" />
      <div className="mx-auto max-w-7xl">
        <div className={`grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16 ${revealClasses(inView)}`}>
          <div>
            <Eyebrow>What We Do</Eyebrow>
            <h2 id="what-heading" className="mt-5 text-h2 text-balance text-secondary-800">Comprehensive Fertility Care</h2>
          </div>
          <p className="max-w-lg text-body text-secondary-600 lg:pb-1.5 lg:text-body-lg">
            From the first evaluation to assisted reproductive treatment, Vansh offers care for male and
            female infertility under one roof.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[5fr_7fr] lg:gap-10">
          <SmartLink
            href={serviceHref(ivf.slug)}
            className={`group relative isolate flex flex-col overflow-hidden rounded-[2rem] bg-blush-50 p-8 transition duration-300 hover:-translate-y-1 sm:p-10 ${revealClasses(inView)}`}
            style={delay(inView, 120)}
          >
            <span aria-hidden="true" className="absolute -right-4 -bottom-10 -z-10 font-display text-[9rem] leading-none text-blush-200">
              IVF
            </span>
            <span className="grid size-12 place-items-center rounded-xl bg-surface text-primary-500">
              <FlaskConical className="size-5" />
            </span>
            <span className="mt-6 text-label text-primary-600 uppercase">Featured Treatment</span>
            <span className="mt-3 font-display text-h3 text-secondary-800">{ivf.title}</span>
            <span className="mt-4 max-w-md text-body text-secondary-600">{ivf.text}</span>
            <span className="mt-auto inline-flex items-center gap-2 pt-8 text-button-sm text-secondary-800 group-hover:text-primary-600">
              Explore IVF
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </SmartLink>

          <div className={revealClasses(inView)} style={delay(inView, 220)}>
            <ul className="border-t border-border">
              {rest.map((treatment) => (
                <li key={treatment.slug}>
                  <SmartLink
                    href={serviceHref(treatment.slug)}
                    className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 border-b border-border py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  >
                    <span className="text-label text-primary-500 uppercase">{treatment.abbr}</span>
                    <span>
                      <span className="block text-card-title text-secondary-800 group-hover:text-primary-600">{treatment.title}</span>
                      <span className="mt-0.5 block text-sm text-secondary-600">{treatment.tagline}</span>
                    </span>
                    <ArrowRight className="size-4 text-secondary-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-600" />
                  </SmartLink>
                </li>
              ))}
            </ul>
            <SmartLink
              href="/treatments"
              className="mt-7 inline-flex items-center gap-2 text-button-sm text-primary-600 hover:text-primary-700"
            >
              Explore All Treatments
              <ArrowRight className="size-4" />
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  )
}

function Approach() {
  const [ref, inView] = useReveal()
  return (
    <section ref={ref} aria-labelledby="approach-heading" className={`border-y border-border bg-surface ${section}`}>
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className={`lg:sticky lg:top-32 lg:self-start ${revealClasses(inView)}`}>
          <Eyebrow>Our Approach</Eyebrow>
          <h2 id="approach-heading" className="mt-5 text-h2 text-balance text-secondary-800">
            Fertility Care Is <em className="text-primary-500">Personal.</em>
          </h2>
          <p className="mt-6 max-w-md text-body text-secondary-600 lg:text-body-lg">
            Fertility treatment is more than a medical process. It can be an emotional and deeply personal
            journey — which is why our team offers emotional counselling alongside medical care.
          </p>
        </div>
        <ol className="grid gap-x-10 sm:grid-cols-2">
          {APPROACH.map((item, i) => (
            <li
              key={item.title}
              className={`border-t border-border py-8 ${revealClasses(inView, 'duration-500')}`}
              style={delay(inView, 120 + i * 90)}
            >
              <span className="font-display text-[3rem] leading-none text-primary-200" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-card-title text-secondary-800 lg:text-card-title-lg">{item.title}</h3>
              <p className="mt-2 text-body text-secondary-600">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function WhyChoose() {
  const [ref, inView] = useReveal()
  return (
    <section ref={ref} aria-labelledby="why-heading" className={`relative isolate overflow-hidden bg-background ${section}`}>
      <Blob className="top-1/3 -left-48 size-[28rem]" />
      <div className="mx-auto max-w-6xl">
        <div className={`text-center ${revealClasses(inView)}`}>
          <Eyebrow center>Why Vansh</Eyebrow>
          <h2 id="why-heading" className="mt-5 text-h2 text-secondary-800">Why Choose Vansh?</h2>
        </div>
        <ol className="mt-12 border-t border-border lg:mt-14">
          {WHY.map((item, i) => (
            <li
              key={item.title}
              className={`grid gap-2 border-b border-border py-6 sm:grid-cols-[4rem_16rem_1fr] sm:items-baseline sm:gap-6 ${revealClasses(inView, 'duration-500')}`}
              style={delay(inView, 100 + i * 80)}
            >
              <span className="text-sm font-semibold text-primary-500 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-card-title text-secondary-800">{item.title}</h3>
              <p className="text-body text-secondary-600">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function CareTeamIntro() {
  const [ref, inView] = useReveal()
  return (
    <section ref={ref} aria-labelledby="team-heading" className={`bg-blush-50 ${section}`}>
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-20">
        <div className={revealClasses(inView)}>
          <Eyebrow>Dedicated Team</Eyebrow>
          <h2 id="team-heading" className="mt-5 text-h2 text-balance text-secondary-800">
            Care That Understands the Journey.
          </h2>
          <p className="mt-6 max-w-md text-body text-secondary-600 lg:text-body-lg">
            Fertility treatment can bring questions, uncertainty and emotions. Our approach is built around
            helping patients feel informed and supported throughout their care.
          </p>
          <ArrowButton href="/doctors" size="lg" className="mt-8 w-full sm:w-auto">
            Meet the Doctors
          </ArrowButton>
        </div>
        <ul className={`grid gap-3 sm:grid-cols-2 ${revealClasses(inView)}`} style={delay(inView, 150)}>
          {DOCTORS.map((doctor) => (
            <li key={doctor.id}>
              <SmartLink
                href={doctor.profileHref}
                className="group flex items-center gap-4 rounded-2xl bg-surface p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-float-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                <span className="size-14 shrink-0 overflow-hidden rounded-full">
                  <DoctorPortrait doctor={doctor} size="sm" />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold text-secondary-800 group-hover:text-primary-600">{doctor.name}</span>
                  <span className="mt-0.5 block text-sm text-secondary-600">{doctor.designation}</span>
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ServicesNav() {
  const [ref, inView] = useReveal(0.2)
  return (
    <section ref={ref} aria-labelledby="services-heading" className={`bg-surface ${section}`}>
      <div className={`mx-auto max-w-7xl ${revealClasses(inView)}`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="services-heading" className="font-display text-h3 text-secondary-800">
            Treatment &amp; Fertility Services
          </h2>
          <SmartLink href="/treatments" className="inline-flex items-center gap-2 text-button-sm text-primary-600 hover:text-primary-700">
            View all <ArrowRight className="size-4" />
          </SmartLink>
        </div>
        <ul className="mt-8 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
          {TREATMENT_SUMMARIES.map((treatment) => (
            <li key={treatment.slug} className="border-r border-b border-border">
              <SmartLink
                href={serviceHref(treatment.slug)}
                className="group flex h-full items-center justify-between gap-4 p-6 transition-colors hover:bg-blush-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-500"
              >
                <span>
                  <span className="block text-card-title text-secondary-800 group-hover:text-primary-600">{treatment.shortTitle}</span>
                  <span className="mt-1 block text-sm text-secondary-600">{treatment.tagline}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-secondary-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-600" />
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function YourQuestions({ consultHref }) {
  const [ref, inView] = useReveal()
  return (
    <section ref={ref} aria-labelledby="questions-heading" className={`bg-background ${section}`}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div className={revealClasses(inView)}>
          <div className="aspect-[5/4] overflow-hidden rounded-[2rem] bg-blush-100">
            <img
              src="/images/services/iui-hero.webp"
              alt="A fertility doctor listening to a patient during a consultation"
              loading="lazy"
              decoding="async"
              className="size-full object-cover object-[62%_center]"
            />
          </div>
        </div>
        <div className={revealClasses(inView)} style={delay(inView, 150)}>
          <Eyebrow>Patient-Centered</Eyebrow>
          <h2 id="questions-heading" className="mt-5 text-h2 text-balance text-secondary-800">
            Your Questions <em className="text-primary-500">Matter.</em>
          </h2>
          <p className="mt-6 max-w-md text-body text-secondary-600 lg:text-body-lg">
            From understanding your fertility concerns to discussing treatment options, every patient
            deserves clear information and compassionate guidance.
          </p>
          <ArrowButton href={consultHref} size="lg" className="mt-8 w-full sm:w-auto">
            Talk to Our Fertility Team
          </ArrowButton>
        </div>
      </div>
    </section>
  )
}

export default function About() {
  const consultHref = consultationHrefFor(useLocation().pathname)
  return (
    <main>
      <title>{`About Vansh | Fertility & IVF Care in Patna Since ${CLINIC.since}`}</title>
      <meta
        name="description"
        content={`Vansh Test Tube Baby has provided fertility and IVF care in Patna, Bihar since ${CLINIC.since} — treating male and female infertility with personalized guidance and emotional counselling.`}
      />
      <link rel="canonical" href={`${CLINIC.siteUrl || window.location.origin}/about`} />
      <AboutHero consultHref={consultHref} />
      <Story />
      <WhatWeDo />
      <Approach />
      <WhyChoose />
      <CareTeamIntro />
      <ServicesNav />
      <YourQuestions consultHref={consultHref} />
      <FinalCta
        title={
          <>
            Your Fertility Journey Starts With a <em className="text-primary-100">Conversation.</em>
          </>
        }
        description="Whether you're exploring your options or already considering treatment, we're here to help you understand the next step."
        secondary={{ label: 'Explore Treatments', href: '/treatments' }}
      />
    </main>
  )
}
