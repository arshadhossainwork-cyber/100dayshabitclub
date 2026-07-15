import { useState, useEffect, useRef } from 'react';

export default function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    function update() {
      frameRef.current = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh;
      const end = -rect.height;
      const range = start - end;
      const current = start - rect.top;
      const p = Math.max(0, Math.min(1, current / range));
      setProgress(p);
    }

    function onScroll() {
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [ref]);

  return progress;
}
