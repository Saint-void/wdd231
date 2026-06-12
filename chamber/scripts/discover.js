import { places } from '../data/discover-data.mjs';

// Builds the discover cards and handles last-visit messaging via localStorage
document.addEventListener('DOMContentLoaded', () => {
  // Common page helpers (moved from inline script)
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const lastModEl = document.getElementById('lastModified');
  if (lastModEl) lastModEl.textContent = `Last modified: ${document.lastModified}`;

  const grid = document.getElementById('discoverGrid');
  const visitEl = document.getElementById('visitMessage');

  // LocalStorage: visit message
  const last = localStorage.getItem('discoverLastVisit');
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  if (!last) {
    visitEl.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const diff = now - Number(last);
    if (diff < oneDay) {
      visitEl.textContent = 'Back so soon! Awesome!';
    } else {
      const days = Math.floor(diff / oneDay);
      visitEl.textContent = `You last visited ${days} day${days === 1 ? '' : 's'} ago.`;
    }
  }
  localStorage.setItem('discoverLastVisit', String(now));

  // Build cards using the imported data
  places.forEach((place, i) => {
    const card = document.createElement('article');
    card.className = `card card--${i + 1}`;

    card.innerHTML = `
      <h2>${place.title}</h2>
      <figure>
        <picture>
          <source srcset="${place.image}.webp" type="image/webp">
          <img src="${place.image}.jpg" alt="${place.alt}" width="300" height="200" loading="lazy">
        </picture>
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button class="learn-more">Learn more</button>
    `;

    grid.appendChild(card);
  });

  // Optional: attach click handlers for learn-more (placeholder behavior)
  grid.addEventListener('click', (e) => {
    if (e.target.matches('.learn-more')) {
      const card = e.target.closest('.card');
      const title = card?.querySelector('h2')?.textContent || 'Details';
      alert(`${title} — more details coming soon.`);
    }
  });
});
