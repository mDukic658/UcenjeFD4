import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { IME_APLIKACIJE, RouteNames } from './constants'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SmjerPregled from './pages/smjerovi/SmjerPregled'
import SmjerNovi from './pages/smjerovi/SmjerNovi'

function App() {

  return (
    <>
      <Container>
        <Izbornik />
        <Container className='app'>
          <Routes>
            <Route path={RouteNames.HOME} element={<Home />} />
            <Route path={RouteNames.SMJEROVI} element={<SmjerPregled />} />
            <Route path={RouteNames.SMJEROVI_DODAJ} element={<SmjerNovi />} />
          </Routes>
        </Container>
        <hr />
        &copy; {IME_APLIKACIJE}
      </Container>
    </>
  )
}

export default App
