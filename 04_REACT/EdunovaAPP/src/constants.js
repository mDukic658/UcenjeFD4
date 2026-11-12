
export const IME_APLIKACIJE = 'Edunova APP'

export const RouteNames = {
    HOME: '/',
    RASPORED: '/raspored',

    SMJEROVI: '/smjerovi',
    SMJEROVI_DODAJ: '/smjerovi/novi',
    SMJEROVI_PROMJENA: '/smjerovi/:sifra',

    POLAZNICI: '/polaznici',
    POLAZNICI_DODAJ: '/polaznici/novi',
    POLAZNICI_PROMJENA: '/polaznici/:sifra',

    GRUPE: '/grupe',
    GRUPE_DODAJ: '/grupe/novi',
    GRUPE_PROMJENA: '/grupe/:sifra',

    OPERATERI: '/operateri',
    OPERATERI_NOVI: '/operateri/novi',
    OPERATERI_PROMJENA: '/operateri/:sifra',
    OPERATERI_PROMJENA_LOZINKE: '/operateri/:sifra/lozinka',


    GENERIRANJE_PODATAKA: '/generiraj-podatke',
    
    APLIKACIJE_POLAZNIKA: '/aplikacije-polaznika'
}

// memorija, localStorage, firebase
export const DATA_SOURCE = 'localStorage'