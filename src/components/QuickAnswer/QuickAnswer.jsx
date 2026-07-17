import styles from './QuickAnswer.module.css';

export default function QuickAnswer({ answer }) {
  if (!answer) return null;

  return (
    <div className={styles.container} role="region" aria-label="Quick answer">
      <div className={styles.label}>Quick Answer</div>
      <p className={styles.text}>{answer}</p>
    </div>
  );
}
