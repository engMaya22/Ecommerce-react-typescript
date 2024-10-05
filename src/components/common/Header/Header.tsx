import { NavLink } from "react-router-dom";
import styles from "./styles.module.css"
import {Badge , Navbar , Container  , Nav, NavDropdown } from "react-bootstrap"
import HeaderLeftBar from "./HeaderLeftBar/HeaderLeftBar";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { logout } from "@store/auth/authSlice";




const {headerContainer , headerLogo  } = styles;

const Header =()=>{
    const  {accessToken ,user} = useAppSelector(state =>state.auth)
    const dispatch = useAppDispatch();
    return <header>
             <div className={headerContainer}>
                
                <h1 className={headerLogo}>Our <Badge bg="info">eCom</Badge>
                </h1>
              <HeaderLeftBar />
              
             </div>
             <Navbar expand="lg" className="bg-body-tertiary"
                      bg="dark"
                      data-bs-theme="dark">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="categories">Categories</Nav.Link>
                            <Nav.Link as={NavLink} to="about-us">About</Nav.Link>

                        </Nav>
                        <Nav >
                          {!accessToken ? 
                                    <>
                                    <Nav.Link as={NavLink} to="login">Login</Nav.Link>
                                    <Nav.Link as={NavLink} to="register">Register</Nav.Link>
                                    </>
                                    :
                                    <NavDropdown title={`Welcome ${user?.firstName} ${user?.lastName}`} id="basic-nav-dropdown">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                        <NavDropdown.Item >Orders</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item 
                                           as={NavLink}
                                           to="/"
                                           onClick={()=>dispatch(logout())}>
                                           Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    
                                  
                                       
                                       
                           }

                        </Nav>
                        </Navbar.Collapse>
                    </Container>
            </Navbar>
          </header>

}
export default Header;