const STORAGE_KEY='smjerovi'

function dohvatiSveIzStorage(){
    const podaci = localStorage.getItem(STORAGE_KEY)
    return podaci ? JSON.parse(podaci) : []
}

function spremiUStorage(podaci){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci))
}

async function get(){
    const smjerovi = dohvatiSveIzStorage()
    return {data: [...smjerovi]}
}

async function getBySifra(sifra){
    const smjerovi = dohvatiSveIzStorage()
    return {data: smjerovi.find(s => s.sifra === parseInt(sifra))}
}


async function dodaj(smjer){
    const smjerovi = dohvatiSveIzStorage()
    if(smjerovi.length === 0){
        smjer.sifra = 1
    }else{
        const maxSifra = Math.max(...smjerovi.map(s => s.sifra))
        smjer.sifra = maxSifra + 1
    }
    smjerovi.push(smjer)
    spremiUStorage(smjerovi)
}



async function promijeni(sifra, smjer){
    const smjerovi = dohvatiSveIzStorage()
    const index = smjerovi.findIndex(s => s.sifra === parseInt(sifra))
    smjerovi[index] = {...smjerovi[index], ...smjer}
    spremiUStorage(smjerovi)
}



async function obrisi(sifra){
    let smjerovi = dohvatiSveIzStorage()
    smjerovi = smjerovi.filter(s => s.sifra !== parseInt(sifra))
    spremiUStorage(smjerovi)
}



export default{
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi
}