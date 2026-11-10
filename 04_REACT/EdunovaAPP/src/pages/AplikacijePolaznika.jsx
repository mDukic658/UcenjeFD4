import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import opisUskoro from '../assets/opisUskoro.png'

export default function AplikacijePolaznika() {

    const naslov = 'Pregled završnih radova '

    
    const polazniciFD3 = [
        {
            "ime": "Ivica",
            "prezime": "Jelošek",
            "git": "https://github.com/jeloseki/Mlin",
            "url": "https://edunova1.origo.hr",
            "aplikacija": "Mlin",
            "opis": "Uskoči u Mlin! Bilo da igraš opušteno ili tražiš žestoku konkurenciju, čekaju te PVE i PVP mečevi, napredovanje kroz rangove, napeti turniri i još puno, puno toga. Zaigraj odmah!"
        },
        {
            "ime": "Andreas",
            "prezime": "Sklizović",
            "git": "https://github.com/androwebgraphic/Aukcije",
            "url": "https://edunova4.origo.hr",
            "aplikacija": "Aukcije",
            "opis": "“Aukcije ” je aplikacija koja pomaže strastvenim kolekcionarima da mogu kupovati ili prodavati predmete. Mogu dodati, promijeniti ili obrisati određene predmete koje su postavili."
        },
        {
            "ime": "Olha",
            "prezime": "Đerek",
            "git": "https://github.com/Mameyeva-create/Prirucnakuharica",
            "url": "https://edunova5.origo.hr",
            "aplikacija": "Priručna kuharica",
            "opis": "Priručna kuharica donosi jednostavne i ukusne recepte za svaki dan. Otkrijte nova jela, pronađite inspiraciju za kuhanje, organizirajte omiljene recepte i pripremite ukusne obroke prema namirnicama koje imate kod kuće."
        },
        {
            "ime": "Igor",
            "prezime": "Vučko",
            "git": "https://github.com/igorvucko/FootballApp",
            "url": "https://edunova6.origo.hr",
            "aplikacija": "Football APP",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Tihomir",
            "prezime": "Babić",
            "git": "https://github.com/hogar88888/DieHausersSite",
            "url": "https://edunova7.origo.hr",
            "aplikacija": "DieHausers site",
            "opis": "Aplikacija za praćenje (prema riječima glazbenih kritičara) dugo skrivane, dobro čuvane tajne slavonske noise rock scene. DIE HAUSERS, Osijek, Hrvatska, EU, stari kontinent, sjeverna polutka…samo je nebo granica."
        },
        {
            "ime": "Sean",
            "prezime": "Kušec",
            "git": "https://github.com/skusec/ArtShowRoom",
            "url": "https://edunova8.origo.hr",
            "aplikacija": "Art Show Room",
            "opis": "Art Media Showroom je web aplikacija za pregled, organizaciju i upravljanje umjetničkim radovima, s kategorijama, podacima o djelima i jednostavnim administrativnim sučeljem."
        },
        {
            "ime": "Tomislav",
            "prezime": "Jurčević",
            "git": "https://github.com/tjurcevicos/VirtualnaGarazaZaMotocikle",
            "url": "https://edunova3.origo.hr",
            "aplikacija": "Virtualna garaža za motocikle",
            "opis": "Virtualna garaža za motocikle aplikacija je za vođenje evidencije vozila, servisa, goriva, troškova i podsjetnika. Omogućuje praćenje održavanja, statistike i putovanja na jednom mjestu."
        },
        {
            "ime": "Juraj",
            "prezime": "Prša",
            "git": "https://github.com/jurajprsa-ai/NamjestajPoMjeri",
            "url": "https://edunova10.origo.hr",
            "aplikacija": "Namještaj po mjeri",
            "opis": "App je osmišljen za odabir kuhinja po nazivu, obliku, cijeni, datumu ugradnje i dali kuhinja ima šank ili nema. Na svakoj kuhinji zasebno, može se promjeniti sve stavke u području \"Akcija - Promjeni\" isto tako svaka kuhinja u ponudi se može kompletno obrisati."
        },
        {
            "ime": "Luna",
            "prezime": "Damjanić",
            "git": "https://github.com/Philpa12th/Stripoteka",
            "url": "https://edunova9.origo.hr",
            "aplikacija": "Stripoteka",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Linda",
            "prezime": "Tukera",
            "git": "https://github.com/lindatukera-1991/Nannyfinder",
            "url": "https://edunova11.origo.hr",
            "aplikacija": "Nannyfinder",
            "opis": "Nannyfinder roditeljima olakšava pronalazak dadilja u njihovom gradu. Pregledajte profile, iskustvo, dostupnost i lokaciju te jednostavno kontaktirajte dadilju koja odgovara vašim potrebama."
        },
        {
            "ime": "Gorana",
            "prezime": "Agić",
            "git": "https://github.com/GoranaAgic/ShoppingLista",
            "url": "https://edunova2.origo.hr",
            "aplikacija": "Shopping lista",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Snježana",
            "prezime": "Škrinjar",
            "git": "https://github.com/snjezanaskrinjar25-debug/personalizirani_pokloni",
            "url": "https://edunova25.origo.hr",
            "aplikacija": "Personalizirani pokloni",
            "opis": "Personalizirani pokloni je web trgovina za personalizirane poklone. Izrađena je kao jednostranična (SPA) React aplikacija."
        },
        {
            "ime": "Toni",
            "prezime": "Kljenak",
            "git": "https://github.com/tonikljenak91-glitch/Aparat",
            "url": "https://edunova20.origo.hr",
            "aplikacija": "Hempvend manager",
            "opis": "Aplikacija omogućuje evidenciju samoposlužnih aparata prema ID-u, nazivu i lokaciji aparata, te praćenje proizvoda, vrste proizvoda, proizvođača i cijene."
        },
        {
            "ime": "Vedran",
            "prezime": "Kralj",
            "git": "https://github.com/VedroRey/Drone-Expo",
            "url": "https://edunova12.origo.hr",
            "aplikacija": "Osijek Drone Expo",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Lucija",
            "prezime": "Bosak",
            "git": "https://github.com/Lucijabosak/malablagajna",
            "url": "https://edunova13.origo.hr",
            "aplikacija": "Mala blagajna",
            "opis": "Aplikacija omogućuje dodavanje, pregled, uređivanje i brisanje artikala i prodaja. Prilikom evidentiranja prodaje automatski se ažuriraju zalihe, a aplikacija upozorava na artikle s malim zalihama i približavanje isteka roka trajanja."
        },
        {
            "ime": "Everyn",
            "prezime": "Zagorec Mrđa",
            "git": "https://github.com/EverynZ/event-management",
            "url": "https://edunova15.origo.hr",
            "aplikacija": "Event-Management.app",
            "opis": "Event-Management.app je web aplikacija za organizaciju vjenčanja, krštenja i rođendana. Izrađena je kao jednostranična (SPA) React aplikacija i namijenjena je organizatoru događaja."
        },
        {
            "ime": "Davor",
            "prezime": "Županić",
            "git": "https://github.com/davor-zupanic/LiveProdukcija",
            "url": "https://edunova57.origo.hr",
            "aplikacija": "Live produkcija",
            "opis": "Aplikacija za planiranje live prijenosa sportskih događaja i praćenje opreme. Prikazuje spremnost produkcije: je li za događaj dodijeljeno dovoljno kamera i dron, uz upozorenja o neispravnoj opremi."
        },
        {
            "ime": "Ian",
            "prezime": "Farkaš",
            "git": "https://github.com/annoookkkk/Zavrsni-zadatak---Website-portfolio",
            "url": "https://edunova18.origo.hr",
            "aplikacija": "Ian Farkaš APP",
            "opis": "Osobna portfolio web aplikacije u Reactu za prikaz radova, nagrada i biografije, s filtreiranjem po kategoriji, administracijom (CRUD) projekata i nagrada uz provjeru unosa te pohranom u localStorage."
        }
    ]



    const polazniciFD4 = [
        {
            "ime": "Marta",
            "prezime": "Ðukić",
            "git": "https://github.com/mDukic658/PlanerPutovanja",
            "url": "https://edunova31.origo.hr",
            "aplikacija": "Planer putovanja",
            "opis": "Planer Putovanja web je aplikacija za personalizirano planiranje putovanja, prilagodbu vlastitim potrebama, praćenje posjećenih država i izradu popisa za pakiranje."
        },
        {
            "ime": "Anamaria",
            "prezime": "Moritz",
            "git": "https://github.com/moritzanamaria/PawAlert",
            "url": "https://edunova33.origo.hr",
            "aplikacija": "PawAlert",
            "opis": "PawAlert je React aplikacija za prijavu nestalih i uočenih životinja. Interaktivna karta i pregled prijava olakšavaju dijeljenje informacija, praćenje slučajeva i pomoć životinjama u Osijeku."
        },
        {
            "ime": "Anita",
            "prezime": "Šarčević",
            "git": "https://github.com/Anita2403/GalerijaSlika",
            "url": "https://edunova38.origo.hr",
            "aplikacija": "Galerija slika",
            "opis": "Galerija slika je aplikacija koja vam omogućuje pogled u moj vizualni svijet. Ja sam umjetnik-amater koji kroz boje, teksture i emocije prenosi priče na platno, ali i druge medije. Svako djelo nosi jedinstvenu energiju i dio moje duše. Istražite galeriju i pronađite djelo koje rezonira s vama i vašim prostorom."
        },
        {
            "ime": "Dragan",
            "prezime": "Živković",
            "git": "https://github.com/inforemont/Fishijada",
            "url": "https://edunova35.origo.hr",
            "aplikacija": "Fishijada",
            "opis": "Saznajte sve o fišijadama u Baranji, regionalnim natjecanjima i ponosu regije - najvećoj fišijadi u Belom Manastiru. Aplikacija je nastala iz neizmjerne ljubavi prema fišu i našoj Baranji."
        },
        {
            "ime": "Đurđica",
            "prezime": "Habjanović",
            "git": "https://github.com/durdicahabjanovic1/Nogomet",
            "url": "https://edunova39.origo.hr",
            "aplikacija": "Nogomet",
            "opis": "Nogometna aplikacija nudi vođenje nogometne lige, evidenciju klubova i bazu igrača uz filtriranje i brzu pretragu. Sučelje je responzivno, a podaci su osigurani kroz lokalnu pohranu. Aplikacija je izrađena u Reactu. "
        },
        {
            "ime": "Juraj",
            "prezime": "Repinac",
            "git": "https://github.com/GeorgeDemianGreen/Macke",
            "url": "https://edunova42.origo.hr",
            "aplikacija": "Mačke",
            "opis": "Ova web aplikacija namijenjena je ljubiteljima mačaka koji žele predstaviti svoje ljubimce i sudjelovati u zabavnom natjecanju za najpopularniju mačku. Aplikacija omogućuje jednostavan unos mačaka, pregled svih prijavljenih mačaka te glasanje za one koje se korisnicima najviše sviđaju."
        },
        {
            "ime": "Svebor",
            "prezime": "Kovačić",
            "git": "https://github.com/Svebor48/ServisBicikala",
            "url": "https://edunova32.origo.hr",
            "aplikacija": "Servis bicikala",
            "opis": "Servis Bicikala je web aplikacija za evidenciju klijenata i radnih naloga u biciklističkom servisu. Omogućuje unos i uređivanje podataka, praćenje popravaka, cijena te statusa izvršenih servisa."
        },
        {
            "ime": "Borna",
            "prezime": "Vrandečić",
            "git": "https://github.com/bornavrandecic/LegosApartmani",
            "url": "https://edunova48.origo.hr",
            "aplikacija": "Legos Apartmani",
            "opis": "Legos Apartmani je React aplikacija za iznajmljivače apartmana i goste. Jednostavno upravljanje rezervacijama, pregled ponude i brza komunikacija omogućuju vođenje smještaja i pronalazak idealnog apartmana."
        },
        {
            "ime": "Tomislav",
            "prezime": "Ferić",
            "git": "https://github.com/tomislavg1980/EvidencijaRepromaterijala",
            "url": "https://edunova59.origo.hr",
            "aplikacija": "Evidencija repromaterijala",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Marko",
            "prezime": "Brodar",
            "git": "https://github.com/bsdmarko-a11y/TCCCTrainer",
            "url": "https://edunova43.origo.hr",
            "aplikacija": "TCCCTrainer",
            "opis": "TCCC Trainer je mobilna aplikacija za učenje taktičkog zbrinjavanja ranjenika: MARCH vodič, kvizovi, scenariji iz prakse, mjerač vremena postavljanje Podveske, kartica ranjenika i praćenje napretka."
        },
        {
            "ime": "Mario",
            "prezime": "Dunić",
            "git": "https://github.com/mdunic-dev",
            "url": "https://edunova30.origo.hr",
            "aplikacija": "NIJE DEFINIRANO",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Davor",
            "prezime": "Mlinarević",
            "git": "https://github.com/dac1715/PC-Gaming-Centar",
            "url": "https://edunova34.origo.hr",
            "aplikacija": "Gaming centar",
            "opis": "Web aplikacija za upravljanje Gaming Centrom koja sadrži funkcionalnosti: evidencija stanica (računala i konzola), korisnika, zauzetosti stanica te pregled dostupnih igara."
        },
        {
            "ime": "Krunoslav",
            "prezime": "Pucek",
            "git": "https://github.com/bosutsko",
            "url": "https://edunova37.origo.hr",
            "aplikacija": "Nekretnine Online",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Dubravko",
            "prezime": "Papa",
            "git": "https://github.com/dpapa",
            "url": "https://edunova36.origo.hr",
            "aplikacija": "NoWire Osijek",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Kristina",
            "prezime": "Župan",
            "git": "https://github.com/kriszup/rukomet",
            "url": "https://edunova41.origo.hr",
            "aplikacija": "Rukomet: ekipe i turniri",
            "opis": "Rukomet: ekipe i turniri je web aplikacija za evidenciju rukometnih ekipa, njihovih igrača te turnira na kojima su ekipe nastupile."
        },
        {
            "ime": "Matea",
            "prezime": "Šnalcer",
            "git": "https://github.com/mateasnalcer/Task-Manager",
            "url": "https://edunova45.origo.hr",
            "aplikacija": "Smjene i zadaci",
            "opis": "Smjene i zadaci je web aplikacija za evidenciju radnih smjena i zadataka koji se obavljaju tijekom pojedine smjene."
        },
        {
            "ime": "Nikola",
            "prezime": "Perić",
            "git": "https://github.com/nperic22/apartmanija",
            "url": "https://edunova46.origo.hr",
            "aplikacija": "Rezervacije apartmana",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Matko",
            "prezime": "Mance",
            "git": "https://github.com/matkomance/Naplata-parkiranja-osijek",
            "url": "https://edunova47.origo.hr",
            "aplikacija": "Naplata parkiranja Osijek",
            "opis": "Naplata parkiranja Osijek je web aplikacija za evidenciju naplate parkiranja. Namijenjena je djelatniku koji evidentira naplate, vodi popis vozila i parkirnih zona te provodi provjeru istog."
        },
        {
            "ime": "Borna",
            "prezime": "Wertag",
            "git": "https://github.com/Borna35/RK-Osijek",
            "url": "https://edunova49.origo.hr",
            "aplikacija": "Rukometni klub Osijek",
            "opis": "Rukometni klub Osijek je web aplikacija za evidenciju djelatnika rukometnog kluba (treneri, fizioterapeuti, liječnici i ostalo osoblje) i njihovih aktivnosti."
        },
        {
            "ime": "Borna",
            "prezime": "Bednjički",
            "git": "https://github.com/CallMeDisco",
            "url": "https://edunova50.origo.hr",
            "aplikacija": "Praćenje projekata i zadataka",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Pavel",
            "prezime": "Gaža",
            "git": "https://github.com/pavelgaza-cpu/Nalog-Materijal",
            "url": "https://edunova51.origo.hr",
            "aplikacija": "Nalog-Materijal Gredelj",
            "opis": "Aplikacija omogućuje evidenciju radnih naloga i praćenje utroška materijala u proizvodnji. Nudi pregled statusa, rokova, unos i uređivanje podataka te kontrolu ispravnosti unosa."
        }
    ]

    const ProjektCard = ({ p }) => (
        <Col>
            <Card className="h-100 shadow-sm" style={{ transition: 'transform 0.2s', borderRadius: '12px', border: '2px dotted gray' }}>
                <Card.Body className="d-flex flex-column">
                    <div className="mb-2">
                        <Badge bg="secondary" pill className="fw-normal">
                            {p.prezime} {p.ime}
                        </Badge>
                    </div>
                    <Card.Title className="flex-grow-1 fw-bold mb-3 mt-2" style={{ fontSize: '1.1rem' }}>
                        {p.aplikacija}
                    </Card.Title>
                    <object data={p.url} type="text/html" style={{ border: '2px solid black' }}></object>
                    <div className="d-flex gap-2 border-top pt-3">
                        <Button
                            variant="outline-dark"
                            size="sm"
                            href={p.git}
                            target="_blank"
                            className="w-100 d-flex align-items-center justify-content-center"
                        >
                            <FaGithub className="me-2" /> GitHub
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            href={p.url}
                            target="_blank"
                            className="w-100 d-flex align-items-center justify-content-center"
                        >
                            <FaGlobe className="me-2" /> Live
                        </Button>
                    </div>
                    <hr />
                    {p.opis === 'NAKNADNO' ? (
                        <img src={opisUskoro} alt="Opis uskoro" />
                    ) : (
                    <p style={{textAlign: 'justify', fontSize: '0.8rem', height: '133px'}}>
                        {p.opis}
                    </p>
                    )}
                    
                    
                </Card.Body>
            </Card>
        </Col>
    );


    return (
        <Container className="py-1" style={{ backgroundColor: '#fcfcfc' }}>

            <Tabs
                defaultActiveKey="FD4"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="FD3"  title={naslov + 'FD3'}>
                    <Row xs={1} sm={2} lg={3} xl={4} className="g-4 mb-5">
                        {polazniciFD3.map((p, index) => (
                            <ProjektCard key={`fd3-${index}`} p={p} />
                        ))}
                    </Row>
                </Tab>
                <Tab eventKey="FD4" title={naslov + 'FD4'}>
                    <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
                        {polazniciFD4.map((p, index) => (
                            <ProjektCard key={`fd4-${index}`} p={p} />
                        ))}
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    );
}
