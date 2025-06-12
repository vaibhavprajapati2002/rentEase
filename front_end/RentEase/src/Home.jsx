import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaKey,
  FaFileContract,
  FaUserTie,
  FaMoneyBillWave,
  FaCreditCard,
  FaShieldAlt,
} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const featureStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
    fontSize: "1rem",
    flexWrap: "wrap",
  };

  const responsiveImageStyle = {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundColor: "#f9f9f9",
        paddingTop: "60px",
        paddingBottom: "60px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <Container>
        {/* Hero Section */}
        <Row className="align-items-center mb-5">
          <Col md={6} xs={12} className="mb-4 mb-md-0">
            <div style={{ maxWidth: "100%" }}>
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#222",
                }}
              >
                Simplify your <span style={{ color: "#0d6efd" }}>Rental Journey</span>
              </h1>
              <p
                style={{
                  marginTop: "20px",
                  color: "#555",
                  fontSize: "1.05rem",
                  lineHeight: "1.6",
                }}
              >
                From digital agreements to monthly rent tracking — <strong>RentEase</strong> connects
                property owners and tenants with ease, security, and clarity.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Button variant="primary" size="lg" onClick={() => navigate("/login")}>
                  <FaKey className="me-2" /> Login
                </Button>
                <Button variant="outline-dark" size="lg" onClick={() => navigate("/register")}>
                  <FaFileContract className="me-2" /> Register
                </Button>
              </div>
            </div>
          </Col>

          <Col md={6} xs={12}>
            <img
              src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
              alt="Rental Illustration"
              style={responsiveImageStyle}
            />
          </Col>
        </Row>

        <hr className="my-5" />

        {/* Features Section */}
        <Row>
          <Col xs={12}>
            <div>
              <h2
                className="text-center fw-bold mb-4"
                style={{ fontSize: "2rem", color: "#222" }}
              >
                ✨ What You Can Do With RentEase
              </h2>

              <div
                style={{
                  maxWidth: "800px",
                  margin: "auto",
                  color: "#333",
                  padding: "0 16px",
                }}
              >
                <div style={featureStyle}>
                  <FaFileContract size={20} color="#0d6efd" />
                  Upload & manage legal rental documents securely.
                </div>
                <div style={featureStyle}>
                  <FaUserTie size={20} color="#0d6efd" />
                  Handle tenant-owner profiles and property links.
                </div>
                <div style={featureStyle}>
                  <FaMoneyBillWave size={20} color="#0d6efd" />
                  Track rent, utility bills, and payment history.
                </div>
                <div style={featureStyle}>
                  <FaCreditCard size={20} color="#0d6efd" />
                  Enable flexible, secure online rent payments.
                </div>
                <div style={featureStyle}>
                  <FaShieldAlt size={20} color="#0d6efd" />
                  Personalized dashboards with protected access.
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
