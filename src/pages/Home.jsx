import CareApproach from '../components/CareApproach.jsx'
import CareTeam from '../components/CareTeam.jsx'
import ClinicExperience from '../components/ClinicExperience.jsx'
import Consultation from '../components/Consultation.jsx'
import Faq from '../components/Faq.jsx'
import FinalCta from '../components/FinalCta.jsx'
import Hero from '../components/Hero.jsx'
import PatientJourney from '../components/PatientJourney.jsx'
import PatientStories from '../components/PatientStories.jsx'
import Treatments from '../components/Treatments.jsx'
import VanshApproach from '../components/VanshApproach.jsx'
import WhyVansh from '../components/WhyVansh.jsx'

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyVansh />
      <CareApproach />
      <Treatments />
      <VanshApproach />
      <CareTeam />
      <PatientJourney />
      <PatientStories />
      <ClinicExperience />
      <Faq />
      <FinalCta />
      <Consultation />
    </main>
  )
}
