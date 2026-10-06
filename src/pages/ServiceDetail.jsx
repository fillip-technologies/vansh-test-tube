import { useParams } from 'react-router'
import Consultation from '../components/Consultation.jsx'
import FinalCta from '../components/FinalCta.jsx'
import RelatedServices from '../components/service/RelatedServices.jsx'
import ServiceCareTeam from '../components/service/ServiceCareTeam.jsx'
import ServiceConsiderations from '../components/service/ServiceConsiderations.jsx'
import ServiceCost from '../components/service/ServiceCost.jsx'
import ServiceExpectations from '../components/service/ServiceExpectations.jsx'
import ServiceFaq from '../components/service/ServiceFaq.jsx'
import ServiceHero from '../components/service/ServiceHero.jsx'
import ServiceOutcomes from '../components/service/ServiceOutcomes.jsx'
import ServiceOverview from '../components/service/ServiceOverview.jsx'
import ServicePreparation from '../components/service/ServicePreparation.jsx'
import ServiceProcess from '../components/service/ServiceProcess.jsx'
import ServiceSnapshot from '../components/service/ServiceSnapshot.jsx'
import ServiceSuitability from '../components/service/ServiceSuitability.jsx'
import ServiceTimeline from '../components/service/ServiceTimeline.jsx'
import ServiceWhyVansh from '../components/service/ServiceWhyVansh.jsx'
import { CLINIC } from '../config/site.js'
import { getService } from '../lib/services.js'
import NotFound from './NotFound.jsx'

// Page metadata from services.json. React 19 hoists these tags into <head>.
function ServiceSeo({ service }) {
  const origin = CLINIC.siteUrl || window.location.origin
  const url = `${origin}/treatments/${service.slug}`
  const title = service.seo?.title ?? `${service.name} | ${CLINIC.name}`
  const description = service.seo?.description ?? service.hero.description
  const image = `${origin}${service.seo?.ogImage ?? service.hero.image}`
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  )
}

// The single, reusable master service page. Everything that changes between
// treatments comes from services.json; sections without data are skipped.
export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)

  if (!service) {
    return (
      <NotFound
        title="Treatment Not Found"
        message="We couldn't find that treatment. Explore the fertility treatments we offer, or speak with our team."
      />
    )
  }

  return (
    <main key={service.slug}>
      <ServiceSeo service={service} />
      <ServiceHero service={service} />
      <ServiceSnapshot facts={service.quickFacts} />
      {service.overview && <ServiceOverview overview={service.overview} />}
      {service.suitability && <ServiceSuitability suitability={service.suitability} />}
      {service.preparation && <ServicePreparation preparation={service.preparation} />}
      {service.process && <ServiceProcess process={service.process} />}
      {service.timeline && <ServiceTimeline timeline={service.timeline} />}
      {service.expectations && <ServiceExpectations expectations={service.expectations} />}
      {service.outcomes && <ServiceOutcomes outcomes={service.outcomes} />}
      {service.cost && <ServiceCost cost={service.cost} />}
      {service.considerations && <ServiceConsiderations considerations={service.considerations} />}
      {service.whyVansh && <ServiceWhyVansh whyVansh={service.whyVansh} />}
      <ServiceCareTeam careTeam={service.careTeam} serviceName={service.name} />
      <ServiceFaq faqs={service.faqs} serviceName={service.name} title={service.faqTitle} />
      {service.finalCta && (
        <FinalCta
          eyebrow={service.finalCta.eyebrow}
          title={service.finalCta.title}
          description={service.finalCta.description}
          button={service.finalCta.button}
          secondary={service.finalCta.secondary}
        />
      )}
      <Consultation service={service} />
      <RelatedServices slugs={service.relatedServices} title={service.relatedTitle} />
    </main>
  )
}
