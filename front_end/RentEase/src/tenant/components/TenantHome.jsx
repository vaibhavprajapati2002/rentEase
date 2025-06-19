import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TenantHome = () => {
  API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD

=======
>>>>>>> f9c8122cdd87a302975beaa875a3bf872ef638ce

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const propertyId = res.data.property;
        if (!propertyId) {
          toast.error("Please assign a property first.");
          return navigate("/tenant/view-property");
        }
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

<<<<<<< HEAD

=======
  const styles = {
    container: {
      padding: "20px",
      maxWidth: "1200px",
      margin: "auto",
      fontFamily: "'Segoe UI', sans-serif",
    },
    header: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#333",
    },
    subHeader: {
      color: "#777",
      marginBottom: "20px",
      fontSize: "1rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "16px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "transform 0.2s ease-in-out",
    },
    cardHover: {
      transform: "scale(1.02)",
    },
    cardTitle: {
      fontSize: "1.2rem",
      fontWeight: "600",
      marginBottom: "6px",
    },
    cardDesc: {
      fontSize: "0.9rem",
      color: "#555",
      marginBottom: "10px",
    },
    button: {
      alignSelf: "flex-start",
      padding: "8px 14px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "0.85rem",
      cursor: "pointer",
    },
  };

  const cardData = [
    {
      group: "Profile",
      items: [
        { title: "👤 Your Profile", desc: "Update your info", path: "/tenant/profile" },
        { title: "📞 Owner Info", desc: "View and contact owner", path: "/tenant/owner" },
      ],
    },
    {
      group: "Payments",
      items: [
        { title: "💳 Rent Payment", desc: "Pay rent online", path: "/tenant/rent" },
        { title: "📜 Payment History", desc: "Track previous payments", path: "/tenant/history" },
        { title: "📅 Rent Status", desc: "Check current status", path: "/tenant/status" },
      ],
    },
    {
      group: "Services",
      items: [
        { title: "🏠 Property Details", desc: "Your assigned property", path: "/tenant/property" },
        { title: "📄 Rental Agreement", desc: "Agreement details", path: "/tenant/agreement" },
        { title: "💡 Utilities", desc: "Electricity/Water bills", path: "/tenant/utilities" },
      ],
    },
    {
      group: "Support",
      items: [
        { title: "📢 Complaints", desc: "Raise service issues", path: "/tenant/complaints" },
        { title: "💬 Chat (Coming Soon)", desc: "Chat with owner", path: null },
      ],
    },
  ];
>>>>>>> f9c8122cdd87a302975beaa875a3bf872ef638ce

  if (loading)
    return (
      <div style={{ padding: "2rem", textAlign: "center", fontSize: "1.2rem" }}>
        ⏳ Loading your dashboard...
      </div>
    );

<<<<<<< HEAD
  const containerStyle = {
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "'Segoe UI', sans-serif",
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


  // Full dashboard if tenant is linked
=======
>>>>>>> f9c8122cdd87a302975beaa875a3bf872ef638ce
  return (
    <div style={styles.container}>
      <div style={styles.header}>Welcome, {user?.name || "Tenant"} 👋</div>
      <div style={styles.subHeader}>
        Email: {user.email} | Phone: {user.phone} | Country: {user.country}
      </div>

      {cardData.map((section, idx) => (
        <div key={idx} style={{ marginBottom: "30px" }}>
          <div style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "10px", color: "#444" }}>
            {section.group}
          </div>
          <div style={styles.grid}>
            {section.items.map((item, index) => (
              <div key={index} style={styles.card}>
                <div style={styles.cardTitle}>{item.title}</div>
                <div style={styles.cardDesc}>{item.desc}</div>
                <button
                  style={styles.button}
                  onClick={() =>
                    item.path ? navigate(item.path) : toast.info("This feature is coming soon!")
                  }
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TenantHome;
