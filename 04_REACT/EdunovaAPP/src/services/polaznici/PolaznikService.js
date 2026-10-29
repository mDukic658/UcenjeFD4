import { DATA_SOURCE } from "../../constants"
import PolaznikServiceLocalStorage from "./PolaznikServiceLocalStorage"
import PolaznikServiceMemorija from "./PolaznikServiceMemorija"


let Servis = null

switch(DATA_SOURCE){
    case 'memorija':
        Servis = PolaznikServiceMemorija
        break
    case 'localStorage':
        Servis = PolaznikServiceLocalStorage
        break
    default:
        Servis = null
}

const PrazanServis = {
    get: async () => ({data: []}),
    getBySifra: async (sifra) => ({data: {}}),
    dodaj: async (polaznik) => {console.error('Servis nije implementiran')},
    promijeni: async (sifra, polaznik) => {console.error('Servis nije implementiran')},
    obrisi: async (sifra) => {console.error('Servis nije implementiran')},
    dohvatiStranicu: async (stranica, velicinaStranice) => ({ data: [], ukupnoStranica: 0, ukupnoStavki: 0 })
}

const AktivniServis = Servis || PrazanServis



export default{
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (polaznik) => AktivniServis.dodaj(polaznik),
    promijeni: (sifra,polaznik) => AktivniServis.promijeni(sifra,polaznik),
    obrisi: (sifra) => AktivniServis.obrisi(sifra),
    dohvatiStranicu: (stranica, velicinaStranice) => AktivniServis.dohvatiStranicu(stranica, velicinaStranice)
}