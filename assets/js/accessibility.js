document.addEventListener('DOMContentLoaded', () => {
  // --- Accessibility Controls ---
  const fontSizeInput = document.getElementById('font-size');
  const spacingInput = document.getElementById('spacing');
  const themeColorInput = document.getElementById('theme-color');
  const themeToggleBtn = document.getElementById('theme-toggle');

  // --- Apply saved preferences immediately ---
  const savedFontSize = localStorage.getItem('fontSize');
  const savedSpacing = localStorage.getItem('spacing');
  const savedThemeColor = localStorage.getItem('themeColor');
  const savedTheme = localStorage.getItem('theme');

  if (savedFontSize) {
    document.documentElement.style.fontSize = savedFontSize + 'px';
    if (fontSizeInput) fontSizeInput.value = savedFontSize;
  }

  if (savedSpacing) {
    document.documentElement.style.setProperty('--spacing-md', savedSpacing + 'rem');
    if (spacingInput) spacingInput.value = savedSpacing;
  }

  if (savedThemeColor) {
    document.documentElement.style.setProperty('--color-primary', savedThemeColor);
    if (themeColorInput) themeColorInput.value = savedThemeColor;
  }

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // --- Update UI Function ---
  const updateUI = () => {
    // Sidebar
    document.querySelectorAll('.sidebar, .sidebar__nav-link').forEach(el => {
      el.style.transition = `all var(--transition-speed) ease`;
    });

    // Calendar
    document.querySelectorAll('.calendar, .calendar__day, .calendar__day-header').forEach(el => {
      el.style.transition = `all var(--transition-speed) ease`;
    });

    // Other content
    document.querySelectorAll('.content, .container').forEach(el => {
      el.style.transition = `all var(--transition-speed) ease`;
    });
  };

  updateUI();

  // --- Event Listeners ---
  if (fontSizeInput) {
    fontSizeInput.addEventListener('input', e => {
      const value = e.target.value;
      document.documentElement.style.fontSize = value + 'px';
      localStorage.setItem('fontSize', value);
      updateUI();
    });
  }

  if (spacingInput) {
    spacingInput.addEventListener('input', e => {
      const value = e.target.value;
      document.documentElement.style.setProperty('--spacing-md', value + 'rem');
      localStorage.setItem('spacing', value);
      updateUI();
    });
  }

  if (themeColorInput) {
    themeColorInput.addEventListener('input', e => {
      const value = e.target.value;
      document.documentElement.style.setProperty('--color-primary', value);
      localStorage.setItem('themeColor', value);
      updateUI();
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateUI();
    });
  }
});
