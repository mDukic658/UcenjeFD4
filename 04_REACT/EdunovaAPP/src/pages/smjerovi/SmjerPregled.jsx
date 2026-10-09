import { useEffect, useState } from "react"
import SmjerService from "../../services/smjerovi/SmjerService"
import { Badge, Button, Table } from "react-bootstrap"
import { GrValidate } from "react-icons/gr"
import { NumericFormat } from "react-number-format"
import FormatDatuma from "../../components/FormatDatuma"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"


export default function SmjerPregled() {

    const [smjerovi, setSmjerovi] = useState([])

    const navigate = useNavigate()

    async function ucitajSmjerove() {
        await SmjerService.get().then((odgovor) => {
            // console.table(odgovor.data)
            setSmjerovi(odgovor.data)
        })
    }

    useEffect(() => {
        //console.log('Došao na pregled smjerova')
        ucitajSmjerove()
    }, [])


    async function obrisi(sifra){
        if(!confirm('Sigurno obrisati?')){
            return
        }

        await SmjerService.obrisi(sifra)
        ucitajSmjerove()
    }

    

    return (
        <>
            <Link to={RouteNames.SMJEROVI_DODAJ}
            className="btn btn-success w-100 my-3">
                Dodavanje novog smjera
            </Link>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Trajanje</th>
                        <th>Cijena</th>
                        <th>Datum pokretanja</th>
                        <th>Aktivan</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {smjerovi && smjerovi.map((smjer) => (
                        <tr key={smjer.sifra}>
                            <td className="lead">
                                {smjer.naziv}
                            </td>
                            <td className="text-end">
                                {smjer.trajanje}
                            </td>
                            <td className="desno">
                                <NumericFormat 
                                value={smjer.cijena}
                                displayType={'text'}
                                decimalSeparator=","
                                decimalScale={2}
                                fixedDecimalScale
                                thousandSeparator='.'
                                suffix=" €"
                                />
                            </td>
                            <td style={{textAlign: 'center'}}>
                                <FormatDatuma datum={smjer.datumPokretanja} />
                            </td>
                            {/* Ovako se može jednostavno */}
                            {/* <td>{smjer.aktivan ? 'DA' : 'NE'}</td> */}

                            <td style={{textAlign: 'center'}}>
                                {/* Primjer jedne ikone s različitim svojstvima u odnosu na boolean svojstvo */}
                                <GrValidate
                                    size={25}
                                    color={smjer.aktivan ? 'green' : 'red'}
                                    title={smjer.aktivan ? 'Aktivan' : 'Neaktivan'}
                                />

                                {/* Primjer različitih ikona u odnosu na boolean svojstvo */}

                                { /*smjer.aktivan ? (
                                    <FcApproval />
                                ) : (
                                    <FcDisapprove />
                                )*/}


                            </td>
                            <td>
                                <Button onClick={()=>{navigate(`/smjerovi/${smjer.sifra}`)}}>
                                    Promjena
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={()=>obrisi(smjer.sifra)}>
                                    Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            Ukupno &nbsp;
            <Badge pill bg="success">
                {smjerovi && smjerovi.length}
            </Badge>
            &nbsp; smjerova

            {/* <pre>
                {JSON.stringify(smjerovi, null, 2)}
            </pre>  */}
        </>
    )
}