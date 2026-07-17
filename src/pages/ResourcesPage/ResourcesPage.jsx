import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './ResourcesPage.module.css';

const BOOKS = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    description:
      'The most practical book on habit formation. Clear\'s framework of cue, craving, response, and reward gives you a systematic way to build good habits and break bad ones. Essential reading for anyone starting a 100-day challenge.',
  },
  {
    title: 'The Power of Habit',
    author: 'Charles Duhigg',
    description:
      'Duhigg explores the neuroscience behind why habits exist and how they can be changed. His "habit loop" model (cue, routine, reward) is foundational to understanding behavior change.',
  },
  {
    title: 'Tiny Habits',
    author: 'BJ Fogg',
    description:
      'Stanford behavior scientist BJ Fogg argues that starting small is the key to lasting change. His method of anchoring tiny behaviors to existing routines is especially effective for the first 21 days of a 100-day challenge.',
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    description:
      'If your 100-day challenge involves focused work — coding, writing, studying — Newport\'s book provides the framework for protecting your attention in a distracted world.',
  },
  {
    title: 'Why We Sleep',
    author: 'Matthew Walker',
    description:
      'Sleep is the foundation of every other habit. Walker\'s research-heavy book will convince you that fixing your sleep is the single highest-leverage change you can make.',
  },
];

const RESEARCH = [
  {
    title: 'How are habits formed: Modelling habit formation in the real world',
    authors: 'Phillippa Lally et al., 2010',
    description:
      'The landmark UCL study that found habit formation takes an average of 66 days, debunking the 21-day myth. This paper is the scientific foundation for the 100-day approach.',
  },
  {
    title: 'Does monitoring goal progress promote goal attainment?',
    authors: 'Benjamin Harkin et al., 2016',
    description:
      'A meta-analysis of 138 studies confirming that self-monitoring — exactly what daily check-ins provide — is one of the strongest predictors of successful behavior change.',
  },
  {
    title: 'Making health habitual: The psychology of habit formation and general practice',
    authors: 'Benjamin Gardner et al., 2012',
    description:
      'A practical review of habit formation research for health behaviors. Confirms that repetition in a consistent context is the primary driver of automaticity.',
  },
];

const TOOLS = [
  {
    title: '100 Days Habit Club',
    description:
      'Our free habit tracker. Track any habit for 100 days with a visual grid, streaks, and milestones. Works offline, no account required.',
    link: '/',
    linkText: 'Start tracking',
  },
  {
    title: 'Habit Library',
    description:
      'Browse 24 proven habits with detailed descriptions, benefits, tips, and 100-day milestone guides.',
    link: '/habits',
    linkText: 'Browse habits',
  },
  {
    title: '100-Day Challenges',
    description:
      'Pre-built challenges that combine related habits into focused 100-day commitments.',
    link: '/challenges',
    linkText: 'View challenges',
  },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Habit Building Resources — 100 Days Habit Club',
  description:
    'Books, research papers, and tools for building lasting habits. Curated resources to support your 100-day habit challenge.',
  url: 'https://www.100dayshabitclub.xyz/resources',
};

export default function ResourcesPage() {
  useDocumentMeta({
    title: 'Habit Building Resources',
    description:
      'Books, research papers, and tools for building lasting habits. Curated resources to support your 100-day habit challenge.',
    path: '/resources',
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

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Resources' }]} />

        <div className={styles.hero}>
          <h1 className={styles.pageTitle}>Habit Building Resources</h1>
          <p className={styles.subtitle}>
            Books, research, and tools to support your 100-day journey. Everything here has been chosen for practical relevance, not comprehensiveness.
          </p>
        </div>

        <section className={styles.section} aria-labelledby="tools">
          <h2 id="tools" className={styles.sectionTitle}>Tools</h2>
          <div className={styles.cardGrid}>
            {TOOLS.map((tool) => (
              <div key={tool.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{tool.title}</h3>
                <p className={styles.cardDesc}>{tool.description}</p>
                <Link to={tool.link} className={styles.cardLink}>{tool.linkText}</Link>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="books">
          <h2 id="books" className={styles.sectionTitle}>Recommended Books</h2>
          <div className={styles.list}>
            {BOOKS.map((book) => (
              <div key={book.title} className={styles.listItem}>
                <div className={styles.listItemHeader}>
                  <h3 className={styles.listItemTitle}>{book.title}</h3>
                  <span className={styles.listItemAuthor}>by {book.author}</span>
                </div>
                <p className={styles.listItemDesc}>{book.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="research">
          <h2 id="research" className={styles.sectionTitle}>Key Research</h2>
          <div className={styles.list}>
            {RESEARCH.map((paper) => (
              <div key={paper.title} className={styles.listItem}>
                <div className={styles.listItemHeader}>
                  <h3 className={styles.listItemTitle}>{paper.title}</h3>
                  <span className={styles.listItemAuthor}>{paper.authors}</span>
                </div>
                <p className={styles.listItemDesc}>{paper.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="internal">
          <h2 id="internal" className={styles.sectionTitle}>More From 100 Days Habit Club</h2>
          <div className={styles.internalLinks}>
            <Link to="/methodology" className={styles.internalLink}>
              The 100-Day Methodology — the science behind our approach
            </Link>
            <Link to="/guides" className={styles.internalLink}>
              Habit Building Guides — practical advice for every stage
            </Link>
            <Link to="/faq" className={styles.internalLink}>
              FAQ — frequently asked questions about the app
            </Link>
            <Link to="/about" className={styles.internalLink}>
              About — our principles and how the app works
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
