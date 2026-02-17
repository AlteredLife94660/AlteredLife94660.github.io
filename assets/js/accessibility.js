document.addEventListener('DOMContentLoaded', () => {
  // --- Accessibility Controls ---
  const fontSizeInput = document.getElementById('font-size');
  const fontSelectInput = document.getElementById('font-select');
  const themeColorInput = document.getElementById('theme-color');
  const themeColorInput2 = document.getElementById('theme-color2');
  const themeToggleBtn = document.getElementById('theme-toggle');

  // --- Apply saved preferences immediately ---
  const savedFontSize = localStorage.getItem('fontSize');
  const savedFontSelect = localStorage.getItem('fontSelect');
  const savedThemeColor = localStorage.getItem('themeColor');
  const savedThemeColor2 = localStorage.getItem('themeColor2');
  const savedTheme = localStorage.getItem('theme');

  if (savedFontSize) {
    document.documentElement.style.fontSize = savedFontSize + 'px';
    if (fontSizeInput) fontSizeInput.value = savedFontSize;
  }

  if (savedFontSelect) {
    document.documentElement.style.setProperty('--font-family-main', savedFontSelect);
    if (fontSelectInput) fontSelectInput.value = savedFontSelect;
  }

  if (savedThemeColor) {
    document.documentElement.style.setProperty('--color-primary', savedThemeColor);
    if (themeColorInput) themeColorInput.value = savedThemeColor;
  }
  
  if (savedThemeColor2) {
    document.documentElement.style.setProperty('--color-secondary', savedThemeColor2);
    if (themeColorInput2) themeColorInput2.value = savedThemeColor2;
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

  if (fontSelectInput) {
    fontSelectInput.addEventListener('change', e => {
      const value = e.target.value;
          document.documentElement.style.setProperty('--font-family-main', savedFontSelect);
      localStorage.setItem('fontSelect', value);
      location.reload();
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

  if (themeColorInput2) {
    themeColorInput2.addEventListener('input', e => {
      const value = e.target.value;
      document.documentElement.style.setProperty('--color-secondary', value);
      localStorage.setItem('themeColor2', value);
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
