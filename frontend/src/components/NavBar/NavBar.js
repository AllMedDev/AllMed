import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { SITE_URL_DOCTORS, 
            SITE_URL_PROFILE, 
            SITE_URL_APPOINTMENTS_FUTURE, 
            SITE_URL_APPOINTMENTS_PAST 
} from '../../constants/SiteUrls';

import './NavBar.css';

function TopNavBar() {
    const expand = 'sm';
    return (
        <Navbar key={expand} expand={expand} className="navbar-centered">
            <Container fluid>
                <Navbar.Brand href={SITE_URL_DOCTORS} className="navbar-brand">AllMed</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} /> 
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            Offcanvas
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="navbar-nav">
                            <Nav.Link href={SITE_URL_DOCTORS}>Lekári</Nav.Link>
                            <Nav.Link href={SITE_URL_PROFILE}>Profil</Nav.Link>
                            <NavDropdown
                                title="Rezervácie"
                                id={`NavbarDropdown-expand-${expand}`}
                            >
                                <NavDropdown.Item href={SITE_URL_APPOINTMENTS_FUTURE}>Plánované</NavDropdown.Item>
                                <NavDropdown.Item href={SITE_URL_APPOINTMENTS_PAST}>História</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default TopNavBar;
