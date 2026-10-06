import DOCTORS_JSON from './doctors.json'

// The Vansh care team. Source of truth: doctors.json — names, designations,
// qualifications and registration numbers as listed on the clinic's previous
// website (vanshtesttubebaby.com/doctor/doctor-list.php).
//
// Add ONLY verified information. Leave a field empty rather than guessing:
// - image: path to a real portrait (e.g. "/images/doctors/dr-name.webp").
//   While empty, an initials monogram is shown — never a stock photo.
// - specialization / experience / bio: only once confirmed by the clinic.
//
// This module adapts the JSON for components (adds `role`, `specialties`,
// `profileHref`).
export const DOCTORS = DOCTORS_JSON.map((doctor) => ({
  ...doctor,
  role: doctor.designation,
  specialties: doctor.specialization ?? [],
  image: doctor.image || null,
  profileHref: `/doctors/${doctor.profileSlug}`,
}))

export function getDoctorBySlug(slug) {
  return DOCTORS.find((doctor) => doctor.profileSlug === slug) ?? null
}

// "Dr. Sagar Dulal Sinha" → "SS"
export function doctorInitials(name) {
  const parts = name.replace(/^Dr\.?\s*/i, '').split(/\s+/).filter(Boolean)
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase()
}
