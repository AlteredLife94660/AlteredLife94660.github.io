const Security = (() => {

  /**
   * Initialize security measures globally
   */
  const init = () => {
    preventIframeEmbedding();
    // Future hooks: anti-clickjacking, CSP reporting, etc.
  };

  /**
   * Secure a form by adding CSRF token, honeypot, and validation
   * @param {HTMLFormElement} formElement
   */
  const secureForm = (formElement) => {
    if (!(formElement instanceof HTMLFormElement)) return;

    // 1. Add CSRF token
    const csrfToken = generateCSRFToken();
    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = '_csrf';
    csrfInput.value = csrfToken;
    formElement.appendChild(csrfInput);

    // 2. Add honeypot field
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website'; // bots will fill this
    honeypot.className = 'honeypot-field';
    honeypot.style.display = 'none'; // hide from humans
    formElement.appendChild(honeypot);

    // 3. Attach form submit validation
    formElement.addEventListener('submit', (e) => {
      if (honeypot.value) {
        console.warn('Honeypot triggered - potential bot detected');
        e.preventDefault();
        return false;
      }
      // Additional custom validation can go here
    });
  };

  /**
   * Generate a secure CSRF token
   * @returns {string}
   */
  const generateCSRFToken = () => {
    // Use crypto API if available
    if (window.crypto && window.crypto.getRandomValues) {
      const array = new Uint8Array(16);
      window.crypto.getRandomValues(array);
      return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Fallback for older browsers
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  /**
   * Sanitize user input to prevent XSS
   * @param {string} input
   * @returns {string} safe HTML
   */
  const sanitizeInput = (input) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  };

  /**
   * Prevent clickjacking / iframe embedding
   */
  const preventIframeEmbedding = () => {
    if (window.top !== window.self) {
      window.top.location = window.self.location;
    }
  };

  /**
   * Optional: Validate text input length, patterns, or escape scripts
   */
  const validateText = (input, options = {}) => {
    let value = sanitizeInput(input);

    if (options.maxLength) value = value.slice(0, options.maxLength);
    if (options.pattern && !options.pattern.test(value)) return '';
    return value;
  };

  return {
    init,
    secureForm,
    sanitizeInput,
    validateText
  };

})();
