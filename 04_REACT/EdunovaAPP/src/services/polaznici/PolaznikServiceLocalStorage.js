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


// Straničenje - dohvati stranicu polaznika
async function dohvatiStranicu(stranica = 1, velicinaStranice = 8) {
    const polaznici = dohvatiSveIzStorage();
    const pocetniIndeks = (stranica - 1) * velicinaStranice;
    const zavrsniIndeks = pocetniIndeks + velicinaStranice;
    const stranicenjePodaci = polaznici.slice(pocetniIndeks, zavrsniIndeks);
    const ukupnoStavki = polaznici.length;
    const ukupnoStranica = Math.ceil(ukupnoStavki / velicinaStranice);

    return {
        data: stranicenjePodaci,
        ukupnoStranica: ukupnoStranica,
        ukupnoStavki: ukupnoStavki
    };
}


export default{
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi,
    dohvatiStranicu
}