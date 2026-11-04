// Theme bootstrap shared by the desktop (/) and mobile (/m/) entries.
//
// It runs as a synchronous classic <script src> in <head>, before the
// stylesheets and body markup are parsed, so the stored appearance is applied
// before first paint. It is an external file instead of an inline <script>
// because the server's Content-Security-Policy only allows `script-src 'self'`
// (no 'unsafe-inline', hash or nonce), which blocks inline scripts.
// Keep it dependency-free and in sync with web/src/theme.js
// (THEME_STORAGE_KEY, THEME_PREFERENCES, DEFAULT_THEME_PREFERENCE, THEME_COLORS).
(() => {
  const allowed = new Set(['system', 'light', 'dark']);
  // First visit: dark by default (main site + agent domains share this boot).
  let preference = 'dark';
  try {
    const stored = localStorage.getItem('appearance:v1');
    if (stored) {
      let parsed = stored;
      try { parsed = JSON.parse(stored); } catch {}
      if (allowed.has(parsed)) preference = parsed;
    }
  } catch {}
  const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches === true;
  const theme = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content',
    theme === 'dark' ? '#09090b' : '#f5f7fb',
  );
})();
