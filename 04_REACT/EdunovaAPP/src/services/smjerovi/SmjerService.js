import { smjerovi } from "./SmjerPodaci";

// 1/4 od CRUD: Read

async function get(){
    return {data: [...smjerovi]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra){
    return {data: smjerovi.find(s => s.sifra === parseInt(sifra))}
}

// 2/4 od CRUD: Create

async function dodaj(smjer){
    if(smjerovi.length === 0){
        smjer.sifra = 1
    }else{
        smjer.sifra = smjerovi[smjerovi.length - 1].sifra + 1
    }
    smjerovi.push(smjer)
}

export default{
    get,
    getBySifra,
    dodaj
}