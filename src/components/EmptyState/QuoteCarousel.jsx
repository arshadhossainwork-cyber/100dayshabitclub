import { useState, useEffect } from "react";
import { quotes } from "./emptyStateData";
import styles from "./QuoteCarousel.module.css";

export default function QuoteCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const { text, author } = quotes[active];

  return (
    <section className={styles.carousel} aria-label="Inspirational quotes">
      <div className={styles.quoteIcon} aria-hidden="true">
        &ldquo;
      </div>

      <div aria-live="polite" className={styles.quoteArea}>
        <blockquote key={active} className={styles.quote}>
          <p className={styles.text}>{text}</p>
          <footer className={styles.author}>
            <span className={styles.authorLine} aria-hidden="true" />
            {author}
          </footer>
        </blockquote>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Quote navigation">
        {quotes.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            aria-label={`Quote ${i + 1}`}
            className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
}
