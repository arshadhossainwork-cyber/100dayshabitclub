import { useRef, useEffect } from 'react';
import styles from './PrivacyPolicy.module.css';

export default function PrivacyPolicy({ open, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onCancel={onClose}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>Privacy Policy</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close privacy policy"
          >
            &times;
          </button>
        </div>

        <div className={styles.body}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Local-First by Default</h3>
            <p>All habit data is stored locally in your browser. The app works fully offline without an account. No data leaves your device unless you opt in to cloud sync.</p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Optional Account &amp; Cloud Sync</h3>
            <p>If you create an account, your email and habit data are stored securely on Supabase (our database provider) to enable cross-device sync. Your data is protected by row-level security — only you can access it. You can disconnect your account at any time; your local data is preserved.</p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Shared Progress Cards</h3>
            <p>When you create a public share link, a snapshot of your habit stats is stored so others can view it. Shared cards never contain your email, account ID, or individual completion dates. You can revoke any shared link at any time.</p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Anonymous Analytics</h3>
            <p>We use Vercel Analytics to collect anonymous, aggregated page view data (e.g. page visits and country). No personal information is collected.</p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Delete Your Data Anytime</h3>
            <p>You can delete all your data at any time from Settings. If you have an account, disconnecting removes cloud data access. Use &quot;Reset All Data&quot; to clear everything locally.</p>
          </section>
        </div>

        <div className={styles.footer}>
          <button className={styles.doneBtn} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </dialog>
  );
}
