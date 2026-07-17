/**
 * Author metadata — provides author information for blog posts, guides,
 * and other attributed content across the site.
 */

export const authors = [
  {
    slug: 'arshad-hossain',
    name: 'Arshad Hossain',
    role: 'Founder & Developer',
    bio:
      'Arshad is a software developer and habit science enthusiast who built 100 Days Habit Club as a privacy-first alternative to streak-based habit trackers. ' +
      'Drawing on research in behavior change and commitment devices, he designed the platform to help people focus on consistency over perfection. ' +
      'When he isn\'t writing code, he\'s exploring evidence-based strategies for building lasting habits.',
    expertise: [
      'Habit Formation',
      'Behavior Change',
      'Privacy-First Design',
      'Progressive Web Apps',
    ],
    areas: [
      { label: 'Habits', path: '/habits' },
      { label: 'Challenges', path: '/challenges' },
      { label: 'Blog', path: '/blog' },
      { label: 'Methodology', path: '/methodology' },
    ],
    social: {
      github: 'https://github.com/arshad-hossain',
      twitter: 'https://twitter.com/arshad_hossain',
    },
    avatar: null,
  },
];

/**
 * Look up an author by their URL-safe slug.
 * @param {string} slug — e.g. 'arshad-hossain'
 * @returns {object|undefined} The matching author object, or undefined.
 */
export function getAuthorBySlug(slug) {
  return authors.find((author) => author.slug === slug);
}
