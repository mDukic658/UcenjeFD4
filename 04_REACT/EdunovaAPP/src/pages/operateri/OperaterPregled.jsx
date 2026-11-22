import { useEffect, useState } from "react"
import OperaterService from "../../services/operateri/OperaterService"
import { Table, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { IME_APLIKACIJE, RouteNames } from "../../constants"
import { FaEdit, FaTrash, FaKey } from "react-icons/fa"
import useLoading from "../../hooks/useLoading"
import useModal from "../../hooks/useModal"

export default function OperaterPregled() {

    const navigate = useNavigate()
    const [operateri, setOperateri] = useState([])
    const { showLoading, hideLoading, postaviNaslov } = useLoading()
    const { showModal } = useModal()

    useEffect(()=>{postaviNaslov('Operateri')})

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

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Uloga</th>
                        <th className="text-center" style={{width: '200px'}}>Akcije</th>
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
                                <div className="d-flex gap-2 justify-content-center">
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => navigate(`/operateri/${operater.sifra}`)}
                                        title="Promjeni email"
                                    >
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        variant="outline-warning"
                                        size="sm"
                                        onClick={() => navigate(`/operateri/${operater.sifra}/lozinka`)}
                                        title="Promjeni lozinku"
                                    >
                                        <FaKey />
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => brisanje(operater.sifra)}
                                        title="Obriši"
                                    >
                                        <FaTrash />
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
