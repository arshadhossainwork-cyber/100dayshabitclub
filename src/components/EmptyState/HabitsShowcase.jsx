import { useState, useRef, useCallback } from 'react';
import { popularHabits } from './emptyStateData';
import useIntersectionReveal from '../../hooks/useIntersectionReveal';
import styles from './HabitsShowcase.module.css';

function TiltTile({ habit, isAdded, onAdd }) {
  const tileRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = tileRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 12;
    const rotateY = (x - 0.5) * 12;
    el.style.setProperty('--rx', `${rotateX}deg`);
    el.style.setProperty('--ry', `${rotateY}deg`);
    el.style.setProperty('--glow-x', `${x * 100}%`);
    el.style.setProperty('--glow-y', `${y * 100}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = tileRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }, []);

  return (
    <button
      ref={tileRef}
      className={`${styles.tile} ${isAdded ? styles.tileAdded : ''}`}
      onClick={() => !isAdded && onAdd(habit)}
      disabled={isAdded}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.tileInner}>
        <span className={styles.tileEmoji}>{habit.emoji}</span>
        <div className={styles.tileInfo}>
          <span className={styles.tileName}>{habit.name}</span>
          <span className={styles.tileDuration}>{habit.duration}</span>
        </div>
        <span
          className={styles.tileDot}
          style={{ background: habit.color }}
          aria-hidden="true"
        />
        {isAdded && (
          <span className={styles.addedBadge}>Added</span>
        )}
      </div>
      <div className={styles.tileGlow} aria-hidden="true" />
    </button>
  );
}

export default function HabitsShowcase({ onAddClick, onAddHabit }) {
  const categories = Object.keys(popularHabits);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [addedHabits, setAddedHabits] = useState(new Set());
  const [ref, isVisible] = useIntersectionReveal({ threshold: 0.1 });

  function handleAddPreset(habit) {
    if (addedHabits.has(habit.name)) return;
    onAddHabit({
      name: habit.name,
      color: habit.color,
    });
    setAddedHabits((prev) => new Set(prev).add(habit.name));
  }

  const habits = popularHabits[activeCategory];
  if (!habits) return null;

  return (
    <section
      className={`${styles.section} ${isVisible ? styles.visible : ''}`}
      id="popular-habits"
      ref={ref}
      aria-label="Popular habits"
    >
      <div className={styles.inner}>
        <div className={styles.labelPill}>Popular habits</div>
        <h3 className={styles.heading}>
          Start with something{' '}
          <span className={styles.accent}>meaningful</span>
        </h3>
        <p className={styles.subtitle}>
          Tap any habit to start tracking instantly
        </p>

        <div className={styles.tabs} role="tablist" aria-label="Habit categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`${styles.tab} ${
                activeCategory === cat ? styles.tabActive : ''
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.grid} role="tabpanel" aria-label={activeCategory}>
          {habits.map((habit) => (
            <TiltTile
              key={habit.name}
              habit={habit}
              isAdded={addedHabits.has(habit.name)}
              onAdd={handleAddPreset}
            />
          ))}
        </div>

        <p className={styles.footer}>
          Don&rsquo;t see yours?{' '}
          <button className={styles.footerLink} onClick={onAddClick}>
            Create a custom habit &rarr;
          </button>
        </p>
      </div>
    </section>
  );
}
