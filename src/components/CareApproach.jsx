import { useRef } from 'react'
import consultImg from '../assets/vansh-consultation.webp'
import consultImgSmall from '../assets/vansh-consultation-1200.webp'
import useInView, { revealClasses } from '../hooks/useInView.js'
import ArrowButton from './ui/ArrowButton.jsx'
import { ClipboardList, Heart, MessageCircle } from './ui/icons.jsx'
import { Blob, Rings } from './ui/Decor.jsx'

// Listen → plan → guide. Keep these factual — no invented claims.
const STEPS = [
  {
    title: 'Listen First',
    text: 'We understand your concerns before recommending the next step.',
    Icon: Heart,
  },
  {
    title: 'Plan Around You',
    text: 'Treatment guidance is tailored to your individual fertility needs.',
    Icon: ClipboardList,
  },
  {
    title: 'Guide You Throughout',
    text: 'Clear communication and compassionate support throughout your journey.',
    Icon: MessageCircle,
  },
]

const delay = (inView, ms) => ({ transitionDelay: inView ? `${ms}ms` : '0ms' })

export default function CareApproach() {
  const introRef = useRef(null)
  const bodyRef = useRef(null)
  const introInView = useInView(introRef)
  const bodyInView = useInView(bodyRef, 0.2)

  return (
    <section
      id="your-journey"
      aria-labelledby="your-journey-heading"
      className="relative isolate overflow-hidden bg-background px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      {/* Subtle background decoration */}
      <Rings className="top-[38%] -left-48 hidden size-[38rem] lg:block" />
      <Blob className="-right-40 -bottom-40 size-[28rem]" />
      <div className="mx-auto max-w-7xl">
        {/* Editorial statement */}
        <div ref={introRef} className={`mx-auto max-w-5xl text-center ${revealClasses(introInView)}`}>
          <p className="inline-flex items-center gap-3 text-label text-primary-500 uppercase">
            <span className="h-px w-6 bg-primary-200" aria-hidden="true" />
            Your Journey Matters
            <span className="h-px w-6 bg-primary-200" aria-hidden="true" />
          </p>
          <h2 id="your-journey-heading" className="mt-4 text-h2 text-balance text-secondary-800">
            Your Fertility Journey Deserves <em className="text-primary-500">More</em> Than Just
            Treatment.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-body text-secondary-600 lg:text-body-lg">
            Every fertility journey is different. At Vansh, we take time to understand your
            concerns, evaluate your needs and guide you toward the right treatment with clarity,
            compassion and care.
          </p>
        </div>

        <div
          ref={bodyRef}
          className="mt-14 grid items-center gap-14 lg:mt-20 lg:grid-cols-[48fr_52fr] lg:gap-20 xl:gap-24"
        >
          {/* Image */}
          <figure className={`relative ${revealClasses(bodyInView)}`}>
            <div className="group aspect-[4/3] overflow-hidden rounded-[2rem] bg-blush-100 sm:aspect-[5/4] lg:aspect-[4/5]">
              <img
                src={consultImg}
                srcSet={`${consultImgSmall} 1200w, ${consultImg} 2400w`}
                sizes="(min-width: 64rem) 600px, 100vw"
                alt="A smiling fertility doctor in conversation with a couple during a consultation"
                loading="lazy"
                decoding="async"
                className="size-full object-cover object-[45%_center] transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
              />
            </div>

            <figcaption className="absolute right-4 -bottom-7 flex items-center gap-3.5 rounded-2xl border border-border bg-surface py-3.5 pr-6 pl-3.5 shadow-float sm:right-6 lg:-right-8 lg:bottom-10">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blush-100 text-primary-500">
                <Heart className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-secondary-800">Compassionate Care</span>
                <span className="mt-0.5 block text-[0.8125rem] text-secondary-600">
                  Guidance at every step
                </span>
              </span>
            </figcaption>
          </figure>

          {/* Content */}
          <div className="pt-4 lg:pt-0">
            <div className={revealClasses(bodyInView)} style={delay(bodyInView, 120)}>
              <p className="text-label text-primary-500 uppercase">Care Beyond Treatment</p>
              <h3 className="mt-4 font-display text-h3 text-balance text-secondary-800">
                Because Every Journey to Parenthood Is Different.
              </h3>
              <p className="mt-5 max-w-xl text-body text-secondary-600 lg:text-body-lg">
                We believe fertility care should feel personal, transparent and reassuring. From
                your first conversation to treatment planning and follow-up, our approach is
                centered around your individual needs.
              </p>
            </div>

            <ol className="mt-9 max-w-xl border-t border-border">
              {STEPS.map(({ title, text, Icon }, i) => (
                <li
                  key={title}
                  className={`flex gap-4 border-b border-border py-5 ${revealClasses(bodyInView)}`}
                  style={delay(bodyInView, 220 + i * 100)}
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blush-100 text-primary-500">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h4 className="text-card-title text-secondary-800">{title}</h4>
                    <p className="mt-1 text-body text-secondary-600">{text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className={`mt-9 ${revealClasses(bodyInView)}`} style={delay(bodyInView, 560)}>
              <ArrowButton href="#book-consultation" size="lg" className="w-full sm:w-auto">
                Talk to a Fertility Specialist
              </ArrowButton>
              <p className="mt-3.5 text-sm text-secondary-600">
                Start with a conversation. No pressure, just guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
