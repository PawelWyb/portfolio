// Poczekaj na załadowanie zawartości dokumentu
document.addEventListener("DOMContentLoaded", function() {
  // Przełącznik motywu
  const themeToggleBtn = document.querySelector('.theme-toggle');
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Obsługa kliknięcia w kafelek CV
  const cvTile = document.getElementById('cv-tile');
  cvTile.addEventListener('click', function() {
    window.location.href = 'https://pawelwyb.github.io/moje-cv/';
  });

  // Obsługa nawigacji w galeriach
  document.querySelectorAll('.gallery-nav').forEach(function(nav) {
    nav.addEventListener('click', function() {
      const galleryId = parseInt(this.getAttribute('data-gallery'));
      const action = this.getAttribute('data-action');
      if (action === 'next') {
        nextImage(galleryId);
      } else {
        prevImage(galleryId);
      }
    });
  });
});

// Funkcja przełączająca motyw dzienny/nocny
function toggleTheme() {
  document.body.classList.toggle('night');
  document.getElementById('main-header').classList.toggle('night');
  document.querySelectorAll('.panel').forEach(function(panel) {
    panel.classList.toggle('night');
  });
  // Aktualizacja tekstu przycisku
  const toggleBtn = document.querySelector('.theme-toggle');
  toggleBtn.textContent = document.body.classList.contains('night') ? 'Tryb dzienny' : 'Tryb nocny';
}

// Obiekt przechowujący listy zdjęć dla poszczególnych galerii
const galleries = {
  1: ["assets/marketing1.jpg", "assets/marketing2.jpg", "assets/marketing3.jpg"],
  2: ["assets/reklama1.jpg", "assets/reklama2.jpg", "assets/reklama3.jpg"],
  3: ["assets/branding1.jpg", "assets/branding2.jpg", "assets/branding3.jpg"],
  4: ["assets/social1.jpg", "assets/social2.jpg", "assets/social3.jpg"],
  5: ["assets/druk1.jpg", "assets/druk2.jpg", "assets/druk3.jpg"]
};

// Aktualny indeks zdjęcia dla każdej galerii
const currentImageIndex = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0
};

// Funkcja do przejścia do następnego zdjęcia
function nextImage(galleryId) {
  currentImageIndex[galleryId]++;
  if (currentImageIndex[galleryId] >= galleries[galleryId].length) {
    currentImageIndex[galleryId] = 0;
  }
  updateGalleryImage(galleryId);
}

// Funkcja do przejścia do poprzedniego zdjęcia
function prevImage(galleryId) {
  currentImageIndex[galleryId]--;
  if (currentImageIndex[galleryId] < 0) {
    currentImageIndex[galleryId] = galleries[galleryId].length - 1;
  }
  updateGalleryImage(galleryId);
}

// Aktualizacja obrazu w galerii
function updateGalleryImage(galleryId) {
  const galleryContainer = document.getElementById("gallery" + galleryId);
  const imgElement = galleryContainer.querySelector("img");
  imgElement.src = galleries[galleryId][currentImageIndex[galleryId]];
}
