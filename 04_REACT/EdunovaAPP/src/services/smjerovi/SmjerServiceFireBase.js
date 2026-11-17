import { collection, doc, updateDoc,getDoc, getDocs, addDoc, deleteDoc, Timestamp } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constants";

async function get() {
    const skupSmjerova = collection(getFirebaseDB(), PrefixStorage.SMJEROVI);
    const smjeroviSnapshot = await getDocs(skupSmjerova);
    return {success: true, data: smjeroviSnapshot.docs.map(doc => {
        const data = doc.data();
        const d = data.datumPokretanja ? data.datumPokretanja.toDate() : new Date();
        const isoDatum = d.toISOString();
        return {
            sifra: doc.id,
            ...data,
            datumPokretanja: isoDatum 
        };
    }) }
}

async function dodaj(smjer) {
    const dateObj = new Date(smjer.datumPokretanja);
    const firestoreTimestamp = Timestamp.fromDate(dateObj);
    smjer.datumPokretanja = firestoreTimestamp;
    try {
        const skupSmjerova = collection(getFirebaseDB(), PrefixStorage.SMJEROVI);
        const docRef = await addDoc(skupSmjerova, smjer);
        
        return {
            success: true,
            id: docRef.id
        };
    } catch (e) {
        console.error("Greška kod dodavanja: ", e);
        return {
            success: false,
            message: e.message
        };
    }
}


async function getBySifra(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.SMJEROVI, sifra);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const d = data.datumPokretanja ? data.datumPokretanja.toDate() : new Date();
            const isoDatum = d.toISOString();
          
            return {
                success: true,
                data: {
                    sifra: docSnap.id,
                    ...data,
                    datumPokretanja: isoDatum
                }
            };
        } else {
            return { 
                success: false, 
                message: "Smjer s tom šifrom ne postoji u bazi." 
            };
        }
    } catch (e) {
        console.error("Greška kod dohvaćanja po šifri: ", e);
        return { 
            success: false, 
            message: e.message 
        };
    }
}


async function promijeni(sifra, smjer) {
    try {
        const dateObj = new Date(smjer.datumPokretanja);
        const firestoreTimestamp = Timestamp.fromDate(dateObj);
        smjer.datumPokretanja = firestoreTimestamp;
        const docRef = doc(getFirebaseDB(), PrefixStorage.SMJEROVI, sifra);
        await updateDoc(docRef, smjer);

        return { success: true };
    } catch (e) {
        console.error("Greška kod promjene: ", e);
        return { success: false, message: e.message };
    }
}


async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.SMJEROVI, sifra);
        await deleteDoc(docRef);
        return {
            success: true,
            message: "Uspješno obrisano"
        };
    } catch (e) {
        console.error("Greška kod brisanja: ", e);
        return {
            success: false,
            message: e.message
        };
    }
}

export default {
    get,
    dodaj,
    promijeni,
    getBySifra,
    obrisi
}
