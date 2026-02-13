// accessibility.js

const Accessibility = (() => {

  // DOM elements
  const fontSizeInput = document.getElementById('font-size');
  const spacingInput = document.getElementById('spacing');
  const themeColorInput = document.getElementById('theme-color');

  // Initialize module
  const init = () => {
    bindControls();
    applySavedSettings();
  };

  // Bind input events
  const bindControls = () => {
    if (fontSizeInput) {
      fontSizeInput.addEventListener('input', (e) => {
        document.documentElement.style.fontSize = e.target.value + 'px';
        localStorage.setItem('fontSize', e.target.value);
      });
    }

    if (spacingInput) {
      spacingInput.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--spacing-md', e.target.value + 'rem');
        localStorage.setItem('spacing', e.target.value);
      });
    }

    if (themeColorInput) {
      themeColorInput.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--color-primary', e.target.value);
        localStorage.setItem('themeColor', e.target.value);
      });
    }
  };

  // Apply saved settings on load
  const applySavedSettings = () => {
    const savedFontSize = localStorage.getItem('fontSize');
    const savedSpacing = localStorage.getItem('spacing');
    const savedThemeColor = localStorage.getItem('themeColor');

    if (savedFontSize) fontSizeInput.value = savedFontSize;
    if (savedSpacing) spacingInput.value = savedSpacing;
    if (savedThemeColor) themeColorInput.value = savedThemeColor;
  };

  return { init };
})();
