const Theme = (() => {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');

  const init = () => {
    applySavedTheme();
    detectSystemTheme();
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }
  };

  const toggleTheme = () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const applySavedTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      root.setAttribute('data-theme', saved);
    }
  };

  const detectSystemTheme = () => {
    if (!localStorage.getItem('theme')) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', Theme.init);
