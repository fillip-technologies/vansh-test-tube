import { useId, useRef, useState } from 'react'
import { CLINIC } from '../config/site.js'
import useInView, { revealClasses } from '../hooks/useInView.js'
import { submitConsultation } from '../lib/consultation.js'
import { ArrowRight, Check, ChevronDown, Phone } from './ui/icons.jsx'

const REASSURANCES = [
  'Personalized fertility guidance',
  'Clear treatment information',
  'Compassionate support',
]

const LOOKING_FOR = [
  'Fertility Consultation',
  'IVF',
  'IUI',
  'ICSI',
  'Infertility Evaluation',
  'Other',
]

const CONTACT_METHODS = ['Phone Call', 'WhatsApp']

const EMPTY = { name: '', mobile: '', email: '', lookingFor: '', preferredContact: '', message: '' }

// Indian mobile: optional +91 / 91 / 0 prefix, then 10 digits starting 6–9.
const MOBILE_RE = /^(?:\+?91|0)?[6-9]\d{9}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!MOBILE_RE.test(values.mobile.replace(/[\s-]/g, ''))) {
    errors.mobile = 'Please enter a valid mobile number.'
  }
  if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  return errors
}

const inputBase =
  'h-13 w-full rounded-xl border bg-surface px-4 text-[0.9375rem] text-secondary-800 transition-[border-color,box-shadow] duration-200 outline-none placeholder:text-text-muted focus:border-primary-500 focus:ring-4 focus:ring-blush-200 motion-reduce:transition-none'
const inputBorder = (invalid) => (invalid ? 'border-error' : 'border-border')

function Field({ label, optional, error, children, htmlFor, errorId }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-secondary-800">
        {label}
        {optional && <span className="ml-1.5 font-normal text-secondary-500">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="mt-2 text-sm font-medium text-error">
          {error}
        </p>
      )}
    </div>
  )
}

function SelectWrap({ children }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-secondary-500" />
    </div>
  )
}

