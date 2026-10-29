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
            "git": "https://github.com/jeloseki",
            "url": "https://edunova1.origo.hr",
            "aplikacija": "Mlin",
            "opis": "Uskoči u Mlin! Bilo da igraš opušteno ili tražiš žestoku konkurenciju, čekaju te PVE i PVP mečevi, napredovanje kroz rangove, napeti turniri i još puno, puno toga. Zaigraj odmah!"
        },
        {
            "ime": "Andreas",
            "prezime": "Sklizović",
            "git": "https://github.com/androwebgraphic",
            "url": "https://edunova4.origo.hr",
            "aplikacija": "Aukcije",
            "opis": "“Aukcije ” je aplikacija koja pomaže strastvenim kolekcionarima da mogu kupovati ili prodavati predmete. Mogu dodati, promijeniti ili obrisati određene predmete koje su postavili."
        },
        {
            "ime": "Olha",
            "prezime": "Đerek",
            "git": "https://github.com/Mameyeva-create",
            "url": "https://edunova5.origo.hr",
            "aplikacija": "Priručna kuharica",
            "opis": "Priručna kuharica donosi jednostavne i ukusne recepte za svaki dan. Otkrijte nova jela, pronađite inspiraciju za kuhanje, organizirajte omiljene recepte i pripremite ukusne obroke prema namirnicama koje imate kod kuće."
        },
        {
            "ime": "Igor",
            "prezime": "Vučko",
            "git": "https://github.com/igorvucko",
            "url": "https://edunova6.origo.hr",
            "aplikacija": "Football APP",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Tihomir",
            "prezime": "Babić",
            "git": "https://github.com/hogar88888",
            "url": "https://edunova7.origo.hr",
            "aplikacija": "DieHausers site",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Sean",
            "prezime": "Kušec",
            "git": "https://github.com/skusec",
            "url": "https://edunova8.origo.hr",
            "aplikacija": "Art Show Room",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Tomislav",
            "prezime": "Jurčević",
            "git": "https://github.com/tjurcevicos",
            "url": "https://edunova3.origo.hr",
            "aplikacija": "Virtualna garaža za motocikle",
            "opis": "Virtualna garaža za motocikle aplikacija je za vođenje evidencije vozila, servisa, goriva, troškova i podsjetnika. Omogućuje praćenje održavanja, statistike i putovanja na jednom mjestu."
        },
        {
            "ime": "Juraj",
            "prezime": "Prša",
            "git": "https://github.com/jurajprsa-ai",
            "url": "https://edunova10.origo.hr",
            "aplikacija": "Namještaj po mjeri",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Luna",
            "prezime": "Damjanić",
            "git": "https://github.com/Philpa12th",
            "url": "https://edunova9.origo.hr",
            "aplikacija": "Stripoteka",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Linda",
            "prezime": "Tukera",
            "git": "https://github.com/lindatukera-1991",
            "url": "https://edunova11.origo.hr",
            "aplikacija": "Nannyfinder",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Gorana",
            "prezime": "Agić",
            "git": "https://github.com/GoranaAgic",
            "url": "https://edunova2.origo.hr",
            "aplikacija": "Shopping lista",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Snježana",
            "prezime": "Škrinjar",
            "git": "https://github.com/snjezanaskrinjar25-debug",
            "url": "https://edunova25.origo.hr",
            "aplikacija": "Personalizirani pokloni",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Toni",
            "prezime": "Kljenak",
            "git": "https://github.com/tonikljenak91-glitch",
            "url": "https://edunova20.origo.hr",
            "aplikacija": "Hempvend manager",
            "opis": "Šaljem vam opis aplikacije Aparat. Aplikacija omogućuje evidenciju samoposlužnih aparata prema ID-u, nazivu i lokaciji aparata, te praćenje proizvoda, vrste proizvoda, proizvođača i cijene."
        },
        {
            "ime": "Vedran",
            "prezime": "Kralj",
            "git": "https://github.com/VedroRey",
            "url": "https://edunova12.origo.hr",
            "aplikacija": "NIJE DEFINIRANO",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Lucija",
            "prezime": "Bosak",
            "git": "https://github.com/Lucijabosak",
            "url": "https://edunova13.origo.hr",
            "aplikacija": "NIJE DEFINIRANO",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Everyn",
            "prezime": "Zagorec Mrđa",
            "git": "https://github.com/EverynZ",
            "url": "https://edunova15.origo.hr",
            "aplikacija": "NIJE DEFINIRANO",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Davor",
            "prezime": "Županić",
            "git": "https://github.com/davor-zupanic",
            "url": "https://edunova57.origo.hr",
            "aplikacija": "NIJE DEFINIRANO",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Ian",
            "prezime": "Farkaš",
            "git": "https://github.com/annoookkkk",
            "url": "https://edunova18.origo.hr",
            "aplikacija": "NIJE DEFINIRANO",
            "opis": "NAKNADNO"
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
            "git": "https://github.com/moritzanamaria",
            "url": "https://edunova33.origo.hr",
            "aplikacija": "PawAlert",
            "opis": "PawAlert je React aplikacija za prijavu nestalih i uočenih životinja. Interaktivna karta i pregled prijava olakšavaju dijeljenje informacija, praćenje slučajeva i pomoć životinjama u Osijeku."
        },
        {
            "ime": "Anita",
            "prezime": "Šarčević",
            "git": "https://github.com/Anita2403",
            "url": "https://edunova38.origo.hr",
            "aplikacija": "Galerija slika",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Dragan",
            "prezime": "Živković",
            "git": "https://github.com/inforemont",
            "url": "https://edunova35.origo.hr",
            "aplikacija": "Fishijada",
            "opis": "Saznajte sve o fišijadama u Baranji, regionalnim natjecanjima i ponosu regije - najvećoj fišijadi u Belom Manastiru. Aplikacija je nastala iz neizmjerne ljubavi prema fišu i našoj Baranji."
        },
        {
            "ime": "Đurđica",
            "prezime": "Habjanović",
            "git": "https://github.com/durdicahabjanovic1",
            "url": "https://edunova39.origo.hr",
            "aplikacija": "Nogomet",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Juraj",
            "prezime": "Repinac",
            "git": "https://github.com/GeorgeDemianGreen",
            "url": "https://edunova42.origo.hr",
            "aplikacija": "Mačke",
            "opis": "Ova web aplikacija namijenjena je ljubiteljima mačaka koji žele predstaviti svoje ljubimce i sudjelovati u zabavnom natjecanju za najpopularniju mačku. Aplikacija omogućuje jednostavan unos mačaka, pregled svih prijavljenih mačaka te glasanje za one koje se korisnicima najviše sviđaju."
        },
        {
            "ime": "Svebor",
            "prezime": "Kovačić",
            "git": "https://github.com/Svebor48",
            "url": "https://edunova32.origo.hr",
            "aplikacija": "Servis bicikala",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Borna",
            "prezime": "Vrandečić",
            "git": "https://github.com/bornavrandecic",
            "url": "https://edunova48.origo.hr",
            "aplikacija": "Rise and baked",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Tomislav",
            "prezime": "Ferić",
            "git": "https://github.com/tomislavg1980",
            "url": "https://edunova59.origo.hr",
            "aplikacija": "Evidencija repromaterijala",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Marko",
            "prezime": "Brodar",
            "git": "https://github.com/bsdmarko-a11y",
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
            "git": "https://github.com/dac1715",
            "url": "https://edunova34.origo.hr",
            "aplikacija": "NIJE DEFINIRANO",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Krunoslav",
            "prezime": "Pucek",
            "git": "https://github.com/bosutsko",
            "url": "https://edunova37.origo.hr",
            "aplikacija": "NIJE DEFINIRANO",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Dubravko",
            "prezime": "Papa",
            "git": "https://github.com/dpapa",
            "url": "https://edunova36.origo.hr",
            "aplikacija": "NIJE DEFINIRANO",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Kristina",
            "prezime": "Župan",
            "git": "https://github.com/kriszup",
            "url": "https://edunova41.origo.hr",
            "aplikacija": "NIJE DEFINIRANO",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Matea",
            "prezime": "Šnalcer",
            "git": "https://github.com/mateasnalcer",
            "url": "https://edunova45.origo.hr",
            "aplikacija": "NIJE DEFINIRANO",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Nikola",
            "prezime": "Perić",
            "git": "https://github.com/nperic22",
            "url": "https://edunova46.origo.hr",
            "aplikacija": "NIJE DEFINIRANO",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Matko",
            "prezime": "Mance",
            "git": "https://github.com/matkomance",
            "url": "https://edunova47.origo.hr",
            "aplikacija": "NIJE DEFINIRANO",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Borna",
            "prezime": "Wertag",
            "git": "https://github.com/Borna35",
            "url": "https://edunova49.origo.hr",
            "aplikacija": "NIJE DEFINIRANO",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Borna",
            "prezime": "Bednjički",
            "git": "https://github.com/CallMeDisco",
            "url": "https://edunova50.origo.hr",
            "aplikacija": "NIJE DEFINIRANO",
            "opis": "NAKNADNO"
        },
        {
            "ime": "Pavel",
            "prezime": "Gaža",
            "git": "NIJE_DEFINIRANO",
            "url": "https://edunova51.origo.hr",
            "aplikacija": "NIJE DEFINIRANO",
            "opis": "NAKNADNO"
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
