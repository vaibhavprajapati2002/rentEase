import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TenantHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await axios.get("http://localhost:5000/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  if (loading) return <div style={{ padding: "2rem", fontSize: "1.2rem" }}>Loading...</div>;

  const containerStyle = {
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  };

  const cardGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  };

  const cardStyle = {
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    backgroundColor: "#fff",
    transition: "transform 0.3s ease",
  };

  const hoverCard = {
    ...cardStyle,
    ":hover": {
      transform: "translateY(-5px)",
    },
  };

  const titleStyle = {
    fontSize: "1.3rem",
    fontWeight: "600",
    marginBottom: "8px",
  };

  const buttonStyle = {
    marginTop: "10px",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    fontSize: "0.9rem",
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ff4d4f",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={{ margin: 0 }}>Welcome, {user.name || "Tenant"}</h2>
        <button style={logoutButtonStyle} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={{ marginBottom: "30px", color: "#555" }}>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Country: {user.country}</p>
      </div>

      <div style={cardGrid}>
        {[
          { title: "🏠 Property Details", desc: "View your current property info & lease." },
          { title: "📄 Rental Agreement", desc: "View and manage rental agreements." },
          { title: "💡 Utilities", desc: "Track your electricity & water usage." },
          { title: "💳 Rent Payment", desc: "Pay rent and see payment history." },
          { title: "👤 Your Profile", desc: "Update your personal info and details." },
          { title: "📅 Rent Status", desc: "View next due date and current status." },
          { title: "📜 Payment History", desc: "Track monthly rent payments made." },
          { title: "📞 Owner Info", desc: "Contact your property owner." },
          { title: "📢 Complaints", desc: "Raise and track issues with owner." },
          { title: "💬 Chat (Coming Soon)", desc: "Chat with owner in real-time." },
        ].map((item, idx) => (
          <div key={idx} style={cardStyle}>
            <div style={titleStyle}>{item.title}</div>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>{item.desc}</p>
            <button
              style={buttonStyle}
              onClick={() => {
                if (item.title.includes("Property")) navigate("/tenant/property");
                else if (item.title.includes("Agreement")) navigate("/tenant/agreement");
                else if (item.title.includes("Utilities")) navigate("/tenant/utilities");
                else if (item.title.includes("Rent Payment")) navigate("/tenant/rent");
                else if (item.title.includes("Complaints")) navigate("/tenant/complaints");
                else if (item.title.includes("Profile")) navigate("/tenant/profile");
                else if (item.title.includes("Owner Info")) navigate("/tenant/owner");
                else if (item.title.includes("Rent Status")) navigate("/tenant/status");
                else if (item.title.includes("Payment History")) navigate("/tenant/history");
                else alert("This feature is coming soon!");
              }}
            >
              View
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantHome;
