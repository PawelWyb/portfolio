// Funkcja przełączająca motyw między dziennym a nocnym
function toggleTheme() {
  document.body.classList.toggle('night');
  document.getElementById('main-header').classList.toggle('night');
  // Dodajemy klasę trybu nocnego do wszystkich paneli
  document.querySelectorAll('.panel').forEach(function(panel) {
    panel.classList.toggle('night');
  });
  // Zmiana tekstu przycisku
  var toggleBtn = document.querySelector('.theme-toggle');
  if(document.body.classList.contains('night')) {
    toggleBtn.textContent = 'Tryb dzienny';
  } else {
    toggleBtn.textContent = 'Tryb nocny';
  }
}

// Obiekt przechowujący listy zdjęć dla każdej galerii
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

// Funkcja przechodząca do następnego zdjęcia w galerii
function nextImage(galleryId) {
  currentImageIndex[galleryId]++;
  if (currentImageIndex[galleryId] >= galleries[galleryId].length) {
    currentImageIndex[galleryId] = 0;
  }
  document.querySelector('#gallery' + galleryId + ' img').src = galleries[galleryId][currentImageIndex[galleryId]];
}

// Funkcja przechodząca do poprzedniego zdjęcia w galerii
function prevImage(galleryId) {
  currentImageIndex[galleryId]--;
  if (currentImageIndex[galleryId] < 0) {
    currentImageIndex[galleryId] = galleries[galleryId].length - 1;
  }
  document.querySelector('#gallery' + galleryId + ' img').src = galleries[galleryId][currentImageIndex[galleryId]];
}
