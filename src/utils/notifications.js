export function isNotificationSupported() {
  return 'Notification' in window;
}

export function getPermissionStatus() {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission; // 'default' | 'granted' | 'denied'
}

export async function requestPermission() {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.requestPermission();
}

export function sendNotification(title, options = {}) {
  if (getPermissionStatus() !== 'granted') return null;

  return new Notification(title, {
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    ...options,
  });
}
