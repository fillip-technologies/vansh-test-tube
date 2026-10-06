import { CLINIC, CONSULTATION_HREF } from '../../config/site.js'
import ArrowButton from '../ui/ArrowButton.jsx'
import { Blob, Rings } from '../ui/Decor.jsx'
import SmartLink from '../ui/SmartLink.jsx'

// Splits the title so `highlight` (a word or phrase in it) renders in pink.
function HighlightedTitle({ title, highlight }) {
  if (!highlight || !title.includes(highlight)) return title
  const [before, after] = title.split(highlight)
  return (
    <>
      {before}
      <em className="text-primary-500">{highlight}</em>
      {after}
    </>
  )
}

export default function ServiceHero({ service }) {
  const { hero } = service
  return (
    <section
      aria-labelledby="service-heading"
      className="relative isolate overflow-hidden bg-background px-4 pt-28 pb-14 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36 lg:pb-20"
    >
      <Blob className="-top-24 -right-32 size-[34rem]" />
      <Rings className="-bottom-40 -left-48 hidden size-[30rem] lg:block" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:min-h-[70vh] lg:grid-cols-[1fr_1.02fr] lg:gap-16 xl:gap-20">
        {/* Content */}
        <div className="motion-safe:animate-fade-up">
          <nav aria-label="Breadcrumb" className="text-sm text-secondary-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <SmartLink href="/" className="transition-colors hover:text-primary-600">
                  Home
                </SmartLink>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <SmartLink href="/#treatments" className="transition-colors hover:text-primary-600">
                  Treatments
                </SmartLink>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-secondary-700">
                {service.name}
              </li>
            </ol>
          </nav>

          <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-primary-100 bg-surface px-4 py-2 text-label text-secondary-800 uppercase">
            <span className="size-1.5 rounded-full bg-primary-500" aria-hidden="true" />
            {hero.eyebrow}
          </p>

          <h1
            id="service-heading"
            className={`mt-6 text-hero text-balance text-secondary-800 ${
              // Longer titles step down slightly so they stay within three lines.
              hero.title.length > 40 ? 'lg:text-[3.25rem] lg:leading-[1.06] 2xl:text-[3.5rem]' : 'lg:max-[90rem]:text-[3.5rem]'
            }`}
          >
            <HighlightedTitle title={hero.title} highlight={hero.highlight} />
          </h1>

          <p className="mt-6 max-w-xl text-body text-secondary-600 lg:text-body-lg">{hero.description}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <ArrowButton href={CONSULTATION_HREF} size="lg" className="w-full sm:w-auto">
              {hero.primaryCta}
            </ArrowButton>
            <ArrowButton href={CONSULTATION_HREF} size="lg" variant="outline" className="w-full sm:w-auto">
              {hero.secondaryCta}
            </ArrowButton>
          </div>

          <p className="mt-9 flex items-center gap-2.5 text-sm text-secondary-600">
            <span className="h-px w-8 bg-primary-300" aria-hidden="true" />
            Fertility &amp; IVF Care Since {CLINIC.since} <span aria-hidden="true">•</span> Patna
          </p>
        </div>

        {/* Image */}
        <figure className="relative motion-safe:animate-fade-in">
          <div className="group aspect-[4/5] overflow-hidden rounded-[2rem] bg-blush-100 sm:aspect-[5/4] lg:aspect-auto lg:h-[min(72vh,44rem)]">
            <img
              src={hero.image}
              alt={hero.imageAlt}
              fetchPriority="high"
              decoding="async"
              style={hero.imagePosition ? { objectPosition: hero.imagePosition } : undefined}
              className="size-full object-cover object-[center_25%] transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
            />
          </div>
          {hero.imageCaption && (
            <figcaption className="absolute -bottom-5 left-5 rounded-2xl border border-border bg-surface px-5 py-3.5 shadow-float sm:left-8 lg:-left-8 lg:bottom-10">
              <span className="block text-label text-primary-500 uppercase">{service.name}</span>
              <span className="mt-1 block text-sm font-semibold text-secondary-800">{hero.imageCaption}</span>
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  )
}
