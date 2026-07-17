import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './ContactPage.module.css';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact — 100 Days Habit Club',
  description:
    'Get in touch with the 100 Days Habit Club team. Report errors, share feedback, or explore partnership opportunities.',
  url: 'https://www.100dayshabitclub.xyz/contact',
};

export default function ContactPage() {
  useDocumentMeta({
    title: 'Contact',
    description:
      'Get in touch with the 100 Days Habit Club team. Report errors, share feedback, or explore partnership opportunities.',
    path: '/contact',
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

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Contact' }]} />
        <h1 className={styles.pageTitle}>Contact Us</h1>
        <p className={styles.subtitle}>
          Have a question, suggestion, or correction? We'd love to hear from you.
        </p>

        <div className={styles.contactCard}>
          <p className={styles.emailLabel}>Email Us</p>
          <a href="mailto:hello@100dayshabitclub.xyz" className={styles.email}>
            hello@100dayshabitclub.xyz
          </a>
          <p className={styles.responseNote}>We typically respond within 48 hours.</p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What to Contact About</h2>
          <div className={styles.topics}>
            <div className={styles.topic}>
              <h3 className={styles.topicTitle}>Content Corrections</h3>
              <p className={styles.prose}>
                Spotted an error? Let us know and we'll fix it.
              </p>
            </div>
            <div className={styles.topic}>
              <h3 className={styles.topicTitle}>Suggestions & Feedback</h3>
              <p className={styles.prose}>
                Ideas for new habits, challenges, or features.
              </p>
            </div>
            <div className={styles.topic}>
              <h3 className={styles.topicTitle}>Partnerships</h3>
              <p className={styles.prose}>
                Interested in collaborating? Reach out.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Related Pages</h2>
          <div className={styles.relatedLinks}>
            <Link to="/editorial-policy" className={styles.relatedLink}>Editorial Policy</Link>
            <Link to="/faq" className={styles.relatedLink}>FAQ</Link>
            <Link to="/about" className={styles.relatedLink}>About</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
