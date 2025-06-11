import React from "react";
import { Container, Typography, Box, Paper } from '@mui/material';
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        paddingTop: "4rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
    >
      <Container>
        <Row className="align-items-center mb-5">
          <Col md={6}>
            <h1
              style={{
                fontSize: "2.8rem",
                fontWeight: "700",
                marginBottom: "1rem",
                color: "#2c3e50",
              }}
            >
              Simplify your Rental Journey
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                lineHeight: "1.7",
                marginBottom: "2rem",
              }}
            >
              From digital agreements to monthly rent tracking — RentEase connects
              owners and tenants with ease and clarity.
            </p>
            <div>
              <Button
                variant="primary"
                style={{
                  padding: "0.6rem 1.4rem",
                  marginRight: "1rem",
                  fontSize: "1rem",
                  borderRadius: "8px",
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
                  borderRadius: "8px",
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
                borderRadius: "14px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Col>
        </Row>

        <hr style={{ margin: "4rem 0", borderTop: "1px solid #ddd" }} />

        <Row>
          <Col>
            <h2
              style={{
                fontSize: "1.9rem",
                fontWeight: "600",
                marginBottom: "1.5rem",
              }}
            >
              ✨ What You Can Do With RentEase
            </h2>
            <ul
              style={{
                paddingLeft: "1.4rem",
                fontSize: "1.15rem",
                lineHeight: "2",
              }}
            >
              <li>📄 Upload & manage rental agreements and police verification docs</li>
              <li>🧍‍♂️ View and manage tenant profiles and linked owners</li>
              <li>💸 Track monthly rent, utilities, and auto-calculated bills</li>
              <li>💳 Access owner bank details and flexible payment modes</li>
              <li>🔐 Enjoy secure login with personalized dashboards for tenants and owners</li>
            </ul>
          </Col>
        </Row>
      </Container>
      
        {/* <Paper elevation={3} sx={{ p: 4 }}>
          <Box textAlign="">
            <Typography variant="h4" gutterBottom>
              About us
            </Typography>
            <Typography variant="body4" color="text.secondary">
              At RentEase, we simplify property management for both owners and tenants. Our platform offers a smart,
               transparent, and secure way to manage rentals — from agreements and rent tracking to police verification 
               and communication. Whether you're a property owner or a tenant, RentEase ensures a hassle-free rental 
               experience with modern tools at your fingertips.
            </Typography>
          </Box>
        </Paper> */}
     
    </div>
  );
};

export default Home;





