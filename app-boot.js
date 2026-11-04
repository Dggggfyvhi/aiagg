// A classic script independent of the application module graph. A failed entry
// chunk cannot install Vue's preload handler, so keep the initial page usable.
(() => {
  const shell = document.querySelector('.app-boot-shell');
  if (!shell) return;
  const message = shell.querySelector('[data-boot-message]');
  const retry = shell.querySelector('[data-boot-retry]');
  function failed(text) {
    if (!shell.isConnected) return;
    shell.setAttribute('aria-busy', 'false');
    message.textContent = text;
    retry.hidden = false;
  }
  const timer = setTimeout(() => failed('页面加载较慢，请检查网络后重新加载。'), 15000);
  const onError = (event) => {
    const target = event.target;
    if (target?.tagName === 'SCRIPT' || target?.tagName === 'LINK' || event instanceof ErrorEvent) {
      failed('页面加载未完成，请重新加载。');
    }
  };
  const onRejection = () => failed('页面加载未完成，请重新加载。');
  window.addEventListener('error', onError, true);
  window.addEventListener('unhandledrejection', onRejection);
  retry.addEventListener('click', () => window.location.reload());
  const observer = new MutationObserver(() => {
    if (shell.isConnected) return;
    clearTimeout(timer);
    window.removeEventListener('error', onError, true);
    window.removeEventListener('unhandledrejection', onRejection);
    observer.disconnect();
  });
  observer.observe(document.getElementById('app'), { childList: true });
})();
