import { CLINIC } from '../config/site.js'
import Seo from '../components/Seo.jsx'
import ArrowButton from '../components/ui/ArrowButton.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'

// Shown for unknown routes and treatment slugs not found in services.json.
export default function NotFound({ title = 'Page Not Found', message }) {
  return (
    <main className="bg-background px-4 pt-40 pb-24 sm:px-6 lg:px-8 lg:pt-48 lg:pb-32">
      <Seo title={`${title} | ${CLINIC.name}`} noindex />
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-label text-primary-500 uppercase">404</p>
        <h1 className="mt-4 text-h2 text-balance text-secondary-800">{title}</h1>
        <p className="mx-auto mt-5 max-w-lg text-body text-secondary-600 lg:text-body-lg">
          {message ?? "The page you're looking for doesn't exist or may have moved."}
        </p>
        <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          <ArrowButton href="/#treatments" size="lg" className="w-full sm:w-auto">
            View All Treatments
          </ArrowButton>
          <SmartLink
            href="/"
            className="self-center rounded-md text-button text-primary-500 underline decoration-primary-200 underline-offset-4 hover:text-primary-600"
          >
            Back to Home
          </SmartLink>
        </div>
      </div>
    </main>
  )
}
