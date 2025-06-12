import React from 'react';

const PropertyDetails = () => {
  const property = {
    address: "123 MG Road, Indore, MP",
    type: "2 BHK Flat",
    startDate: "2024-01-01",
    endDate: "2025-01-01",
    ownerName: "Ravi Sharma",
    ownerContact: "+91 9876543210"
  };

  const containerStyle = {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#333"
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const labelStyle = {
    fontWeight: 600,
    fontSize: "1rem",
    marginBottom: "4px"
  };

  const valueStyle = {
    fontSize: "0.95rem",
    color: "#555"
  };

  const sectionStyle = {
    marginBottom: "20px",
  };

  const mapStyle = {
    width: "100%",
    height: "300px",
    border: "none",
    borderRadius: "12px",
    marginTop: "20px"
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "30px", color: "#2c3e50" }}>🏠 Property Information</h2>

      <div style={cardStyle}>
        <div style={sectionStyle}>
          <div style={labelStyle}>📍 Address:</div>
          <div style={valueStyle}>{property.address}</div>
        </div>

        <div style={sectionStyle}>
          <div style={labelStyle}>🏢 Property Type:</div>
          <div style={valueStyle}>{property.type}</div>
        </div>

        <div style={sectionStyle}>
          <div style={labelStyle}>📅 Lease Start Date:</div>
          <div style={valueStyle}>{property.startDate}</div>
        </div>

        <div style={sectionStyle}>
          <div style={labelStyle}>📅 Lease End Date:</div>
          <div style={valueStyle}>{property.endDate}</div>
        </div>

        <div style={sectionStyle}>
          <div style={labelStyle}>👤 Owner Name:</div>
          <div style={valueStyle}>{property.ownerName}</div>
        </div>

        <div style={sectionStyle}>
          <div style={labelStyle}>📞 Owner Contact:</div>
          <div style={valueStyle}>{property.ownerContact}</div>
        </div>

        <iframe
          title="Property Location"
          src="https://maps.google.com/maps?q=123 MG Road, Indore&t=&z=15&ie=UTF8&iwloc=&output=embed"
          style={mapStyle}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default PropertyDetails;
