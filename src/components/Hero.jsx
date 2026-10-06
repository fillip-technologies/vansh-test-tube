import { useEffect, useRef } from 'react'
import heroBg from '../assets/vansh-hero-bg.webp'
import heroBgSmall from '../assets/vansh-hero-bg-1920.webp'
import ArrowButton from './ui/ArrowButton.jsx'
import { CalendarHeart, Heart, Microscope } from './ui/icons.jsx'

// Floating cards on the right of the image. `className` places each card;
// `anchor` / `y` / `right` position it on desktop (see styles/hero.css).
const HIGHLIGHTS = [
  {
    title: 'Compassionate Care',
    text: 'Supporting you through every step.',
    Icon: Heart,
    className: 'hidden min-[87.5rem]:flex',
    anchor: 'top',
    y: '3.5rem',
    right: '1.5rem',
  },
  {
    title: 'Advanced Fertility Treatments',
    text: 'IVF • IUI • ICSI • FET',
    Icon: Microscope,
    className: 'hidden lg:flex',
    anchor: 'bottom',
    y: '2.5rem',
    right: '1.5rem',
  },
]

// Scroll progress 0 → 1 over the first 70% of a viewport height, smoothed and
// eased, written to the --p custom property. Desktop only.
function useHeroScrollProgress(ref) {
  useEffect(() => {
    const track = ref.current
    const desktop = window.matchMedia('(min-width: 64rem)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let target = 0
    let current = 0
    let frame = 0

    const ease = (t) => -(Math.cos(Math.PI * t) - 1) / 2

    const tick = () => {
      current += (target - current) * 0.14
      if (Math.abs(target - current) < 0.0005) current = target
      track.style.setProperty('--p', ease(current).toFixed(4))
      frame = current === target ? 0 : requestAnimationFrame(tick)
    }

    const update = () => {
      if (!desktop.matches || reducedMotion.matches) {
        target = 0
      } else {
        const scrolled = -track.getBoundingClientRect().top
        target = Math.min(Math.max(scrolled / (window.innerHeight * 0.7), 0), 1)
      }
      if (!frame) frame = requestAnimationFrame(tick)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    desktop.addEventListener('change', update)
    reducedMotion.addEventListener('change', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      desktop.removeEventListener('change', update)
      reducedMotion.removeEventListener('change', update)
    }
  }, [ref])
}

function HighlightCard({ title, text, Icon, anchor, className = '', style }) {
  return (
    <div
      data-anchor={anchor}
      className={`hero-card w-[17rem] items-center gap-3.5 rounded-[1.25rem] border border-surface/70 bg-surface/75 p-3.5 pr-5 shadow-float-sm backdrop-blur-md lg:absolute ${className}`}
      style={style}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-500">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-secondary-800">{title}</span>
        <span className="mt-0.5 block text-[0.8125rem] leading-snug text-secondary-600">{text}</span>
      </span>
    </div>
  )
}

export default function Hero() {
  const trackRef = useRef(null)
  useHeroScrollProgress(trackRef)

  return (
    <section id="home" ref={trackRef} className="hero-track" aria-labelledby="hero-heading">
      <div className="hero-stage">
        <div className="hero-panel flex flex-col bg-blush-100 lg:block">
          <div className="hero-media order-2 lg:order-none" aria-hidden="true">
            <img
              src={heroBg}
              srcSet={`${heroBgSmall} 1920w, ${heroBg} 3840w`}
              sizes="100vw"
              alt=""
              fetchPriority="high"
              className="size-full object-cover object-[70%_center] lg:object-right"
            />
            {/* Soft warm-white wash on the left for text contrast (desktop). */}
            <div className="absolute inset-0 hidden bg-linear-to-r from-background/70 via-background/25 via-35% to-transparent to-60% lg:block" />
          </div>

          {/* Small screens: one card over the bottom of the photo. */}
          <div className="absolute bottom-4 left-4 z-10 sm:bottom-6 sm:left-6 lg:hidden">
            <HighlightCard {...HIGHLIGHTS[1]} className="flex" />
          </div>

          <div className="hero-content relative z-10 px-6 pt-10 sm:px-10 sm:pt-14 lg:flex lg:h-full lg:items-center">
            <div className="max-w-xl lg:max-w-2xl">
              <p className="inline-flex items-center gap-2.5 rounded-full border border-primary-100 bg-surface/70 px-4 py-2 text-[0.625rem] font-semibold tracking-[0.18em] text-secondary-800 sm:text-label backdrop-blur-md motion-safe:animate-fade-up sm:text-[0.6875rem]">
                <span className="size-1.5 rounded-full bg-primary-500" aria-hidden="true" />
                VANSH TEST TUBE BABY
                <span className="size-1 rounded-full bg-secondary-400" aria-hidden="true" />
                <span className="text-primary-500">PATNA</span>
              </p>

              <h1
                id="hero-heading"
                className="mt-5 text-hero text-balance text-secondary-800 motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] lg:mt-6"
              >
                Your Journey to Parenthood <br />
                Starts With <em className="text-primary-500">Hope.</em>
              </h1>

              <p className="mt-5 max-w-md text-body text-secondary-600 motion-safe:animate-fade-up motion-safe:[animation-delay:160ms] lg:max-w-lg lg:text-body-lg">
                Personalized fertility care, advanced reproductive treatments and
                compassionate guidance — every step of the way.
              </p>

              <div className="mt-7 flex flex-col gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:240ms] sm:flex-row sm:items-center lg:mt-8">
                <ArrowButton href="#book-consultation" size="lg">
                  Book a Consultation
                </ArrowButton>
                <ArrowButton href="#treatments" size="lg" variant="outline">
                  Explore Treatments
                </ArrowButton>
              </div>

              {/* Hidden on short desktop screens so the copy fits the panel. */}
              <div className="mt-7 flex items-center gap-3.5 border-t border-secondary-800/10 pt-5 motion-safe:animate-fade-up motion-safe:[animation-delay:320ms] lg:mt-8 lg:max-w-md [@media(min-width:64rem)_and_(max-height:47.5rem)]:hidden">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface/80 text-primary-500 backdrop-blur-md">
                  <CalendarHeart className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-secondary-800">
                    Fertility &amp; IVF Care Since 2014
                  </span>
                  <span className="mt-0.5 block text-label font-medium text-secondary-600 uppercase">
                    Patna, Bihar
                  </span>
                </span>
              </div>
            </div>
          </div>

          {HIGHLIGHTS.map(({ y, right, ...card }, i) => (
            <HighlightCard
              key={card.title}
              {...card}
              className={`${card.className} z-10 motion-safe:animate-fade-up`}
              style={{
                '--card-y': y,
                '--card-right': right,
                animationDelay: `${420 + i * 120}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
