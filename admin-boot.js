(() => {
  try {
    const meta = document.querySelector('meta[name="wukong-admin-ui-path"]');
    const configured = String(meta?.getAttribute('content') || '').replace(/\/+$/, '');
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    const hash = window.location.hash;
    if (
      document.documentElement.classList.contains('admin-boot-route')
      || (configured && (path === configured || hash === `#${configured}`))
    ) {
      document.documentElement.classList.add('admin-boot-route');
    }
  } catch {
    // The regular Vue bootstrap remains the fallback when location is unavailable.
  }
})();
