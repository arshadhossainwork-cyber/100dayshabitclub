import styles from './KeyTakeaways.module.css';

export default function KeyTakeaways({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className={styles.container} role="region" aria-label="Key takeaways">
      <div className={styles.label}>Key Takeaways</div>
      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={i} className={styles.item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
