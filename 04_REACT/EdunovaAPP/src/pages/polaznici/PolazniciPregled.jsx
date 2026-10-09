import { useEffect, useState } from "react"
import PolaznikService from "../../services/polaznici/PolaznikService"
import { Badge, Button, Table } from "react-bootstrap"
import { GrValidate } from "react-icons/gr"
import { NumericFormat } from "react-number-format"
import FormatDatuma from "../../components/FormatDatuma"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"


export default function PolaznikPregled() {

    const [polaznici, setPolaznici] = useState([])

    const navigate = useNavigate()

    async function ucitajPolaznike() {
        await PolaznikService.get().then((odgovor) => {
            console.log(JSON.stringify(odgovor.data))
            setPolaznici(odgovor.data)
        })
    }

    useEffect(() => {
        //console.log('Došao na pregled polaznikova')
        ucitajPolaznike()
    }, [])


    async function obrisi(sifra){
        if(!confirm('Sigurno obrisati?')){
            return
        }

        await PolaznikService.obrisi(sifra)
        ucitajPolaznike()
    }

    

    return (
        <>
            <Link to={RouteNames.POLAZNICI_DODAJ}
            className="btn btn-success w-100 my-3">
                Dodavanje novog polaznika
            </Link>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>OIB</th>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Email</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {polaznici && polaznici.map((polaznik) => (
                        <tr key={polaznik.sifra}>
                            <td>
                                {polaznik.oib}
                            </td>
                            <td>
                                {polaznik.ime}
                            </td>
                            <td>
                                {polaznik.prezime}
                            </td>
                            <td>
                               {polaznik.email}
                            </td>
                            
                            <td>
                                <Button onClick={()=>{navigate(`/polaznici/${polaznik.sifra}`)}}>
                                    Promjena
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={()=>obrisi(polaznik.sifra)}>
                                    Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            Ukupno &nbsp;
            <Badge pill bg="success">
                {polaznici && polaznici.length}
            </Badge>
            &nbsp; polaznika

        </>
    )
}