import { grupe } from "./GrupaPodaci";


async function get(){
    return {data: [...grupe]} 
}

async function getBySifra(sifra){
    return {data: grupe.find(s => s.sifra === parseInt(sifra))}
}


async function dodaj(grupa){
    if(grupe.length === 0){
        grupa.sifra = 1
    }else{
        grupa.sifra = grupe[grupe.length - 1].sifra + 1
    }
    grupe.push(grupa)
}


async function promijeni(sifra, grupa){
    const index = nadiIndex(sifra)
    grupe[index] = {...grupe[index], ...grupa}
}

function nadiIndex(sifra){
    return grupe.findIndex(s => s.sifra === parseInt(sifra))
} 

async function obrisi(sifra){
    const index = nadiIndex(sifra)
    grupe.splice(index,1)
}



export default{
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi
}