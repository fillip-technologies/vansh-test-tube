import armchair from '../assets/illustrative/clinic-armchair.webp'
import desk from '../assets/illustrative/clinic-desk.webp'
import lounge from '../assets/illustrative/clinic-lounge.webp'

// Photos of the real Vansh clinic. Use ONLY genuine photos of the premises —
// never stock or AI-generated interiors presented as Vansh.
//
// Order: [main (large, left), second (top right), third (bottom right)].
// For each slot:
// - image: import the photo, e.g. import reception from '../assets/clinic/reception.webp'
// - alt: describe what the photo actually shows, e.g. 'Reception area at Vansh'
// While `image` is null, a neutral placeholder shows with the `hint` text.
// The three images below are ILLUSTRATIVE stock photos, not the Vansh clinic —
// replace them with real photos of the premises before launch.
export const CLINIC_GALLERY = [
  { id: 'main', image: lounge, alt: 'A bright, calm waiting lounge with soft seating and plants', hint: 'Main clinic photo' },
  { id: 'second', image: armchair, alt: 'A comfortable armchair beside a plant in a quiet waiting area', hint: 'Clinic photo' },
  { id: 'third', image: desk, alt: 'A sunlit consultation desk in a calm, neutral room', hint: 'Clinic photo' },
]
