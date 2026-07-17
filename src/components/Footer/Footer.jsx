import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav} aria-label="Footer navigation">
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/habits" className={styles.link}>Habits</Link>
        <Link to="/challenges" className={styles.link}>Challenges</Link>
        <Link to="/guides" className={styles.link}>Guides</Link>
        <Link to="/blog" className={styles.link}>Blog</Link>
        <Link to="/methodology" className={styles.link}>Methodology</Link>
        <Link to="/resources" className={styles.link}>Resources</Link>
        <Link to="/statistics" className={styles.link}>Statistics</Link>
        <Link to="/report" className={styles.link}>Report</Link>
        <Link to="/case-studies" className={styles.link}>Case Studies</Link>
        <Link to="/templates" className={styles.link}>Templates</Link>
        <Link to="/tools" className={styles.link}>Tools</Link>
        <Link to="/about" className={styles.link}>About</Link>
        <Link to="/authors" className={styles.link}>Authors</Link>
        <Link to="/editorial-policy" className={styles.link}>Editorial Policy</Link>
        <Link to="/contact" className={styles.link}>Contact</Link>
        <Link to="/faq" className={styles.link}>FAQ</Link>
        <Link to="/privacy" className={styles.link}>Privacy</Link>
      </nav>
      <p className={styles.copy}>&copy; {new Date().getFullYear()} 100 Days Habit Club</p>
    </footer>
  );
}
