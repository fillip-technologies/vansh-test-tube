import SERVICES from '../data/services.json'
import { TREATMENT_SUMMARIES } from '../data/treatments.js'

export function getService(slug) {
  return SERVICES.find((service) => service.slug === slug) ?? null
}

export function hasServicePage(slug) {
  return SERVICES.some((service) => service.slug === slug)
}

// Link to a treatment: its service page if one exists in services.json,
// otherwise the treatment's card on the homepage.
export function serviceHref(slug) {
  return hasServicePage(slug) ? `/treatments/${slug}` : `/#treatment-${slug}`
}

export function getTreatmentSummary(slug) {
  return TREATMENT_SUMMARIES.find((treatment) => treatment.slug === slug) ?? null
}

// Pages with a consultation form (home, contact, valid service pages) link to it
// in-page; any other page links to the homepage form.
export function consultationHrefFor(pathname) {
  const slug = pathname.match(/^\/treatments\/([^/]+)/)?.[1]
  const hasForm = pathname === '/' || pathname === '/contact' || (slug && hasServicePage(slug))
  return hasForm ? '#consultation' : '/#consultation'
}

export { SERVICES }
