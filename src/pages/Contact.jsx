import { useRef } from 'react'
import Consultation from '../components/Consultation.jsx'
import Seo from '../components/Seo.jsx'
import ArrowButton from '../components/ui/ArrowButton.jsx'
import { Blob, Dots, Rings } from '../components/ui/Decor.jsx'
import Eyebrow from '../components/ui/Eyebrow.jsx'
import { ArrowRight, Facebook, Mail, MapPin, Navigation, Phone } from '../components/ui/icons.jsx'
import { CLINIC, SOCIAL_LINKS, mapsDirectionsUrl, mapsEmbedUrl } from '../config/site.js'
import useInView, { revealClasses } from '../hooks/useInView.js'
import { CLINIC_ID, absoluteUrl, breadcrumbLd } from '../lib/seo.js'

// All details come from config/site.js (verified against the clinic's
// previous website). No opening hours are shown — none were published.

const NEXT_STEPS = [
  { title: 'Share your details', text: 'Send the form below, call us or write to us — whichever feels easiest.' },
  { title: 'Our team gets in touch', text: 'We contact you using your preferred method to understand what you need.' },
  { title: 'Plan your consultation', text: 'Together we arrange a consultation with our fertility team.' },
]

const section = 'px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24'
const directionsHref = mapsDirectionsUrl(CLINIC.mapQuery)
const facebook = SOCIAL_LINKS.find((s) => s.icon === 'facebook')

const linkClass =
  'rounded-sm text-secondary-800 transition-colors duration-200 hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500'

function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  return [ref, useInView(ref, threshold)]
}

