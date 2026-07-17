import styles from './ComparisonTable.module.css';

export default function ComparisonTable({ data }) {
  if (!data) return null;

  const { caption, headers, rows } = data;
  if (!headers || !rows || rows.length === 0) return null;

  return (
    <div className={styles.wrapper} role="region" aria-label="Comparison table">
      <div className={styles.overflow}>
        <table className={styles.table}>
          {caption && <caption className={styles.caption}>{caption}</caption>}
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} className={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 1 ? styles.striped : undefined}>
                {row.map((cell, j) => (
                  <td key={j} className={j === 0 ? styles.tdFirst : styles.td}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
