const STORAGE_KEY='grupe'

function dohvatiSveIzStorage(){
    const podaci = localStorage.getItem(STORAGE_KEY)
    return podaci ? JSON.parse(podaci) : []
}

function spremiUStorage(podaci){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci))
}

async function get(){
    const grupe = dohvatiSveIzStorage()
    return {data: [...grupe]}
}

async function getBySifra(sifra){
    const grupe = dohvatiSveIzStorage()
    return {data: grupe.find(s => s.sifra === parseInt(sifra))}
}


async function dodaj(grupa){
    const grupe = dohvatiSveIzStorage()
    if(grupe.length === 0){
        grupa.sifra = 1
    }else{
        const maxSifra = Math.max(...grupe.map(s => s.sifra))
        grupa.sifra = maxSifra + 1
    }
    grupe.push(grupa)
    spremiUStorage(grupe)
}



async function promijeni(sifra, grupa){
    const grupe = dohvatiSveIzStorage()
    const index = grupe.findIndex(s => s.sifra === parseInt(sifra))
    grupe[index] = {...grupe[index], ...grupa}
    spremiUStorage(grupe)
}



async function obrisi(sifra){
    let grupe = dohvatiSveIzStorage()
    grupe = grupe.filter(s => s.sifra !== parseInt(sifra))
    spremiUStorage(grupe)
}



export default{
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi
}