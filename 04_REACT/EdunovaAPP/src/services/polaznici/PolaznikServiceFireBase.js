import { collection, doc, updateDoc, getDoc, getDocs, addDoc, deleteDoc, query, orderBy, limit, startAfter, where } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constants";

// 1/4 Read - dohvati sve
async function get() {
    try {
        const skupPolaznika = collection(getFirebaseDB(), PrefixStorage.POLAZNICI);
        const snapshot = await getDocs(skupPolaznika);
        const data = snapshot.docs.map(doc => ({
            sifra: doc.id,
            ...doc.data()
        }));
        return { success: true, data: data };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

// Dohvati jedan po šifri
async function getBySifra(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.POLAZNICI, sifra);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { success: true, data: { sifra: docSnap.id, ...docSnap.data() } };
        }
        return { success: false, message: "Polaznik nije pronađen" };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

// 2/4 Create - dodaj novi
async function dodaj(polaznik) {
    try {
        const skupPolaznika = collection(getFirebaseDB(), PrefixStorage.POLAZNICI);
        const docRef = await addDoc(skupPolaznika, polaznik);
        return { success: true, data: { sifra: docRef.id, ...polaznik } };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

// 3/4 Update - promjeni postojeći
async function promijeni(sifra, polaznik) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.POLAZNICI, sifra);
        await updateDoc(docRef, polaznik);
        return { success: true, data: { sifra, ...polaznik } };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

// 4/4 Delete - obriši
async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.POLAZNICI, sifra);
        await deleteDoc(docRef);
        return { success: true, message: 'Uspješno obrisano' };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

/**
 * Straničenje - dohvati stranicu polaznika
 * NAPOMENA: Firestore ne podržava "offset" na način kao SQL ili JS slice.
 * Ovdje koristimo pojednostavljenu verziju koja dohvaća podatke i filtrira ih.
 */
async function dohvatiStranicu(stranica = 1, velicinaStranice = 8, uvjetPretrazivanja = '') {
    try {
        const skupPolaznika = collection(getFirebaseDB(), PrefixStorage.POLAZNICI);
        let q = query(skupPolaznika, orderBy("prezime"));

        const snapshot = await getDocs(q);
        let polaznici = snapshot.docs.map(doc => ({
            sifra: doc.id,
            ...doc.data()
        }));
        // Filtriranje (budući da Firestore ne podržava kompleksni "OR" search na više polja s "includes")
        if (uvjetPretrazivanja && uvjetPretrazivanja.trim() !== '') {
            const lowerSearchTerm = uvjetPretrazivanja.toLowerCase().trim();
            polaznici = polaznici.filter(p =>
                (p.ime || '').toLowerCase().includes(lowerSearchTerm) ||
                (p.prezime || '').toLowerCase().includes(lowerSearchTerm) ||
                (p.email || '').toLowerCase().includes(lowerSearchTerm) ||
                (p.oib || '').toLowerCase().includes(lowerSearchTerm)
            );
        }
        
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
    } catch (e) {
        console.error("Greška kod dohvaćanja stranice polaznika: ", e);
        return { success: false, message: e.message };
    }
}

export default {
    get,
    dodaj,
    getBySifra,
    promijeni,
    obrisi,
    dohvatiStranicu
};