// `service` (optional) — when set, the lead is attached to that treatment.
function ConsultationForm({ service }) {
  const uid = useId()
  const id = (name) => `${uid}-${name}`
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const fieldRefs = useRef({})

  const update = (name) => (e) => {
    const next = { ...values, [name]: e.target.value }
    setValues(next)
    // Re-validate live only after the first submit attempt.
    if (submitted) setErrors(validate(next))
    if (status === 'error') setStatus('idle')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    const found = validate(values)
    setErrors(found)
    const firstInvalid = ['name', 'mobile', 'email'].find((key) => found[key])
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus()
      return
    }

    setStatus('sending')
    try {
      await submitConsultation({
        name: values.name.trim(),
        mobile: values.mobile.replace(/[\s-]/g, ''),
        email: values.email.trim(),
        lookingFor: service ? service.name : values.lookingFor,
        serviceSlug: service?.slug ?? null,
        preferredContact: values.preferredContact,
        message: values.message.trim(),
      })
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-center py-10 text-center motion-safe:animate-fade-in">
        <span className="grid size-14 place-items-center rounded-full bg-blush-100 text-primary-500">
          <Check className="size-6" />
        </span>
        <p className="mt-6 text-label text-primary-500 uppercase">Request Received</p>
        <h3 className="mt-3 font-display text-h3 text-balance text-secondary-800">
          Thank you. Your consultation request has been received.
        </h3>
        <p className="mt-4 max-w-sm text-body text-secondary-600">
          Vansh’s team will contact you using your preferred method.
        </p>
      </div>
    )
  }

  const describedBy = (name) => (errors[name] ? id(`${name}-error`) : undefined)
  const sending = status === 'sending'

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={id('intro')}>
      <h3 className="font-display text-[1.75rem] leading-tight text-secondary-800">Request a Consultation</h3>
      <p id={id('intro')} className="mt-2 text-body text-secondary-600">
        Fill in your details and our team will get in touch with you.
      </p>
      {service && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-blush-100 px-3.5 py-1.5 text-sm font-semibold text-secondary-800">
          <span className="size-1.5 rounded-full bg-primary-500" aria-hidden="true" />
          Treatment: {service.name}
        </p>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Full Name" htmlFor={id('name')} error={errors.name} errorId={id('name-error')}>
            <input
              ref={(el) => (fieldRefs.current.name = el)}
              id={id('name')}
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Enter your full name"
              value={values.name}
              onChange={update('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy('name')}
              className={`${inputBase} ${inputBorder(errors.name)}`}
            />
          </Field>
        </div>

        <Field label="Mobile Number" htmlFor={id('mobile')} error={errors.mobile} errorId={id('mobile-error')}>
          <input
            ref={(el) => (fieldRefs.current.mobile = el)}
            id={id('mobile')}
            name="mobile"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="Enter your mobile number"
            value={values.mobile}
            onChange={update('mobile')}
            aria-invalid={Boolean(errors.mobile)}
            aria-describedby={describedBy('mobile')}
            className={`${inputBase} ${inputBorder(errors.mobile)}`}
          />
        </Field>

        <Field label="Email Address" optional htmlFor={id('email')} error={errors.email} errorId={id('email-error')}>
          <input
            ref={(el) => (fieldRefs.current.email = el)}
            id={id('email')}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            value={values.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            className={`${inputBase} ${inputBorder(errors.email)}`}
          />
        </Field>

        {/* On a service page the treatment is already known — no need to ask. */}
        {!service && (
          <Field label="I’m Looking For" optional htmlFor={id('lookingFor')}>
            <SelectWrap>
              <select
                id={id('lookingFor')}
                name="lookingFor"
                value={values.lookingFor}
                onChange={update('lookingFor')}
                className={`${inputBase} border-border appearance-none pr-11 ${values.lookingFor ? '' : 'text-text-muted'}`}
              >
                <option value="">Select an option</option>
                {LOOKING_FOR.map((option) => (
                  <option key={option} value={option} className="text-secondary-800">
                    {option}
                  </option>
                ))}
              </select>
            </SelectWrap>
          </Field>
        )}

        <div className={service ? 'sm:col-span-2' : undefined}>
          <Field label="Preferred Contact" optional htmlFor={id('preferredContact')}>
            <SelectWrap>
              <select
                id={id('preferredContact')}
                name="preferredContact"
                value={values.preferredContact}
                onChange={update('preferredContact')}
                className={`${inputBase} border-border appearance-none pr-11 ${values.preferredContact ? '' : 'text-text-muted'}`}
              >
                <option value="">Choose preferred contact</option>
                {CONTACT_METHODS.map((option) => (
                  <option key={option} value={option} className="text-secondary-800">
                    {option}
                  </option>
                ))}
              </select>
            </SelectWrap>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Anything you’d like us to know?" optional htmlFor={id('message')}>
            <textarea
              id={id('message')}
              name="message"
              rows={4}
              placeholder="Share any questions or concerns…"
              value={values.message}
              onChange={update('message')}
              className={`${inputBase} h-auto resize-y border-border py-3.5 leading-relaxed`}
            />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="group mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-primary-500 px-6 text-button text-surface shadow-md shadow-primary-500/20 transition duration-200 hover:-translate-y-px hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0 motion-reduce:hover:translate-y-0"
      >
        {sending ? (
          'Sending…'
        ) : (
          <>
            {service?.consultationCta ?? 'Request Consultation'}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </>
        )}
      </button>

      <div aria-live="polite">
        {status === 'error' && (
          <p role="alert" className="mt-4 rounded-xl bg-blush-100 px-4 py-3 text-center text-sm font-medium text-secondary-800">
            Something went wrong. Please try again.
          </p>
        )}
      </div>

      <p className="mt-4 text-center text-[0.8125rem] text-secondary-600">
        Your information is used only to respond to your consultation request.
      </p>
    </form>
  )
}

export default function Consultation({ service } = {}) {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, 0.15)

  return (
    <section
      id="consultation"
      ref={sectionRef}
      aria-labelledby="consultation-heading"
      className="relative overflow-hidden bg-blush-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      {/* Alias so earlier links to #book-consultation also land here. */}
      <span id="book-consultation" aria-hidden="true" className="absolute top-0" />

      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[45fr_55fr] lg:gap-16 xl:gap-20">
        {/* Left: reassurance */}
        <div className={`relative lg:pt-6 ${revealClasses(inView)}`}>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-32 -z-0 size-[26rem] rounded-full bg-blush-200/50 blur-3xl"
          />
          <div className="relative">
            <p className="inline-flex items-center gap-3 text-label text-primary-500 uppercase">
              <span className="h-px w-6 bg-primary-200" aria-hidden="true" />
              {service ? `${service.name} Consultation` : 'Book a Consultation'}
            </p>
            <h2 id="consultation-heading" className="mt-4 text-h2 text-balance text-secondary-800 lg:max-xl:text-[2.625rem]">
              Let’s Take the First Step <em className="text-primary-500">Together.</em>
            </h2>
            <p className="mt-5 max-w-md text-body text-secondary-600 lg:text-body-lg">
              Tell us a little about what you’re looking for. Our team can help you understand the
              next step in your fertility journey.
            </p>

            <ul className="mt-8 space-y-3.5">
              {REASSURANCES.map((item) => (
                <li key={item} className="flex items-center gap-3 text-body font-medium text-secondary-800">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface text-primary-500 shadow-float-sm">
                    <Check className="size-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 max-w-md rounded-2xl border border-border bg-surface/70 p-5 backdrop-blur-sm">
              <p className="text-sm text-secondary-600">Prefer to speak directly?</p>
              {CLINIC.phone ? (
                <a
                  href={`tel:${CLINIC.phone}`}
                  className="mt-2 inline-flex items-center gap-3 rounded-lg text-card-title text-secondary-800 transition-colors duration-200 hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-primary-500 text-surface">
                    <Phone className="size-4" />
                  </span>
                  <span>
                    <span className="block">Call the Vansh Fertility Team</span>
                    <span className="block text-body font-normal text-secondary-600">
                      {CLINIC.phones?.[0]?.display ?? CLINIC.phone}
                    </span>
                  </span>
                </a>
              ) : (
                <div className="mt-2 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-blush-100 text-primary-500">
                    <Phone className="size-4" />
                  </span>
                  <span>
                    <span className="block text-card-title text-secondary-800">Call the Vansh Fertility Team</span>
                    {/* Placeholder until CLINIC.phone is set in src/config/site.js */}
                    <span className="block text-sm text-secondary-500">Phone number to be added</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div
          className={`rounded-[1.75rem] border border-border bg-surface p-6 shadow-float-sm sm:p-9 lg:p-10 ${revealClasses(inView)}`}
          style={{ transitionDelay: inView ? '180ms' : '0ms' }}
        >
          <ConsultationForm service={service} />
        </div>
      </div>
    </section>
  )
}
