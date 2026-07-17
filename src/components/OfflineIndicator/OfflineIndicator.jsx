import { useState, useEffect } from 'react';
import styles from './OfflineIndicator.module.css';

export default function OfflineIndicator({ isOnline }) {
  const [showReconnect, setShowReconnect] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
      setShowReconnect(false);
    } else if (wasOffline) {
      setShowReconnect(true);
      const timer = setTimeout(() => {
        setShowReconnect(false);
        setWasOffline(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (isOnline && !showReconnect) return null;

  return (
    <div
      className={`${styles.bar} ${isOnline ? styles.online : styles.offline}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.dot} />
      <span className={styles.text}>
        {isOnline
          ? 'Back online'
          : 'Offline — changes saved locally'}
      </span>
    </div>
  );
}
