export function detectTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
}

export function getEffectiveTimezone(settings) {
  return settings.timezone || detectTimezone();
}

export function isInQuietHours(settings) {
  if (!settings.quietHoursEnabled) return false;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [startH, startM] = settings.quietHoursStart.split(':').map(Number);
  const [endH, endM] = settings.quietHoursEnd.split(':').map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  if (startMinutes <= endMinutes) {
    // Same-day range (e.g., 13:00 - 15:00)
    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  }
  // Overnight range (e.g., 22:00 - 07:00)
  return currentMinutes >= startMinutes || currentMinutes < endMinutes;
}

export function isDayEnabled(dayOfWeek, reminderDays, weekendReminders) {
  // Check per-habit day restriction
  if (reminderDays && reminderDays.length > 0) {
    return reminderDays.includes(dayOfWeek);
  }
  // Check global weekend setting
  if (!weekendReminders && (dayOfWeek === 0 || dayOfWeek === 6)) {
    return false;
  }
  return true;
}

export function getTimezoneLabel(tz) {
  if (!tz) return '';
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'short',
    });
    const parts = formatter.formatToParts(new Date());
    const tzPart = parts.find((p) => p.type === 'timeZoneName');
    const abbr = tzPart ? tzPart.value : '';
    // Extract city from IANA string
    const city = tz.split('/').pop().replace(/_/g, ' ');
    return abbr ? `${city} (${abbr})` : city;
  } catch {
    return tz;
  }
}
