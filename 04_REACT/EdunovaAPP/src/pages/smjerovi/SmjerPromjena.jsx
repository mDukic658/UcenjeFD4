import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import SmjerService from "../../services/smjerovi/SmjerService";
import { useEffect, useState } from "react";


export default function SmjerPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [smjer, setSmjer] = useState({})
    const [aktivan, setAktivan] = useState(false)

    async function ucitajSmjer() {
        await SmjerService.getBySifra(params.sifra).then((odgovor) => {
            const s = odgovor.data
            s.datumPokretanja = s.datumPokretanja.substring(0, 10)
            setSmjer(s)
            setAktivan(s.aktivan)
        })
    }

    useEffect(() => {
        ucitajSmjer()
    }, [])

    async function promijeni(smjer) {
        await SmjerService.promijeni(params.sifra, smjer).then(() => {
            navigate(RouteNames.SMJEROVI)
        })
    }

    function obradiSubmit(e) { // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        promijeni({
            naziv: podaci.get('naziv'),
            trajanje: parseInt(podaci.get('trajanje')),
            cijena: parseFloat(podaci.get('cijena')),
            datumPokretanja: new Date(podaci.get('datumPokretanja')).toISOString(),
            aktivan: aktivan
        })
    }


    return (
        <>
            <Form onSubmit={obradiSubmit}>
                <Container className="visinaAkcija" >
                    <Card style={{ padding: '1rem' }} className="granica">
                        <Card.Title className="lead">Promjena smjera</Card.Title>
                        <Row>
                            <Col xs={12} className="mt-2">
                                <Form.Group controlId="naziv">
                                    <Form.Label>Naziv</Form.Label>
                                    <Form.Control type="text"
                                        name="naziv" required className="granica"
                                        defaultValue={smjer.naziv} />
                                </Form.Group>
                            </Col>
                            <Col xs={7} className="mt-2">
                                <Form.Group controlId="trajanje">
                                    <Form.Label>Trajanje</Form.Label>
                                    <Form.Control type="number"
                                        className="granica"
                                        style={{ textAlign: 'right' }}
                                        name="trajanje" step={1}
                                        defaultValue={smjer.trajanje} />
                                </Form.Group>
                            </Col>
                            <Col xs={5} className="mt-2">
                                <Form.Group controlId="cijena">
                                    <Form.Label>Cijena</Form.Label>
                                    <Form.Control type="number"
                                        className="granica"
                                        style={{ textAlign: 'right' }}
                                        name="cijena" step={0.01}
                                        defaultValue={smjer.cijena} />
                                </Form.Group>
                            </Col>
                            <Col xs={7} className="mt-2">
                                <Form.Group controlId="datumPokretanja">
                                    <Form.Label>Datum pokretanja</Form.Label>
                                    <Form.Control type="date"
                                        className="granica"
                                        onClick={(e) => e.target.showPicker()}
                                        onFocus={(e) => e.target.showPicker()}
                                        name="datumPokretanja"
                                        defaultValue={smjer.datumPokretanja} />
                                </Form.Group>
                            </Col>
                            <Col xs={5}>
                                <Form.Group controlId="aktivan" className="mt-3">
                                    <Form.Label>Aktivan</Form.Label>
                                    <div class="form-check">
                                        <input id="aktivan"
                                            class="form-check-input granica"
                                            type="checkbox" name="aktivan"
                                            checked={aktivan}
                                            onChange={(e) => { setAktivan(e.target.checked) }} />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col xs={6} className="visinaAkcija">
                                <Link to={RouteNames.SMJEROVI}
                                    className="btn btn-danger granica">
                                    Odustani
                                </Link>
                            </Col>
                            <Col xs={6} className="visinaAkcija" style={{ textAlign: 'right' }}>
                                <Button type="submit" variant="success" className="granica">
                                    Promjenio
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </Form>


        </>
    )
}