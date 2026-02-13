<script>
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

/* Calendar Script */
document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevButton = document.getElementById('prevMonth');
    const nextButton = document.getElementById('nextMonth');

    let currentDate = new Date('2025-08-11T18:01:23Z');
    let displayedMonth = currentDate.getMonth();
    let displayedYear = currentDate.getFullYear();

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];

      // Events data
      const events = [
          { date: '2025-08-11', title: 'Website Launch' },
          { date: '2025-09-01', title: 'Feature Release' }
        ];

            function renderCalendar() {
            calendar.innerHTML = '';
                    
            // Add day headers
             days.forEach(day => {
                const dayEl = document.createElement('div');
                dayEl.className = 'calendar-header';
                dayEl.textContent = day;
                calendar.appendChild(dayEl);
             });

             // Get first day of month and total days
            const firstDay = new Date(displayedYear, displayedMonth, 1);
            const lastDay = new Date(displayedYear, displayedMonth + 1, 0);
                    
            // Add empty cells for days before start of month
            for(let i = 0; i < firstDay.getDay(); i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day';
                calendar.appendChild(emptyDay);
             }

             // Add days of month
            for(let day = 1; day <= lastDay.getDate(); day++) {
                const dayEl = document.createElement('div');
                dayEl.className = 'calendar-day';
                dayEl.textContent = day;

                 // Check if this is current day
                 if (day === currentDate.getDate() && 
                     displayedMonth === currentDate.getMonth() && 
                     displayedYear === currentDate.getFullYear()) {
                    dayEl.classList.add('current');
                 }

                 // Check if day has event
                 const dateString = `${displayedYear}-${String(displayedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                 if (events.some(event => event.date === dateString)) {
                    dayEl.classList.add('has-event');
                 }

                calendar.appendChild(dayEl);
            }

            // Update month display
            currentMonthElement.textContent = `${months[displayedMonth]} ${displayedYear}`;
        }

        // Event listeners for navigation
        prevButton.addEventListener('click', () => {
            displayedMonth--;
           if (displayedMonth < 0) {
                displayedMonth = 11;
                displayedYear--;
            }
            renderCalendar();
        });

        nextButton.addEventListener('click', () => {
             displayedMonth++;
            if (displayedMonth > 11) {
                displayedMonth = 0;
                displayedYear++;
            }
            renderCalendar();
         });

        // Initial render
        renderCalendar();
    });
</script>
