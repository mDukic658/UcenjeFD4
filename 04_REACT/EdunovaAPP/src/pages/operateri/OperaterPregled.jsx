import { useEffect, useState } from "react"
import OperaterService from "../../services/operateri/OperaterService"
import { Table, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import { FaEdit, FaTrash, FaKey } from "react-icons/fa"
import useLoading from "../../hooks/useLoading"
import useModal from "../../hooks/useModal"

export default function OperaterPregled() {

    const navigate = useNavigate()
    const [operateri, setOperateri] = useState([])
    const { showModal } = useModal()
    const { showLoading, hideLoading, postaviNaslov } = useLoading()

    useEffect(()=>{ postaviNaslov('Operateri')})

    useEffect(() => {
        ucitajOperatere()
    }, [])

    async function ucitajOperatere() {
        showLoading()
        await OperaterService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setOperateri(odgovor.data)
            hideLoading()
        })
    }

    async function brisanje(sifra) {
        showModal('Sigurno obrisati operatera?', async () => {
            showLoading()
            const rezultat = await OperaterService.obrisi(sifra)
            if (rezultat.success) {
                ucitajOperatere()
            } else {
                alert(rezultat.message || 'Greška pri brisanju')
            }
            hideLoading()
        })
    }

    return (
        <>
            <Link to={RouteNames.OPERATERI_NOVI}
                className="btn btn-success w-100 my-3">
                Dodavanje novog operatera
            </Link>

            <Table striped bordered hover responsive aria-label="Popis operatera">
                <thead>
                    <tr>
                        <th scope="col">Email</th>
                        <th scope="col">Uloga</th>
                        <th scope="col" className="text-center" style={{width: '200px'}}>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {operateri && operateri.map((operater) => (
                        <tr key={operater.sifra}>
                            <td>{operater.email}</td>
                            <td>
                                <span className={`badge ${operater.uloga === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                    {operater.uloga}
                                </span>
                            </td>
                            <td className="text-center">
                                <div className="d-flex gap-2 justify-content-center" role="group" aria-label={`Akcije za operatera ${operater.email}`}>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => navigate(`/operateri/${operater.sifra}`)}
                                        aria-label={`Uredi email operatera ${operater.email}`}
                                    >
                                        <FaEdit aria-hidden="true" />
                                    </Button>
                                    <Button
                                        variant="outline-warning"
                                        size="sm"
                                        onClick={() => navigate(`/operateri/${operater.sifra}/lozinka`)}
                                        aria-label={`Promjeni lozinku operatera ${operater.email}`}
                                    >
                                        <FaKey aria-hidden="true" />
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => brisanje(operater.sifra)}
                                        aria-label={`Obriši operatera ${operater.email}`}
                                    >
                                        <FaTrash aria-hidden="true" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
