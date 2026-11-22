import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { DATA_SOURCE, IME_APLIKACIJE, RouteNames } from '../constants';
import { useNavigate } from 'react-router-dom';
import { FaMemory } from 'react-icons/fa';
import { GrServer, GrStatusUnknown, GrVirtualStorage } from 'react-icons/gr';
import useAuth from '../hooks/useAuth';
import './Izbornik.scss'
import useLoading from '../hooks/useLoading';

export default function Izbornik() {

    const navigate = useNavigate()
    const { isLoggedIn, logout, authUser } = useAuth()
    const {naslov} = useLoading()


    function izvor() {
        switch (DATA_SOURCE) {
            case 'memorija':
                return <FaMemory title='Memorija' style={{color: 'gray'}} />
            case 'localStorage':
                return <GrVirtualStorage title='Local storage' style={{color: 'gray'}} />
            case 'firebase':
                return <GrServer title='Firebase' style={{color: 'gray'}} />
            default:
                return <GrStatusUnknown title='Nepoznato' style={{color: 'gray'}} />
        }
    }


    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                {izvor()} <span style={{fontWeight: 'bold'}}>{naslov}</span>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            onClick={() => navigate(RouteNames.HOME)}
                            eventKey="pocetna"
                        >Početna</Nav.Link>

                        {isLoggedIn && (
                            <>
                                <Nav.Link
                                    onClick={() => navigate(RouteNames.NADZORNA_PLOCA)}
                                    eventKey="nadzorna-ploca"
                                >Nadzorna ploča</Nav.Link>
                                <NavDropdown title="Programi" id="basic-nav-dropdown">
                                    <NavDropdown.Item
                                        onClick={() => navigate(RouteNames.SMJEROVI)}
                                        eventKey="smjerovi"
                                    >Smjerovi</NavDropdown.Item>
                                    <NavDropdown.Item
                                        onClick={() => navigate(RouteNames.POLAZNICI)}
                                        eventKey="polaznici"
                                    >Polaznici</NavDropdown.Item>
                                    <NavDropdown.Item
                                        onClick={() => navigate(RouteNames.GRUPE)}
                                        eventKey="grupe"
                                    >Grupe</NavDropdown.Item>

                                    {authUser.uloga === 'admin' && (
                                        <>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item
                                                onClick={() => navigate(RouteNames.OPERATERI)}
                                                eventKey="operateri"
                                            >Operateri</NavDropdown.Item>
                                            <NavDropdown.Item
                                                onClick={() => navigate(RouteNames.GENERIRANJE_PODATAKA)}
                                                eventKey="generiranje-podataka"
                                            >Generiraj podatke</NavDropdown.Item>
                                        </>)}



                                </NavDropdown>
                                <Nav.Link
                                    onClick={() => { navigate(RouteNames.RASPORED) }}
                                    eventKey="raspored"
                                >Raspored</Nav.Link>
                                <Nav.Link
                                    onClick={() => navigate(RouteNames.APLIKACIJE_POLAZNIKA)}
                                    eventKey="aplikacije-polaznika"
                                >Aplikacije polaznika</Nav.Link>
                            </>)}


                    </Nav>

                    <Nav className="ms-auto">
                        <div className="btn-group">
                            {isLoggedIn ? (
                                <Nav.Link
                                    onClick={() => logout()}
                                    className='btn btn-primary'
                                    style={{ color: 'white', backgroundColor: '#0d6efd' }}
                                    eventKey="logout"
                                >Logout {authUser.email}</Nav.Link>
                            ) : (
                                <>
                                    <Nav.Link
                                        onClick={() => navigate(RouteNames.REGISTRACIJA)}
                                        className='me-2 btn btn-primary'
                                        style={{ color: 'white', backgroundColor: '#0d6efd' }}
                                        eventKey="registracija"
                                    >Registracija</Nav.Link>
                                    <Nav.Link
                                        onClick={() => navigate(RouteNames.LOGIN)}
                                        className='btn btn-primary'
                                        style={{ color: 'white', backgroundColor: '#0d6efd' }}
                                        eventKey="login"
                                    >Login</Nav.Link>
                                </>)}
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}