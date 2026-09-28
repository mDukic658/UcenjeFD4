import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import SmjerService from "../../services/smjerovi/SmjerService";


export default function SmjerNovi() {

    const navigate = useNavigate()

    async function dodaj(smjer){
        await SmjerService.dodaj(smjer).then(()=>{
            navigate(RouteNames.SMJEROVI)
        })
    }

    function obradiSubmit(e) {   //e je event
        e.preventDefault()  //nemoj odraditi submit
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
            <h3>
                Dodavanje novog smjera
            </h3>

            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label> Naziv </Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                <Form.Group controlId="trajanje" >
                    <Form.Label> Trajanje</Form.Label>
                    <Form.Control type="number" name="trajanje" step={1} />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label> Cijena </Form.Label>
                    <Form.Control type="number" name="cijena" step={0.01} />
                </Form.Group>

                <Form.Group controlId="datumPokretanja">
                    <Form.Label> Datum pokretanja </Form.Label>
                    <Form.Control type="date" name="datumPokretanja" />
                </Form.Group>

                <Form.Group controlId="aktivan">
                    <Form.Check label="Aktivan" name="aktivan" />
                </Form.Group>

                <hr />

                <Row>
                    <Col>
                        <Link to={RouteNames.SMJEROVI}>
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit">
                            Dodaj
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}