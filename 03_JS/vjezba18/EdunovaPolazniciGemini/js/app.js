// Podaci o polaznicima - Ovdje možete ručno promijeniti imena i prezimena
const polaznici = [
  {
    ime: "Anamaria",
    prezime: "Moritz",
    slika: "img/anamariaMoritz.png",
    github: "https://github.com/moritzanamaria"
  },
  {
    ime: "Dragan",
    prezime: "Živković",
    slika: "img/Dragan.jpg",
    github: "https://github.com/inforemont"
  },
  {
    ime: "Đurđica",
    prezime: "Habjanović",
    slika: "img/Durdica.png",
    github: "https://github.com/durdicahabjanovic1-bot"
  },
  {
    ime: "Marta",
    prezime: "Đukić",
    slika: "img/marta.png",
    github: "https://github.com/martadukic2004-ops"
  },
  {
    ime: "Tomislav",
    prezime: "Jakopec",
    slika: "img/Tomislav.png",
    github: "https://github.com/tjakopec"
  }
];
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  setupModalEvents();
});

// Generiranje kartica (4 po redu)
function renderCards() {
  const container = document.getElementById("grid-container");
  container.innerHTML = "";

  polaznici.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${p.slika}" alt="${p.ime} ${p.prezime}" loading="lazy">
      </div>
      <div class="card-info">
        <h3>${p.ime} ${p.prezime}</h3>
        <span>Frontend developer</span>
      </div>
    `;

    // Klikom na karticu otvara se modal galerija s indeksirane pozicije
    card.addEventListener("click", () => openGallery(index));
    container.appendChild(card);
  });
}

// Otvaranje galerije s točno odabranom slikom
function openGallery(index) {
  currentIndex = index;
  updateModalContent();
  
  const modal = document.getElementById("gallery-modal");
  modal.style.display = "flex";
}

// Ažuriranje prikaza trenutne slike i teksta unutar modala
function updateModalContent() {
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const p = polaznici[currentIndex];

  modalImg.src = p.slika;
  modalImg.alt = `${p.ime} ${p.prezime}`;
  modalCaption.textContent = `${p.ime} ${p.prezime}`;
}

// Sljedeća slika u galeriji
function nextImage() {
  currentIndex = (currentIndex + 1) % polaznici.length;
  updateModalContent();
}

// Prethodna slika u galeriji
function prevImage() {
  currentIndex = (currentIndex - 1 + polaznici.length) % polaznici.length;
  updateModalContent();
}

// Event listeneri za navigaciju i zatvaranje
function setupModalEvents() {
  const modal = document.getElementById("gallery-modal");
  const closeBtn = document.querySelector(".modal-close");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    prevImage();
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    nextImage();
  });

  // Zatvaranje na klik izvan slike
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Navigacija pomoću tipkovnice (Strelica Lijevo / Desno / Escape za izlaz)
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex") {
      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "Escape") {
        modal.style.display = "none";
      }
    }
  });
}