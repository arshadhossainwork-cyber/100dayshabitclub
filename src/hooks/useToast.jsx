import { createContext, useContext, useState, useCallback, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Toast from '../components/Toast/Toast.jsx';
import styles from '../components/Toast/Toast.module.css';

const ToastContext = createContext();

const MAX_TOASTS = 3;

let nextId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  const dismissToast = useCallback((id) => {
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, { type = 'success', duration = 3000, action } = {}) => {
    const id = ++nextId;

    setToasts((prev) => {
      const next = [...prev, { id, message, type, action, duration }];
      // Enforce max visible — dismiss oldest
      if (next.length > MAX_TOASTS) {
        const oldest = next[0];
        clearTimeout(timersRef.current[oldest.id]);
        delete timersRef.current[oldest.id];
        return next.slice(next.length - MAX_TOASTS);
      }
      return next;
    });

    if (duration > 0) {
      timersRef.current[id] = setTimeout(() => {
        dismissToast(id);
      }, duration);
    }
  }, [dismissToast]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className={styles.container}>
          {toasts.map((t) => (
            <Toast
              key={t.id}
              id={t.id}
              message={t.message}
              type={t.type}
              action={t.action}
              onDismiss={dismissToast}
            />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
