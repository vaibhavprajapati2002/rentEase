import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TenantHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Welcome, Tenant</Typography>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">📄 Agreement</Typography>
              <Typography variant="body2" color="text.secondary">
                View your current rental agreement and download documents.
              </Typography>
              <Button variant="text" sx={{ mt: 1 }}>
                View Agreement
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">💡 Utility Usage</Typography>
              <Typography variant="body2" color="text.secondary">
                Track your electricity, water, and other usage.
              </Typography>
              <Button variant="text" sx={{ mt: 1 }}>
                View Utilities
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">💳 Payments</Typography>
              <Typography variant="body2" color="text.secondary">
                View and make rent or utility payments.
              </Typography>
              <Button variant="text" sx={{ mt: 1 }}>
                Pay Rent
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">📢 Complaints</Typography>
              <Typography variant="body2" color="text.secondary">
                Raise a complaint or track status with your property owner.
              </Typography>
              <Button variant="text" sx={{ mt: 1 }}>
                File Complaint
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TenantHome;
