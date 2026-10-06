// Generates public/sitemap.xml and public/robots.txt from the site's data, so
// they always match the real routes. Runs automatically before `npm run build`.
import { readFileSync, writeFileSync } from 'node:fs'

const read = (path) => JSON.parse(readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'))
const { siteUrl } = read('src/config/seo.json')
const services = read('src/data/services.json')
const doctors = read('src/data/doctors.json')
const today = new Date().toISOString().slice(0, 10)

const pages = [
  { path: '/', priority: '1.0' },
  { path: '/about', priority: '0.8' },
  { path: '/doctors', priority: '0.8' },
  { path: '/contact', priority: '0.8' },
  ...services.map((s) => ({ path: `/treatments/${s.slug}`, priority: '0.9' })),
  ...doctors.map((d) => ({ path: `/doctors/${d.profileSlug}`, priority: '0.6' })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${siteUrl}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), sitemap)
writeFileSync(new URL('../public/robots.txt', import.meta.url), robots)
console.log(`SEO files: ${pages.length} URLs in sitemap.xml, robots.txt written.`)
