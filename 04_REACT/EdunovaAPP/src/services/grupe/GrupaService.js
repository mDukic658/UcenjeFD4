import { DATA_SOURCE } from "../../constants"
import GrupaServiceLocalStorage from "./GrupaServiceLocalStorage"
import GrupaServiceMemorija from "./GrupaServiceMemorija"


let Servis = null

switch(DATA_SOURCE){
    case 'memorija':
        Servis = GrupaServiceMemorija
        break
    case 'localStorage':
        Servis = GrupaServiceLocalStorage
        break
    default:
        Servis = null
}

const PrazanServis = {
    get: async () => ({data: []}),
    getBySifra: async (sifra) => ({data: {}}),
    dodaj: async (polaznik) => {console.error('Servis nije implementiran')},
    promijeni: async (sifra, polaznik) => {console.error('Servis nije implementiran')},
    obrisi: async (sifra) => {console.error('Servis nije implementiran')}
}

const AktivniServis = Servis || PrazanServis



export default{
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (polaznik) => AktivniServis.dodaj(polaznik),
    promijeni: (sifra,polaznik) => AktivniServis.promijeni(sifra,polaznik),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
}