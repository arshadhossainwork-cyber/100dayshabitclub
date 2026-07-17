import { useState, useRef, useEffect } from 'react';
import Grid from '../Grid/Grid.jsx';
import TodayAction from '../TodayAction/TodayAction.jsx';
import Stats from '../Stats/Stats.jsx';
import ShareDialog from '../ShareDialog/ShareDialog.jsx';
import styles from './HabitCard.module.css';

export default function HabitCard({
  habit,
  onToggle,
  onEdit,
  onArchive,
  onDelete,
  showToast,
}) {
  const [expanded, setExpanded] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const menuRef = useRef(null);
  const completed = habit.completedDays.length;
  const isComplete = completed >= 100;
  const progressPct = Math.min(completed, 100);

  // Close menu on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className={styles.card} style={{ '--habit-color': habit.color }}>
      <div className={styles.headerWrapper}>
        <button
          className={styles.header}
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
        >
          <div className={styles.headerLeft}>
            <span className={styles.name}>{habit.name}</span>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.progress}>
              <span className={styles.progressCount}>{completed}</span>/100
            </span>
            <span
              className={expanded ? styles.chevronOpen : styles.chevron}
              aria-hidden="true"
            >
              &#x25BC;
            </span>
          </div>
        </button>

        <div ref={menuRef} style={{ position: 'absolute', right: 8, top: 8, zIndex: 5 }}>
          <button
            className={styles.menuBtn}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((m) => !m);
            }}
            aria-label="Habit options"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
          >
            &#x22EE;
          </button>
          {menuOpen && (
            <div className={styles.menu} role="menu" aria-label="Habit actions">
              <button
                className={styles.menuItem}
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(habit);
                }}
              >
                Edit
              </button>
              <button
                className={styles.menuItem}
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  setShareOpen(true);
                }}
              >
                Share
              </button>
              <button
                className={styles.menuItem}
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  onArchive(habit.id);
                }}
              >
                Archive
              </button>
              <button
                className={styles.menuItemDanger}
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(habit);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {expanded && (
        <div className={styles.body}>
          <TodayAction habit={habit} onToggle={onToggle} />
          <Grid completedCount={completed} color={habit.color} />
          <Stats habit={habit} />
          {isComplete && (
            <div className={styles.celebration}>
              <span aria-hidden="true">&#x1F389;</span>
              <div className={styles.celebrationText}>
                100 Days Complete!
              </div>
            </div>
          )}
        </div>
      )}

      <ShareDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        habit={habit}
        isComplete={isComplete}
        showToast={showToast}
      />
    </div>
  );
}
