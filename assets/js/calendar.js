const Calendar = (() => {
  const calendarContainer = document.querySelector('[data-calendar]');
  const eventContainer = document.getElementById('event-cards-container');
  let events = [];

  const init = async () => {
    if (!calendarContainer) return;

    // Load events from JSON
    try {
      const response = await fetch('/_data/events.json');
      events = await response.json();
    } catch (err) {
      console.error('Error loading events:', err);
    }

    renderCalendar();
    renderEventCards();
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
    dayNames.forEach(day => {
      html += `<div class="calendar__day-header">${day}</div>`;
    });

    // Empty cells
    for (let i = 0; i < startingDayOfWeek; i++) {
      html += '<div class="calendar__empty"></div>';
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      // Check if day has an event
      const dateString = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const hasEvent = events.some(e => e.date === dateString);

      const classList = `calendar__day${isToday ? ' calendar__day--today' : ''}${hasEvent ? ' calendar__day--event' : ''}`;
      html += `<div class="${classList}" data-day="${day}" data-date="${dateString}">${day}</div>`;
    }

    html += '</div></div>';
    calendarContainer.innerHTML = html;
  };

  const renderEventCards = () => {
    if (!eventContainer) return;
    eventContainer.innerHTML = ''; // clear existing cards

    events.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';
      card.innerHTML = `
        <h4>${event.title}</h4>
        <p class="event-date">${formatDate(event.date)}</p>
        <p>${event.description}</p>
      `;
      eventContainer.appendChild(card);
    });
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const getMonthName = (monthIndex) => {
    const months = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
    return months[monthIndex];
  };

  return { init };
})();

// Initialize calendar on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => Calendar.init());
