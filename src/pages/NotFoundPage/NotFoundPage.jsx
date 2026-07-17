import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  useDocumentMeta({
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    noindex: true,
  });

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.code} aria-hidden="true">404</p>
        <h1 className={styles.message}>Page not found</h1>
        <p className={styles.hint}>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className={styles.homeBtn}>Go to Home</Link>
      </div>
    </main>
  );
}
