import {HeaderBasket} from "../../eCommerce"
import styles from "./styles.module.css"
import {Badge , Navbar , Container  , Nav } from "react-bootstrap"
const {headerContainer , headerLogo  } = styles;
const Header =()=>{
    return <header>
             <div className={headerContainer}>
                
                <h1 className={headerLogo}>Our <Badge bg="info">Ecomerce</Badge>
                </h1>
                 
                <HeaderBasket />
             </div>
             <Navbar expand="lg" className="bg-body-tertiary"
                      bg="dark"
                      data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Categories</Nav.Link>
                            <Nav.Link href="#link">About</Nav.Link>

                        </Nav>
                        <Nav >
                            <Nav.Link href="#home">Login</Nav.Link>
                            <Nav.Link href="#link">Register</Nav.Link>

                        </Nav>
                        </Navbar.Collapse>
                    </Container>
            </Navbar>
          </header>

}
export default Header;