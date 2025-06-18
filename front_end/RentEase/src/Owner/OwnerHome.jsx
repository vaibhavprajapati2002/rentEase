import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OwnerHome = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await axios.get(`${BASE_URL}/me`, {
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
    justifyContent: "flex-start", // changed from space-between
    alignItems: "center",
    // marginBottom: "30px",
  };

  const cardGrid = {
    marginTop: "80px",
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

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={{ margin: 0 }}>Welcome {user.name || "Owner"}</h2>
      </div>

      <div style={{ color: "#555"}}>
        <p>Email: {user.email}</p>
        <p style={{
          lineHeight: "0px"
        }}>Phone: {user.phone}</p>
      </div>

      <div style={cardGrid}>
        {[
          { title: "🏠 My Property ", desc: "View your property info & lease." },
          { title: "📄 View Tenants", desc: "View and manage tenant." },
          { title: "💡 Utilities", desc: "Track your electricity & water usage." },
          { title: "📜 Bank Details", desc: "update your bank details ." },
          { title: "📅 Rent Status", desc: "View next due date and current status." },
          { title: "💳 Rent collection", desc: "Total rent per month and see payment history." },
          { title: "👤 Terms & Condition", desc: "Update your personal info and details." },
          { title: "?  Privacy and Policy", desc: "your privacy and police  ." },
          { title: "📢 Complaints Status", desc: "solve and track issues with Tenant." },
          { title: "💬 Chat (Coming Soon)", desc: "Chat with owner in real-time." },
        ].map((item, idx) => (
          <div key={idx} style={cardStyle}>
            <div style={titleStyle}>{item.title}</div>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>{item.desc}</p>
            <button
              style={buttonStyle}
              onClick={() => {
                if      (item.title.includes("Property")) navigate("/owner/my-properties");
                else if (item.title.includes(" View Tenants")) navigate("/owner/view-tenant");
                else if (item.title.includes("Utilities")) navigate("/owner/utilities");
                else if (item.title.includes("Bank Details")) navigate("/owner/bank-details");
                else if (item.title.includes("Rent Status")) navigate("/owner/rent-status");
                //  else if (item.title.includes("Rent collection")) navigate("/tenant/profile");
                else if (item.title.includes("Terms & Condition")) navigate("/owner/terms-and-conditions");
               
                
                else if (item.title.includes("Privacy and Policy")) navigate("/owner/privacy-policy");
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

export default OwnerHome;
