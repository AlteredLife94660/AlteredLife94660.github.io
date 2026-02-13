document.addEventListener('DOMContentLoaded', () => {
  // Get controls
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

  // --- Event Listeners ---
  if (fontSizeInput) {
    fontSizeInput.addEventListener('input', (e) => {
      const value = e.target.value;
      document.documentElement.style.fontSize = value + 'px';
      localStorage.setItem('fontSize', value);
    });
  }

  if (spacingInput) {
    spacingInput.addEventListener('input', (e) => {
      const value = e.target.value;
      document.documentElement.style.setProperty('--spacing-md', value + 'rem');
      localStorage.setItem('spacing', value);
    });
  }

  if (themeColorInput) {
    themeColorInput.addEventListener('input', (e) => {
      const value = e.target.value;
      document.documentElement.style.setProperty('--color-primary', value);
      localStorage.setItem('themeColor', value);
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
});
