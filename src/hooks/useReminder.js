import { useEffect, useRef } from 'react';
import {
  isNotificationSupported,
  getPermissionStatus,
  sendNotification,
  scheduleNotification,
  cancelScheduledNotification,
  isNative,
} from '../utils/notifications.js';
import { getToday } from '../utils/dates.js';

export function useReminder(settings, habits) {
  const lastNotifiedRef = useRef(null);

  // Native: schedule a daily repeating notification via the OS
  useEffect(() => {
    if (!isNative) return;

    if (!settings.reminderEnabled) {
      cancelScheduledNotification();
      return;
    }

    const [h, m] = settings.reminderTime.split(':').map(Number);
    scheduleNotification(
      '100 Days Habit Club',
      "Don't forget to complete your habits today!",
      h,
      m
    );

    return () => {
      // Cleanup on unmount — don't cancel here since we want it to persist
    };
  }, [settings.reminderEnabled, settings.reminderTime]);

  // Browser: poll every 30 seconds (original behavior)
  useEffect(() => {
    if (isNative) return;
    if (!settings.reminderEnabled) return;
    if (!isNotificationSupported()) return;

    let cancelled = false;

    async function check() {
      const perm = await getPermissionStatus();
      if (perm !== 'granted') return;

      const now = new Date();
      const [targetH, targetM] = settings.reminderTime.split(':').map(Number);

      if (now.getHours() === targetH && now.getMinutes() === targetM) {
        const today = getToday();
        if (lastNotifiedRef.current === today) return;

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
    }

    const checkInterval = setInterval(check, 30000);
    return () => {
      cancelled = true;
      clearInterval(checkInterval);
    };
  }, [settings.reminderEnabled, settings.reminderTime, habits]);
}
