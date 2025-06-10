import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "./assets/images/logo.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#fefefe",
        minHeight: "100vh",
        paddingTop: "4rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col
            md={6}
            className="text-center text-md-start"
            style={{ marginBottom: "2rem" }}
          >
            <img
              src={logo}
              alt="RentEase Logo"
              style={{
                maxWidth: "180px",
                marginBottom: "1rem",
              }}
            />
            <h1
              style={{
                fontSize: "2.75rem",
                fontWeight: "700",
                marginBottom: "1rem",
                color: "#2b2d42",
              }}
            >
              Simplify your Rental Journey
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                lineHeight: "1.6",
                marginBottom: "2rem",
                color: "#555",
              }}
            >
              From digital agreements to monthly rent tracking — RentEase
              connects owners and tenants with ease and clarity.
            </p>
            <div>
              <Button
                variant="primary"
                style={{
                  padding: "0.6rem 1.4rem",
                  marginRight: "1rem",
                  fontSize: "1rem",
                  borderRadius: "50px",
                }}
                onClick={() => navigate("/login")}
              >
                🔑 Login
              </Button>
              <Button
                variant="outline-dark"
                style={{
                  padding: "0.6rem 1.4rem",
                  fontSize: "1rem",
                  borderRadius: "50px",
                }}
                onClick={() => navigate("/register")}
              >
                📋 Register
              </Button>
            </div>
          </Col>

          <Col md={6}>
            <img
              src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
              alt="Rental Illustration"
              style={{
                width: "100%",
                borderRadius: "16px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
              }}
            />
          </Col>
        </Row>

        <hr style={{ margin: "5rem 0", borderTop: "1px solid #ddd" }} />

        <Row>
          <Col>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                marginBottom: "2rem",
                color: "#333",
              }}
              className="text-center"
            >
              ✨ What You Can Do With RentEase
            </h2>
            <ul
              style={{
                paddingLeft: "1.2rem",
                fontSize: "1.1rem",
                lineHeight: "2",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              <li>📄 Upload & manage rental agreements</li>
              <li>🧍‍♂️ View tenant profiles</li>
              <li>💸 Track rent, utilities & payments</li>
              <li>💳 View bank details & payment methods</li>
              <li>🔐 Secure login for both owners & tenants</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
