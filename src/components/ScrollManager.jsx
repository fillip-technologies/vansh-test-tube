import { useEffect } from 'react'
import { useLocation } from 'react-router'

// On route changes: scroll to the #hash target if there is one (e.g. "/#faq"
// from a treatment page), otherwise to the top of the new page.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section has rendered.
      const frame = requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView()
      })
      return () => cancelAnimationFrame(frame)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
