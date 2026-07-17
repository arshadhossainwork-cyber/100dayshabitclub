import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './AuthorsPage.module.css';
import { authors } from '../../data/authors.js';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Authors — 100 Days Habit Club',
  description:
    'Meet the people behind 100 Days Habit Club — writers, researchers, and developers sharing evidence-based strategies for building lasting habits.',
  url: 'https://www.100dayshabitclub.xyz/authors',
};

export default function AuthorsPage() {
  useDocumentMeta({
    title: 'Authors',
    description:
      'Meet the people behind 100 Days Habit Club — writers, researchers, and developers sharing evidence-based strategies for building lasting habits.',
    path: '/authors',
    schema: SCHEMA,
  });

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <div className={styles.header}>
          <Link to="/" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <span className={styles.headerTitle}>
            <span className={styles.headerAccent}>100</span> Days
          </span>
        </div>

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Authors' }]} />
        <h1 className={styles.pageTitle}>Our Authors</h1>
        <p className={styles.subtitle}>
          Meet the people behind 100 Days Habit Club — writers, researchers, and developers sharing evidence-based strategies for building lasting habits.
        </p>

        <div className={styles.authorGrid}>
          {authors.map((author) => (
            <Link
              key={author.slug}
              to={`/authors/${author.slug}`}
              className={styles.authorCard}
            >
              <div className={styles.avatar} aria-hidden="true">
                {author.name.charAt(0)}
              </div>
              <div className={styles.authorInfo}>
                <h2 className={styles.authorName}>{author.name}</h2>
                <p className={styles.authorRole}>{author.role}</p>
                <p className={styles.authorBio}>{author.bio}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
