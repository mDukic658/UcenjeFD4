import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import slika from '../assets/edunova.svg'
import { IME_APLIKACIJE } from '../constants'


export default function Home(){


    return(
        <>
            <div style={{textAlign: 'center'}}>
                <img src={slika} />
            </div>

            <p className='lead m-5 text-center'>
               Dobrodošli na {IME_APLIKACIJE}
            </p>

            <div style={{maxWidth: '300px', margin: 'auto'}}>
                <DotLottieReact 
                src='/animacija.lottie'
                loop
                autoplay
                />
            </div>
        </>
    )
}