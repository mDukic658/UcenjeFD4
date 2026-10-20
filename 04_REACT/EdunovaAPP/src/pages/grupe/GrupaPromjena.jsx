import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import GrupaService from "../../services/grupe/GrupaService";
import { useEffect, useState } from "react";
import SmjerService from "../../services/smjerovi/SmjerService";


export default function GrupaPromjena() {

    const navigate = useNavigate()
    const params = useParams()

    const [smjerovi, setSmjerovi] = useState([])
    const [grupa, setGrupa] = useState({})

    async function ucitajSmjerove(){
        await SmjerService.get().then((res) => {
            setSmjerovi(res.data)
        } )
    }

    async function ucitajGrupu(){
        await GrupaService.getBySifra(params.sifra).then((res)=>{
            setGrupa(res.data)
        })
    }

    useEffect(()=>{
        ucitajSmjerove()
        ucitajGrupu()
    },[])

    async function promijeni(grupa) {
        await GrupaService.promijeni(params.sifra, grupa).then(() => {
            navigate(RouteNames.GRUPE)
        })
    }

    function obradiSubmit(e) { // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        promijeni({
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
                    <Form.Control type="text" name="naziv" required 
                    defaultValue={grupa.naziv}/>
                </Form.Group>

                <Form.Group controlId="smjer">
                    <Form.Label>Smjer</Form.Label>
                    <Form.Select name="smjer" required
                    value={grupa.smjer}
                    onChange={(e)=>setGrupa({...grupa, smjer: parseInt(e.target.value)})}>
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
                            Promjeni
                        </Button>
                    </Col>
                </Row>
            </Form>


        </>
    )
}