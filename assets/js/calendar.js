/**
 * Calendar Module
 * Only loaded on calendar page
 */

const Calendar = (() => {
  let container;
  let currentDate = new Date();

  const init = () => {
    container = document.querySelector('[data-calendar]');
    if (!container) return;

    render();
  };

  const render = () => {
    container.innerHTML = '';
    container.appendChild(buildCalendar());
  };

  const buildCalendar = () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'calendar';

    wrapper.appendChild(buildHeader());
    wrapper.appendChild(buildGrid());

    return wrapper;
  };

  const buildHeader = () => {
    const header = document.createElement('div');
    header.className = 'calendar__header';

    const title = document.createElement('h2');
    title.textContent = formatMonthYear(currentDate);

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '←';
    prevBtn.addEventListener('click', () => changeMonth(-1));

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '→';
    nextBtn.addEventListener('click', () => changeMonth(1));

    header.append(prevBtn, title, nextBtn);
    return header;
  };

  const buildGrid = () => {
    const grid = document.createElement('div');
    grid.className = 'calendar__grid';
    grid.setAttribute('role', 'grid');

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    // Day headers
    const formatter = new Intl.DateTimeFormat(undefined, { weekday: 'short' });
    for (let i = 0; i < 7; i++) {
      const day = new Date(2021, 7, i + 1); // arbitrary week
      const cell = document.createElement('div');
      cell.className = 'calendar__day-header';
      cell.textContent = formatter.format(day);
      grid.appendChild(cell);
    }

    // Empty cells
    for (let i = 0; i < startingDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'calendar__empty';
      grid.appendChild(empty);
    }

    // Days
    const today = new Date();

    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement('div');
      cell.className = 'calendar__day';
      cell.setAttribute('role', 'gridcell');
      cell.textContent = day;

      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      if (isToday) {
        cell.classList.add('calendar__day--today');
        cell.setAttribute('aria-current', 'date');
      }

      grid.appendChild(cell);
    }

    return grid;
  };

  const changeMonth = (offset) => {
    currentDate.setMonth(currentDate.getMonth() + offset);
    render();
  };

  const formatMonthYear = (date) => {
    return new Intl.DateTimeFormat(undefined, {
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return {
    init,
  };
})();

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Calendar.init);
} else {
  Calendar.init();
}
