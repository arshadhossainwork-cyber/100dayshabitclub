import { useRef } from 'react';
import useMousePosition from '../../hooks/useMousePosition';
import useReducedMotion from '../../hooks/useReducedMotion';
import styles from './BackgroundSystem.module.css';

export default function BackgroundSystem() {
  const containerRef = useRef(null);
  const reduced = useReducedMotion();
  useMousePosition(containerRef);

  return (
    <div
      ref={containerRef}
      className={styles.system}
      aria-hidden="true"
    >
      <div className={styles.noise} />
      <div className={styles.grid} />
      {!reduced && (
        <>
          <div className={`${styles.aurora} ${styles.aurora1}`} />
          <div className={`${styles.aurora} ${styles.aurora2}`} />
          <div className={`${styles.aurora} ${styles.aurora3}`} />
        </>
      )}
      <div className={styles.mouseGlow} />
    </div>
  );
}
