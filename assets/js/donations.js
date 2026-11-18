document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.donation-toggle').forEach((button) => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const image = panel?.querySelector('img[data-qr-src]');
    const placeholder = panel?.querySelector('.qr-placeholder');

    if (!panel || !image || !placeholder) return;

    image.addEventListener('load', () => {
      image.hidden = false;
      placeholder.hidden = true;
    });

    image.addEventListener('error', () => {
      image.hidden = true;
      placeholder.hidden = false;
    });

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isExpanded));
      panel.hidden = isExpanded;

      if (!isExpanded && !image.hasAttribute('src')) {
        image.src = image.dataset.qrSrc;
      }
    });
  });
});
