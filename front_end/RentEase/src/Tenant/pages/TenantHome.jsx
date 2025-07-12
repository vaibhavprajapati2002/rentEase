import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

/**
 * Tenant Dashboard Page
 * - Fetches tenant data securely
 * - Validates property assignment
 * - Displays grouped dashboard actions with modern interactive UI
 */

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const TenantHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch tenant data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const { data } = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!data.property) {
          toast.error("Please assign a property first.");
          return navigate("/tenant/view-property");
        }

        setUser(data);
      } catch (err) {
        console.error("Fetch user failed:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // ---------------------- Styles ---------------------- //
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
      marginBottom: "6px",
      color: "#333",
    },
    subHeader: {
      color: "#555",
      marginBottom: "20px",
      fontSize: "0.95rem",
    },
    sectionTitle: {
      fontSize: "1.1rem",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#444",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "12px",
    },
    card: (active) => ({
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "16px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.06)",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderLeft: `5px solid ${active ? "#007bff" : "#999"}`,
      transition: "0.2s ease",
    }),
    cardTitle: {
      fontSize: "1.2rem",
      fontWeight: "600",
      marginBottom: "6px",
      color: "#222",
    },
    cardDesc: {
      fontSize: "0.95rem",
      color: "#555",
    },
    comingSoon: {
      marginTop: "8px",
      color: "#e74c3c",
      fontSize: "0.8rem",
      fontWeight: 500,
    },
  };

  // ---------------------- Dashboard Sections ---------------------- //
  const cardData = [
    {
      group: "Profile",
      items: [
        { title: "👤 Your Profile", desc: "Update your info", path: "/tenant/profile" },
        { title: "📞 Owner Info", desc: "View and contact owner", path: "/tenant/owner-info" },
      ],
    },
    {
      group: "Payments",
      items: [
        { title: "💳 Rent Payment", desc: "Pay rent online", path: "/tenant/rent-payment" },
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
    {
      group: "Legal",
      items: [
        {
          title: "📢 Terms and Condition",
          desc: "Read terms and conditions",
          path: "/tenant/terms-and-conditions",
        },
        {
          title: "🔒 Privacy Policy",
          desc: "Go through privacy and policy",
          path: "/tenant/privacy-policy",
        },
      ],
    },
  ];

  // ---------------------- Loading View ---------------------- //
  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", fontSize: "1.2rem" }}>
        ⏳ Loading your dashboard...
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  }

  // ---------------------- Render ---------------------- //
  return (
    <div style={styles.container}>
      <div style={styles.header}>Welcome, {user?.name || "Tenant"} 👋</div>
      <div style={styles.subHeader}>
        Email: {user.email} | Phone: {user.phone} | Country: {user.country}
      </div>

      {cardData.map((section) => (
        <div key={section.group} style={{ marginBottom: "30px" }}>
          <div style={styles.sectionTitle}>{section.group}</div>
          <div style={styles.grid}>
            {section.items.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={styles.card(!!item.path)}
                onClick={() =>
                  item.path
                    ? navigate(item.path)
                    : toast.info("🚧 This feature is coming soon!")
                }
              >
                <div style={styles.cardTitle}>{item.title}</div>
                <div style={styles.cardDesc}>{item.desc}</div>
                {!item.path && <div style={styles.comingSoon}>🚧 Coming soon</div>}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TenantHome;
