import { polaznici } from "./PolaznikPodaci";

// 1/4 od CRUD: Read

async function get(){
    return {data: [...polaznici]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra){
    return {data: polaznici.find(s => s.sifra === parseInt(sifra))}
}

// 2/4 od CRUD: Create

async function dodaj(polaznik){
    if(polaznici.length === 0){
        polaznik.sifra = 1
    }else{
        polaznik.sifra = polaznici[polaznici.length - 1].sifra + 1
    }
    polaznici.push(polaznik)
}

// 3/4 od CRUD: Update

async function promijeni(sifra, polaznik){
    const index = nadiIndex(sifra)
    polaznici[index] = {...polaznici[index], ...polaznik}
}

function nadiIndex(sifra){
    return polaznici.findIndex(s => s.sifra === parseInt(sifra))
} 

// 4/4 od CRUD: Delete
async function obrisi(sifra){
    const index = nadiIndex(sifra)
    polaznici.splice(index,1)
}


// Straničenje - dohvati stranicu polaznika
async function dohvatiStranicu(stranica = 1, velicinaStranice = 8) {
    const pocetniIndeks = (stranica - 1) * velicinaStranice; // (2-1) * 8, 1 * 8 = 8
    const zavrsniIndeks = pocetniIndeks + velicinaStranice; // 8+8=16
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