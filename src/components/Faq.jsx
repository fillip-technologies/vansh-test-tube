import { useId, useRef, useState } from 'react'
import { CONSULTATION_HREF } from '../config/site.js'
import { FAQS } from '../data/faqs.js'
import useInView, { revealClasses } from '../hooks/useInView.js'
import ArrowButton from './ui/ArrowButton.jsx'
import { Blob, Rings } from './ui/Decor.jsx'


function PlusMinus({ open }) {
  return (
    <span
      aria-hidden="true"
      className={`relative grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
        open ? 'border-primary-200 bg-surface text-primary-500' : 'border-border text-secondary-700'
      }`}
    >
      <span className="absolute h-px w-3 bg-current" />
      <span
        className={`absolute h-3 w-px bg-current transition-transform duration-300 motion-reduce:transition-none ${
          open ? 'rotate-90' : ''
        }`}
      />
    </span>
  )
}

function FaqItem({ item, open, onToggle, style, className = '' }) {
  const id = useId()
  const buttonId = `${id}-button`
  const panelId = `${id}-panel`

  return (
    <li
      className={`rounded-2xl border transition-colors duration-300 ${
        open ? 'border-primary-100 bg-blush-50' : 'border-border bg-surface'
      } ${className}`}
      style={style}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className={`flex w-full items-center justify-between gap-5 rounded-2xl px-5 py-5 text-left text-body font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 sm:px-7 sm:text-card-title ${
            open ? 'text-primary-500' : 'text-secondary-800 hover:text-primary-500'
          }`}
        >
          {item.q}
          <PlusMinus open={open} />
        </button>
      </h3>
      {/* Grid rows 0fr → 1fr animates to the content's natural height. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-6 text-body text-secondary-600 sm:px-7 sm:pr-20">{item.a}</p>
        </div>
      </div>
    </li>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)
  const introRef = useRef(null)
  const listRef = useRef(null)
  const ctaRef = useRef(null)
  const introInView = useInView(introRef)
  const listInView = useInView(listRef, 0.1)
  const ctaInView = useInView(ctaRef, 0.4)

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative isolate overflow-hidden bg-background px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      {/* Subtle background decoration */}
      <Rings className="top-24 -left-36 hidden size-[24rem] lg:block" />
      <Blob className="-right-40 bottom-10 size-[28rem]" />
      <div className="mx-auto max-w-4xl">
        {/* Intro */}
        <div
          ref={introRef}
          className={`mx-auto max-w-2xl text-center ${revealClasses(introInView, 'duration-500')}`}
        >
          <p className="inline-flex items-center gap-3 text-label text-primary-500 uppercase">
            <span className="h-px w-6 bg-primary-200" aria-hidden="true" />
            Common Questions
            <span className="h-px w-6 bg-primary-200" aria-hidden="true" />
          </p>
          <h2 id="faq-heading" className="mt-4 text-h2 text-balance text-secondary-800">
            Questions You May <em className="text-primary-500">Have.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-body text-secondary-600 lg:text-body-lg">
            Starting a fertility journey can bring many questions. Here are a few common ones to
            help you understand what to expect.
          </p>
        </div>

        {/* Accordion — one item open at a time */}
        <ul ref={listRef} className="mt-12 space-y-3 lg:mt-16">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
              className={revealClasses(listInView, 'duration-500')}
              style={{ transitionDelay: listInView ? `${i * 60}ms` : '0ms' }}
            />
          ))}
        </ul>

        {/* Still have questions */}
        <div
          ref={ctaRef}
          className={`mt-16 rounded-[2rem] bg-blush-50 px-6 py-10 text-center sm:px-10 lg:mt-20 lg:py-12 ${revealClasses(ctaInView, 'duration-500')}`}
        >
          <h3 className="font-display text-h3 text-secondary-800">Still Have Questions?</h3>
          <p className="mx-auto mt-4 max-w-lg text-body text-secondary-600">
            Our fertility team can help you understand your options and guide you through the next
            step.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
            <ArrowButton href={CONSULTATION_HREF} size="lg" className="w-full sm:w-auto">
              Talk to a Fertility Specialist
            </ArrowButton>
            <a
              href={CONSULTATION_HREF}
              className="self-center rounded-md text-button text-primary-500 underline decoration-primary-200 underline-offset-4 transition-colors duration-200 hover:text-primary-600 hover:decoration-primary-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
