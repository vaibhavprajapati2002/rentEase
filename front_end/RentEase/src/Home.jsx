import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./index.css"; // Import global styles

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Container>
        {/* Hero Section */}
        <Row className="align-items-center mb-5">
          {/* Left: Text Content */}
          <Col md={6}>
            <div className="home-heading fade-in-left">
              <h1>Simplify your Rental Journey</h1>
              <p>
                From digital agreements to monthly rent tracking — <strong>RentEase</strong> connects
                property owners and tenants with ease, security, and clarity.
              </p>
              <div className="home-buttons">
                <Button variant="primary" onClick={() => navigate("/login")}>
                  🔑 Login
                </Button>
                <Button variant="outline-dark" onClick={() => navigate("/register")}>
                  📋 Register
                </Button>
              </div>
            </div>
          </Col>

          {/* Right: Hero Image */}
          <Col md={6}>
            <img
              src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
              alt="Rental Illustration"
              className="home-image fade-in-right"
            />
          </Col>
        </Row>

        {/* Divider */}
        <hr className="home-divider" />

        {/* Mini Features Preview (optional if Feature.jsx exists) */}
        <Row>
          <Col>
            <div className="features-section fade-in-bottom">
              <h2 className="features-heading">✨ What You Can Do With RentEase</h2>
              <ul className="features-list">
                <li className="feature-preview">📄 Upload & manage legal rental documents securely.</li>
                <li className="feature-preview">🧍‍♂️ Handle complete tenant-owner profiles and property links.</li>
                <li className="feature-preview">💸 Track rent, utility bills, and payment history automatically.</li>
                <li className="feature-preview">💳 Enable flexible and secure online rent payments.</li>
                <li className="feature-preview">🔐 Personalized dashboards for each user type with protected access.</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
