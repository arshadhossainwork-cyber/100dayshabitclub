import styles from './InstallPrompt.module.css';

export default function InstallPrompt({ show, isIOS, onInstall, onDismiss }) {
  if (!show) return null;

  return (
    <div className={styles.banner} role="complementary">
      <div className={styles.content}>
        <div className={styles.text}>
          <strong>Install Habit Club</strong>
          <span className={styles.sub}>
            {isIOS
              ? 'Add to your home screen for the best experience'
              : 'Get the full app experience'}
          </span>
        </div>
        <div className={styles.actions}>
          {isIOS ? (
            <span className={styles.iosHint}>
              Tap <span className={styles.shareIcon}>&#x2191;</span> then "Add to Home Screen"
            </span>
          ) : (
            <button className={styles.installBtn} onClick={onInstall}>
              Install
            </button>
          )}
          <button
            className={styles.dismissBtn}
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
