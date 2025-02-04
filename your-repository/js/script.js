document.addEventListener('DOMContentLoaded', () => {
  // Inicjalizacja
  const themeToggle = document.querySelector('.theme-toggle');
  const cvTile = document.getElementById('cv-tile');
  const galleries = document.querySelectorAll('.gallery-container');

  // Obsługa motywu
  themeToggle.addEventListener('click', toggleTheme);

  // Obsługa CV
  cvTile.addEventListener('click', redirectToCV);
  cvTile.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') redirectToCV();
  });

  // Inicjalizacja galerii
  galleries.forEach((gallery, index) => {
    const galleryId = index + 1;
    initGallery(gallery, galleryId);
  });
});

function toggleTheme() {
  document.body.classList.toggle('night');
  document.querySelectorAll('.panel, #main-header').forEach(element => {
    element.classList.toggle('night');
  });
  
  const isNightMode = document.body.classList.contains('night');
  localStorage.setItem('theme', isNightMode ? 'night' : 'light');
  document.querySelector('.theme-toggle').textContent = isNightMode ? '🌞 Tryb dzienny' : '🌙 Tryb nocny';
}

function redirectToCV() {
  window.location.href = 'https://pawelwyb.github.io/moje-cv/';
}

function initGallery(galleryElement, galleryId) {
  const prevButton = galleryElement.querySelector('[data-action="prev"]');
  const nextButton = galleryElement.querySelector('[data-action="next"]');
  const imgElement = galleryElement.querySelector('img');
  
  const category = galleryElement.parentElement
    .querySelector('h2').textContent
    .toLowerCase()
    .replace(/ /g, '_');

  let currentIndex = 0;
  const totalImages = 3; // Zakładając 3 obrazy na kategorię

  function updateImage() {
    imgElement.style.opacity = 0;
    setTimeout(() => {
      imgElement.src = `assets/${category}${currentIndex + 1}.jpg`;
      imgElement.style.opacity = 1;
    }, 300);
  }

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateImage();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalImages;
    updateImage();
  });

  // Zapisywanie stanu w localStorage
  window.addEventListener('beforeunload', () => {
    localStorage.setItem(`gallery_${galleryId}`, currentIndex);
  });

  // Przywracanie stanu
  const savedIndex = localStorage.getItem(`gallery_${galleryId}`);
  if (savedIndex !== null) {
    currentIndex = parseInt(savedIndex);
    updateImage();
  }
}

// Inicjalizacja zapisanego motywu
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'night') {
    document.body.classList.add('night');
    document.querySelector('.theme-toggle').textContent = '🌞 Tryb dzienny';
  }
}
initTheme();
