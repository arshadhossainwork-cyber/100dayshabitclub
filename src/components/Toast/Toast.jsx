import styles from './Toast.module.css';

const ICONS = {
  success: '\u2713',
  error: '\u2717',
  warning: '\u26A0',
  info: '\u2139',
};

export default function Toast({ id, message, type = 'success', action, onDismiss }) {
  return (
    <div
      className={`${styles.toast} ${styles[type]}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.icon} aria-hidden="true">
        {ICONS[type]}
      </span>
      <span className={styles.message}>{message}</span>
      {action && (
        <button
          className={styles.actionBtn}
          onClick={() => {
            action.onClick();
            onDismiss(id);
          }}
        >
          {action.label}
        </button>
      )}
      <button
        className={styles.dismissBtn}
        onClick={() => onDismiss(id)}
        aria-label="Dismiss"
      >
        &times;
      </button>
    </div>
  );
}
