import styles from './UpdateNotification.module.css';

export default function UpdateNotification({ needRefresh, onUpdate, onDismiss }) {
  if (!needRefresh) return null;

  return (
    <div className={styles.bar} role="alert">
      <span className={styles.text}>A new version is available</span>
      <div className={styles.actions}>
        <button className={styles.updateBtn} onClick={onUpdate}>
          Refresh
        </button>
        <button className={styles.dismissBtn} onClick={onDismiss} aria-label="Dismiss">
          &times;
        </button>
      </div>
    </div>
  );
}
