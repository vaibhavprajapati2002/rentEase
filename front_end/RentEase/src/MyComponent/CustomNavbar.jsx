import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../assets/images/logo.png';

const CustomNavbar = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const avatarStyle = {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '10px',
  };

  const dummyAvatar = "https://cdn-icons-png.flaticon.com/512/147/147144.png";

  return (
    <Navbar bg="light" sticky="top" expand="lg" className="shadow-sm" style={{ height: '80px' }}>
      <Container>
        <Navbar.Brand as={Link} to={token ? `/${role}/dashboard` : '/'}>
          <img
            src={Logo} 
            alt="RentEase"
            style={{ height: '60px', width: '140px', objectFit: 'contain' }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">

            {token ? (
              <>
                <Nav.Link as={Link} to={`/${role}/dashboard`}>
                  <i className="bi bi-speedometer2"></i> Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/PropertyDetails">
                  <i className="bi bi-house-door"></i> Property
                </Nav.Link>
                <Nav.Link as={Link} to="/contact">
                  <i className="bi bi-envelope"></i> Contact
                </Nav.Link>

                {/* Profile Dropdown */}
                <NavDropdown
                  title={
                    <span>
                      <Image src={dummyAvatar} alt="Avatar" style={avatarStyle} />
                    </span>
                  }
                  id="profile-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to={`/${role}/profile`}>
                    <i className="bi bi-person-lines-fill"></i> View Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={`/${role}/settings`}>
                    <i className="bi bi-gear"></i> Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  <i className="bi bi-house"></i> Home
                </Nav.Link>
                <Nav.Link as={Link} to="/feature">
                  <i className="bi bi-stars"></i> Feature
                </Nav.Link>
                <Nav.Link as={Link} to="/PropertyDetails">
                  <i className="bi bi-house-door"></i> Property
                </Nav.Link>
                <Nav.Link as={Link} to="/contact">
                  <i className="bi bi-envelope"></i> Contact Us
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  <i className="bi bi-person-plus"></i> Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
