import styles from './Header.module.css';

export default function Header({ onAddClick, onSettingsClick }) {
  return (
    <header className={styles.header}>
      <div className={styles.titleGroup}>
        <span className={styles.logo} aria-hidden="true">
          &#x1F3AF;
        </span>
        <h1 className={styles.title}><span className={styles.titleAccent}>100</span> Days Habit Club</h1>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.iconBtn}
          onClick={onSettingsClick}
          aria-label="Settings"
        >
          &#x2699;&#xFE0F;
        </button>
        <button
          className={styles.addBtn}
          onClick={onAddClick}
          aria-label="Add new habit"
        >
          +
        </button>
      </div>
    </header>
  );
}
