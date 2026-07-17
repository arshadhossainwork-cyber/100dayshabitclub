import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { TOOLS } from '../../data/tools.js';
import styles from './ToolsPage.module.css';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Free Habit Tracking Tools & Calculators',
  description:
    'Free interactive tools to track, measure, and improve your 100-day habit challenge. Streak calculator, completion date estimator, habit scorer, and printable tracker.',
  url: 'https://www.100dayshabitclub.xyz/tools',
  hasPart: TOOLS.map((tool) => ({
    '@type': 'WebApplication',
    name: tool.name,
    url: `https://www.100dayshabitclub.xyz/tools/${tool.slug}`,
    applicationCategory: 'UtilityApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  })),
};

export default function ToolsPage() {
  useDocumentMeta({
    title: 'Free Habit Tracking Tools & Calculators',
    description:
      'Free interactive tools to track, measure, and improve your 100-day habit challenge. Streak calculator, completion date estimator, habit scorer, and printable tracker.',
    path: '/tools',
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

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Tools' }]} />

        <div className={styles.hero}>
          <h1 className={styles.pageTitle}>Habit Tracking Tools</h1>
          <p className={styles.subtitle}>
            Free calculators and generators to measure your progress, score your habits, and stay on track through your 100-day challenge.
          </p>
        </div>

        <div className={styles.toolGrid}>
          {TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              to={`/tools/${tool.slug}`}
              className={styles.toolLink}
            >
              <article className={styles.toolCard}>
                <div className={styles.toolHeader}>
                  <span className={styles.toolEmoji}>{tool.emoji}</span>
                  <div>
                    <h2 className={styles.toolName}>{tool.name}</h2>
                    <p className={styles.toolTagline}>{tool.tagline}</p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to start your challenge?</h2>
          <p className={styles.ctaBody}>
            Pick a habit, use these tools to track your progress, and commit to 100 days.
          </p>
          <div className={styles.ctaLinks}>
            <Link to="/" className={styles.ctaBtn}>Start Tracking</Link>
            <Link to="/challenges" className={styles.ctaBtnSecondary}>Browse Challenges</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
