import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import SmjerService from "../../services/smjerovi/SmjerService";


export default function SmjerNovi() {

    const navigate = useNavigate()

    async function dodaj(smjer) {
        await SmjerService.dodaj(smjer).then(() => {
            navigate(RouteNames.SMJEROVI)
        })
    }

    function obradiSubmit(e) { // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        dodaj({
            naziv: podaci.get('naziv'),
            trajanje: parseInt(podaci.get('trajanje')),
            cijena: parseFloat(podaci.get('cijena')),
            datumPokretanja: new Date(podaci.get('datumPokretanja')).toISOString(),
            aktivan: podaci.get('aktivan') === 'on'
        })
    }


    return (
        <>

            <Form onSubmit={obradiSubmit}>
                <Container className="visinaAkcija" >
                    <Card style={{ padding: '1rem' }} className="granica">
                        <Card.Title className="lead"> Dodavanje novog smjera</Card.Title>


                        <Row>
                            <Col xs={12} className="mt-2">
                                <Form.Group controlId="naziv">
                                    <Form.Label>Naziv</Form.Label>
                                    <Form.Control type="text"
                                        name="naziv" required className="granica" />
                                </Form.Group>
                            </Col>
                            <Col xs={7} className="mt-2">
                                <Form.Group controlId="trajanje">
                                    <Form.Label>Trajanje</Form.Label>
                                    <Form.Control type="number"
                                        className="granica"
                                        style={{ textAlign: 'right' }}
                                        name="trajanje" step={1} />
                                </Form.Group>
                            </Col>
                            <Col xs={5} className="mt-2">
                                <Form.Group controlId="cijena">
                                    <Form.Label>Cijena</Form.Label>
                                    <Form.Control type="number"
                                        className="granica"
                                        style={{ textAlign: 'right' }}
                                        name="cijena" step={0.01} />
                                </Form.Group>
                            </Col>
                            <Col xs={7} className="mt-2">
                                <Form.Group controlId="datumPokretanja">
                                    <Form.Label>Datum pokretanja</Form.Label>
                                    <Form.Control type="date"
                                        className="granica"
                                        onClick={(e) => e.target.showPicker()}
                                        onFocus={(e) => e.target.showPicker()}
                                        name="datumPokretanja" />
                                </Form.Group>
                            </Col>
                            <Col xs={5}>
                                <Form.Group controlId="aktivan" className="mt-3">
                                    <Form.Label>Aktivan</Form.Label>
                                    <div class="form-check">
                                        <input id="aktivan" class="form-check-input granica" type="checkbox" name="aktivan" />
                                        
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
                                    Dodaj
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </Form>
        </>
    )
}