import { useEffect, useState } from "react"
import PolaznikService from "../../services/polaznici/PolaznikService"
import { Row, Col, Card, Button, Pagination, InputGroup, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa"
import useBreakpoint from "../../hooks/useBreakpoint"
import useLoading from "../../hooks/useLoading"
import useModal from "../../hooks/useModal"

export default function PolaznikPregled() {

    const navigate = useNavigate()

    const [polaznici, postaviPolaznike] = useState([])
    const [trenutnaStranica, postaviTrenutnuStranicu] = useState(1)
    const [ukupnoStranica, postaviUkupnoStranica] = useState(0)
    const [ukupnoStavki, postaviUkupnoStavki] = useState(0)
    const [uvjetPretrazivanja, setUvjetPretrazivanja] = useState('')
    const velicinaStranice = 8
    const sirina = useBreakpoint();
    const { showLoading, hideLoading, postaviNaslov } = useLoading()
    const { showModal } = useModal()

    useEffect(()=>{ postaviNaslov('Polaznici')})

    useEffect(() => {

        ucitajPolaznike(trenutnaStranica, velicinaStranice, uvjetPretrazivanja)
    }, [trenutnaStranica, uvjetPretrazivanja])

    async function ucitajPolaznike(stranica) {
        showLoading()
        await PolaznikService.dohvatiStranicu(stranica, velicinaStranice, uvjetPretrazivanja).then((odgovor) => {
            postaviPolaznike(odgovor.data)
            postaviUkupnoStranica(odgovor.ukupnoStranica)
            postaviUkupnoStavki(odgovor.ukupnoStavki)
            hideLoading()
        })
    }

    async function brisanje(sifra) {
        showModal('Sigurno obrisati polaznika?', async () => {
            showLoading()
            await PolaznikService.obrisi(sifra);

            const noveUkupneStavke = ukupnoStavki - 1;
            const noveUkupneStranice = Math.ceil(noveUkupneStavke / velicinaStranice);

            if (trenutnaStranica > noveUkupneStranice && noveUkupneStranice > 0) {
                postaviTrenutnuStranicu(noveUkupneStranice);
            } else {
                ucitajPolaznike(trenutnaStranica);
            }
            hideLoading()
        })
    }

    function promijeniStranicu(stranica) {
        postaviTrenutnuStranicu(stranica)
    }

    function promjeniUvjetPretrazivanja(e) {
        setUvjetPretrazivanja(e.target.value)
        postaviTrenutnuStranicu(1)
    }

    return (
        <>
            <Link to={RouteNames.POLAZNICI_NOVI}
                className="btn btn-success w-100 my-3">
                Dodavanje novog polaznika
            </Link>

            <InputGroup className="mb-3" role="search">
                <InputGroup.Text aria-hidden="true">
                    <FaSearch aria-hidden="true" />
                </InputGroup.Text>
                <Form.Control
                    type="search"
                    placeholder="Pretraži polaznike (ime, prezime, email, OIB)..."
                    value={uvjetPretrazivanja}
                    onChange={promjeniUvjetPretrazivanja}
                    aria-label="Pretraži polaznike po imenu, prezimenu, emailu ili OIB-u"
                />
            </InputGroup>



            {['xs'].includes(sirina) && ukupnoStranica > 1 && (
                <div className="d-flex justify-content-center">
                    <Pagination aria-label="Navigacija stranicama">
                        <Pagination.First
                            onClick={() => promijeniStranicu(1)}
                            disabled={trenutnaStranica === 1}
                        />
                        <Pagination.Prev
                            onClick={() => promijeniStranicu(trenutnaStranica - 1)}
                            disabled={trenutnaStranica === 1}
                        />

                        {[...Array(ukupnoStranica)].map((_, indeks) => {
                            const brojStranice = indeks + 1;
                            if (
                                brojStranice === 1 ||
                                brojStranice === ukupnoStranica ||
                                (brojStranice >= trenutnaStranica - 2 && brojStranice <= trenutnaStranica + 2)
                            ) {
                                return (
                                    <Pagination.Item
                                        key={brojStranice}
                                        active={brojStranice === trenutnaStranica}
                                        onClick={() => promijeniStranicu(brojStranice)}
                                    >
                                        {brojStranice}
                                    </Pagination.Item>
                                );
                            } else if (
                                brojStranice === trenutnaStranica - 3 ||
                                brojStranice === trenutnaStranica + 3
                            ) {
                                return <Pagination.Ellipsis key={brojStranice} disabled />;
                            }
                            return null;
                        })}

                        <Pagination.Next
                            onClick={() => promijeniStranicu(trenutnaStranica + 1)}
                            disabled={trenutnaStranica === ukupnoStranica}
                            aria-label="Sljedeća stranica"
                        />
                        <Pagination.Last
                            onClick={() => promijeniStranicu(ukupnoStranica)}
                            disabled={trenutnaStranica === ukupnoStranica}
                            aria-label="Zadnja stranica"
                        />
                    </Pagination>
                </div>
            )}




            <Row>
                {polaznici && polaznici.map((polaznik) => (
                    <Col key={polaznik.sifra} xs={12} sm={6} lg={4} xl={3} className="mb-4">
                        <Card className="shadow-sm h-100 border-0">
                            <div style={{ height: "200px", overflow: "hidden" }}>
                                <Card.Img
                                    variant="top"
                                    src={polaznik.slika}
                                    alt={`Fotografija polaznika ${polaznik.ime} ${polaznik.prezime}`}
                                    style={{
                                        objectFit: "cover",
                                        height: "100%",
                                        width: "100%"
                                    }}
                                />
                            </div>

                            <Card.Body className="d-flex flex-column">
                                <Card.Title>
                                    {polaznik.ime} {polaznik.prezime} <span style={{ fontSize: '0.5rem' }} title="OIB" className="fw-semibold text-dark">({polaznik.oib})</span>
                                </Card.Title>

                                <Card.Text className="text-muted small mb-3">
                                    <i className="bi bi-envelope"></i> {polaznik.email} <br />
                                </Card.Text>

                                <div className="mt-auto d-flex gap-2">
                                    <Button
                                        variant="outline-primary"
                                        className="flex-fill"
                                        onClick={() => navigate(`/polaznici/${polaznik.sifra}`)}
                                        aria-label={`Uredi polaznika ${polaznik.ime} ${polaznik.prezime}`}
                                    >
                                        <FaEdit aria-hidden="true" />
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => brisanje(polaznik.sifra)}
                                        aria-label={`Obriši polaznika ${polaznik.ime} ${polaznik.prezime}`}
                                    >
                                        <FaTrash aria-hidden="true" />
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {ukupnoStranica > 1 && (
                <div className="d-flex justify-content-center">
                    <Pagination aria-label="Navigacija stranicama">
                        <Pagination.First
                            onClick={() => promijeniStranicu(1)}
                            disabled={trenutnaStranica === 1}
                            aria-label="Prva stranica"
                        />
                        <Pagination.Prev
                            onClick={() => promijeniStranicu(trenutnaStranica - 1)}
                            disabled={trenutnaStranica === 1}
                            aria-label="Prethodna stranica"
                        />

                        {[...Array(ukupnoStranica)].map((_, indeks) => {
                            const brojStranice = indeks + 1;
                            if (
                                brojStranice === 1 ||
                                brojStranice === ukupnoStranica ||
                                (brojStranice >= trenutnaStranica - 2 && brojStranice <= trenutnaStranica + 2)
                            ) {
                                return (
                                    <Pagination.Item
                                        key={brojStranice}
                                        active={brojStranice === trenutnaStranica}
                                        onClick={() => promijeniStranicu(brojStranice)}
                                    >
                                        {brojStranice}
                                    </Pagination.Item>
                                );
                            } else if (
                                brojStranice === trenutnaStranica - 3 ||
                                brojStranice === trenutnaStranica + 3
                            ) {
                                return <Pagination.Ellipsis key={brojStranice} disabled />;
                            }
                            return null;
                        })}

                        <Pagination.Next
                            onClick={() => promijeniStranicu(trenutnaStranica + 1)}
                            disabled={trenutnaStranica === ukupnoStranica}
                        />
                        <Pagination.Last
                            onClick={() => promijeniStranicu(ukupnoStranica)}
                            disabled={trenutnaStranica === ukupnoStranica}
                        />
                    </Pagination>
                </div>
            )}
        </>
    )
}