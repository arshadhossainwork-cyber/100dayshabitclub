import { Link } from 'react-router-dom';
import styles from './AuthLayout.module.css';

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logoMark} aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <span className={styles.logoText}>
            <span className={styles.logoAccent}>100</span> Days
          </span>
        </Link>

        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {children}
      </div>
    </main>
  );
}
