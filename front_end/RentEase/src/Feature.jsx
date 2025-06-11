// Feature.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./index.css";

const Feature = () => {
  const features = [
  {
    emoji: "📄",
    title: "Upload & Manage Legal Documents",
    description: `Effortlessly upload rental agreements, ID proofs, and police verification forms for both tenants and property owners. These documents are securely stored in the cloud, making them easy to retrieve when needed — no paperwork, no clutter, just smart digital access.`,
  },
  {
    emoji: "🧍‍♂️",
    title: "Complete Tenant & Owner Management",
    description: `Every user gets a dedicated profile with full details like name, ID, phone number, and address. Property owners can easily link and manage multiple tenants under various properties. This helps maintain an organized digital directory and ensures smooth communication between parties.`,
  },
  {
    emoji: "💸",
    title: "Track Rent, Utilities & Auto-Calculated Bills",
    description: `Automate your rent collection process. RentEase not only logs due rent but also calculates utility bills like water, gas, and electricity. Tenants can view itemized bills each month, and owners get an overview of all collected and pending payments — increasing accuracy and trust.`,
  },
  {
    emoji: "💳",
    title: "Flexible & Secure Payment System",
    description: `Supports payments through UPI, credit/debit cards, and net banking. Tenants get reminders for due dates, and owners receive instant updates on successful payments. With integrated receipts and payment history logs, financial management becomes transparent and easy to audit.`,
  },
  {
    emoji: "🔐",
    title: "Role-Based Secure Dashboards",
    description: `Whether you're a tenant or a property owner, you only see what you need. Owners get access to all properties, rent logs, and tenant contacts. Tenants view their payment status, agreements, and utilities. All this is protected with encrypted logins and data privacy controls.`,
  },
  {
    emoji: "📊",
    title: "Real-Time Insights & Reports",
    description: `Generate monthly reports on income, payments, and occupancy. Owners can analyze trends in rent collection and detect late payments, while tenants can track their financial history for personal records. These insights help in better decision-making and future planning.`,
  },
  {
    emoji: "🛎️",
    title: "Automated Alerts & Reminders",
    description: `The system sends automatic email/SMS alerts for upcoming rent due dates, expiring documents, or pending verifications. This reduces manual follow-ups and helps both tenants and owners stay informed — making the process smoother and stress-free.`,
  },
  {
    emoji: "🖼️",
    title: "Visual Property Management",
    description: `Add images, floor plans, and virtual walkthroughs to property listings within your dashboard. This is especially useful for owners managing multiple units and for tenants to understand their rented space better. Visually rich listings save time and improve communication.`,
  },
];


  return (
    <section className="features-section fade-in-bottom">
      <Container>
        <Row>
          <Col>
            <h2 className="features-heading text-center">
              🏘️ Key Features for Rental Management
            </h2>
            <div className="features-list">
              {features.map((item, index) => (
                <div key={index} className="feature-card">
                  <h4 className="feature-title">
                    <span className="feature-emoji">{item.emoji}</span>
                    {item.title}
                  </h4>
                  <p className="feature-description">{item.description}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Feature;
