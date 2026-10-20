import { useEffect, useState } from "react"
import GrupaService from "../../services/grupe/GrupaService"
import { Badge, Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import SmjerService from "../../services/smjerovi/SmjerService"


export default function GrupaPregled() {

    const [grupe, setGrupe] = useState([])
    const [smjerovi, setSmjerovi] = useState([])

    const navigate = useNavigate()

    async function ucitajGrupe() {
        await GrupaService.get().then((odgovor) => {
            setGrupe(odgovor.data)
        })
    }

    async function ucitajSmjerove() {
        await SmjerService.get().then((o) => {
            setSmjerovi(o.data)
        })
    }

    useEffect(() => {
        ucitajSmjerove()
        ucitajGrupe()
    }, [])


    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati?')) {
            return
        }

        await GrupaService.obrisi(sifra)
        ucitajGrupe()
    }

    function dohvatiNazivSmjera(sifraSmjera) {
        const smjer = smjerovi.find(s => s.sifra === sifraSmjera) 
        return smjer.naziv
    }

    


    return (
        <>
            <Link to={RouteNames.GRUPE_DODAJ}
                className="btn btn-success w-100 my-3">
                Dodavanje nove grupe
            </Link>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Smjer</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {grupe && grupe.map((grupa) => (
                        <tr key={grupa.sifra}>
                            <td>
                                {grupa.naziv}
                            </td>
                            <td>
                                {dohvatiNazivSmjera(grupa.smjer)}
                                </td>

                                <td>
                                    <Button onClick={() => { navigate(`/grupe/${grupa.sifra}`) }}>
                                        Promjena
                                    </Button>
                                    &nbsp;&nbsp;
                                    <Button variant="danger" onClick={() => obrisi(grupa.sifra)}>
                                        Obriši
                                    </Button>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            Ukupno grupa: &nbsp;
            <Badge pill bg="success">
                {grupe && grupe.length}
            </Badge>

        </>
    )
}