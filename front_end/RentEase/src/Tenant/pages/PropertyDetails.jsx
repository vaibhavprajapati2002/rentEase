import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";

const PropertyDetails = () => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
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
      localStorage.setItem("property_id", res.data._id);
    } catch (err) {
      console.error("Error fetching assigned property:", err);
      setError("Failed to load property details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedProperty();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!property) return <Typography>No property assigned yet.</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Assigned Property Details
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <img src={`${API_URL}/uploads/${property.image}`} alt="Property"  style={{height:"300px",width:"300px"}}/>

        <Typography variant="h6">Name: {property.name}</Typography>
        <Typography>Address: {property.address}</Typography>
        <Typography>City: {property.city}</Typography>
        <Typography>State: {property.state}</Typography>
        <Typography>Country: {property.country}</Typography>
        <Typography>Owner ID: {property.ownerId}</Typography>
      </Paper>
    </Box>
  );
};

export default PropertyDetails;
