const Accessibility = (() => {
  const fontSizeInput = document.getElementById('font-size');
  const spacingInput = document.getElementById('spacing');
  const themeColorInput = document.getElementById('theme-color');

  const init = () => {
    bindControls();
    applySavedSettings();
  };

  const bindControls = () => {
    if (fontSizeInput) fontSizeInput.addEventListener('input', (e) => {
      document.documentElement.style.fontSize = e.target.value + 'px';
      localStorage.setItem('fontSize', e.target.value);
    });

    if (spacingInput) spacingInput.addEventListener('input', (e) => {
      document.documentElement.style.setProperty('--spacing-md', e.target.value + 'rem');
      localStorage.setItem('spacing', e.target.value);
    });

    if (themeColorInput) themeColorInput.addEventListener('input', (e) => {
      document.documentElement.style.setProperty('--color-primary', e.target.value);
      localStorage.setItem('themeColor', e.target.value);
    });
  };

  const applySavedSettings = () => {
    const savedFontSize = localStorage.getItem('fontSize');
    const savedSpacing = localStorage.getItem('spacing');
    const savedThemeColor = localStorage.getItem('themeColor');

    if (savedFontSize && fontSizeInput) fontSizeInput.value = savedFontSize;
    if (savedSpacing && spacingInput) spacingInput.value = savedSpacing;
    if (savedThemeColor && themeColorInput) themeColorInput.value = savedThemeColor;
  };

  return { init };
})();
