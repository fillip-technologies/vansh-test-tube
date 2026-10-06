import { useRef } from 'react'
import useInView, { revealClasses } from '../../hooks/useInView.js'
import { Blob } from '../ui/Decor.jsx'
import Eyebrow from '../ui/Eyebrow.jsx'

// Editorial split: image left, horizontal rows with dividers right.
export default function ServiceWhyVansh({ whyVansh }) {
  const ref = useRef(null)
  const inView = useInView(ref, 0.15)
  return (
    <section
      ref={ref}
      aria-labelledby="why-service-heading"
      className="relative isolate overflow-hidden bg-surface px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <Blob className="top-1/4 -left-48 size-[30rem]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {whyVansh.image && (
          <div className={revealClasses(inView)}>
            <div className="group aspect-[5/4] overflow-hidden rounded-[2rem] bg-blush-100 lg:aspect-[4/5]">
              <img
                src={whyVansh.image}
                alt={whyVansh.imageAlt ?? ''}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
              />
            </div>
          </div>
        )}
        <div className={revealClasses(inView)} style={{ transitionDelay: inView ? '150ms' : '0ms' }}>
          {whyVansh.eyebrow && <Eyebrow>{whyVansh.eyebrow}</Eyebrow>}
          <h2 id="why-service-heading" className="mt-5 text-h2 text-balance text-secondary-800 lg:text-[2.375rem] lg:leading-[1.1] xl:text-[2.75rem] 2xl:text-[3.125rem]">
            {whyVansh.title}
          </h2>
          <dl className="mt-10 border-t border-border">
            {whyVansh.points.map((point) => (
              <div key={point.title} className="gap-6 border-b border-border py-6 md:grid md:grid-cols-[13rem_1fr]">
                <dt className="flex items-center gap-3 text-card-title text-secondary-800">
                  <span className="size-1.5 shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
                  {point.title}
                </dt>
                <dd className="mt-1.5 pl-4.5 text-body text-secondary-600 md:mt-0 md:pl-0">{point.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
