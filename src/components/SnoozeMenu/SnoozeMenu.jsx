import { useEffect, useRef } from 'react';
import { SNOOZE_OPTIONS } from '../../utils/snoozeStorage.js';
import styles from './SnoozeMenu.module.css';

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function SnoozeMenu({ habitId, onSnooze, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    }
    function handleEscape(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const options = Object.values(SNOOZE_OPTIONS);

  return (
    <div className={styles.menu} ref={menuRef} role="menu">
      {options.map((opt) => {
        const now = Date.now();
        const expiryTime = now + opt.getDuration();
        return (
          <button
            key={opt.key}
            className={styles.option}
            role="menuitem"
            onClick={() => {
              onSnooze(habitId, opt);
              onClose();
            }}
          >
            <span className={styles.label}>{opt.label}</span>
            <span className={styles.until}>until {formatTime(expiryTime)}</span>
          </button>
        );
      })}
    </div>
  );
}
