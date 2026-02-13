const Menu = (() => {
  const sidebarToggleBtn = document.querySelector('[data-toggle-sidebar]');
  const sidebar = document.querySelector('[data-sidebar]');
  const overlay = document.querySelector('[data-sidebar-overlay]');
  const body = document.body;

  const init = () => {
    if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);
    document.addEventListener('click', handleOutsideClick);
  };

  const toggleSidebar = () => {
    const open = sidebar.classList.toggle('sidebar--open');
    overlay.style.pointerEvents = open ? 'auto' : 'none';
    overlay.style.opacity = open ? '1' : '0';
    sidebarToggleBtn.setAttribute('aria-expanded', open);
    sidebar.setAttribute('aria-hidden', !open);
  };

  const closeSidebar = () => {
    sidebar.classList.remove('sidebar--open');
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = '0';
    sidebarToggleBtn.setAttribute('aria-expanded', false);
    sidebar.setAttribute('aria-hidden', true);
  };

  const handleOutsideClick = (e) => {
    if (sidebar && !sidebar.contains(e.target) && !sidebarToggleBtn.contains(e.target)) {
      closeSidebar();
    }
  };

  return { init, toggleSidebar, closeSidebar };
})();
