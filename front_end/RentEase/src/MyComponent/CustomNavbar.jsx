import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../assets/images/logo.png';

const CustomNavbar = () => {
  return (
    <Navbar bg="light" sticky="top" className="shadow-sm" style={{ height: '80px' }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={Logo}
            alt="RentEase"
            style={{ height: '80px', width: '150px', marginTop: '5px' }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" active>Home</Nav.Link>
            <Nav.Link as={Link} to="/Nav-Properties">Feature</Nav.Link>
            <Nav.Link as={Link} to="/PropertyDetails">Property</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
            <Nav.Link as={Link} to="/login"><i className="bi bi-person"></i> Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
