import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { DATA_SOURCE, RouteNames } from '../constants';
import { useNavigate } from 'react-router-dom';
import { FaMemory } from 'react-icons/fa';
import { GrServer, GrStatusUnknown, GrVirtualStorage } from 'react-icons/gr';
import useAuth from '../hooks/useAuth';
import { Button } from 'react-bootstrap';
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
                return <GrVirtualStorage title='Local storage' style={{color: 'gray'}}  />
            case 'firebase':
                return <GrServer title='Firebase' style={{color: 'gray'}}  />
            default:
                return <GrStatusUnknown title='Nepoznato' style={{color: 'gray'}}  />
        }
    }


    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" as="nav" aria-label="Glavna navigacija">
            <Container>
                <span aria-hidden="true">{izvor()}</span>
                <span style={{fontWeight: 'bold'}} aria-live="polite" aria-atomic="true">{naslov}</span>
                <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Otvori/zatvori navigacijski izbornik" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" as="ul">
                        <Nav.Item as="li">
                            <Nav.Link
                                href={RouteNames.HOME}
                                onClick={(e) => { e.preventDefault(); navigate(RouteNames.HOME); }}
                                eventKey="pocetna"
                            >Početna</Nav.Link>
                        </Nav.Item>

                        {isLoggedIn && (
                            <>
                                <Nav.Item as="li">
                                    <Nav.Link
                                        href={RouteNames.NADZORNA_PLOCA}
                                        onClick={(e) => { e.preventDefault(); navigate(RouteNames.NADZORNA_PLOCA); }}
                                        eventKey="nadzorna-ploca"
                                    >Nadzorna ploča</Nav.Link>
                                </Nav.Item>
                                <NavDropdown title="Programi" id="basic-nav-dropdown" as="li" renderMenuOnMount>
                                    <NavDropdown.Item
                                        href={RouteNames.SMJEROVI}
                                        onClick={(e) => { e.preventDefault(); navigate(RouteNames.SMJEROVI); }}
                                        eventKey="smjerovi"
                                    >Smjerovi</NavDropdown.Item>
                                    <NavDropdown.Item
                                        href={RouteNames.POLAZNICI}
                                        onClick={(e) => { e.preventDefault(); navigate(RouteNames.POLAZNICI); }}
                                        eventKey="polaznici"
                                    >Polaznici</NavDropdown.Item>
                                    <NavDropdown.Item
                                        href={RouteNames.GRUPE}
                                        onClick={(e) => { e.preventDefault(); navigate(RouteNames.GRUPE); }}
                                        eventKey="grupe"
                                    >Grupe</NavDropdown.Item>
                                    {authUser.uloga === 'admin' && (
                                        <>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item
                                                href={RouteNames.OPERATERI}
                                                onClick={(e) => { e.preventDefault(); navigate(RouteNames.OPERATERI); }}
                                                eventKey="operateri"
                                            >Operateri</NavDropdown.Item>
                                            <NavDropdown.Item
                                                href={RouteNames.GENERIRANJE_PODATAKA}
                                                onClick={(e) => { e.preventDefault(); navigate(RouteNames.GENERIRANJE_PODATAKA); }}
                                                eventKey="generiranje-podataka"
                                            >Generiraj podatke</NavDropdown.Item>
                                        </>)}
                                </NavDropdown>
                                <Nav.Item as="li">
                                    <Nav.Link
                                        href={RouteNames.RASPORED}
                                        onClick={(e) => { e.preventDefault(); navigate(RouteNames.RASPORED); }}
                                        eventKey="raspored"
                                    >Raspored</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link
                                        href={RouteNames.APLIKACIJE_POLAZNIKA}
                                        onClick={(e) => { e.preventDefault(); navigate(RouteNames.APLIKACIJE_POLAZNIKA); }}
                                        eventKey="aplikacije-polaznika"
                                    >Aplikacije polaznika</Nav.Link>
                                </Nav.Item>
                            </>)}


                    </Nav>

                    <Nav className="ms-auto">
                        <div className="btn-group" role="group" aria-label="Autentifikacija">
                            {isLoggedIn ? (
                                <>
                                <Button
                                    className="me-2"
                                    onClick={() => logout()}
                                    aria-label={`Odjava korisnika ${authUser.email}`}
                                >Odjava – {authUser.email}</Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        className="me-2"
                                        onClick={() => navigate(RouteNames.REGISTRACIJA)}
                                        aria-label="Registracija novog korisnika"
                                    >Registracija</Button>
                                    <Button
                                        onClick={() => navigate(RouteNames.LOGIN)}
                                        aria-label="Prijava u sustav"
                                    >Prijava</Button>
                                </>)}
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}