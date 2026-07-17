import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './PrivacyPolicyPage.module.css';

export default function PrivacyPolicyPage() {
  useDocumentMeta({
    title: 'Privacy Policy',
    description: 'Privacy policy for 100 Days Habit Club — how your data is stored and protected.',
    path: '/privacy',
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

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Privacy Policy' }]} />
        <h1 className={styles.pageTitle}>Privacy Policy</h1>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Local-First by Default</h2>
            <p>All habit data is stored locally in your browser. The app works fully offline without an account. No data leaves your device unless you opt in to cloud sync.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Optional Account &amp; Cloud Sync</h2>
            <p>If you create an account, your email and habit data are stored securely on Supabase (our database provider) to enable cross-device sync. Your data is protected by row-level security — only you can access it. You can disconnect your account at any time; your local data is preserved.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Shared Progress Cards</h2>
            <p>When you create a public share link, a snapshot of your habit stats is stored so others can view it. Shared cards never contain your email, account ID, or individual completion dates. You can revoke any shared link at any time.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Anonymous Analytics</h2>
            <p>We use Vercel Analytics to collect anonymous, aggregated page view data (e.g. page visits and country). No personal information is collected.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Delete Your Data Anytime</h2>
            <p>You can delete all your data at any time from Settings. If you have an account, disconnecting removes cloud data access. Use &quot;Reset All Data&quot; to clear everything locally.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
