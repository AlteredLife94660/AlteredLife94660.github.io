const Calendar = (() => {
  const calendarContainer = document.querySelector('[data-calendar]');
  const upcomingContainer = document.getElementById('upcomingEvents');
  const pastContainer = document.getElementById('pastEvents');
  const currentMonthEl = document.getElementById('currentMonth');
  const prevButton = document.getElementById('prevMonth');
  const nextButton = document.getElementById('nextMonth');
  
  let events = [];
  let today = new Date();
  let displayedMonth = today.getMonth();
  let displayedYear = today.getFullYear();
  
  const init = async () => {
    if (!calendarContainer) return;

    // Fetch events from JSON
    try {
      const response = await fetch('/assets/content/events.json');
      events = await response.json();
    } catch (err) {
      console.error('Error loading events:', err);
    }

    renderCalendar();
    renderEvents();

    // Add event listeners for navigation buttons
    prevButton.addEventListener('click', () => {
      displayedMonth--;
      if (displayedMonth < 0) {
        displayedMonth = 11;
        displayedYear--;
      }
      renderCalendar();
      renderEvents();
    });

    nextButton.addEventListener('click', () => {
      displayedMonth++;
      if (displayedMonth > 11) {
        displayedMonth = 0;
        displayedYear++;
      }
      renderCalendar();
      renderEvents();
    });
  };

  const renderCalendar = () => {
    calendarContainer.innerHTML = '';
    const firstDay = new Date(displayedYear, displayedMonth, 1);
    const lastDay = new Date(displayedYear, displayedMonth + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Update month name in the header
    currentMonthEl.textContent = `${getMonthName(displayedMonth)} ${displayedYear}`;

    let html = '<div class="calendar"><div class="calendar__grid">';

    // Day headers
    dayNames.forEach(day => {
      html += `<div class="calendar__day-header">${day}</div>`;
    });

    // Empty slots before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      html += '<div class="calendar__empty"></div>';
    }

    // Render days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dayDate = new Date(displayedYear, displayedMonth, day);
      const isToday = dayDate.toDateString() === today.toDateString();
      
      // Check if this day has events
      const dayEvents = events.filter(ev => ev.date === formatDate(dayDate));
      const classList = `calendar__day${isToday ? ' calendar__day--today' : ''}${dayEvents.length ? ' has-event' : ''}`;

      html += `<div class="${classList}" data-day="${day}">${day}</div>`;
    }

    html += '</div></div>';
    calendarContainer.innerHTML = html;
  };

  const renderEvents = () => {
    upcomingContainer.innerHTML = '';
    pastContainer.innerHTML = '';

    const now = new Date();

    // Separate past and upcoming events
    const upcoming = events.filter(ev => new Date(ev.date) >= now);
    const past = events.filter(ev => new Date(ev.date) < now);

    // Sort events by date
    upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
    past.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort past events from newest to oldest

    // Render upcoming events
    if (upcoming.length) {
      upcoming.forEach(ev => {
        const card = createEventCard(ev);
        upcomingContainer.appendChild(card);
      });
    } else {
      upcomingContainer.innerHTML = '<p>No upcoming events.</p>';
    }

    // Render past events
    if (past.length) {
      past.forEach(ev => {
        const card = createEventCard(ev);
        pastContainer.appendChild(card);
      });
    } else {
      pastContainer.innerHTML = '<p>No past events.</p>';
    }
  };

  const createEventCard = (ev) => {
    const div = document.createElement('div');
    div.className = 'event-card';
    div.innerHTML = `
      <h4>${ev.title}</h4>
      <p class="event-date">${formatDateReadable(ev.date)}</p>
      <p>${ev.description}</p>
    `;
    return div;
  };

  const getMonthName = (monthIndex) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
  };

  const formatDate = (date) => {
    // Convert date to YYYY-MM-DD format
    return date.toISOString().split('T')[0];
  };

  const formatDateReadable = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => Calendar.init());
