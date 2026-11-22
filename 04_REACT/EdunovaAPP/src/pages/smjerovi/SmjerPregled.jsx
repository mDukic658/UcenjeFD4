import { useEffect, useState } from "react"
import SmjerService from "../../services/smjerovi/SmjerService"
import { Badge} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import useBreakpoint from "../../hooks/useBreakpoint"
import SmjerPregledTablica from "./SmjerPregledTablica"
import SmjerPregledGrid from "./SmjerPregledGrid"
import GrupaService from "../../services/grupe/GrupaService"
import useLoading from "../../hooks/useLoading"
import useModal from "../../hooks/useModal"


export default function SmjerPregled() {

    const [smjerovi, setSmjerovi] = useState([])
    const { showLoading, hideLoading, postaviNaslov } = useLoading()

    useEffect(()=>{postaviNaslov('Smjerovi')})

    const navigate = useNavigate()
    const sirina = useBreakpoint();
    const { showModal } = useModal();

    async function ucitajSmjerove() {
        showLoading();
        // alternativa funkciji obrisi
        const grupeRezultat = await GrupaService.get();


        await SmjerService.get().then((odgovor) => {
           
            // alternativa funkciji obrisi
            odgovor.data.forEach(s => {
                const grupeKojeKoristeSmjer = grupeRezultat.data.filter(grupa => grupa.smjer === s.sifra);
                s.mozeSeObrisati = grupeKojeKoristeSmjer.length===0
            });
            

            setSmjerovi(odgovor.data)
            hideLoading()
        })
        
    }

    useEffect(() => {
        //console.log('Došao na pregled smjerova')
        ucitajSmjerove()
    }, [])


    async function obrisi(sifra) {
       showModal('Sigurno obrisati?', async () => {
            // Provjeri da li je smjer korišten u grupama
            const grupeRezultat = await GrupaService.get();
            const grupeKojeKoristeSmjer = grupeRezultat.data.filter(grupa => grupa.smjer == sifra);

            if (grupeKojeKoristeSmjer.length > 0) {
                showModal(`Ne možete obrisati ovaj smjer jer je postavljen na ${grupeKojeKoristeSmjer.length} grupa/e. Prvo obrišite ili promijenite smjer u tim grupama.`, async () => {})
                return;
            }

            showLoading()
            await SmjerService.obrisi(sifra);
            await SmjerService.get().then((odgovor) => {
                setSmjerovi(odgovor.data)
                hideLoading()
            })
        })
    }




    return (
        <>
            <Link to={RouteNames.SMJEROVI_DODAJ}
            className="btn btn-success w-100 my-3">
                Dodavanje novog smjera
            </Link>
             {['xs', 'sm', 'md'].includes(sirina) ? (
                        <SmjerPregledGrid
                            smjerovi={smjerovi}
                            navigate={navigate}
                            obrisi={obrisi}
                        />
                    ) : (
                        <SmjerPregledTablica
                            smjerovi={smjerovi}
                            navigate={navigate}
                            obrisi={obrisi}
                        />
                    )}
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