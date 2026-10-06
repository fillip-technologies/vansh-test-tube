import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import logo from '../assets/vansh-logo.png'
import {
  CLINIC,
  FOOTER_NAV,
  FOOTER_TREATMENTS,
  LEGAL_LINKS,
  SOCIAL_LINKS,
} from '../config/site.js'
import useInView, { revealClasses } from '../hooks/useInView.js'
import { consultationHrefFor } from '../lib/services.js'
import ArrowButton from './ui/ArrowButton.jsx'
import SmartLink from './ui/SmartLink.jsx'
import { ArrowUp, Facebook, Mail, MapPin, Phone } from './ui/icons.jsx'

const SOCIAL_ICONS = { facebook: Facebook }

const YEAR = new Date().getFullYear()

const linkClass =
  'rounded-sm text-secondary-200 transition-colors duration-200 hover:text-primary-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400'

function FooterHeading({ children, id }) {
  return (
    <h2 id={id} className="font-sans text-label text-secondary-400 uppercase">
      {children}
    </h2>
  )
}

function LinkList({ items, labelledBy }) {
  const live = items.filter((item) => item.href)
  return (
    <nav aria-labelledby={labelledBy}>
      <ul className="mt-5 space-y-3 text-[0.9375rem]">
        {live.map((item) => (
          <li key={item.label}>
            <SmartLink href={item.href} className={linkClass}>
              {item.label}
            </SmartLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.5)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 bottom-4 z-40 grid size-11 place-items-center rounded-full border border-border bg-surface text-primary-500 shadow-float transition duration-300 hover:-translate-y-0.5 hover:bg-blush-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 motion-reduce:transition-none sm:right-6 sm:bottom-6 ${
        visible ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp className="size-4" />
    </button>
  )
}

export default function Footer() {
  const { pathname } = useLocation()
  const footerRef = useRef(null)
  const inView = useInView(footerRef, 0.1)
  const legal = LEGAL_LINKS.filter((item) => item.href)

  return (
    <footer ref={footerRef} className="bg-secondary-900 px-4 pt-20 pb-24 text-surface sm:px-6 sm:pb-8 lg:px-8 lg:pt-24 lg:pb-10">
      <div className={`mx-auto max-w-7xl ${revealClasses(inView, 'duration-500')}`}>
        <div className="grid gap-12 md:grid-cols-2 md:gap-x-10 lg:grid-cols-[1.35fr_0.9fr_1.15fr_1.4fr] lg:gap-x-12">
          {/* Brand */}
          <div className="order-1">
            <SmartLink
              href="/"
              aria-label={`${CLINIC.name} — home`}
              className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400"
            >
              {/* White tile keeps the original logo legible on the dark footer. */}
              <span className="grid size-14 place-items-center rounded-2xl bg-surface">
                <img src={logo} alt="" width="74" height="82" className="h-10 w-auto" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-wide text-primary-400">VANSH</span>
                <span className="mt-1 text-label text-surface">TEST TUBE BABY</span>
              </span>
            </SmartLink>
            <p className="mt-6 max-w-xs text-body text-secondary-300">
              Compassionate fertility care, personalized around your journey.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-surface">
              <span className="size-1.5 rounded-full bg-primary-500" aria-hidden="true" />
              Fertility &amp; IVF Care Since {CLINIC.since}
            </p>

            {SOCIAL_LINKS.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${CLINIC.name} on ${social.label}`}
                      className="grid size-10 place-items-center rounded-full border border-surface/15 text-secondary-200 transition-colors duration-200 hover:border-primary-400 hover:text-primary-400"
                    >
                      {(() => {
                        const SocialIcon = SOCIAL_ICONS[social.icon]
                        return SocialIcon ? <SocialIcon className="size-4" /> : social.label.charAt(0)
                      })()}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Compact CTA — after brand on mobile, full-width row on larger screens */}
          <div className="order-2 md:order-5 md:col-span-2 lg:col-span-4">
            <div className="flex flex-col items-start gap-5 rounded-3xl border border-surface/10 bg-surface/5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7 lg:px-9">
              <div>
                <p className="font-display text-2xl text-surface">Ready to take the first step?</p>
                <p className="mt-1.5 text-body text-secondary-300">
                  Start your fertility journey with a conversation.
                </p>
              </div>
              <ArrowButton href={consultationHrefFor(pathname)} size="lg" className="w-full shrink-0 sm:w-auto">
                Book a Consultation
              </ArrowButton>
            </div>
          </div>

          {/* Explore */}
          <div className="order-3 md:order-2">
            <FooterHeading id="footer-explore">Explore</FooterHeading>
            <LinkList items={FOOTER_NAV} labelledBy="footer-explore" />
          </div>

          {/* Treatments */}
          <div className="order-4 md:order-3">
            <FooterHeading id="footer-treatments">Treatments</FooterHeading>
            <LinkList items={FOOTER_TREATMENTS} labelledBy="footer-treatments" />
          </div>

          {/* Contact */}
          <div id="contact" className="order-5 md:order-4">
            <FooterHeading>Get In Touch</FooterHeading>
            <ul className="mt-5 space-y-5 text-[0.9375rem]">
              <li className="flex gap-3.5">
                <MapPin className="mt-0.5 size-[1.125rem] shrink-0 text-primary-400" />
                <address className="text-secondary-200 not-italic leading-relaxed">
                  {CLINIC.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              <li className="flex gap-3.5">
                <Phone className="mt-0.5 size-[1.125rem] shrink-0 text-primary-400" />
                <span className="flex flex-col gap-1.5">
                  {CLINIC.phones.map((phone) => (
                    <a
                      key={phone.tel}
                      href={`tel:${phone.tel}`}
                      aria-label={`Call ${phone.display}`}
                      className={linkClass}
                    >
                      {phone.display}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3.5">
                <Mail className="mt-0.5 size-[1.125rem] shrink-0 text-primary-400" />
                <span className="flex min-w-0 flex-col gap-1.5">
                  {CLINIC.emails.map((email) => (
                    <a key={email} href={`mailto:${email}`} className={`${linkClass} break-all`}>
                      {email}
                    </a>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal bar */}
        {/* Right padding keeps legal links clear of the fixed back-to-top button. */}
        <div className="mt-14 flex flex-col gap-4 border-t border-surface/10 pt-7 text-sm text-secondary-400 sm:flex-row sm:items-center sm:justify-between sm:pr-16 lg:mt-16">
          <p>
            © {YEAR} {CLINIC.name}. All rights reserved.
          </p>
          {legal.length > 0 && (
            <nav aria-label="Legal">
              <ul className="flex gap-6">
                {legal.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className={linkClass}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>

      <BackToTop />
    </footer>
  )
}
