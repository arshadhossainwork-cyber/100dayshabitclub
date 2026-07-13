import { useState, useEffect } from "react";
import { steps, testimonials, popularHabits } from "./emptyStateData";
import QuoteCarousel from "./QuoteCarousel";
import styles from "./EmptyState.module.css";

function HeroGrid() {
  const [filled, setFilled] = useState([]);

  useEffect(() => {
    const cells = [];
    const total = 100;
    const interval = setInterval(() => {
      if (cells.length >= total) {
        clearInterval(interval);
        return;
      }
      let next;
      do {
        next = Math.floor(Math.random() * total);
      } while (cells.includes(next));
      cells.push(next);
      setFilled([...cells]);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.heroGrid} aria-hidden="true">
      {Array.from({ length: 100 }, (_, i) => (
        <div
          key={i}
          className={`${styles.heroCell} ${filled.includes(i) ? styles.heroCellFilled : ""}`}
        />
      ))}
    </div>
  );
}

export default function EmptyState({ onAddClick, onAddHabit }) {
  const categories = Object.keys(popularHabits);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [addedHabits, setAddedHabits] = useState(new Set());

  function handleAddPreset(habit) {
    if (addedHabits.has(habit.name)) return;
    onAddHabit({
      name: habit.name,
      color: habit.color,
    });
    setAddedHabits((prev) => new Set(prev).add(habit.name));
  }

  return (
    <div className={styles.landing}>
      {/* Hero */}
      <section className={styles.hero}>
        <HeroGrid />

        <div className={styles.heroContent}>
          <span className={styles.badge}>Free &middot; No account needed</span>

          <h2 className={styles.heading}>
            Transform Your Life,{" "}
            <span className={styles.accent}>One Square at a Time</span>
          </h2>

          <p className={styles.description}>
            Track one meaningful habit across 100 days. Watch your grid fill up
            as you build consistency, discipline, and lasting change.
          </p>

          <div className={styles.ctaGroup}>
            <a href="#popular-habits" className={styles.ctaPrimary}>
              Browse Popular Habits
            </a>
            <button className={styles.ctaOutline} onClick={onAddClick}>
              Create Your Own
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.statsBar}>
        <div className={styles.statsInner}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>12,000+</span>
            <span className={styles.statLabel}>Habits Tracked</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>850,000+</span>
            <span className={styles.statLabel}>Days Completed</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>3,200+</span>
            <span className={styles.statLabel}>Active Streaks</span>
          </div>
        </div>
      </section>

      {/* Popular Habits */}
      <section className={styles.popularSection} id="popular-habits">
        <h3 className={styles.sectionTitle}>Popular Habits to Get Started</h3>
        <p className={styles.sectionSubtitle}>
          Choose a habit below to start tracking instantly
        </p>

        <div className={styles.categoryTabs}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.categoryTab} ${activeCategory === cat ? styles.categoryTabActive : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.habitsGrid}>
          {popularHabits[activeCategory].map((habit) => {
            const isAdded = addedHabits.has(habit.name);
            return (
              <button
                key={habit.name}
                className={`${styles.habitCard} ${isAdded ? styles.habitCardAdded : ""}`}
                onClick={() => handleAddPreset(habit)}
                disabled={isAdded}
              >
                <span className={styles.habitEmoji}>{habit.emoji}</span>
                <div className={styles.habitInfo}>
                  <span className={styles.habitName}>{habit.name}</span>
                  <span className={styles.habitDuration}>{habit.duration}</span>
                </div>
                <span
                  className={styles.habitDot}
                  style={{ background: habit.color }}
                />
                {isAdded && <span className={styles.addedBadge}>Added!</span>}
              </button>
            );
          })}
        </div>

        <p className={styles.customHabitFooter}>
          Don&rsquo;t see your habit?{" "}
          <button className={styles.customHabitLink} onClick={onAddClick}>
            Create a Custom Habit
          </button>
        </p>
      </section>

      {/* Quote Carousel */}
      <QuoteCarousel />

      {/* How It Works */}
      <section className={styles.steps}>
        <h3 className={styles.sectionTitle}>How It Works</h3>
        <p className={styles.sectionSubtitle}>
          Three simple steps to lasting change
        </p>

        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <div key={step.number} className={styles.stepItem}>
              <div className={styles.stepCard}>
                <div className={styles.stepIconWrap}>
                  <div className={styles.stepEmoji} aria-hidden="true">
                    {step.emoji}
                  </div>
                </div>
                <div className={styles.stepNumber}>{step.number}</div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepSubtitle}>{step.subtitle}</p>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={styles.stepConnector} aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <h3 className={styles.sectionTitle}>People Like You Are Showing Up</h3>

        <div className={styles.testimonialGrid}>
          {testimonials.map((t) => (
            <div key={t.name} className={styles.testimonialCard}>
              <div
                className={styles.avatar}
                style={{ background: t.color }}
                aria-hidden="true"
              >
                {t.initials}
              </div>
              <div className={styles.testimonialMeta}>
                <strong>{t.name}</strong>
                <span className={styles.testimonialHabit}>{t.habit}</span>
                <span className={styles.streak}>
                  {"\uD83D\uDD25"} {t.streak}-day streak
                </span>
              </div>
              <p className={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
              <div className={styles.testimonialProgress}>
                <div
                  className={styles.testimonialProgressFill}
                  style={{ width: `${t.progress}%`, background: t.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <div className={styles.seedling} aria-hidden="true">
          {"\uD83C\uDF31"}
        </div>
        <h3 className={styles.finalHeading}>
          Day 1 Starts When You Decide
        </h3>
        <p className={styles.finalDesc}>
          You don&rsquo;t need motivation. You need a system. Start your grid
          today.
        </p>
        <button className={styles.ctaPrimary} onClick={onAddClick}>
          + Start My 100 Days
        </button>
      </section>
    </div>
  );
}
