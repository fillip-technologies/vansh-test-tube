import SEO from '../config/seo.json'

export { SEO }

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path
  const origin = SEO.siteUrl || window.location.origin
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`
}

export const CLINIC_ID = `${SEO.siteUrl}/#clinic`

// schema.org structured data builders (JSON-LD).

export function breadcrumbLd(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqLd(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}
