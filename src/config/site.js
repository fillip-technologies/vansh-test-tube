import { TREATMENT_SUMMARIES } from '../data/treatments.js'
import { serviceHref } from '../lib/services.js'
import SEO from './seo.json'

// Clinic details used across the site. Fill these in with verified information.
// Contact details below were provided for the project — confirm with the clinic
// before production.
export const CLINIC = {
  name: 'Vansh Test Tube Baby',
  city: 'Patna, Bihar',
  since: 2014,
  // Full street address, one line per entry.
  addressLines: ['P/13, Vidyapuri,', 'Kankarbagh,', 'Patna, Bihar'],
  // Single-line form used in running text (e.g. the FAQ).
  address: 'P/13, Vidyapuri, Kankarbagh, Patna, Bihar',
  // `tel` is the dialable form; `display` is how it is shown.
  phones: [
    { display: '+91-93863 65513', tel: '+919386365513' },
    { display: '+91-96317 61207', tel: '+919631761207' },
  ],
  // Primary number for "Call the Clinic" actions.
  phone: '+919386365513',
  emails: ['info@vanshtesttubebaby.com', 'contact@vanshtesttubebaby.com'],
  // Used for the map embed and "Get Directions" — confirm the pin is correct.
  mapQuery: 'Vansh Test Tube Baby, P/13, Vidyapuri, Kankarbagh, Patna, Bihar',
  // Public site origin for canonical URLs, sitemap and social previews.
  // Set in config/seo.json.
  siteUrl: SEO.siteUrl,
}

export const CONSULTATION_HREF = '#consultation'

// Verified social profiles only (from the clinic's previous website).
// `icon` names a component in components/ui/icons.jsx.
export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/VanshTestTubeBaby/', icon: 'facebook' },
]

export const mapsEmbedUrl = (query) => `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`
export const mapsDirectionsUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

// Footer navigation. `href: null` = page/section not built yet; the link stays
// hidden until a real destination is set.
export const FOOTER_NAV = [
  { label: 'Home', href: '/#home' },
  { label: 'About Vansh', href: '/about' },
  { label: 'Treatments', href: '/#treatments' },
  { label: 'Why Vansh', href: '/#why-vansh' },
  { label: 'Doctors', href: '/doctors' },
  { label: 'Patient Stories', href: '/#patient-stories' },
  { label: 'Resources', href: '/#faq' },
  { label: 'Contact', href: '/contact' },
]

// Each treatment links to its service page when one exists in services.json,
// otherwise to its card on the homepage.
export const FOOTER_TREATMENTS = TREATMENT_SUMMARIES.map((treatment) => ({
  label: treatment.shortTitle,
  href: serviceHref(treatment.slug),
}))

// Legal pages — hidden until they exist.
export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: null },
  { label: 'Terms & Conditions', href: null },
]
