import { useEffect, useState } from "react"
import GrupaService from "../../services/grupe/GrupaService"
import SmjerService from "../../services/smjerovi/SmjerService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import { FaFilePdf } from "react-icons/fa"
import GrupaPDFGenerator from "../../components/GrupaPDFGenerator"
import PolaznikService from "../../services/polaznici/PolaznikService"


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

    useEffect(() => {
        ucitajSmjerove()
        ucitajPolaznike()
        ucitajGrupe()
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
            setTooltip(prev => ({ ...prev, x: e.pageX + 15, y: e.pageY - 100 }));
        } else {
            setTooltip(prev => ({ ...prev, x: e.pageX + 15, y: e.pageY + 15 }));
        }
    };

    const handleMouseLeave = () => {
        setTooltip(prev => ({ ...prev, vidljivo: false, podaci: [] }));
    };

    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati')) {
            return
        }
        await GrupaService.obrisi(sifra)
        ucitajGrupe()
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
                                <FaFilePdf
                                    color="#cb72dd"
                                    style={{ cursor: 'hand' }}
                                    onClick={() => generirajPDFZaGrupu(grupa)} title="Generiraj PDF" />

                                {grupa.naziv}
                                <span
                                    className="text-center"
                                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                    onMouseEnter={() => handleMouseEnter(grupa.polaznici)}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}>({grupa.polaznici.length})</span></td>
                            <td>{dohvatiNazivSmjera(grupa.smjer)}</td>
                            <td>
                                <Button onClick={() => { navigate(`/grupe/${grupa.sifra}`) }}>
                                    Promjeni
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
            {/* Prikaz popisa polaznika (Tooltip) */}
            {tooltip.vidljivo && (
                <div style={{
                    position: 'absolute',
                    top: tooltip.y,
                    left: tooltip.x,
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    padding: '15px',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    zIndex: 1000,
                    minWidth: '200px',
                    pointerEvents: 'none' // Da tooltip ne "treperi" kad miš uđe u njega
                }}>
                    <h6>Polaznici u grupi:</h6>
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