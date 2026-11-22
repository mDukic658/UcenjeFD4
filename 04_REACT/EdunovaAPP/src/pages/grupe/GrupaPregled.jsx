import { useEffect, useState } from "react"
import GrupaService from "../../services/grupe/GrupaService"
import SmjerService from "../../services/smjerovi/SmjerService"
import { Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import { FaEdit, FaFilePdf, FaTrash } from "react-icons/fa"
import GrupaPDFGenerator from "../../components/GrupaPDFGenerator"
import PolaznikService from "../../services/polaznici/PolaznikService"
import useLoading from "../../hooks/useLoading"
import useModal from "../../hooks/useModal"


export default function GrupaPregled() {

    const [grupe, setGrupe] = useState([])
    const [smjerovi, setSmjerovi] = useState([])
    const [sviPolaznici, setSviPolaznici] = useState([])
    const [tooltip, setTooltip] = useState({
        vidljivo: false,
        x: 0,
        y: 0,
        podaci: []
    })
    const navigate = useNavigate()
    const { showLoading, hideLoading, postaviNaslov } = useLoading()
    const { showModal } = useModal()

    useEffect(()=>{ postaviNaslov('Grupe')})

    useEffect(() => {
        showLoading()
        ucitajSmjerove()
        ucitajPolaznike()
        ucitajGrupe()
        hideLoading()
    }, [])

    async function ucitajGrupe() {
        await GrupaService.get().then((odgovor) => {
            // console.log(JSON.stringify(odgovor.data))
            setGrupe(odgovor.data)
        })
    }

    async function ucitajPolaznike() {
        await PolaznikService.get().then((odgovor) => {
            setSviPolaznici(odgovor.data)
        })
    }

    async function ucitajSmjerove() {
        await SmjerService.get().then((odgovor) => {
            // console.log(JSON.stringify(odgovor.data))
            setSmjerovi(odgovor.data)
        })
    }

    // --- LOGIKA ZA TOOLTIP ---
    const handleMouseEnter = (sifrePolaznikaUGrupi) => {
        if (!sifrePolaznikaUGrupi || sifrePolaznikaUGrupi.length === 0) return;

        // Filtriraj objekte polaznika na temelju šifri iz grupe
        const filtrirani = sviPolaznici.filter(p => sifrePolaznikaUGrupi.includes(p.sifra));

        setTooltip(prev => ({ ...prev, vidljivo: true, podaci: filtrirani }));
    };

    const handleMouseMove = (e) => {
        // Pomicanje tooltipa 15px desno i dolje od miša da ne smeta kursoru
        //console.log(e.pageY)
        if (e.pageY > 250) {
            setTooltip(prev => ({ ...prev, x: e.pageX + 15, y: e.pageY - 200 }));
        } else {
            setTooltip(prev => ({ ...prev, x: e.pageX + 15, y: e.pageY + 15 }));
        }
    };

    const handleMouseLeave = () => {
        setTooltip(prev => ({ ...prev, vidljivo: false, podaci: [] }));
    };

    async function obrisi(sifra) {
        showModal('Sigurno obrisati?', async () => {
            showLoading()
            await GrupaService.obrisi(sifra)
            ucitajGrupe()
            hideLoading()
        })
    }

    function dohvatiNazivSmjera(sifraSmjera) {
        const smjer = smjerovi.find(s => s.sifra === sifraSmjera)
        return smjer?.naziv
    }


    async function generirajPDFZaGrupu(grupa) {
        // Dohvati smjer
        const smjer = smjerovi.find(s => s.sifra === grupa.smjer)
        if (!smjer) {
            alert('Smjer nije pronađen')
            return
        }

        // Dohvati sve polaznike
        const odgovorPolaznici = await PolaznikService.get()

        // Filtriraj polaznike koji pripadaju ovoj grupi
        const polazniciGrupe = odgovorPolaznici.data.filter(p =>
            grupa.polaznici && grupa.polaznici.includes(p.sifra)
        )

        // Generiraj PDF
        const generiraj = GrupaPDFGenerator({
            grupa,
            smjer,
            polaznici: polazniciGrupe
        })
        await generiraj()
    }


    return (
        <>
            <Link to={RouteNames.GRUPE_NOVI}
                className="btn btn-success w-100 my-3">
                Dodavanje nove grupe
            </Link>
            <Table hover striped bordered aria-label="Popis nastavnih grupa">
                <thead>
                    <tr>
                        <th scope="col" style={{ width: '65%' }}>Naziv</th>
                        <th scope="col" style={{ width: '35%' }}>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {grupe && grupe.map((grupa) => (
                        <tr key={grupa.sifra}>
                            <td>
                                <span style={{ fontWeight: 'bold' }}>{grupa.naziv}</span> &nbsp;
                                <button
                                    type="button"
                                    className="btn btn-link p-0 text-decoration-none text-dark"
                                    aria-label={`Prikaži polaznike grupe ${grupa.naziv}, ukupno ${grupa.polaznici.length}`}
                                    aria-expanded={tooltip.vidljivo}
                                    onMouseEnter={() => handleMouseEnter(grupa.polaznici)}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    onFocus={() => handleMouseEnter(grupa.polaznici)}
                                    onBlur={handleMouseLeave}
                                >
                                    ({grupa.polaznici.length})
                                </button>,&nbsp;
                                {dohvatiNazivSmjera(grupa.smjer)}
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-link p-0 me-2"
                                    onClick={() => generirajPDFZaGrupu(grupa)}
                                    aria-label={`Generiraj PDF za grupu ${grupa.naziv}`}
                                    style={{ color: '#cb72dd' }}
                                >
                                    <FaFilePdf aria-hidden="true" style={{ fontSize: '1.7rem' }} />
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-link p-0 me-2"
                                    onClick={() => navigate(`/grupe/${grupa.sifra}`)}
                                    aria-label={`Uredi grupu ${grupa.naziv}`}
                                    style={{ color: 'green' }}
                                >
                                    <FaEdit aria-hidden="true" style={{ fontSize: '1.7rem' }} />
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-link p-0"
                                    onClick={() => obrisi(grupa.sifra)}
                                    aria-label={`Obriši grupu ${grupa.naziv}`}
                                    style={{ color: 'red' }}
                                >
                                    <FaTrash aria-hidden="true" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Prikaz popisa polaznika (Tooltip) */}
            {tooltip.vidljivo && (
                <div
                    role="tooltip"
                    aria-live="polite"
                    style={{
                        position: 'absolute',
                        top: tooltip.y,
                        left: tooltip.x,
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        padding: '10px',
                        borderRadius: '5px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        zIndex: 1000,
                        minWidth: '200px',
                        pointerEvents: 'none'
                    }}>
                    <p className="fw-bold mb-1">Polaznici u grupi:</p>
                    <ol style={{ margin: 0, paddingLeft: '20px' }}>
                        {tooltip.podaci.map(p => (
                            <li key={p.sifra}>{p.ime} {p.prezime}</li>
                        ))}
                    </ol>
                </div>
            )}
        </>
    )
}