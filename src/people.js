/* ==================== PEOPLE DATABASE ====================
   One object per person. "slug" becomes the URL:
   yoursite.com/id/chirayu-durgude
   Copy a block, change the values, keep the commas. */

export const PEOPLE = [
  {
    slug: 'chirayu-durgude',
    name: 'CHIRAYU DURGUDE',
    initials: 'CD',
    role: 'Technical Head',
    org: 'Training & Placement Committee',
    year: '2026-2027',
    photo: '',                       // e.g. '/photos/chirayu.jpg' — empty shows initials
    description:
      "Write the description here.\n\nWhat this person handles in TPC, " +
      "their skills, and how students can reach out.",
    email: 'name@example.com',
    phone: '+910000000000',
    links: {
      LinkedIn:  'https://www.linkedin.com/in/your-id',
      Instagram: 'https://www.instagram.com/your-id',
      WhatsApp:  'https://wa.me/910000000000'
    }
  },
  {
    slug: 'priya-shah',
    name: 'PRIYA SHAH',
    initials: 'PS',
    role: 'Design Head',
    org: 'Training & Placement Committee',
    year: '2026-2027',
    photo: '',
    description:
      "Write the description here.\n\nWhat this person handles in TPC, " +
      "their skills, and how students can reach out.",
    email: 'name2@example.com',
    phone: '+910000000001',
    links: {
      LinkedIn:  'https://www.linkedin.com/in/your-id-2',
      Instagram: 'https://www.instagram.com/your-id-2',
      WhatsApp:  'https://wa.me/910000000001'
    }
  }
  // add more people here
];