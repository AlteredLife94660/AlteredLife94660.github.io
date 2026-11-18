document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.donation-toggle').forEach((button) => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const image = panel?.querySelector('img[data-qr-src]');

    if (!panel || !image) return;

    image.addEventListener('load', () => {
      image.hidden = false;
    });

    image.addEventListener('error', () => {
      image.hidden = true;
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
