import { CLINIC } from '../config/site.js'

// General information only — no diagnoses, individual recommendations,
// success rates or timelines. Encourage consultation for personal advice.
export const FAQS = [
  {
    q: 'Who should consider a fertility consultation?',
    a: 'A fertility consultation can be a useful starting point for individuals or couples who have concerns about conception, fertility or their reproductive health. A specialist can help understand your situation and suggest appropriate next steps.',
  },
  {
    q: 'What happens during the first consultation?',
    a: 'Your doctor will discuss your medical and fertility history, understand your concerns and, when appropriate, recommend further evaluation or investigations based on your individual situation.',
  },
  {
    q: 'What fertility treatments does Vansh provide?',
    a: 'Vansh provides fertility care and assisted reproductive treatment options including IVF, IUI, ICSI, Ovulation Induction, Blastocyst Culture & Transfer and Frozen Embryo Transfer. The appropriate approach depends on individual medical circumstances.',
  },
  {
    q: 'How do I know which fertility treatment is right for me?',
    a: 'There is no single treatment that is right for everyone. Your fertility specialist can evaluate your individual situation and discuss the options that may be appropriate for you.',
  },
  {
    q: 'Do I need to bring anything to my first consultation?',
    a: 'If you have previous fertility reports, investigations, prescriptions or relevant medical records, bringing them can help your doctor understand your history. If you do not have previous reports, you can still start with a consultation.',
  },
  {
    q: 'Can I book a consultation before deciding on treatment?',
    a: 'Yes. A consultation is an opportunity to discuss your concerns, understand your options and ask questions before making decisions about treatment.',
  },
  {
    q: 'Where is Vansh Test Tube Baby located?',
    // Only the verified address from config — never a hardcoded guess.
    a: CLINIC.address
      ? `${CLINIC.name} is located in ${CLINIC.city}. Address: ${CLINIC.address}`
      : `${CLINIC.name} is located in ${CLINIC.city}.`,
  },
]
