import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import GrupaService from "../../services/grupe/GrupaService";
import { useEffect, useState } from "react";
import SmjerService from "../../services/smjerovi/SmjerService";


export default function GrupaNovi() {

    const navigate = useNavigate()

    const [smjerovi, setSmjerovi] = useState([])

    async function ucitajSmjerove(){
        await SmjerService.get().then((res) => {
            setSmjerovi(res.data)
        } )
    }

    useEffect(()=>{
        ucitajSmjerove()
    },[])

    async function dodaj(grupa) {
        await GrupaService.dodaj(grupa).then(() => {
            navigate(RouteNames.GRUPE)
        })
    }

    function obradiSubmit(e) { // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        dodaj({
            naziv: podaci.get('naziv'),
            smjer: parseInt(podaci.get('smjer'))
        })
    }


    return (
        <>
            <h3>
                Dodavanje nove grupe
            </h3>

            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                <Form.Group controlId="smjer">
                    <Form.Label>Smjer</Form.Label>
                    <Form.Select name="smjer" required>
                        <option value="" key={0}>Obavezan odabir smjera</option>
                        {smjerovi && smjerovi.map((s)=>(
                             <option value={s.sifra} key={s.sifra}>
                                {s.naziv} 
                             </option>
                        ))}
                    </Form.Select>
                </Form.Group>

        



                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.GRUPE}
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