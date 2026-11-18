const Blogs = (() => {
  const blogsContainer = document.getElementById('blogsEvents');
  let events = [];

  const init = async () => {
    if (!blogsContainer) return;

    try {
      const response = await fetch(blogsContainer.dataset.blogsSrc);
      if (!response.ok) {
        throw new Error(`Could not load blogs (${response.status})`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Blog data must be a JSON array');
      }
      events = data;
    } catch (err) {
      console.error('Error loading blogs:', err);
      blogsContainer.textContent = 'Sorry, there was an issue loading the blogs.';
      return;
    }

    renderBlogs();
  };

  const renderBlogs = () => {
    blogsContainer.replaceChildren();
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (!events.length) {
      blogsContainer.textContent = 'No blogs.';
      return;
    }

    events.forEach(event => blogsContainer.appendChild(createEventCard(event)));
  };

  const createEventCard = (event) => {
    const card = document.createElement('article');
    card.className = 'event-card';

    const title = document.createElement('h4');
    title.textContent = event.title || 'Untitled';

    const date = document.createElement('p');
    date.className = 'event-date';
    date.textContent = formatDateReadable(event.date);

    const description = document.createElement('p');
    description.textContent = event.description || '';

    card.append(title, date, description);
    return card;
  };

  const formatDateReadable = (dateStr) => {
    const date = new Date(`${dateStr}T00:00:00`);
    if (Number.isNaN(date.getTime())) return dateStr || '';

    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => Blogs.init());
