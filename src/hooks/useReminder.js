import { useEffect, useRef } from 'react';
import {
  isNotificationSupported,
  getPermissionStatus,
  sendNotification,
} from '../utils/notifications.js';
import { getToday } from '../utils/dates.js';

export function useReminder(settings, habits) {
  const lastNotifiedRef = useRef(null);

  useEffect(() => {
    if (!settings.reminderEnabled) return;
    if (!isNotificationSupported()) return;
    if (getPermissionStatus() !== 'granted') return;

    const checkInterval = setInterval(() => {
      const now = new Date();
      const [targetH, targetM] = settings.reminderTime.split(':').map(Number);

      const currentH = now.getHours();
      const currentM = now.getMinutes();

      // Check if it's time (within the same minute)
      if (currentH === targetH && currentM === targetM) {
        const today = getToday();

        // Don't send multiple notifications in the same day
        if (lastNotifiedRef.current === today) return;

        // Check if there are incomplete habits
        const incomplete = habits.filter(
          (h) => !h.archived && !h.completedDays.includes(today)
        );

        if (incomplete.length > 0) {
          lastNotifiedRef.current = today;
          sendNotification('100 Days Habit Club', {
            body: `You have ${incomplete.length} habit${
              incomplete.length === 1 ? '' : 's'
            } to complete today!`,
          });
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkInterval);
  }, [settings.reminderEnabled, settings.reminderTime, habits]);
}
