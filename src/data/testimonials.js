import illustrativeStory from '../assets/illustrative/story.webp'

// Patient stories. Add ONLY genuine testimonials shared with the patient's
// consent, quoted without changing their meaning. Never invent names,
// outcomes, dates or locations.
//
// - quote: the patient's own words.
// - name: as the patient agreed to be credited (e.g. first name + initial).
// - treatment: only if verified, e.g. 'IVF', 'IUI', 'Fertility Consultation'.
// - image: only a verified photo the patient consented to share; import it
//   and set `image`. While null, a warm abstract panel shows instead.
// - placeholder: remove once real content is filled in.
//
// One story shows on its own; two or more become a carousel automatically.
export const TESTIMONIALS = [
  {
    id: 'story-1',
    quote:
      'Patient testimonial placeholder — replace with a verified patient story, shared with the patient’s consent.',
    name: 'Patient Name',
    treatment: null,
    // ILLUSTRATIVE stock photo — replace with a consented patient photo, or set to null.
    image: illustrativeStory,
    placeholder: true,
  },
]
