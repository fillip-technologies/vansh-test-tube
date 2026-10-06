import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { SEO, absoluteUrl } from '../lib/seo.js'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!href) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setPageJsonLd(data) {
  const id = 'page-jsonld'
  document.getElementById(id)?.remove()
  if (!data) return
  const el = document.createElement('script')
  el.type = 'application/ld+json'
  el.id = id
  el.textContent = JSON.stringify(data)
  document.head.appendChild(el)
}

// Per-page SEO. Updates the tags already present in index.html (rather than
// adding duplicates), so crawlers that run JavaScript see page-specific
// title, description, canonical, Open Graph / Twitter tags and JSON-LD.
//
// `jsonLd` — one schema.org object or an array of them (without @context).
export default function Seo({ title, description, image, type = 'website', noindex = false, jsonLd }) {
  const { pathname } = useLocation()
  const fullTitle = title ?? SEO.defaultTitle
  const desc = description ?? SEO.defaultDescription
  const img = absoluteUrl(image ?? SEO.defaultImage)
  const url = absoluteUrl(pathname)
  const ld = jsonLd
    ? JSON.stringify({ '@context': 'https://schema.org', '@graph': [].concat(jsonLd) })
    : ''

  useEffect(() => {
    document.title = fullTitle
    setMeta('name', 'description', desc)
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    // A noindex page (e.g. 404) shouldn't point search engines at its own URL.
    setCanonical(noindex ? null : url)

    setMeta('property', 'og:type', type)
    setMeta('property', 'og:site_name', SEO.siteName)
    setMeta('property', 'og:locale', SEO.locale)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', img)
    // The default social image is 1200×630; other images' sizes aren't known.
    if (image) document.head.querySelectorAll('meta[property^="og:image:"]').forEach((el) => el.remove())
    else {
      setMeta('property', 'og:image:width', '1200')
      setMeta('property', 'og:image:height', '630')
    }

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'twitter:image', img)

    setPageJsonLd(ld ? JSON.parse(ld) : null)
  }, [fullTitle, desc, image, img, url, type, noindex, ld])

  return null
}
