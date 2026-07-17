import { useState, useEffect } from 'react';
import styles from './SyncIndicator.module.css';

export default function SyncIndicator({
  syncState,
  error,
  conflicts,
  onRetry,
}) {
  const [showLabel, setShowLabel] = useState(false);

  // Show label briefly when state changes to 'synced', then fade
  useEffect(() => {
    if (syncState === 'synced') {
      setShowLabel(true);
      const timer = setTimeout(() => setShowLabel(false), 3000);
      return () => clearTimeout(timer);
    }
    if (syncState === 'syncing' || syncState === 'error' || syncState === 'offline' || syncState === 'conflict') {
      setShowLabel(true);
    }
  }, [syncState]);

  if (syncState === 'idle') return null;

  const config = {
    synced: { dot: styles.dotGreen, label: 'Synced' },
    syncing: { dot: styles.dotSyncing, label: 'Syncing...' },
    offline: { dot: styles.dotGray, label: 'Offline' },
    error: { dot: styles.dotRed, label: 'Sync error' },
    conflict: {
      dot: styles.dotAmber,
      label: `${conflicts?.length || 0} conflict${conflicts?.length === 1 ? '' : 's'}`,
    },
  };

  const { dot, label } = config[syncState] || config.synced;
  const isClickable = syncState === 'error' || syncState === 'conflict';

  function handleClick() {
    if ((syncState === 'error' || syncState === 'conflict') && onRetry) {
      onRetry();
    }
  }

  return (
    <button
      className={`${styles.indicator} ${isClickable ? styles.clickable : ''}`}
      onClick={isClickable ? handleClick : undefined}
      aria-label={label}
      title={syncState === 'error' && error ? error : label}
      type="button"
    >
      <span className={`${styles.dot} ${dot}`} />
      {showLabel && <span className={styles.label}>{label}</span>}
    </button>
  );
}
