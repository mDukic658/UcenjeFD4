// "stara" funkcija

function primjer(prvi, drugi) {
    console.log(prvi, drugi)
}

primjer('Edunova', 'Osijek')


function dugiPoziv() {
    let i = 0
    console.log(new Date())
    // setTimeout mi simulira dohvaćanje sadržaja s backenda (API - Aplication Programming Interface)
    setTimeout(() => {
        // ovdje pišemo što će se napraviti nakon što istekne vrijeme
        console.log(++i, new Date())

        setTimeout(() => {
            console.log(++i, new Date())

            setTimeout(() => {
                console.log(++i, new Date())
            }, 1000);

        }, 2000);

    }, 5000); // 5000ms = 5s
}

dugiPoziv()


// async/await

function cekaj(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Završio za ${ms / 1000} sekundi`)
        }, ms);
    })
}

async function izvedi() {
    let odgovor = await cekaj(5000)
    console.log(odgovor)

    for (let i = 0; i < 10; i++) {
        console.log(await cekaj((i + 1) * 1000))
    }
}

izvedi()
// ovo ovdje je top-level module
// ovdje mogu i ne moram navesti await jer smo u top-level module

// IIFE (Immediately Invoked Function Expression)

;(async () => { // ; označava da je prethodni izraz završio, a stavili smo ovdje jer ne koristimo ; u js
    console.log('Hello IIFE')
    const url = 'https://dog.ceo/api/breeds/image/random'
    await fetch(url) 
    .then(response => response.json())
    .then(json => {
        console.log(json.message)
        document.getElementById('slika').src = json.message
    })
    .catch(rejected => {
        alert('Imamo problema s učitanjem sadržaja, molimo pokušajte kasnije')
    })
    
})() // ove zadnje dvije () znače izvedi