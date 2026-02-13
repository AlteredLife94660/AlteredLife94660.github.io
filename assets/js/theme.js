const Theme = (() => {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');

  const init = () => {
    if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
  };

  const toggleTheme = () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  return { init };
})();
