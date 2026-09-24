import { useEffect, useState } from "react"
import SmjerService from "../../services/smjerovi/SmjerService"
import { Badge, Table } from "react-bootstrap"
import { GrValidate } from "react-icons/gr"
import { FcApproval, FcDisapprove } from "react-icons/fc"


export default function SmjerPregled() {

    const [smjerovi, setSmjerovi] = useState([])

    async function ucitajSmjerove() {
        await SmjerService.get().then((odgovor) => {
            // console.table(odgovor.data)
            setSmjerovi(odgovor.data)
        })
    }

    useEffect(() => {
        console.log('Došao na pregled smjerova')
        ucitajSmjerove()
    }, [])

    

    return (
        <>

            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Trajanje</th>
                        <th>Cijena</th>
                        <th>Datum pokretanja</th>
                        <th>Aktivan</th>
                    </tr>
                </thead>
                <tbody>
                    {smjerovi && smjerovi.map((smjer) => (
                        <tr key={smjer.sifra}>
                            <td>{smjer.naziv}</td>
                            <td>{smjer.trajanje}</td>
                            <td>{smjer.cijena}</td>
                            <td>{smjer.datumPokretanja}</td>
                            {/* Ovako se može jednostavno */}
                            {/* <td>{smjer.aktivan ? 'DA' : 'NE'}</td> */}

                            <td>
                                {/* Primjer jedne ikone s različitim svojstvima u odnosu na boolean svojstvo */}
                                <GrValidate
                                    size={25}
                                    color={smjer.aktivan ? 'green' : 'red'}
                                    title={smjer.aktivan ? 'Aktivan' : 'Neaktivan'}
                                />

                                {/* Primjer različitih ikona u odnosu na boolean svojstvo */}
                                {smjer.aktivan ? (
                                    <FcApproval />
                                ) : (
                                    <FcDisapprove />
                                )}


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