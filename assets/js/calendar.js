const Calendar = (() => {
  const calendarContainer = document.querySelector('[data-calendar]');

  const init = () => {
    if (!calendarContainer) return;
    renderCalendar();
  };

  const renderCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    let html = `<div class="calendar"><h2>${getMonthName(month)} ${year}</h2><div class="calendar__grid">`;

    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    dayNames.forEach(day => html += `<div class="calendar__day-header">${day}</div>`);

    for (let i=0; i<startingDayOfWeek; i++) html += '<div class="calendar__empty"></div>';

    for (let day=1; day<=daysInMonth; day++) {
      const isToday = day === today.getDate();
      const classList = `calendar__day${isToday?' calendar__day--today':''}`;
      html += `<div class="${classList}" data-day="${day}">${day}</div>`;
    }

    html += '</div></div>';
    calendarContainer.innerHTML = html;
  };

  const getMonthName = (monthIndex) => {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return months[monthIndex];
  };

  return { init, renderCalendar };
})();
