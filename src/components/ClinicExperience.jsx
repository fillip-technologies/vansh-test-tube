import { useRef } from 'react'
import { CONSULTATION_HREF } from '../config/site.js'
import { CLINIC_GALLERY } from '../data/clinicGallery.js'
import useInView, { revealClasses } from '../hooks/useInView.js'
import ArrowButton from './ui/ArrowButton.jsx'
import { ImageIcon } from './ui/icons.jsx'
import { Blob, Dots } from './ui/Decor.jsx'

// General statements only — no certifications, equipment or facility claims.
const POINTS = [
  {
    title: 'Comfortable Environment',
    text: 'Designed to make your visits feel calm and welcoming.',
  },
  {
    title: 'Patient-Focused Care',
    text: 'Thoughtful care that keeps your individual needs at the center.',
  },
  {
    title: 'Professional Clinical Setting',
    text: 'A dedicated environment for fertility consultation and care.',
  },
]

const delay = (inView, ms) => ({ transitionDelay: inView ? `${ms}ms` : '0ms' })

// Real clinic photo, or a neutral placeholder until one is added.
function GalleryImage({ item, sizes, className = '', style }) {
  return (
    <figure
      className={`group overflow-hidden rounded-[1.75rem] border border-border bg-surface ${className}`}
      style={style}
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.alt}
          sizes={sizes}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
        />
      ) : (
        <div
          role="img"
          aria-label="Clinic photo placeholder"
          className="flex size-full flex-col items-center justify-center gap-3 bg-blush-100 text-primary-200"
        >
          <ImageIcon className="size-10 stroke-[1.25]" />
          <span className="text-label text-secondary-500 uppercase">{item.hint}</span>
        </div>
      )}
    </figure>
  )
}

export default function ClinicExperience() {
  const [main, second, third] = CLINIC_GALLERY
  const introRef = useRef(null)
  const galleryRef = useRef(null)
  const pointsRef = useRef(null)
  const introInView = useInView(introRef)
  const galleryInView = useInView(galleryRef, 0.15)
  const pointsInView = useInView(pointsRef, 0.3)

  return (
    <section
      id="clinic"
      aria-labelledby="clinic-heading"
      className="relative isolate overflow-hidden bg-background px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      {/* Subtle background decoration */}
      <Dots className="top-8 right-6 h-52 w-80" />
      <Blob className="-bottom-40 -left-32 size-[28rem]" />
      <div className="mx-auto max-w-7xl">
        {/* Intro */}
        <div
          ref={introRef}
          className={`grid gap-6 lg:grid-cols-[60fr_40fr] lg:items-end lg:gap-16 ${revealClasses(introInView)}`}
        >
          <div>
            <p className="inline-flex items-center gap-3 text-label text-primary-500 uppercase">
              <span className="h-px w-6 bg-primary-200" aria-hidden="true" />
              The Vansh Experience
            </p>
            <h2 id="clinic-heading" className="mt-4 max-w-2xl text-h2 text-balance text-secondary-800">
              A Space Designed Around Your <em className="text-primary-500">Care.</em>
            </h2>
          </div>
          <p className="max-w-md text-body text-secondary-600 lg:pb-1.5 lg:text-body-lg">
            From consultation to treatment, we aim to create a comfortable and supportive
            environment where you can focus on what matters most — your fertility journey.
          </p>
        </div>

        {/* Gallery: large image left, two stacked right (stacked on mobile) */}
        <div
          ref={galleryRef}
          className="mt-12 grid gap-4 sm:grid-cols-[60fr_40fr] sm:grid-rows-2 sm:gap-5 lg:mt-16 lg:gap-6"
        >
          <GalleryImage
            item={main}
            sizes="(min-width: 40rem) 60vw, 100vw"
            className={`aspect-[4/3] sm:row-span-2 sm:aspect-auto sm:h-[28rem] lg:h-[38rem] ${revealClasses(galleryInView)}`}
          />
          <GalleryImage
            item={second}
            sizes="(min-width: 40rem) 40vw, 100vw"
            className={`aspect-[4/3] sm:aspect-auto ${revealClasses(galleryInView)}`}
            style={delay(galleryInView, 200)}
          />
          <GalleryImage
            item={third}
            sizes="(min-width: 40rem) 40vw, 100vw"
            className={`aspect-[4/3] sm:aspect-auto ${revealClasses(galleryInView)}`}
            style={delay(galleryInView, 320)}
          />
        </div>

        {/* Feature points */}
        <ol ref={pointsRef} className="mt-12 grid gap-8 border-t border-border pt-10 md:grid-cols-3 md:gap-10 lg:mt-16 lg:pt-12">
          {POINTS.map((point, i) => (
            <li
              key={point.title}
              className={`flex gap-5 md:block ${revealClasses(pointsInView, 'duration-500')}`}
              style={delay(pointsInView, i * 110)}
            >
              <span className="font-display text-[1.75rem] leading-none text-primary-500" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="md:mt-4">
                <h3 className="text-card-title text-secondary-800">{point.title}</h3>
                <p className="mt-1.5 text-body text-secondary-600">{point.text}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Small CTA */}
        <div
          className={`mt-14 flex flex-col items-center gap-5 rounded-3xl border border-border bg-surface p-6 text-center sm:flex-row sm:justify-between sm:p-5 sm:pl-8 sm:text-left lg:mt-16 ${revealClasses(pointsInView, 'duration-500')}`}
          style={delay(pointsInView, 420)}
        >
          <p className="font-display text-2xl text-secondary-800">Planning Your First Visit?</p>
          <ArrowButton href={CONSULTATION_HREF} size="lg" className="w-full sm:w-auto">
            Book a Consultation
          </ArrowButton>
        </div>
      </div>
    </section>
  )
}
