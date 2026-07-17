import { useEffect } from 'react';

const SITE_NAME = '100 Days Habit Club';
const SITE_URL = 'https://www.100dayshabitclub.xyz';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Sets per-page document metadata. All parameters are optional.
 *
 * @param {object} opts
 * @param {string|null} opts.title    — Page title (appended with " | 100 Days Habit Club")
 * @param {string}      opts.description — Meta description + OG/Twitter description
 * @param {string}      opts.path     — Canonical path, e.g. "/faq" (auto-prepends SITE_URL)
 * @param {boolean}     opts.noindex  — Inject noindex,nofollow robots meta
 * @param {object}      opts.schema   — JSON-LD structured data to inject
 */
export function useDocumentMeta({
  title,
  description,
  path,
  noindex,
  schema,
} = {}) {
  useEffect(() => {
    const cleanup = [];

    // --- Title ---
    const prevTitle = document.title;
    if (title !== null && title !== undefined) {
      document.title = `${title} | ${SITE_NAME}`;
    }
    cleanup.push(() => { document.title = prevTitle; });

    // --- Meta description ---
    const descMeta = document.querySelector('meta[name="description"]');
    const prevDesc = descMeta ? descMeta.getAttribute('content') : null;
    if (descMeta && description) descMeta.setAttribute('content', description);
    cleanup.push(() => {
      if (descMeta && prevDesc !== null) descMeta.setAttribute('content', prevDesc);
    });

    // --- Canonical ---
    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical ? canonical.getAttribute('href') : null;
    if (canonical && path !== undefined) {
      canonical.setAttribute('href', `${SITE_URL}${path}`);
    }
    cleanup.push(() => {
      if (canonical && prevCanonical !== null) canonical.setAttribute('href', prevCanonical);
    });

    // --- OG tags ---
    const ogUpdates = [];
    if (title !== null && title !== undefined) {
      ogUpdates.push(['og:title', `${title} | ${SITE_NAME}`]);
      ogUpdates.push(['twitter:title', `${title} | ${SITE_NAME}`]);
    }
    if (description) {
      ogUpdates.push(['og:description', description]);
      ogUpdates.push(['twitter:description', description]);
    }
    if (path !== undefined) {
      ogUpdates.push(['og:url', `${SITE_URL}${path}`]);
    }

    const prevOg = [];
    for (const [prop, value] of ogUpdates) {
      const isOg = prop.startsWith('og:');
      const selector = isOg
        ? `meta[property="${prop}"]`
        : `meta[name="${prop}"]`;
      const el = document.querySelector(selector);
      if (el) {
        prevOg.push([el, el.getAttribute('content')]);
        el.setAttribute('content', value);
      }
    }
    cleanup.push(() => {
      for (const [el, prev] of prevOg) {
        if (prev !== null) el.setAttribute('content', prev);
      }
    });

    // --- Robots noindex ---
    let robotsMeta;
    if (noindex) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      robotsMeta.content = 'noindex, nofollow';
      document.head.appendChild(robotsMeta);
    }
    cleanup.push(() => {
      if (robotsMeta && robotsMeta.parentNode) {
        document.head.removeChild(robotsMeta);
      }
    });

    // --- Structured data (JSON-LD) ---
    let scriptEl;
    if (schema) {
      scriptEl = document.createElement('script');
      scriptEl.type = 'application/ld+json';
      scriptEl.textContent = JSON.stringify(schema);
      document.head.appendChild(scriptEl);
    }
    cleanup.push(() => {
      if (scriptEl && scriptEl.parentNode) {
        document.head.removeChild(scriptEl);
      }
    });

    return () => cleanup.forEach((fn) => fn());
  }, [title, description, path, noindex, schema]);
}
