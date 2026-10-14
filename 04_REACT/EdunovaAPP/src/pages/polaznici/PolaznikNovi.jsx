import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import PolaznikService from "../../services/polaznici/PolaznikService";


export default function PolaznikNovi() {

    const navigate = useNavigate()

    async function dodaj(polaznik) {
        await PolaznikService.dodaj(polaznik).then(() => {
            navigate(RouteNames.POLAZNICI)
        })
    }

    function obradiSubmit(e) { // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        dodaj({
            oib: podaci.get('oib'),
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email')
        })
    }


    return (
        <>
            <h3>
                Dodavanje novog polaznika
            </h3>

            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="oib">
                    <Form.Label>OIB</Form.Label>
                    <Form.Control type="text" name="oib" required />
                </Form.Group>

                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" />
                </Form.Group>



                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.POLAZNICI}
                            className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Dodaj
                        </Button>
                    </Col>
                </Row>
            </Form>


        </>
    )
}