/**
 * Centralized Schema.org JSON-LD builders.
 * Adds author, publisher, and dateModified automatically.
 */

const AUTHOR = {
  '@type': 'Person',
  name: 'Arshad Hossain',
  url: 'https://www.100dayshabitclub.xyz/about',
};

const PUBLISHER = {
  '@type': 'Organization',
  name: '100 Days Habit Club',
  url: 'https://www.100dayshabitclub.xyz',
};

export function buildArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  keywords,
  isPartOf,
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    keywords,
    author: AUTHOR,
    publisher: PUBLISHER,
    ...(isPartOf ? { isPartOf } : {}),
  };
}

export function buildHowToSchema({ name, description, url, steps }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    url,
    totalTime: 'P100D',
    author: AUTHOR,
    step: steps,
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}
