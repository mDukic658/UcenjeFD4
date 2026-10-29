import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { IME_APLIKACIJE, RouteNames } from './constants'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SmjerPregled from './pages/smjerovi/SmjerPregled'
import SmjerNovi from './pages/smjerovi/SmjerNovi'
import Raspored from './pages/raspored/Raspored'
import SmjerPromjena from './pages/smjerovi/SmjerPromjena'
import PolaznikPregled from './pages/polaznici/PolaznikPregled'
import PolaznikNovi from './pages/polaznici/PolaznikNovi'
import PolaznikPromjena from './pages/polaznici/PolaznikPromjena'
import GrupaPregled from './pages/grupe/GrupaPregled'
import GrupaNovi from './pages/grupe/GrupaNovi'
import GrupaPromjena from './pages/grupe/Grupapromjena'
import GeneriranjePodataka from './pages/GeneriranjePodataka'
import AplikacijePolaznika from './pages/AplikacijePolaznika'

function App() {

  return (
    <>
      <Container>
        <Izbornik />
        <Container className='app'>
          <Routes>
            <Route path={RouteNames.HOME} element={<Home />} />
            <Route path={RouteNames.RASPORED} element={<Raspored />} />

            <Route path={RouteNames.SMJEROVI} element={<SmjerPregled />} />
            <Route path={RouteNames.SMJEROVI_DODAJ} element={<SmjerNovi />} />
            <Route path={RouteNames.SMJEROVI_PROMJENA} element={<SmjerPromjena />} />

            <Route path={RouteNames.POLAZNICI} element={<PolaznikPregled />} />
            <Route path={RouteNames.POLAZNICI_DODAJ} element={<PolaznikNovi />} />
            <Route path={RouteNames.POLAZNICI_PROMJENA} element={<PolaznikPromjena />} />

            <Route path={RouteNames.GRUPE} element={<GrupaPregled />} />
            <Route path={RouteNames.GRUPE_DODAJ} element={<GrupaNovi />} />
            <Route path={RouteNames.GRUPE_PROMJENA} element={<GrupaPromjena />} />

            <Route path={RouteNames.GENERIRANJE_PODATAKA} element={<GeneriranjePodataka />} />

            <Route path={RouteNames.APLIKACIJE_POLAZNIKA} element={<AplikacijePolaznika />} />

          </Routes>
        </Container>
        <hr />
        &copy; {IME_APLIKACIJE}
      </Container>
    </>
  )
}

export default App
