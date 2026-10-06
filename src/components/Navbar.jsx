import { useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import logo from '../assets/vansh-logo.png'
import { TREATMENT_SUMMARIES } from '../data/treatments.js'
import { consultationHrefFor, serviceHref } from '../lib/services.js'
import ArrowButton from './ui/ArrowButton.jsx'
import SmartLink from './ui/SmartLink.jsx'
import { ArrowRight, ChevronDown, CircleDot, Droplet, FlaskConical, Snowflake, Sprout, Syringe } from './ui/icons.jsx'

// Main navigation. Links point at homepage sections so they work from every
// page. The item with `treatments: true` opens the Treatments menu.
const NAV_ITEMS = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/about' },
  { label: 'Treatments', href: '/#treatments', treatments: true },
  { label: 'Doctors', href: '/doctors' },
  { label: 'Patient Stories', href: '/#patient-stories' },
  { label: 'Resources', href: '/#faq' },
  { label: 'Contact', href: '/contact' },
]

const TREATMENT_ICONS = {
  ivf: FlaskConical,
  iui: Droplet,
  icsi: Syringe,
  'ovulation-induction': Sprout,
  'blastocyst-culture-transfer': CircleDot,
  'frozen-embryo-transfer': Snowflake,
}

const TREATMENT_LINKS = TREATMENT_SUMMARIES.map((treatment) => ({
  ...treatment,
  href: serviceHref(treatment.slug),
  Icon: TREATMENT_ICONS[treatment.slug] ?? CircleDot,
}))

const CTA_LABEL = 'Book Consultation'

function Brand() {
  return (
    <SmartLink
      href="/"
      className="flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
      aria-label="Vansh Test Tube Baby — home"
    >
      <img src={logo} alt="" width="74" height="82" className="h-11 w-auto sm:h-12" />
      <span className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-wide text-primary-500 sm:text-2xl">VANSH</span>
        <span className="mt-1 text-[0.625rem] font-semibold tracking-[0.16em] text-secondary-800 sm:text-label">
          TEST TUBE BABY
        </span>
      </span>
    </SmartLink>
  )
}

// Active nav item: "Treatments" on treatment pages, otherwise the current
// homepage section.
function getActiveHref(pathname, hash) {
  if (pathname.startsWith('/treatments')) return '/#treatments'
  if (pathname === '/about') return '/about'
  if (pathname.startsWith('/doctors')) return '/doctors'
  if (pathname === '/contact') return '/contact'
  return `/${hash || '#home'}`
}

function activeSlug(pathname) {
  const match = pathname.match(/^\/treatments\/([^/]+)/)
  return match ? match[1] : null
}

const linkBase =
  'relative flex items-center gap-1 py-2 text-nav whitespace-nowrap transition-colors duration-200 hover:text-primary-500 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500'

