const Blogs = (() => {
  const blogContainer = document.getElementById('blogEvents');
  
  let events = [];
  
  const init = async () => {
    if (!blogContainer) return;

    // Fetch events from JSON
    try {
      const response = await fetch('/assets/content/blogs.json');
      events = await response.json();
    } catch (err) {
      console.error('Error loading blogs:', err);
    }

    renderBlogs();

  const renderBlogs = () => {
    blogContainer.innerHTML = '';

    const now = new Date();

    // Sort blogs by date
    blog.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Render blogs
    if (blog.length) {
      blog.forEach(ev => {
        const card = createEventCard(ev);
        blogContainer.appendChild(card);
      });
    } else {
      blogContainer.innerHTML = '<p>No blogs.</p>';
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
