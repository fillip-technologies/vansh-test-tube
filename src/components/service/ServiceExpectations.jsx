import { useId, useRef, useState } from 'react'
import useInView, { revealClasses } from '../../hooks/useInView.js'
import Eyebrow from '../ui/Eyebrow.jsx'

function ExpectationItem({ item, index, open, onToggle }) {
  const id = useId()
  return (
    <li className="border-b border-border last:border-b-0">
      <h3>
        <button
          id={`${id}-q`}
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full items-center gap-5 px-6 py-5 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-500 sm:px-8"
        >
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-full text-sm font-semibold tabular-nums transition-colors duration-200 ${
              open ? 'bg-primary-500 text-surface' : 'bg-blush-100 text-primary-600'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={`flex-1 text-[1.0625rem] font-semibold transition-colors duration-200 ${
              open ? 'text-primary-600' : 'text-secondary-800 group-hover:text-primary-600'
            }`}
          >
            {item.title}
          </span>
          <span
            aria-hidden="true"
            className={`text-xl leading-none text-secondary-500 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
          >
            +
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
          <p className="px-6 pb-6 pl-20 text-body text-secondary-600 sm:px-8 sm:pl-[5.5rem]">{item.description}</p>
        </div>
      </div>
    </li>
  )
}

// "What to expect during treatment" — numbered accordion in a single panel.
export default function ServiceExpectations({ expectations }) {
  const items = expectations.items ?? []
  const [open, setOpen] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, 0.15)
  return (
    <section
      ref={ref}
      aria-labelledby="expectations-heading"
      className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[5fr_7fr] xl:gap-16">
        <div className={`xl:sticky xl:top-32 xl:self-start ${revealClasses(inView)}`}>
          {expectations.eyebrow && <Eyebrow>{expectations.eyebrow}</Eyebrow>}
          <h2 id="expectations-heading" className="mt-5 text-h2 text-balance text-secondary-800 lg:text-[2.375rem] lg:leading-[1.1] xl:text-[2.75rem] 2xl:text-[3.125rem]">
            {expectations.title}
          </h2>
          {expectations.intro && (
            <p className="mt-6 max-w-sm text-body text-secondary-600 lg:text-body-lg">{expectations.intro}</p>
          )}
        </div>
        <ul
          className={`overflow-hidden rounded-[2rem] border border-border bg-surface shadow-float-sm ${revealClasses(inView)}`}
          style={{ transitionDelay: inView ? '150ms' : '0ms' }}
        >
          {items.map((item, i) => (
            <ExpectationItem
              key={item.title}
              item={item}
              index={i}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
