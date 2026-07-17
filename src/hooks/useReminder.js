import { useEffect, useRef } from 'react';
import {
  isNotificationSupported,
  getPermissionStatus,
  sendNotification,
  scheduleHabitNotification,
  cancelHabitNotification,
  cancelScheduledNotification,
  scheduleNotification,
  isNative,
} from '../utils/notifications.js';
import { NOTIFICATION_IDS } from '../utils/constants.js';
import { getToday } from '../utils/dates.js';
import { isInQuietHours, isDayEnabled, detectTimezone } from '../utils/timezoneUtils.js';
import { isSnoozed, cleanExpiredSnoozes } from '../utils/snoozeStorage.js';
import {
  getReminderMessage,
  getDailySummaryMessage,
  getMissedHabitMessage,
} from '../utils/reminderMessages.js';

export function useReminder(settings, habits, { showToast } = {}) {
  const notifiedHabitsRef = useRef(new Set());
  const summaryNotifiedRef = useRef(null);
  const missedNotifiedRef = useRef(null);

  // Native: schedule per-habit notifications
  useEffect(() => {
    if (!isNative) return;

    // Cancel global notification when not enabled
    if (!settings.reminderEnabled) {
      cancelScheduledNotification();
    }

    for (const habit of habits) {
      if (habit.archived) {
        cancelHabitNotification(habit.id);
        continue;
      }

      const habitReminderOn = habit.reminderEnabled || settings.reminderEnabled;
      if (!habitReminderOn) {
        cancelHabitNotification(habit.id);
        continue;
      }

      const time = habit.reminderTime || settings.reminderTime;
      const [h, m] = time.split(':').map(Number);
      const msg = getReminderMessage(habit);

      scheduleHabitNotification(habit.id, msg.title, msg.body, h, m);
    }

    // Schedule daily summary if enabled
    if (settings.dailySummaryEnabled) {
      const [sh, sm] = settings.dailySummaryTime.split(':').map(Number);
      const today = getToday();
      const completed = habits.filter((h) => !h.archived && h.completedDays.includes(today)).length;
      const incomplete = habits.filter((h) => !h.archived && !h.completedDays.includes(today)).length;
      const msg = getDailySummaryMessage(completed, incomplete);
      scheduleNotification(msg.title, msg.body, sh, sm, NOTIFICATION_IDS.DAILY_SUMMARY);
    }
  }, [settings, habits]);

  // Browser: poll every 30 seconds
  useEffect(() => {
    if (isNative) return;
    if (!isNotificationSupported()) return;

    // At least one reminder type must be enabled
    const anyEnabled = settings.reminderEnabled ||
      settings.dailySummaryEnabled ||
      settings.missedHabitReminder ||
      habits.some((h) => h.reminderEnabled);

    if (!anyEnabled) return;

    let cancelled = false;

    async function check() {
      if (cancelled) return;

      const perm = await getPermissionStatus();
      if (perm !== 'granted') return;

      // Clean expired snoozes periodically
      cleanExpiredSnoozes();

      const now = new Date();
      const currentH = now.getHours();
      const currentM = now.getMinutes();
      const today = getToday();
      const dayOfWeek = now.getDay();

      // Quiet hours check
      if (isInQuietHours(settings)) return;

      // Per-habit reminders
      for (const habit of habits) {
        if (habit.archived) continue;
        if (habit.completedDays.includes(today)) continue;
        if (isSnoozed(habit.id)) continue;

        const habitReminderOn = habit.reminderEnabled || settings.reminderEnabled;
        if (!habitReminderOn) continue;

        // Day check
        if (!isDayEnabled(dayOfWeek, habit.reminderDays, settings.weekendReminders)) continue;

        // Time check
        const time = habit.reminderTime || settings.reminderTime;
        const [targetH, targetM] = time.split(':').map(Number);
        if (currentH !== targetH || currentM !== targetM) continue;

        // Already notified this habit today
        const notifKey = `${habit.id}_${today}`;
        if (notifiedHabitsRef.current.has(notifKey)) continue;

        notifiedHabitsRef.current.add(notifKey);
        const msg = getReminderMessage(habit);
        sendNotification(msg.title, { body: msg.body });
      }

      // Daily summary
      if (settings.dailySummaryEnabled) {
        const [sh, sm] = settings.dailySummaryTime.split(':').map(Number);
        if (currentH === sh && currentM === sm && summaryNotifiedRef.current !== today) {
          summaryNotifiedRef.current = today;
          const completed = habits.filter((h) => !h.archived && h.completedDays.includes(today)).length;
          const incomplete = habits.filter((h) => !h.archived && !h.completedDays.includes(today)).length;
          const msg = getDailySummaryMessage(completed, incomplete);
          sendNotification(msg.title, { body: msg.body });
        }
      }

      // Missed habit nudge (after 8 PM)
      if (settings.missedHabitReminder && currentH >= 20 && missedNotifiedRef.current !== today) {
        const incompleteHabits = habits.filter(
          (h) => !h.archived && !h.completedDays.includes(today) && !isSnoozed(h.id)
        );
        if (incompleteHabits.length > 0) {
          missedNotifiedRef.current = today;
          const names = incompleteHabits.map((h) => h.name);
          const msg = getMissedHabitMessage(names);
          sendNotification(msg.title, { body: msg.body });
        }
      }
    }

    // Initial check
    check();
    const checkInterval = setInterval(check, 30000);

    return () => {
      cancelled = true;
      clearInterval(checkInterval);
    };
  }, [settings, habits]);

  // Reset daily tracking at midnight
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 5, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    const timer = setTimeout(() => {
      notifiedHabitsRef.current.clear();
      summaryNotifiedRef.current = null;
      missedNotifiedRef.current = null;
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  // Timezone change detection
  useEffect(() => {
    if (!showToast) return;

    const detected = detectTimezone();
    if (settings.timezone && detected && detected !== settings.timezone) {
      showToast(
        `Timezone changed: ${detected}. Update in Settings.`,
        { type: 'info', duration: 6000 }
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
