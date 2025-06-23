import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TenantProfile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          country: res.data.country || "",
        });
      } catch (err) {
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        "http://localhost:5000/tenant/update-profile",
        { ...form },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Profile updated successfully.");
    } catch (err) {
      toast.error("Update failed.");
    }
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "20px",
      fontFamily: "'Segoe UI', sans-serif",
    },
    title: {
      fontSize: "1.6rem",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    label: {
      display: "block",
      marginTop: "12px",
      fontSize: "0.95rem",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "0.95rem",
      marginTop: "5px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      boxSizing: "border-box",
    },
    button: {
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "1rem",
    },
  };

  if (loading)
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading Profile...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.title}>Your Profile</div>

      <label style={styles.label}>Name</label>
      <input
        style={styles.input}
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <label style={styles.label}>Email</label>
      <input
        style={styles.input}
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <label style={styles.label}>Phone</label>
      <input
        style={styles.input}
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleChange}
      />

      <label style={styles.label}>Country</label>
      <input
        style={styles.input}
        type="text"
        name="country"
        value={form.country}
        onChange={handleChange}
      />

      <button style={styles.button} onClick={handleUpdate}>
        Update Profile
      </button>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TenantProfile;
