import { useEffect, useRef, useCallback } from 'react';

export default function useMousePosition(ref) {
  const frameRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const el = ref?.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const nx = x / rect.width;
      const ny = y / rect.height;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
      el.style.setProperty('--mouse-nx', nx.toFixed(3));
      el.style.setProperty('--mouse-ny', ny.toFixed(3));
    });
  }, [ref]);

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [ref, handleMouseMove]);
}