function ContactHero() {
  const [primaryPhone] = CLINIC.phones
  return (
    <section
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden bg-background px-4 pt-28 pb-14 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36 lg:pb-20"
    >
      <Blob className="-top-24 -right-32 size-[34rem]" />
      <Rings className="-bottom-40 -left-48 hidden size-[30rem] lg:block" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 xl:gap-20">
        <div className="motion-safe:animate-fade-up">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-primary-100 bg-surface px-4 py-2 text-label text-secondary-800 uppercase">
            <span className="size-1.5 rounded-full bg-primary-500" aria-hidden="true" />
            Contact Us
          </p>
          <h1 id="contact-heading" className="mt-6 text-hero text-balance text-secondary-800 lg:text-[3.5rem] lg:leading-[1.04] 2xl:text-[4rem]">
            We&rsquo;re Here to Help You Take the First <em className="text-primary-500">Step.</em>
          </h1>
          <p className="mt-6 max-w-xl text-body text-secondary-600 lg:text-body-lg">
            Have a question about fertility treatment, or ready to book a consultation? Reach our team in
            Patna by phone, email or the form below — whatever feels most comfortable.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <ArrowButton href={`tel:${primaryPhone.tel}`} size="lg" className="w-full sm:w-auto">
              Call {primaryPhone.display}
            </ArrowButton>
            <ArrowButton href="#consultation" size="lg" variant="outline" className="w-full sm:w-auto">
              Request a Consultation
            </ArrowButton>
          </div>
        </div>

        {/* Clinic details card */}
        <aside
          aria-label="Clinic contact details"
          className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-7 shadow-float motion-safe:animate-fade-in sm:p-9"
        >
          <Dots className="-top-6 -right-6 h-36 w-52" />
          <p className="text-label text-primary-600 uppercase">{CLINIC.name}</p>
          <dl className="mt-6 divide-y divide-border border-t border-border">
            <div className="flex gap-4 py-5">
              <dt className="sr-only">Address</dt>
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary-500" />
              <dd>
                <address className="text-body leading-relaxed text-secondary-800 not-italic">
                  {CLINIC.addressLines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </address>
                <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700">
                  Get directions <ArrowRight className="size-3.5" />
                </a>
              </dd>
            </div>
            <div className="flex gap-4 py-5">
              <dt className="sr-only">Phone</dt>
              <Phone className="mt-0.5 size-5 shrink-0 text-primary-500" />
              <dd className="flex flex-col gap-1.5 text-body font-semibold">
                {CLINIC.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className={linkClass}>{p.display}</a>
                ))}
              </dd>
            </div>
            <div className="flex gap-4 py-5">
              <dt className="sr-only">Email</dt>
              <Mail className="mt-0.5 size-5 shrink-0 text-primary-500" />
              <dd className="flex min-w-0 flex-col gap-1.5 text-body">
                {CLINIC.emails.map((email) => (
                  <a key={email} href={`mailto:${email}`} className={`${linkClass} break-all`}>{email}</a>
                ))}
              </dd>
            </div>
            {facebook && (
              <div className="flex gap-4 pt-5">
                <dt className="sr-only">Social</dt>
                <Facebook className="mt-0.5 size-5 shrink-0 text-primary-500" />
                <dd>
                  <a href={facebook.href} target="_blank" rel="noopener noreferrer" className={`${linkClass} text-body`}>
                    Follow us on Facebook
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </aside>
      </div>
    </section>
  )
}

function WaysToReach() {
  const [ref, inView] = useReveal(0.2)
  const items = [
    {
      Icon: Phone,
      title: 'Call us',
      text: 'Speak directly with our team about your questions or to arrange a visit.',
      action: { label: 'Call now', href: `tel:${CLINIC.phones[0].tel}` },
    },
    {
      Icon: Mail,
      title: 'Email us',
      text: 'Write to us with your query, and our team will respond by email or phone.',
      action: { label: 'Send an email', href: `mailto:${CLINIC.emails[0]}` },
    },
    {
      Icon: MapPin,
      title: 'Visit us',
      text: `${CLINIC.addressLines.join(' ').replace(/,\s*$/, '')}.`,
      action: { label: 'Get directions', href: directionsHref, external: true },
    },
  ]
  return (
    <section ref={ref} aria-label="Ways to reach us" className="border-y border-border bg-surface px-4 sm:px-6 lg:px-8">
      <ul className="mx-auto grid max-w-7xl divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map(({ Icon, title, text, action }, i) => (
          <li
            key={title}
            className={`py-8 md:px-8 md:py-12 md:first:pl-0 md:last:pr-0 ${revealClasses(inView, 'duration-500')}`}
            style={{ transitionDelay: inView ? `${i * 90}ms` : '0ms' }}
          >
            <span className="grid size-11 place-items-center rounded-xl bg-blush-100 text-primary-500">
              <Icon className="size-5" />
            </span>
            <h2 className="mt-5 text-card-title text-secondary-800 lg:text-card-title-lg">{title}</h2>
            <p className="mt-2 text-body text-secondary-600">{text}</p>
            <a
              href={action.href}
              {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group mt-4 inline-flex items-center gap-2 text-button-sm text-primary-600 hover:text-primary-700"
            >
              {action.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function MapSection() {
  const [ref, inView] = useReveal()
  return (
    <section ref={ref} aria-labelledby="visit-heading" className={`bg-background ${section}`}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className={`overflow-hidden rounded-[2rem] border border-border bg-blush-50 ${revealClasses(inView)}`}>
          <iframe
            title={`Map showing ${CLINIC.name}, ${CLINIC.city}`}
            src={mapsEmbedUrl(CLINIC.mapQuery)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[4/3] w-full border-0 lg:aspect-[16/11]"
          />
        </div>
        <div className={revealClasses(inView)} style={{ transitionDelay: inView ? '150ms' : '0ms' }}>
          <Eyebrow>Visit the Clinic</Eyebrow>
          <h2 id="visit-heading" className="mt-5 text-h2 text-balance text-secondary-800">
            Find Us in <em className="text-primary-500">Kankarbagh.</em>
          </h2>
          <address className="mt-6 text-body-lg leading-relaxed text-secondary-700 not-italic">
            {CLINIC.addressLines.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </address>
          <p className="mt-6 max-w-md border-l-2 border-primary-300 pl-5 text-[0.9375rem] leading-relaxed text-secondary-600">
            We recommend getting in touch before your visit, so our team can plan your consultation.
          </p>
          <ArrowButton
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="outline"
            className="mt-8 w-full sm:w-auto"
          >
            <span className="inline-flex items-center gap-2">
              <Navigation className="size-4" />
              Get Directions
            </span>
          </ArrowButton>
        </div>
      </div>
    </section>
  )
}

function NextSteps() {
  const [ref, inView] = useReveal(0.2)
  return (
    <section ref={ref} aria-labelledby="next-heading" className={`border-t border-border bg-surface ${section}`}>
      <div className="mx-auto max-w-7xl">
        <div className={`grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16 ${revealClasses(inView)}`}>
          <div>
            <Eyebrow>What Happens Next</Eyebrow>
            <h2 id="next-heading" className="mt-5 max-w-xl text-h2 text-balance text-secondary-800">
              After You Reach Out
            </h2>
          </div>
          <p className="max-w-md text-body text-secondary-600 lg:pb-1.5 lg:text-body-lg">
            You don&rsquo;t need to have all the answers before contacting us. A conversation is simply
            the first step.
          </p>
        </div>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 lg:mt-14">
          {NEXT_STEPS.map((step, i) => (
            <li
              key={step.title}
              className={`border-t-2 border-primary-200 pt-6 ${revealClasses(inView, 'duration-500')}`}
              style={{ transitionDelay: inView ? `${120 + i * 90}ms` : '0ms' }}
            >
              <span className="font-display text-[2.5rem] leading-none text-primary-200" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-card-title text-secondary-800 lg:text-card-title-lg">{step.title}</h3>
              <p className="mt-2 text-body text-secondary-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default function Contact() {
  return (
    <main>
      <Seo
        title="Contact Vansh Test Tube Baby | Fertility & IVF Clinic in Kankarbagh, Patna"
        description={`Contact ${CLINIC.name} at P/13, Vidyapuri, Kankarbagh, Patna. Call ${CLINIC.phones[0].display}, email ${CLINIC.emails[0]} or request a fertility consultation online.`}
        jsonLd={[
          { '@type': 'ContactPage', name: 'Contact Vansh Test Tube Baby', url: absoluteUrl('/contact'), about: { '@id': CLINIC_ID } },
          breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]),
        ]}
      />
      <ContactHero />
      <WaysToReach />
      <MapSection />
      <NextSteps />
      <Consultation />
    </main>
  )
}
