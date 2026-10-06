// Consultation lead submission.
//
// TODO: Connect consultation form to backend / API.
// Set VITE_CONSULTATION_ENDPOINT in a .env file (e.g. a form service, CRM
// webhook or your own API). The endpoint receives a JSON POST with:
//   { name, mobile, email, lookingFor, preferredContact, message, source }
// and should respond with a 2xx status on success.
//
// Until an endpoint is configured, submissions fail honestly so the form shows
// its error state — a lead is never reported as received when it wasn't.
const ENDPOINT = import.meta.env.VITE_CONSULTATION_ENDPOINT || ''

export async function submitConsultation(data) {
  if (!ENDPOINT) {
    throw new Error('Consultation form is not connected to a backend yet (VITE_CONSULTATION_ENDPOINT).')
  }
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...data, source: 'website-homepage' }),
  })
  if (!response.ok) {
    throw new Error(`Consultation request failed with status ${response.status}`)
  }
}
