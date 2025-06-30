import React, { useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from "../assets/images/logo.png";

const CustomNavbar = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "owner", "tenant" or null
  const navigate = useNavigate();

  // 🔁 Redirect to dashboard if token exists and already on "/"
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
    <Navbar bg="light" sticky="top" expand="lg" className="shadow-sm" style={{ height: "80px" }}>
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to={token ? `/${role}/dashboard` : "/"}>
          <img
            src={Logo}
            alt="RentEase"
            style={{ height: "60px", width: "140px", objectFit: "contain" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">

            {token ? (
              <>
                {/* Dashboard */}
                <Nav.Link as={NavLink} to={`/${role}/dashboard`}>
                  <i className="bi bi-speedometer2"></i> Dashboard
                </Nav.Link>

                {/* Property (owner or tenant specific) */}
                {role === "owner" && (
                  <Nav.Link as={NavLink} to="/owner/my-properties">
                    <i className="bi bi-house-door"></i> Property
                  </Nav.Link>
                )}
                {role === "tenant" && (
                  <Nav.Link as={NavLink} to="/tenant/property">
                    <i className="bi bi-house-door"></i> Property
                  </Nav.Link>
                )}

                {/* Owner-specific */}
                {role === "owner" && (
                  <Nav.Link as={NavLink} to="/owner/view-tenant">
                    <i className="bi bi-people-fill"></i> Tenants
                  </Nav.Link>
                )}

                {/* Tenant-specific */}
                {role === "tenant" && (
                  <Nav.Link as={NavLink} to="/tenant/owner-info">
                    <i className="bi bi-person-check"></i> Owner
                  </Nav.Link>
                )}

                {/* Logout */}
                <Nav.Link onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Nav.Link>
              </>
            ) : (
              <>
                {/* Public routes */}
                <Nav.Link as={NavLink} to="/">
                  <i className="bi bi-house"></i> Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/feature">
                  <i className="bi bi-stars"></i> Feature
                </Nav.Link>
                <Nav.Link as={NavLink} to="/PropertyDetails">
                  <i className="bi bi-house-door"></i> Property
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login">
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
