document.addEventListener('DOMContentLoaded', () => {
  // Fetch the content from the about.json file
  fetch('/assets/content/about.json')
    .then(response => response.json())
    .then(data => {
      // Populate the About page dynamically
      const aboutContent = document.getElementById('aboutContent');
      aboutContent.innerHTML = `
        <h1>Welcome to My Creative Playground!</h1>
        <p>${data.intro}</p>

        <h2>🚀 Our Journey</h2>
        <p>${data.journey}</p>

        <h2>💡 Our Mission</h2>
        <p>${data.mission}</p>

        <div class="featured-section">
          <h3>Key Features</h3>
          <ul>
            ${data.key_features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>

        <h2>✨ A Little Help From You?</h2>
        <p>${data.call_to_action} <a href="/donations" class="donate-button">Support My Work</a></p>
      `;
    })
    .catch(error => {
      console.error('Error loading the About content:', error);
      document.getElementById('aboutContent').innerHTML = '<p>Sorry, there was an issue loading the content.</p>';
    });
});
