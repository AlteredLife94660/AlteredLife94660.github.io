const Calendar = (() => {
  const calendarContainer = document.querySelector('[data-calendar]');
  let events = []; // store loaded events

  const init = async () => {
    if (!calendarContainer) return;

    // Load events from JSON
    try {
      const response = await fetch('/assets/data/events.json');
      events = await response.json();
    } catch (err) {
      console.error('Error loading events:', err);
    }

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

    // Day headers
    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    dayNames.forEach(day => html += `<div class="calendar__day-header">${day}</div>`);

    // Empty slots
    for (let i = 0; i < startingDayOfWeek; i++) html += '<div class="calendar__empty"></div>';

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const classList = `calendar__day${day === today.getDate() && month === today.getMonth() ? ' calendar__day--today' : ''}`;

      // Check if this day has any events
      const dateString = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const hasEvent = events.some(e => e.date === dateString);
      const eventClass = hasEvent ? ' has-event' : '';

      html += `<div class="${classList}${eventClass}" data-day="${day}">${day}</div>`;
    }

    html += '</div></div>';
    calendarContainer.innerHTML = html;

    // Optionally render upcoming/past events
    renderEventCards();
  };

  const renderEventCards = () => {
    const upcomingContainer = document.querySelector('[data-upcoming-events]');
    const pastContainer = document.querySelector('[data-past-events]');
    if (!upcomingContainer && !pastContainer) return;

    const today = new Date();
    let upcomingHTML = '';
    let pastHTML = '';

    events.forEach(ev => {
      const evDate = new Date(ev.date);
      const cardHTML = `
        <div class="event-card">
          <h4>${ev.title}</h4>
          <p class="event-date">${evDate.toDateString()}</p>
          <p>${ev.description || ''}</p>
        </div>
      `;
      if (evDate >= today) upcomingHTML += cardHTML;
      else pastHTML += cardHTML;
    });

    if (upcomingContainer) upcomingContainer.innerHTML = upcomingHTML;
    if (pastContainer) pastContainer.innerHTML = pastHTML;
  };

  const getMonthName = monthIndex => {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return months[monthIndex];
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => Calendar.init());
