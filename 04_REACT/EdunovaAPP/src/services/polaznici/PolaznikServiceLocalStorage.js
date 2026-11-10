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
    spremiSliku({sifra: sifra,slika: polaznik.slika})
}



async function obrisi(sifra){
    let polaznici = dohvatiSveIzStorage()
    polaznici = polaznici.filter(s => s.sifra !== parseInt(sifra))
    spremiUStorage(polaznici)
}


// Straničenje - dohvati stranicu polaznika
async function dohvatiStranicu(stranica = 1, velicinaStranice = 8,uvjetPretrazivanja='') {
    console.log('Dohvaćanje stranice storage')
    let filtriraniPolaznici = dohvatiSveIzStorage();
   

     if (uvjetPretrazivanja && uvjetPretrazivanja.trim() !== '') {
        const loweruvjetPretrazivanja = uvjetPretrazivanja.toLowerCase().trim();
        filtriraniPolaznici = filtriraniPolaznici.filter(polaznik => {
            const ime = (polaznik.ime || '').toLowerCase();
            const prezime = (polaznik.prezime || '').toLowerCase();
            const email = (polaznik.email || '').toLowerCase();
            const oib = (polaznik.oib || '').toLowerCase();
            
            return ime.includes(loweruvjetPretrazivanja) ||
                   prezime.includes(loweruvjetPretrazivanja) ||
                   email.includes(loweruvjetPretrazivanja) ||
                   oib.includes(loweruvjetPretrazivanja);
        });
    }


    const pocetniIndeks = (stranica - 1) * velicinaStranice;
    const zavrsniIndeks = pocetniIndeks + velicinaStranice;
    const stranicenjePodaci = filtriraniPolaznici.slice(pocetniIndeks, zavrsniIndeks);
    const ukupnoStavki = filtriraniPolaznici.length;
    const ukupnoStranica = Math.ceil(ukupnoStavki / velicinaStranice);

    return {
        data: stranicenjePodaci,
        ukupnoStranica: ukupnoStranica,
        ukupnoStavki: ukupnoStavki
    };
}


async function spremiSliku(entitet) {
   try {
    const response = await fetch('/spremiSlika.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sifra: entitet.sifra,
        slika: entitet.slika,
      }),
    });

    // Prihvat odgovora s backenda
    const res = await response.json();

    if (!response.ok || !res.success) {
      throw new Error(res.message || 'Greška prilikom spremanja.');
    }

    // Uspješan odgovor
    console.log('Odgovor s backenda:', res);
    return res;
  } catch (error) {
    console.error('API Greška:', error.message);
    throw error;
  }
}


export default{
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi,
    dohvatiStranicu
}