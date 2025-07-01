import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

const AgreementPanel = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <h3 className="mb-4">Rental Agreement Management</h3>
      <Row className="g-3">
        <Col md={6}>
          <Button
            variant="primary"
            className="w-100"
            onClick={() => navigate("/owner/create-agreement")}
          >
            ➕ Create Agreement
          </Button>
        </Col>
        <Col md={6}>
          <Button
            variant="warning"
            className="w-100"
            onClick={() => navigate("/owner/agreement/requests")}
          >
            📥 Requested Agreements
          </Button>
        </Col>
        <Col md={6}>
          <Button
            variant="success"
            className="w-100"
            onClick={() => navigate("/owner/agreement/approved")}
          >
            ✅ Approved Agreements
          </Button>
        </Col>
        <Col md={6}>
          <Button
            variant="secondary"
            className="w-100"
            onClick={() => navigate("/owner/agreement/all")}
          >
            📃 View All Agreements
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AgreementPanel;
