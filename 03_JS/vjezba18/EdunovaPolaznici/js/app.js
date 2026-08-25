// =====================================================
// Edunova - Polaznici smjera Frontend developer
// Podatke (ime i prezime) slobodno ručno promijenite
// =====================================================

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

// ---------- Kartični pregled ----------
const renderKartice = () => {
    const kontejner = document.getElementById('cards');

    kontejner.innerHTML = polaznici.map(({ ime, prezime, slika, github }, indeks) => `
        <article class="card">
            <div class="card__img-wrap" data-indeks="${indeks}" title="Otvori galeriju">
                <img class="card__img" src="${slika}" alt="${ime} ${prezime}">
            </div>
            <div class="card__body">
                <h3 class="card__name">
    <a href="${github}" target="_blank">
        ${ime} ${prezime}
    </a>
</h3>
                <p class="card__role">Frontend developer</p>
            </div>
        </article>
    `).join('');

    // Klik na sliku otvara galeriju (lightbox)
    kontejner.querySelectorAll('.card__img-wrap').forEach(el => {
        el.addEventListener('click', () => otvoriGaleriju(Number(el.dataset.indeks)));
    });
};

// ---------- Galerija (lightbox) ----------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

let trenutniIndeks = 0;

const prikaziSliku = (indeks) => {
    // Kružno listanje (s prve na zadnju i obrnuto)
    trenutniIndeks = (indeks + polaznici.length) % polaznici.length;

    const { ime, prezime, slika, github } = polaznici[trenutniIndeks];

    lightboxImg.src = slika;
    lightboxImg.alt = `${ime} ${prezime}`;

    lightboxCaption.innerHTML = `
    <a href="${github}" target="_blank">
        ${ime} ${prezime}
    </a>
`;
};

const otvoriGaleriju = (indeks) => {
    prikaziSliku(indeks);
    lightbox.hidden = false;
    document.body.classList.add('no-scroll');
};

const zatvoriGaleriju = () => {
    lightbox.hidden = true;
    document.body.classList.remove('no-scroll');
};

// ---------- Događaji galerije ----------
document.getElementById('lightboxPrev').addEventListener('click', () => prikaziSliku(trenutniIndeks - 1));
document.getElementById('lightboxNext').addEventListener('click', () => prikaziSliku(trenutniIndeks + 1));
document.getElementById('lightboxClose').addEventListener('click', zatvoriGaleriju);

// Klik na tamnu pozadinu zatvara galeriju
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) zatvoriGaleriju();
});

// Tipkovnica: Escape zatvara, strelice listaju
document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;

    if (e.key === 'Escape') zatvoriGaleriju();
    if (e.key === 'ArrowLeft') prikaziSliku(trenutniIndeks - 1);
    if (e.key === 'ArrowRight') prikaziSliku(trenutniIndeks + 1);
});

// ---------- Inicijalizacija ----------
document.addEventListener('DOMContentLoaded', renderKartice);