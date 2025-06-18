import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";

const OwnerInfo = () => {
  const [ownerData, setOwnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOwnerInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/tenant/my-owner", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOwnerData(response.data);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to fetch owner information"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerInfo();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!ownerData || !ownerData.owner) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Alert severity="info">No owner information available.</Alert>
      </Box>
    );
  }

  const { name, email, phone, country } = ownerData.owner;

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Paper elevation={4} sx={{ p: 4, maxWidth: 500, width: "100%" }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Owner of: <strong>{ownerData.propertyName}</strong>
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" alignItems="center" mb={1}>
          <EmailIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography>{email}</Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography>{phone}</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography variant="body2" color="textSecondary">
            Country: {country}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default OwnerInfo;
