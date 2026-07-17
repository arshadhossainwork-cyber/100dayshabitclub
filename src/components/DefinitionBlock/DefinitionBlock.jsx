import styles from './DefinitionBlock.module.css';

export default function DefinitionBlock({ definitions }) {
  if (!definitions || definitions.length === 0) return null;

  return (
    <div className={styles.container} role="region" aria-label="Key definitions">
      <div className={styles.label}>Key Definitions</div>
      <dl className={styles.list}>
        {definitions.map((d, i) => (
          <div key={i} className={styles.entry}>
            <dt className={styles.term}>{d.term}</dt>
            <dd className={styles.definition}>{d.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
