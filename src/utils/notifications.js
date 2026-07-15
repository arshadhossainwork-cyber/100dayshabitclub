import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

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

export async function scheduleNotification(title, body, hour, minute) {
  if (!isNative) return null;

  const perm = await getPermissionStatus();
  if (perm !== 'granted') return null;

  // Build the next occurrence of the target time
  const now = new Date();
  const scheduled = new Date();
  scheduled.setHours(hour, minute, 0, 0);
  if (scheduled <= now) {
    scheduled.setDate(scheduled.getDate() + 1);
  }

  const REMINDER_NOTIFICATION_ID = 100;

  // Cancel any existing reminder first
  await LocalNotifications.cancel({
    notifications: [{ id: REMINDER_NOTIFICATION_ID }],
  });

  await LocalNotifications.schedule({
    notifications: [
      {
        title,
        body,
        id: REMINDER_NOTIFICATION_ID,
        schedule: {
          at: scheduled,
          every: 'day',
          allowWhileIdle: true,
        },
        smallIcon: 'ic_stat_icon',
      },
    ],
  });

  return REMINDER_NOTIFICATION_ID;
}

export async function cancelScheduledNotification() {
  if (!isNative) return;
  const REMINDER_NOTIFICATION_ID = 100;
  await LocalNotifications.cancel({
    notifications: [{ id: REMINDER_NOTIFICATION_ID }],
  });
}

export { isNative };
