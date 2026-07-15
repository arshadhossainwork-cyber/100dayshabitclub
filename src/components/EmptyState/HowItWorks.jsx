import { useRef } from 'react';
import { steps } from './emptyStateData';
import useScrollProgress from '../../hooks/useScrollProgress';
import useIntersectionReveal from '../../hooks/useIntersectionReveal';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const progress = useScrollProgress(sectionRef);
  const [revealRef, isVisible] = useIntersectionReveal({ threshold: 0.1 });

  const lineProgress = Math.min(1, progress * 2.5);

  return (
    <section
      className={`${styles.section} ${isVisible ? styles.visible : ''}`}
      id="how-it-works"
      aria-label="How it works"
      ref={(el) => {
        sectionRef.current = el;
        revealRef.current = el;
      }}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.labelPill}>3 simple steps</div>
          <h3 className={styles.heading}>
            How it <span className={styles.accent}>works</span>
          </h3>
        </div>

        <div className={styles.timeline}>
          {/* Vertical line */}
          <div className={styles.rail}>
            <div
              className={styles.railFill}
              style={{ height: `${lineProgress * 100}%` }}
            />
          </div>

          {steps.map((step, i) => {
            const nodeThreshold = (i + 0.5) / steps.length;
            const isActive = lineProgress >= nodeThreshold;

            return (
              <div
                key={step.number}
                className={`${styles.step} ${isActive ? styles.stepActive : ''}`}
              >
                <div className={styles.node}>
                  <span className={styles.nodeNumber}>{step.number}</span>
                </div>
                <div className={styles.card}>
                  <div className={styles.stepEmoji} aria-hidden="true">
                    {step.emoji}
                  </div>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepSubtitle}>{step.subtitle}</p>
                  <p className={styles.stepDesc}>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
