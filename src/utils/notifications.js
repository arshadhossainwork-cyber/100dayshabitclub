import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { NOTIFICATION_IDS } from './constants.js';

const isNative = Capacitor.isNativePlatform();

export function isNotificationSupported() {
  if (isNative) return true;
  return 'Notification' in window;
}

export async function getPermissionStatus() {
  if (isNative) {
    const { display } = await LocalNotifications.checkPermissions();
    // Map Capacitor status to browser-like values
    if (display === 'granted') return 'granted';
    if (display === 'denied') return 'denied';
    return 'default';
  }
  if (!('Notification' in window)) return 'unsupported';
  return Notification.permission;
}

export async function requestPermission() {
  if (isNative) {
    const { display } = await LocalNotifications.requestPermissions();
    if (display === 'granted') return 'granted';
    if (display === 'denied') return 'denied';
    return 'default';
  }
  if (!('Notification' in window)) return 'unsupported';
  return Notification.requestPermission();
}

export async function sendNotification(title, options = {}) {
  if (isNative) {
    const perm = await getPermissionStatus();
    if (perm !== 'granted') return null;

    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body: options.body || '',
          id: Date.now() % 2147483647,
          schedule: { at: new Date() },
          sound: undefined,
          smallIcon: 'ic_stat_icon',
        },
      ],
    });
    return true;
  }

  if ((await getPermissionStatus()) !== 'granted') return null;

  return new Notification(title, {
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    ...options,
  });
}

// Simple hash to generate deterministic notification IDs for per-habit notifications
function hashId(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % 10000;
}

export async function scheduleNotification(title, body, hour, minute, notificationId) {
  if (!isNative) return null;

  const perm = await getPermissionStatus();
  if (perm !== 'granted') return null;

  const now = new Date();
  const scheduled = new Date();
  scheduled.setHours(hour, minute, 0, 0);
  if (scheduled <= now) {
    scheduled.setDate(scheduled.getDate() + 1);
  }

  const id = notificationId ?? NOTIFICATION_IDS.GLOBAL;

  await LocalNotifications.cancel({
    notifications: [{ id }],
  });

  await LocalNotifications.schedule({
    notifications: [
      {
        title,
        body,
        id,
        schedule: {
          at: scheduled,
          every: 'day',
          allowWhileIdle: true,
        },
        smallIcon: 'ic_stat_icon',
      },
    ],
  });

  return id;
}

export async function scheduleHabitNotification(habitId, title, body, hour, minute) {
  const id = NOTIFICATION_IDS.HABIT_BASE + hashId(habitId);
  return scheduleNotification(title, body, hour, minute, id);
}

export async function cancelHabitNotification(habitId) {
  if (!isNative) return;
  const id = NOTIFICATION_IDS.HABIT_BASE + hashId(habitId);
  await LocalNotifications.cancel({
    notifications: [{ id }],
  });
}

export async function cancelScheduledNotification() {
  if (!isNative) return;
  await LocalNotifications.cancel({
    notifications: [{ id: NOTIFICATION_IDS.GLOBAL }],
  });
}

export async function cancelAllScheduledNotifications() {
  if (!isNative) return;
  try {
    const { notifications } = await LocalNotifications.getPending();
    if (notifications.length > 0) {
      await LocalNotifications.cancel({ notifications: notifications.map((n) => ({ id: n.id })) });
    }
  } catch {
    // Fallback: cancel known IDs
    await LocalNotifications.cancel({
      notifications: [
        { id: NOTIFICATION_IDS.GLOBAL },
        { id: NOTIFICATION_IDS.DAILY_SUMMARY },
        { id: NOTIFICATION_IDS.MILESTONE },
      ],
    });
  }
}

export { isNative };