function ActiveBar({ active }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 rounded-full bg-primary-500 transition-all duration-300 ${
        active ? 'w-full opacity-100' : 'w-0 opacity-0'
      }`}
    />
  )
}

// Desktop Treatments dropdown — opens on hover or click, closes on Escape,
// outside click or after choosing a treatment.
function TreatmentsMenu({ active, currentSlug }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const closeTimer = useRef(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        wrapRef.current?.querySelector('button')?.focus()
      }
    }
    const onPointerDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const show = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const hideSoon = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 140)
  }

  return (
    <li ref={wrapRef} className="relative" onMouseEnter={show} onMouseLeave={hideSoon}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={`${linkBase} ${active || open ? 'text-primary-500' : 'text-secondary-800'}`}
      >
        Treatments
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 motion-reduce:transition-none ${
            open ? 'rotate-180 text-primary-500' : 'text-secondary-500'
          }`}
        />
        <ActiveBar active={active} />
      </button>

      <div
        id={panelId}
        className={`absolute top-full left-1/2 z-50 w-[36rem] -translate-x-1/2 pt-5 transition duration-200 ease-out motion-reduce:transition-none ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
        }`}
      >
        <div className="rounded-[1.25rem] border border-border bg-surface p-3 shadow-float">
          <div className="flex items-center justify-between px-3 pt-2 pb-3">
            <p className="text-label text-secondary-500 uppercase">Fertility Treatments</p>
            <SmartLink
              href="/#treatments"
              onClick={() => setOpen(false)}
              tabIndex={open ? undefined : -1}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View all
              <ArrowRight className="size-3.5" />
            </SmartLink>
          </div>
          <ul className="grid grid-cols-2 gap-1">
            {TREATMENT_LINKS.map(({ slug, shortTitle, tagline, href, Icon }) => {
              const current = slug === currentSlug
              return (
                <li key={slug}>
                  <SmartLink
                    href={href}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? undefined : -1}
                    aria-current={current ? 'page' : undefined}
                    className={`group flex items-start gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-blush-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-500 ${
                      current ? 'bg-blush-50' : ''
                    }`}
                  >
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-lg transition-colors duration-200 ${
                        current ? 'bg-primary-500 text-surface' : 'bg-blush-100 text-primary-500 group-hover:bg-primary-100'
                      }`}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <span
                        className={`block text-[0.9375rem] leading-snug font-semibold ${
                          current ? 'text-primary-600' : 'text-secondary-800 group-hover:text-primary-600'
                        }`}
                      >
                        {shortTitle}
                      </span>
                      <span className="mt-0.5 block text-[0.8125rem] leading-snug text-secondary-600">{tagline}</span>
                    </span>
                  </SmartLink>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </li>
  )
}

export default function Navbar() {
  const location = useLocation()
  const activeHref = getActiveHref(location.pathname, location.hash)
  const currentSlug = activeSlug(location.pathname)
  const ctaHref = consultationHrefFor(location.pathname)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape, outside click, or when resizing to desktop.
  useEffect(() => {
    if (!isMenuOpen) return
    const close = () => setIsMenuOpen(false)
    const onKeyDown = (e) => e.key === 'Escape' && close()
    const onPointerDown = (e) => {
      if (!headerRef.current?.contains(e.target)) close()
    }
    const desktop = window.matchMedia('(min-width: 80rem)')
    const onBreakpoint = (e) => e.matches && close()

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [isMenuOpen])

  const handleNavigate = () => setIsMenuOpen(false)

  const toggleMenu = () => {
    // Show the treatments list expanded when browsing a treatment page.
    if (!isMenuOpen) setMobileTreatmentsOpen(Boolean(currentSlug))
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8">
      <div className="relative mx-auto max-w-site">
        <div
          className={`flex h-[4.5rem] items-center justify-between gap-6 rounded-3xl border border-border bg-surface px-4 transition-shadow duration-300 sm:h-20 sm:px-6 ${
            isScrolled ? 'shadow-float-sm' : 'shadow-float'
          }`}
        >
          <Brand />

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-x-7 2xl:gap-x-9">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === activeHref
                if (item.treatments) {
                  return <TreatmentsMenu key={item.href} active={isActive} currentSlug={currentSlug} />
                }
                return (
                  <li key={item.href}>
                    <SmartLink
                      href={item.href}
                      onClick={handleNavigate}
                      aria-current={isActive ? 'page' : undefined}
                      className={`${linkBase} ${isActive ? 'text-primary-500' : 'text-secondary-800'}`}
                    >
                      {item.label}
                      <ActiveBar active={isActive} />
                    </SmartLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <ArrowButton href={ctaHref}>{CTA_LABEL}</ArrowButton>
            </div>

            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="grid size-11 place-items-center rounded-full border border-border text-secondary-800 transition-colors duration-200 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 xl:hidden"
            >
              <span aria-hidden="true" className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute top-1.5 left-0 h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile / tablet menu */}
        <div
          id="mobile-menu"
          className={`absolute inset-x-0 top-full mt-3 max-h-[calc(100svh-7rem)] origin-top overflow-y-auto rounded-3xl border border-border bg-surface p-3 shadow-float transition-all duration-200 ease-out motion-reduce:transition-none xl:hidden ${
            isMenuOpen
              ? 'visible translate-y-0 scale-100 opacity-100'
              : 'invisible -translate-y-2 scale-[0.98] opacity-0'
          }`}
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-0.5">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === activeHref
                const rowClass = `flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-nav transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-500 ${
                  isActive ? 'bg-primary-50 text-primary-500' : 'text-secondary-800 hover:bg-blush-50 hover:text-primary-500'
                }`
                if (item.treatments) {
                  return (
                    <li key={item.href}>
                      <button
                        type="button"
                        aria-expanded={mobileTreatmentsOpen}
                        aria-controls="mobile-treatments"
                        tabIndex={isMenuOpen ? undefined : -1}
                        onClick={() => setMobileTreatmentsOpen((value) => !value)}
                        className={rowClass}
                      >
                        Treatments
                        <ChevronDown
                          className={`size-4 opacity-60 transition-transform duration-200 ${
                            mobileTreatmentsOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        id="mobile-treatments"
                        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                          mobileTreatmentsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <ul className="overflow-hidden" inert={!mobileTreatmentsOpen}>
                          {TREATMENT_LINKS.map(({ slug, shortTitle, href }) => {
                            const current = slug === currentSlug
                            return (
                              <li key={slug}>
                                <SmartLink
                                  href={href}
                                  onClick={handleNavigate}
                                  aria-current={current ? 'page' : undefined}
                                  tabIndex={isMenuOpen ? undefined : -1}
                                  className={`ml-4 flex items-center gap-3 border-l py-2.5 pl-4 text-[0.9375rem] transition-colors duration-200 ${
                                    current
                                      ? 'border-primary-500 font-semibold text-primary-600'
                                      : 'border-border text-secondary-700 hover:text-primary-500'
                                  }`}
                                >
                                  {shortTitle}
                                </SmartLink>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </li>
                  )
                }
                return (
                  <li key={item.href}>
                    <SmartLink
                      href={item.href}
                      onClick={handleNavigate}
                      aria-current={isActive ? 'page' : undefined}
                      tabIndex={isMenuOpen ? undefined : -1}
                      className={rowClass}
                    >
                      {item.label}
                    </SmartLink>
                  </li>
                )
              })}
            </ul>
            <div className="mt-2 border-t border-border px-1 pt-3 pb-1">
              <ArrowButton href={ctaHref} className="w-full" onClick={() => setIsMenuOpen(false)}>
                {CTA_LABEL}
              </ArrowButton>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
