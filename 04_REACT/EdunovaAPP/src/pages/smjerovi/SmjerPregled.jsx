import { useEffect, useState } from "react"
import SmjerService from "../../services/smjerovi/SmjerService"


export default function SmjerPregled(){

    const [smjerovi, setSmjerovi] = useState([])

    useEffect(()=>{
        console.log('Došao na pregled smjerova')
        ucitajSmjerove()
    },[])

    async function ucitajSmjerove(){
        await SmjerService.get().then((odgovor)=>{
           // console.table(odgovor.data)
           setSmjerovi(odgovor.data)
        })
    }

    return(
        <>
            Ovdje dođe pregled smjerova
            <hr />
            <pre>
                {JSON.stringify(smjerovi, null, 2)}
            </pre> 
        </>
    )
}