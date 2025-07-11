import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from "../assets/images/logo.png";

const CustomNavbar = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "owner", "tenant" or null
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false); // for collapsing menu on mobile

  useEffect(() => {
    if (token && role && window.location.pathname === "/") {
      navigate(`/${role}/dashboard`);
    }
  }, [token, role, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      expanded={expanded}
      className="shadow-sm px-2"
      sticky="top"
      style={{ minHeight: "70px" }}
    >
      <Container fluid="lg" className="d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Navbar.Brand as={Link} to={token ? `/${role}/dashboard` : "/"}>
          <img
            src={Logo}
            alt="RentEase"
            style={{ height: "50px", width: "130px", objectFit: "contain" }}
          />
        </Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center gap-3 text-center">
            {token ? (
              <>
                <Nav.Link as={NavLink} to={`/${role}/dashboard`} onClick={() => setExpanded(false)}>
                  <i className="bi bi-speedometer2"></i> Dashboard
                </Nav.Link>

                {role === "owner" && (
                  <>
                    <Nav.Link as={NavLink} to="/owner/my-properties" onClick={() => setExpanded(false)}>
                      <i className="bi bi-house-door"></i> Property
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/owner/view-tenant" onClick={() => setExpanded(false)}>
                      <i className="bi bi-people-fill"></i> Tenants
                    </Nav.Link>
                  </>
                )}

                {role === "tenant" && (
                  <>
                    <Nav.Link as={NavLink} to="/tenant/property" onClick={() => setExpanded(false)}>
                      <i className="bi bi-house-door"></i> Property
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/tenant/owner-info" onClick={() => setExpanded(false)}>
                      <i className="bi bi-person-check"></i> Owner
                    </Nav.Link>
                  </>
                )}

                <Nav.Link onClick={() => { setExpanded(false); handleLogout(); }}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/" onClick={() => setExpanded(false)}>
                  <i className="bi bi-house"></i> Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/feature" onClick={() => setExpanded(false)}>
                  <i className="bi bi-stars"></i> Feature
                </Nav.Link>
                <Nav.Link as={NavLink} to="/PropertyDetails" onClick={() => setExpanded(false)}>
                  <i className="bi bi-house-door"></i> Property
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" onClick={() => setExpanded(false)}>
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
