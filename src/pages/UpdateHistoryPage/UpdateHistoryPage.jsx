import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './UpdateHistoryPage.module.css';
import { updates } from '../../data/updates.js';

const PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Update History — 100 Days Habit Club',
  description:
    'A log of major updates and improvements to 100 Days Habit Club.',
  url: 'https://www.100dayshabitclub.xyz/updates',
};

export default function UpdateHistoryPage() {
  useDocumentMeta({
    title: 'Update History',
    description:
      'A log of major updates and improvements to 100 Days Habit Club.',
    path: '/updates',
    schema: PAGE_SCHEMA,
  });

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <div className={styles.header}>
          <Link to="/" className={styles.backBtn}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <span className={styles.headerTitle}>
            <span className={styles.headerAccent}>100</span> Days
          </span>
        </div>

        <Breadcrumb
          items={[{ label: 'Home', path: '/' }, { label: 'Update History' }]}
        />

        <h1 className={styles.pageTitle}>Update History</h1>
        <p className={styles.subtitle}>
          A log of major updates and improvements to 100 Days Habit Club.
        </p>

        <div className={styles.timeline}>
          {updates.map((entry, i) => (
            <div key={i} className={styles.entry}>
              <div className={styles.entryDate}>
                {new Date(entry.date).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
              <div className={styles.entryTitle}>{entry.title}</div>
              <div className={styles.entryDesc}>{entry.description}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
