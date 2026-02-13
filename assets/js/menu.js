/**
 * Sidebar Menu Module
 * Available on all pages
 */

const Menu = (() => {
  let sidebar;
  let sidebarToggleBtn;
  const body = document.body;
  const root = document.documentElement;

  const init = () => {
    sidebar = document.querySelector('[data-sidebar]');
    sidebarToggleBtn = document.querySelector('[data-toggle-sidebar]');

    if (!sidebar || !sidebarToggleBtn) return;

    sidebarToggleBtn.addEventListener('click', toggleSidebar);
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeydown);
  };

  const toggleSidebar = () => {
    const isOpen = sidebar.classList.toggle('sidebar--open');
    body.classList.toggle('sidebar-open', isOpen);

    sidebar.setAttribute('aria-hidden', !isOpen);
    sidebarToggleBtn.setAttribute('aria-expanded', isOpen);
  };

  const closeSidebar = () => {
    sidebar.classList.remove('sidebar--open');
    body.classList.remove('sidebar-open');

    sidebar.setAttribute('aria-hidden', true);
    sidebarToggleBtn.setAttribute('aria-expanded', false);
  };

  const handleOutsideClick = (e) => {
    if (
      sidebar.classList.contains('sidebar--open') &&
      !sidebar.contains(e.target) &&
      !sidebarToggleBtn.contains(e.target)
    ) {
      closeSidebar();
    }
  };

  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      closeSidebar();
    }
  };

  /**
   * Accessibility settings
   */
  const applyAccessibilitySettings = (settings = {}) => {
    if (settings.scale) {
      // Better: scale entire UI
      root.style.fontSize = settings.scale + '%';
    }

    if (settings.spacing) {
      root.style.setProperty('--spacing-md', settings.spacing + 'rem');
    }

    if (settings.color) {
      root.style.setProperty('--color-primary', settings.color);
    }
  };

  return {
    init,
    toggleSidebar,
    closeSidebar,
    applyAccessibilitySettings,
  };
})();

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Menu.init);
} else {
  Menu.init();
}
