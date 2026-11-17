import { useEffect, useState } from 'react';
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
import { Faker, hr } from '@faker-js/faker';
import SmjerService from '../services/smjerovi/SmjerService';
import PolaznikService from '../services/polaznici/PolaznikService';
import GrupaService from '../services/grupe/GrupaService';
import OperaterService from '../services/operateri/OperaterService';
import { DATA_SOURCE, IME_APLIKACIJE } from '../constants';
import { smjerovi } from '../services/smjerovi/SmjerPodaci';
import { operateri } from '../services/operateri/OperaterPodaci';
import { grupe } from '../services/grupe/GrupaPodaci';
import { polaznici } from '../services/polaznici/PolaznikPodaci';
import GrupaServiceFireBase from '../services/grupe/GrupaServiceFireBase';
import PolaznikServiceFireBase from '../services/polaznici/PolaznikServiceFireBase';
import SmjerServiceFireBase from '../services/smjerovi/SmjerServiceFireBase';
import OperaterServiceFireBase from '../services/operateri/OperaterServiceFireBase';


export default function GeneriranjePodataka() {
    const [brojSmjerova, setBrojSmjerova] = useState(5);
    const [brojPolaznika, setBrojPolaznika] = useState(20);
    const [brojGrupa, setBrojGrupa] = useState(10);
    const [brojOperatera, setBrojOperatera] = useState(5);
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => { document.title = 'Generiranje podataka, ' + IME_APLIKACIJE })

    // Postavi faker na hrvatski jezik
    const faker = new Faker({
        locale: [hr]
    });

    const generirajSmjerove = async (broj) => {
        const naziviSmjerova = [
            'Web programiranje',
            'Java programiranje',
            'Python programiranje',
            'Frontend razvoj',
            'Backend razvoj',
            'Full Stack razvoj',
            'Mobile razvoj',
            'DevOps',
            'Data Science',
            'Cyber Security',
            'UI/UX dizajn',
            'Digital Marketing',
            'Grafički dizajn',
            'Video produkcija',
            'Fotografija'
        ];

        for (let i = 0; i < broj; i++) {
            const rezultat = await SmjerService.dodaj({
                naziv: naziviSmjerova[i % naziviSmjerova.length] + (i >= naziviSmjerova.length ? ` ${Math.floor(i / naziviSmjerova.length) + 1}` : ''),
                trajanje: faker.number.int({ min: 130, max: 350 }),
                cijena: faker.number.float({ min: 1100, max: 5000, precision: 0.01 }).toFixed(2),
                datumPokretanja: faker.date.soon().toISOString().split('T')[0],
                aktivan: faker.datatype.boolean()
            });
        }
    };

    const generirajPolaznike = async (broj) => {
        for (let i = 0; i < broj; i++) {
            const polaznik = {
                ime: i % 2 === 0 ? faker.person.firstName('male') : faker.person.firstName('female'),
                prezime: faker.person.lastName(),
                email: faker.internet.email(),
                oib: faker.string.numeric(11),
                slika: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAEsCAIAAAAJmGvpAAADD0lEQVR4nO3SQQ0AIRDAwOP8C1tZmKAhITMK+uiamQ9O+28H8CZjkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBYJY5EwFgljkTAWCWORMBaJDVgNBLAk8IkcAAAAAElFTkSuQmCC'
            };
            await PolaznikService.dodaj(polaznik);
        }
    };

    const generirajGrupe = async (broj) => {
        const grupe = [];

        // Dohvati sve smjerove
        const rezultatSmjerovi = await SmjerService.get();
        const smjerovi = rezultatSmjerovi.data;

        if (smjerovi.length === 0) {
            throw new Error('Nema dostupnih smjerova. Prvo generirajte smjerove.');
        }

        const rezultatPolaznici = await PolaznikService.get();
        const polaznici = rezultatPolaznici.data;

        if (polaznici.length === 0) {
            throw new Error('Nema dostupnih polaznika. Prvo generirajte polaznike.');
        }

        for (let i = 0; i < broj; i++) {
            // Odaberi nasumični smjer
            const randomSmjer = smjerovi[faker.number.int({ min: 0, max: smjerovi.length - 1 })];
            const promijesano = polaznici.sort(() => Math.random() - 0.5)
            const brojElemenata = Math.floor(Math.random() * (15 - 10 + 1)) + 10;
            const randomPolaznici = promijesano.slice(0, brojElemenata);

            const grupa = {
                naziv: randomSmjer.naziv.trim().split(/\s+/).slice(0, 2).map(rijec => rijec[0]).join('').toUpperCase() + '1',
                smjer: randomSmjer.sifra,
                polaznici: randomPolaznici.map(polaznik => polaznik.sifra)
            };

            await GrupaService.dodaj(grupa);
            grupe.push(grupa);
        }
        return grupe;
    };

    const handleGenerirajSmjerove = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajSmjerove(brojSmjerova);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojSmjerova} smjerova!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju smjerova: ' + error.message
            });
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajPolaznike = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await SmjerService.get();
            const smjerovi = rezultat.data;

            await generirajPolaznike(brojPolaznika, smjerovi);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojPolaznika} polaznika!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju polaznika: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiPolaznike = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve polaznike?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await PolaznikService.get();
            const polaznici = rezultat.data;

            for (const polaznik of polaznici) {
                await PolaznikService.obrisi(polaznik.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${polaznici.length} polaznika!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju polaznika: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiSmjerove = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve smjerove?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await SmjerService.get();
            const smjerovi = rezultat.data;

            for (const smjer of smjerovi) {
                await SmjerService.obrisi(smjer.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${smjerovi.length} smjerova!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju smjerova: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajGrupe = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajGrupe(brojGrupa);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojGrupa} grupa!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju grupa: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiGrupe = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve grupe?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await GrupaService.get();
            const grupe = rezultat.data;

            for (const grupa of grupe) {
                await GrupaService.obrisi(grupa.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${grupe.length} grupa!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju grupa: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

     const generirajOperatere = async (broj) => {
        // Prvo obriši admin operatera ako postoji
        const rezultat = await OperaterService.get();
        const operateri = rezultat.data;
        const adminOperater = operateri.find(op => op.email === 'admin@edunova.hr');
        
        if (adminOperater) {
            await OperaterService.obrisi(adminOperater.sifra);
        }

        // Dodaj admin operatera
        await OperaterService.dodaj({
            email: 'admin@edunova.hr',
            lozinka: 'Edunova123!',
            uloga: 'admin'
        });

        // Generiraj korisnik operatere
        for (let i = 0; i < broj; i++) {
            await OperaterService.dodaj({
                email: faker.internet.email(),
                lozinka: 'Edunova123!',
                uloga: 'korisnik'
            });
        }
    };

    const handleGenerirajOperatere = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajOperatere(brojOperatera);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojOperatera + 1} operatera (1 admin + ${brojOperatera} korisnika)!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju operatera: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiOperatere = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve operatere?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await OperaterService.get();
            const operateri = rezultat.data;
            
            for (const operater of operateri) {
                await OperaterService.obrisi(operater.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${operateri.length} operatera!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju operatera: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };


const handleMemorijaULocalStorage = async () => {
        if (!window.confirm('Jeste li sigurni da želite presipati sve podatke iz memorije u localStorage?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {

            localStorage.removeItem('smjerovi')
            localStorage.removeItem('polaznici')
            localStorage.removeItem('grupe')
            localStorage.removeItem('operateri')

            localStorage.setItem('smjerovi', JSON.stringify(smjerovi))
            localStorage.setItem('polaznici', JSON.stringify(polaznici))
            localStorage.setItem('grupe', JSON.stringify(grupe))
            localStorage.setItem('operateri', JSON.stringify(operateri))

           
            setPoruka({
                tip: 'success',
                tekst: `Uspješno presipano!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri presipavanju podataka: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };


    const handleMemorijaUFirebase = async () => {
        if (!window.confirm('Jeste li sigurni da želite pretočiti iz memorije u firebase?')) {
        return;
    }

    setLoading(true);
    setPoruka(null);

    try {
        // 1. Operateri (mogu ići paralelno jer ne trebamo njihove ID-ove za kasnije)
        const operateriPromises = operateri.map(e => {
            const { sifra, ...ostatak } = e;
            return OperaterServiceFireBase.dodajBezHash(ostatak);
        });
        await Promise.all(operateriPromises);


        // 2. Smjerovi (trebamo šifre za grupe)
        let mapiranjeSifriSmjerova = [];
        for (const e of smjerovi) {
            const { sifra, ...ostatak } = e;
            const fb = await SmjerServiceFireBase.dodaj(ostatak);
            const noviId = fb.id; 
            mapiranjeSifriSmjerova.push({ sifram: sifra, sifraf: noviId });
        }


        // 3. Polaznici (trebamo šifre za grupe)
        let mapiranjeSifriPolaznika = [];
        for (const e of polaznici) {
            const { sifra, ...ostatak } = e;
            const fb = await PolaznikServiceFireBase.dodaj(ostatak);
            const noviId = fb.data.sifra;
            mapiranjeSifriPolaznika.push({ sifram: sifra, sifraf: noviId });
        }



        // 4. Grupe (povezivanje starih šifri s novim Firebase ID-ovima)
        for (const e of grupe) {
            const { sifra, ...ostatak } = e;

            // Pronađi novi ID smjera
            const mSmjer = mapiranjeSifriSmjerova.find(m => m.sifram == ostatak.smjer);
            ostatak.smjer = mSmjer ? mSmjer.sifraf : null;

            // Mapiraj polaznike na njihove nove ID-ove
            ostatak.polaznici = ostatak.polaznici.map(pSifra => {
                const mPolaznik = mapiranjeSifriPolaznika.find(m => m.sifram == pSifra);
                return mPolaznik ? mPolaznik.sifraf : null;
            }).filter(id => id !== null); // Makni null ako polaznik nije pronađen

            //console.log('Dodajem grupu:', ostatak);
            await GrupaServiceFireBase.dodaj(ostatak);
        }

        setPoruka({
            tip: 'success',
            tekst: 'Uspješno presipano u Firebase'
        });

    } catch (error) {
        console.error("Greška pri presipanju:", error);
        setPoruka({
            tip: 'error',
            tekst: 'Došlo je do greške prilikom sinkronizacije.'
        });
    } finally {
        setLoading(false);
    }
    };
    


    return (
        <Container className="mt-4">
            <h1>Generiranje podataka</h1>
            <p className="text-muted">
                Koristite ovaj alat za generiranje testnih podataka s lažnim (fake) podacima na hrvatskom jeziku.
            </p>

            {poruka && (
                <Alert variant={poruka.tip} dismissible onClose={() => setPoruka(null)}>
                    {poruka.tekst}
                </Alert>
            )}

            <Row>
                <Col md={3}>
                    <Form onSubmit={handleGenerirajSmjerove}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj smjerova</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="50"
                                value={brojSmjerova}
                                onChange={(e) => setBrojSmjerova(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj smjerova (1-50)
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj smjerove'}
                        </Button>
                    </Form>
                </Col>
                <Col md={3}>
                    <Form onSubmit={handleGenerirajPolaznike}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj polaznika</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="200"
                                value={brojPolaznika}
                                onChange={(e) => setBrojPolaznika(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj polaznika (1-200)
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj polaznike'}
                        </Button>
                    </Form>
                </Col>
                <Col md={3}>
                    <Form onSubmit={handleGenerirajGrupe}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj grupa</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="100"
                                value={brojGrupa}
                                onChange={(e) => setBrojGrupa(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj grupa (1-100)
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj grupe'}
                        </Button>
                    </Form>
                </Col>
                <Col md={3}>
                    <Form onSubmit={handleGenerirajOperatere}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj operatera</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="50"
                                value={brojOperatera}
                                onChange={(e) => setBrojOperatera(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                +1 admin (1-50)
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj operatere'}
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Alert variant="warning" className="mt-3">
                <strong>Upozorenje:</strong> Ove akcije će dodati nove podatke u postojeće.
                Ako želite početi ispočetka, prvo obrišite postojeće podatke.
            </Alert>

            <hr className="my-4" />

            <h3>Brisanje podataka</h3>
            <p className="text-muted">
                Koristite ove opcije za brisanje svih podataka iz baze.
            </p>

            <Row className="mt-3">
                <Col md={3}>
                    <Button
                        variant="danger"
                        onClick={handleObrisiSmjerove}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve smjerove'}
                    </Button>
                </Col>
                <Col md={3}>
                    <Button
                        variant="danger"
                        onClick={handleObrisiPolaznike}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve polaznike'}
                    </Button>
                </Col>
                <Col md={3}>
                    <Button
                        variant="danger"
                        onClick={handleObrisiGrupe}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve grupe'}
                    </Button>
                </Col>
                <Col md={3}>
                    <Button
                        variant="danger"
                        onClick={handleObrisiOperatere}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve operatere'}
                    </Button>
                </Col>
            </Row>

            <Alert variant="danger" className="mt-3">
                <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
            </Alert>





            {DATA_SOURCE==='memorija' && (<>
             <hr className="my-4" />

            <h3>Presipavanje podataka</h3>
            <p className="text-muted">
                Koristite ove opcije za kopiranje iz jednog izvora u drugi.
            </p>

            <Row className="mt-3">
                <Col md={6}>
                    <Button
                        variant="danger"
                        onClick={handleMemorijaULocalStorage}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Presipavanje...' : 'Iz memorije u localStorage'}
                    </Button>
                </Col>
                <Col md={6}>
                            <Button
                                variant="danger"
                                onClick={handleMemorijaUFirebase}
                                disabled={loading}
                                className="w-100 mb-2"
                            >
                                {loading ? 'Pretakanje...' : 'Iz memorije u firebase'}
                            </Button>
                        </Col>
               
            </Row>
            </>)}   
          

        </Container>
    );
}