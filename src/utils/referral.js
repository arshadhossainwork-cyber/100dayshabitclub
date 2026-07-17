/**
 * Minimal referral attribution.
 * Captures ?ref= parameter from the URL into sessionStorage.
 */

const STORAGE_KEY = 'habitClub_ref';

/**
 * Read `?ref=` from the current URL and store in sessionStorage.
 * Safe to call multiple times — only stores on first capture per session.
 */
export function captureReferralSource() {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref && /^[a-zA-Z0-9_-]{1,50}$/.test(ref)) {
      sessionStorage.setItem(STORAGE_KEY, ref);
    }
  } catch {
    // sessionStorage unavailable (e.g. private browsing)
  }
}

/**
 * Returns the stored referral source, or null.
 */
export function getReferralSource() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) || null;
  } catch {
    return null;
  }
}
