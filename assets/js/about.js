document.addEventListener('DOMContentLoaded', init);

async function init() {
  const aboutContent = document.getElementById('aboutContent');
  
  if (!aboutContent) return; // If the aboutContent element doesn't exist, stop

  try {
    // Fetch the content from the about.json file
    const response = await fetch('/assets/content/about.json');
    
    // Check if the response is OK
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();

    // Populate the About page dynamically
    aboutContent.innerHTML = `
      <h1>Welcome to My Creative Playground!</h1>
      <p>${data.intro}</p>
      <h2>The Journey so Far</h2>
      <p>${data.journey}</p>
      <h2>My Aim</h2>
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
  } catch (error) {
    // Handle any errors
    console.error('Error loading the About content:', error);
    aboutContent.innerHTML = `<p>Sorry, there was an issue loading the content: ${error.message}</p>`;
  }
}
