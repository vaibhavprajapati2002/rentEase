import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Container,
  CircularProgress,
} from "@mui/material";
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
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await axios.get("http://localhost:5000/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Fetch user failed:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <CircularProgress sx={{ mt: 10, ml: 10 }} />;

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Welcome, {user?.name || "Tenant"}</Typography>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <Typography variant="body1" mb={2}>
          Email: {user.email} | Country: {user.country}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={4}>
          {/* Existing features */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">📄 Agreement</Typography>
              <Typography variant="body2" color="text.secondary">
                View your current rental agreement and download documents.
              </Typography>
              <Button variant="text" sx={{ mt: 1 }}>View Agreement</Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">💡 Utility Usage</Typography>
              <Typography variant="body2" color="text.secondary">
                Track your electricity, water, and other usage.
              </Typography>
              <Button variant="text" sx={{ mt: 1 }}>View Utilities</Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">💳 Payments</Typography>
              <Typography variant="body2" color="text.secondary">
                View and make rent or utility payments.
              </Typography>
              <Button variant="text" sx={{ mt: 1 }}>Pay Rent</Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">📢 Complaints</Typography>
              <Typography variant="body2" color="text.secondary">
                Raise a complaint or track status with your property owner.
              </Typography>
              <Button variant="text" sx={{ mt: 1 }}>File Complaint</Button>
            </Paper>
          </Grid>

          {/* 🧩 New Features Below */}

          {/* Tenant Profile Info */}
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">👤 Your Profile</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Name: {user.name} <br />
                Phone: {user.phone} <br />
                Email: {user.email} <br />
                Country: {user.country}
              </Typography>
            </Paper>
          </Grid>

          {/* Rent Status */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">📅 Rent Status</Typography>
              <Typography variant="body2" color="text.secondary">
                Next due date: 1st of every month <br />
                Status: <span style={{ color: "green" }}>Paid</span>
              </Typography>
            </Paper>
          </Grid>

          {/* Payment History */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">📜 Payment History</Typography>
              <ul style={{ marginTop: "0.5rem" }}>
                <li>May 2025 – ₹8000 – UPI</li>
                <li>April 2025 – ₹8000 – UPI</li>
                <li>March 2025 – ₹8000 – Netbanking</li>
              </ul>
            </Paper>
          </Grid>

          {/* Owner Contact Info */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">📞 Owner Contact</Typography>
              <Typography variant="body2">
                Name: Rahul Sharma <br />
                Phone: +91 9876543210 <br />
                Email: rahul.owner@example.com
              </Typography>
            </Paper>
          </Grid>

          {/* Chat (Placeholder) */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">💬 Chat with Owner</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Coming Soon: Real-time chat with your property owner.
              </Typography>
              <Button variant="outlined" disabled>Start Chat</Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TenantHome;
