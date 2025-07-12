import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  useMediaQuery,
  Divider,
  Alert,
} from "@mui/material";

const PropertyDetails = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const isMobile = useMediaQuery("(max-width:600px)");

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAssignedProperty = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/property/tentant/property-details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperty(res.data);
      localStorage.setItem("property_id", res.data._id); // Save property ID
    } catch (err) {
      console.error("Error fetching assigned property:", err);
      setError("⚠️ Failed to load property details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedProperty();
  }, []);

  if (loading) {
    return (
      <Box mt={6} textAlign="center">
        <CircularProgress />
        <Typography mt={2}>Loading property details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={6} maxWidth="600px" mx="auto">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!property) {
    return (
      <Box mt={6} maxWidth="600px" mx="auto">
        <Alert severity="info">No property assigned yet.</Alert>
      </Box>
    );
  }

  return (
    <Box
      px={isMobile ? 2 : 4}
      py={4}
      maxWidth="900px"
      mx="auto"
      bgcolor="#f9fafb"
      minHeight="100vh"
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Property Details 🏠
        </Typography>

        <Divider sx={{ my: 3 }} />

        {property.image ? (
          <Box mb={3} textAlign="center">
            <img
              src={`${API_URL}/uploads/${property.image}`}
              alt="Property"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </Box>
        ) : (
          <Box mb={3} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              No property image available.
            </Typography>
          </Box>
        )}

        <Box display="flex" flexDirection="column" gap={2}>
          <DetailRow label="Property Name" value={property.name} />
          <DetailRow label="Address" value={property.address} />
          <DetailRow label="City" value={property.city} />
          <DetailRow label="State" value={property.state} />
          <DetailRow label="Country" value={property.country} />
          <DetailRow label="Owner ID" value={property.ownerId} />
        </Box>
      </Paper>
    </Box>
  );
};

// 🔁 Reusable component for displaying labeled values
const DetailRow = ({ label, value }) => (
  <Box>
    <Typography variant="subtitle2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1" sx={{ fontWeight: 500 }}>
      {value || "N/A"}
    </Typography>
  </Box>
);

export default PropertyDetails;
