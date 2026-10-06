import { useId, useRef, useState } from 'react'
import useInView, { revealClasses } from '../../hooks/useInView.js'
import Eyebrow from '../ui/Eyebrow.jsx'

function FaqRow({ item, open, onToggle }) {
  const id = useId()
  return (
    <li className="border-b border-border">
      <h3>
        <button
          id={`${id}-q`}
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className={`flex w-full items-center justify-between gap-6 rounded-sm py-6 text-left text-body font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 sm:text-card-title ${
            open ? 'text-primary-600' : 'text-secondary-800 hover:text-primary-600'
          }`}
        >
          {item.question}
          <span
            aria-hidden="true"
            className={`relative grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
              open ? 'border-primary-200 text-primary-500' : 'border-border text-secondary-700'
            }`}
          >
            <span className="absolute h-px w-3 bg-current" />
            <span className={`absolute h-3 w-px bg-current transition-transform duration-300 ${open ? 'rotate-90' : ''}`} />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-3xl pr-12 pb-7 text-body text-secondary-600">{item.answer}</p>
        </div>
      </div>
    </li>
  )
}

// Service FAQs — divider-separated accordion, one open at a time.
export default function ServiceFaq({ faqs = [], serviceName, title }) {
  const [open, setOpen] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, 0.1)
  if (faqs.length === 0) return null
  return (
    <section
      ref={ref}
      aria-labelledby="service-faq-heading"
      className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className={`mx-auto max-w-4xl ${revealClasses(inView)}`}>
        <Eyebrow>Common Questions</Eyebrow>
        <h2 id="service-faq-heading" className="mt-5 text-h2 text-balance text-secondary-800">
          {title ?? `${serviceName} Questions, Answered.`}
        </h2>
        <ul className="mt-10 border-t border-border">
          {faqs.map((item, i) => (
            <FaqRow key={item.question} item={item} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </ul>
      </div>
    </section>
  )
}
