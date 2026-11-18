const Blogs = (() => {
  const blogsContainer = document.getElementById('blogsEvents');
  let events = [];

  const init = async () => {
    if (!blogsContainer) return;

    try {
      const response = await fetch('{{ "/assets/content/blogs.json" | relative_url }}');

      if (!response.ok) {
        throw new Error(`Could not load blogs (${response.status})`);
      }

      events = await response.json();
    } catch (err) {
      console.error('Error loading blogs:', err);
      blogsContainer.innerHTML = '<p>Sorry, there was an issue loading the blogs.</p>';
      return;
    }

    renderBlogs();
  };

  const renderBlogs = () => {
    blogsContainer.innerHTML = '';

    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (events.length) {
      events.forEach(ev => {
        blogsContainer.appendChild(createEventCard(ev));
      });
    } else {
      blogsContainer.innerHTML = '<p>No blogs.</p>';
    }
  };

  const createEventCard = (ev) => {
    const div = document.createElement('article');
    div.className = 'event-card';

    const title = document.createElement('h4');
    title.textContent = ev.title;

    const date = document.createElement('p');
    date.className = 'event-date';
    date.textContent = formatDateReadable(ev.date);

    const description = document.createElement('p');
    description.textContent = ev.description;

    div.append(title, date, description);
    return div;
  };

  const formatDateReadable = (dateStr) => {
    const date = new Date(`${dateStr}T00:00:00`);

    if (Number.isNaNaN(date.getTime())) {
      return dateStr;
    }

    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => Blogs.init());
