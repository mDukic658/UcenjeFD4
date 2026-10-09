const STORAGE_KEY='polaznici'

function dohvatiSveIzStorage(){
    const podaci = localStorage.getItem(STORAGE_KEY)
    return podaci ? JSON.parse(podaci) : []
}

function spremiUStorage(podaci){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci))
}

async function get(){
    const polaznici = dohvatiSveIzStorage()
    return {data: [...polaznici]}
}

async function getBySifra(sifra){
    const polaznici = dohvatiSveIzStorage()
    return {data: polaznici.find(s => s.sifra === parseInt(sifra))}
}


async function dodaj(polaznik){
    const polaznici = dohvatiSveIzStorage()
    if(polaznici.length === 0){
        polaznik.sifra = 1
    }else{
        const maxSifra = Math.max(...polaznici.map(s => s.sifra))
        polaznik.sifra = maxSifra + 1
    }
    polaznici.push(polaznik)
    spremiUStorage(polaznici)
}



async function promijeni(sifra, polaznik){
    const polaznici = dohvatiSveIzStorage()
    const index = polaznici.findIndex(s => s.sifra === parseInt(sifra))
    polaznici[index] = {...polaznici[index], ...polaznik}
    spremiUStorage(polaznici)
}



async function obrisi(sifra){
    let polaznici = dohvatiSveIzStorage()
    polaznici = polaznici.filter(s => s.sifra !== parseInt(sifra))
    spremiUStorage(polaznici)
}



export default{
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi
}