import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../assets/images/logo.png';

const CustomNavbar = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const oppositeRole = role === "owner" ? "Tenant" : "Owner";

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
                <Nav.Link as={Link} to={`/${oppositeRole.toLowerCase()}/dashboard`}>
                  <i className="bi bi-person-check"></i> {oppositeRole}
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Nav.Link>
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
