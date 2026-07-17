import { Link } from 'react-router-dom';
import styles from './Breadcrumb.module.css';

const SITE_URL = 'https://www.100dayshabitclub.xyz';

/**
 * Breadcrumb navigation with BreadcrumbList JSON-LD.
 *
 * @param {{ items: Array<{ label: string, path?: string }> }} props
 * items — ordered from root to current page; last item has no link.
 */
export default function Breadcrumb({ items }) {
  if (!items || items.length === 0) return null;

  const schemaItems = items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.label,
    ...(item.path ? { item: `${SITE_URL}${item.path}` } : {}),
  }));

  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className={styles.item}>
              {i > 0 && <span className={styles.sep} aria-hidden="true">/</span>}
              {isLast || !item.path ? (
                <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              ) : (
                <Link to={item.path} className={styles.link}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: schemaItems,
          }),
        }}
      />
    </nav>
  );
}
