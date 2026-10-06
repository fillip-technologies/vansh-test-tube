import { useEffect, useState } from 'react'

// True once the element has scrolled into view (fires once, then disconnects).
export default function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const node = ref.current
    // The element may be conditionally rendered; nothing to observe yet.
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, threshold])
  return inView
}

// Fade + rise classes for a reveal; pair with a transitionDelay for stagger.
export function revealClasses(inView, duration = 'duration-700') {
  return `transition ${duration} ease-out motion-reduce:transition-none ${
    inView
      ? 'translate-y-0 opacity-100'
      : 'translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
  }`
}
