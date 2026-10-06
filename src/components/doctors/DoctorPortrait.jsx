import { doctorInitials } from '../../data/doctors.js'

// A doctor's real photo, or — until one is supplied — an initials monogram.
// Never substitutes a stock portrait for a named doctor.
export default function DoctorPortrait({ doctor, className = '', size = 'lg' }) {
  if (doctor.image) {
    return (
      <img
        src={doctor.image}
        alt={`Portrait of ${doctor.name}`}
        loading="lazy"
        decoding="async"
        className={`size-full object-cover ${className}`}
      />
    )
  }
  const text = {
    sm: 'text-[1.375rem]',
    md: 'text-[2rem]',
    lg: 'text-[4.5rem] sm:text-[5.5rem]',
  }[size]
  return (
    <div
      role="img"
      aria-label={`${doctor.name} — photo to be added`}
      className="relative flex size-full items-center justify-center overflow-hidden bg-linear-to-br from-blush-50 via-blush-100 to-blush-200"
    >
      {size === 'lg' && (
        <>
          <span aria-hidden="true" className="absolute aspect-square h-[78%] rounded-full border border-primary-100" />
          <span aria-hidden="true" className="absolute aspect-square h-[54%] rounded-full border border-primary-100/80" />
        </>
      )}
      <span aria-hidden="true" className={`relative font-display leading-none text-primary-500 ${text}`}>
        {doctorInitials(doctor.name)}
      </span>
    </div>
  )
}
