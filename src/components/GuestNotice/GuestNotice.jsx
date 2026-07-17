import styles from './GuestNotice.module.css';

export default function GuestNotice({ dismissed, onDismiss }) {
  if (dismissed) return null;

  return (
    <div className={styles.banner}>
      <span className={styles.icon} aria-hidden="true">
        &#x1F4F1;
      </span>
      <span className={styles.text}>
        Your habits are saved on this device. Export regularly to protect your
        progress.
      </span>
      <button
        className={styles.dismissBtn}
        onClick={onDismiss}
        aria-label="Dismiss notice"
      >
        &times;
      </button>
    </div>
  );
}
