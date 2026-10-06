import { useRef, useState } from 'react'
import { CONSULTATION_HREF } from '../config/site.js'
import { TESTIMONIALS } from '../data/testimonials.js'
import useInView, { revealClasses } from '../hooks/useInView.js'
import ArrowButton from './ui/ArrowButton.jsx'
import { ArrowLeft, ArrowRight, Heart } from './ui/icons.jsx'

const pad = (n) => String(n).padStart(2, '0')

// Verified patient photo, or a warm abstract panel — never a stock "patient".
function StoryVisual({ story }) {
  if (story.image) {
    return (
      <img
        key={story.id}
        src={story.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="size-full object-cover motion-safe:animate-fade-in"
      />
    )
  }
  return (
    <div aria-hidden="true" className="relative flex size-full items-center justify-center bg-blush-100">
      <span className="absolute aspect-square h-[78%] rounded-full border border-primary-100" />
      <span className="absolute aspect-square h-[56%] rounded-full border border-primary-100" />
      <span className="absolute aspect-square h-[34%] rounded-full border border-primary-200/60" />
      <span className="relative grid size-16 place-items-center rounded-full bg-surface text-primary-500 shadow-float-sm">
        <Heart className="size-6" />
      </span>
      <span className="absolute bottom-7 left-7 hidden max-w-[12rem] font-display text-2xl leading-tight text-secondary-800 sm:block">
        Every journey is personal.
      </span>
    </div>
  )
}

function CarouselButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-border bg-surface text-secondary-800 transition-colors duration-200 hover:border-primary-200 hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
    >
      {children}
    </button>
  )
}

export default function PatientStories() {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef(null)
  const introRef = useRef(null)
  const showcaseRef = useRef(null)
  const ctaRef = useRef(null)
  const introInView = useInView(introRef)
  const showcaseInView = useInView(showcaseRef, 0.2)
  const ctaInView = useInView(ctaRef, 0.4)

  const count = TESTIMONIALS.length
  if (count === 0) return null

  const isCarousel = count > 1
  const story = TESTIMONIALS[index]
  const go = (step) => setIndex((i) => (i + step + count) % count)

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') go(-1)
    if (e.key === 'ArrowRight') go(1)
  }
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    touchStartX.current = null
  }

  const imageReveal = `transition duration-1000 ease-out motion-reduce:transition-none ${
    showcaseInView
      ? 'scale-100 opacity-100'
      : 'scale-[0.98] opacity-0 motion-reduce:scale-100 motion-reduce:opacity-100'
  }`

  return (
    <section
      id="patient-stories"
      aria-labelledby="stories-heading"
      className="bg-surface px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Intro */}
        <div
          ref={introRef}
          className={`mx-auto max-w-2xl text-center ${revealClasses(introInView, 'duration-500')}`}
        >
          <p className="inline-flex items-center gap-3 text-label text-primary-500 uppercase">
            <span className="h-px w-6 bg-primary-200" aria-hidden="true" />
            Patient Stories
            <span className="h-px w-6 bg-primary-200" aria-hidden="true" />
          </p>
          <h2 id="stories-heading" className="mt-4 text-h2 text-balance text-secondary-800">
            Real Journeys. Real <em className="text-primary-500">Hope.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-body text-secondary-600 lg:text-body-lg">
            Every fertility journey is personal. Hear from patients who chose Vansh to support
            them through their journey.
          </p>
        </div>

        {/* Showcase */}
        <div
          ref={showcaseRef}
          role={isCarousel ? 'region' : undefined}
          aria-roledescription={isCarousel ? 'carousel' : undefined}
          aria-label={isCarousel ? 'Patient stories' : undefined}
          onKeyDown={isCarousel ? onKeyDown : undefined}
          onTouchStart={isCarousel ? onTouchStart : undefined}
          onTouchEnd={isCarousel ? onTouchEnd : undefined}
          className="mt-14 grid items-center gap-10 rounded-[2.5rem] bg-blush-50 p-6 sm:p-10 lg:mt-20 lg:grid-cols-[58fr_42fr] lg:gap-16 lg:p-16"
        >
          {/* Quote */}
          <div className={`order-2 lg:order-1 ${revealClasses(showcaseInView)}`}>
            <span
              aria-hidden="true"
              className="block font-display text-[6rem] leading-[0.6] text-primary-200 lg:text-[7.5rem]"
            >
              &ldquo;
            </span>

            <figure
              key={story.id}
              aria-roledescription={isCarousel ? 'slide' : undefined}
              aria-label={isCarousel ? `${index + 1} of ${count}` : undefined}
              aria-live={isCarousel ? 'polite' : undefined}
              className="mt-4 motion-safe:animate-fade-up"
            >
              <blockquote className="font-display text-h3 font-normal text-secondary-800">
                <p>{story.quote}</p>
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
                <span className="text-body font-semibold text-secondary-600">— {story.name}</span>
                {story.treatment && (
                  <span className="rounded-full bg-blush-200 px-3 py-1 text-label text-secondary-800 uppercase">
                    {story.treatment}
                  </span>
                )}
              </figcaption>
            </figure>

            {isCarousel && (
              <div className="mt-10 flex items-center gap-4">
                <CarouselButton label="Previous story" onClick={() => go(-1)}>
                  <ArrowLeft className="size-4" />
                </CarouselButton>
                <span className="min-w-16 text-center text-button-sm text-secondary-600 tabular-nums">
                  {pad(index + 1)} <span className="text-secondary-400">/ {pad(count)}</span>
                </span>
                <CarouselButton label="Next story" onClick={() => go(1)}>
                  <ArrowRight className="size-4" />
                </CarouselButton>
              </div>
            )}
          </div>

          {/* Visual */}
          <div className={`order-1 lg:order-2 ${imageReveal}`}>
            <div className="mx-auto aspect-[4/3] max-w-md overflow-hidden rounded-[2rem] sm:aspect-[5/4] lg:aspect-[4/5] lg:max-w-none">
              <StoryVisual story={story} />
            </div>
          </div>
        </div>

        {/* Next step */}
        <div
          ref={ctaRef}
          className={`mx-auto mt-16 max-w-2xl text-center lg:mt-20 ${revealClasses(ctaInView, 'duration-500')}`}
        >
          <h3 className="font-display text-h3 text-balance text-secondary-800">
            Your journey could be the next one we support.
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-body text-secondary-600">
            Take the first step by speaking with our fertility team.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <ArrowButton href={CONSULTATION_HREF} size="lg" className="w-full sm:w-auto">
              Book a Consultation
            </ArrowButton>
            <ArrowButton href={CONSULTATION_HREF} size="lg" variant="outline" className="w-full sm:w-auto">
              Talk to a Fertility Specialist
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  )
}
