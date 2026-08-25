const polaznici = [
    {
        ime: "Anamaria",
        prezime: "Moritz",
        video: "video/anamaria.webm",
        github: "https://github.com/moritzanamaria"
    },
    {
        ime: "Đurđica",
        prezime: "Habjanović",
        video: "video/Durdica.webm",
        github: "https://github.com/durdicahabjanovic1-bot"
    },
    {
        ime: "Marta",
        prezime: "Đukić",
        video: "video/marta.webm",
        github: "https://github.com/martadukic2004-ops"
    },
    {
        ime: "Tomislav",
        prezime: "Jakopec",
        video: "video/Tomislav.webm",
        github: "https://github.com/tjakopec"
    }
];


const renderKartice = () => {

    const kontejner = document.getElementById('cards');

    kontejner.innerHTML = polaznici.map(
        ({ ime, prezime, video, github }, indeks) => `

        <article class="card">

            <div
                class="card__video-wrap"
                data-indeks="${indeks}"
                title="Otvori video">

                <video
                    class="card__video"
                    src="${video}"
                    muted
                    preload="metadata">
                </video>

                <div class="video__play">
                    ▶
                </div>

            </div>

            <div class="card__body">

                <h3 class="card__name">

                    <a
                        href="${github}"
                        target="_blank"
                        rel="noopener noreferrer">

                        ${ime} ${prezime}

                    </a>

                </h3>

                <p class="card__role">
                    Frontend developer
                </p>

            </div>

        </article>

    `).join('');


    kontejner
        .querySelectorAll('.card__video-wrap')
        .forEach(element => {

            element.addEventListener('click', () => {

                otvoriVideoteku(
                    Number(element.dataset.indeks)
                );

            });

        });

};


const lightbox =
    document.getElementById('lightbox');

const lightboxVideo =
    document.getElementById('lightboxVideo');

const lightboxCaption =
    document.getElementById('lightboxCaption');


let trenutniIndeks = 0;


const prikaziVideo = (indeks) => {

    trenutniIndeks =
        (indeks + polaznici.length) % polaznici.length;


    const {
        ime,
        prezime,
        video,
        github
    } = polaznici[trenutniIndeks];


    lightboxVideo.pause();

    lightboxVideo.src = video;

    lightboxVideo.load();


    lightboxCaption.innerHTML = `

        <a
            href="${github}"
            target="_blank"
            rel="noopener noreferrer">

            ${ime} ${prezime}

        </a>

    `;

};


const otvoriVideoteku = (indeks) => {

    prikaziVideo(indeks);

    lightbox.hidden = false;

    document.body.classList.add('no-scroll');

};


const zatvoriVideoteku = () => {

    lightboxVideo.pause();

    lightbox.hidden = true;

    document.body.classList.remove('no-scroll');

};


document
    .getElementById('lightboxPrev')
    .addEventListener('click', () => {

        prikaziVideo(trenutniIndeks - 1);

    });


document
    .getElementById('lightboxNext')
    .addEventListener('click', () => {

        prikaziVideo(trenutniIndeks + 1);

    });


document
    .getElementById('lightboxClose')
    .addEventListener('click', zatvoriVideoteku);


lightbox.addEventListener('click', (e) => {

    if (e.target === lightbox) {

        zatvoriVideoteku();

    }

});


document.addEventListener('keydown', (e) => {

    if (lightbox.hidden) {
        return;
    }


    if (e.key === 'Escape') {

        zatvoriVideoteku();

    }


    if (e.key === 'ArrowLeft') {

        prikaziVideo(trenutniIndeks - 1);

    }


    if (e.key === 'ArrowRight') {

        prikaziVideo(trenutniIndeks + 1);

    }

});


document.addEventListener(
    'DOMContentLoaded',
    renderKartice
);