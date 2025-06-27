import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";

const OwnerInfo = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;            // your backend base
  const [data, setData]   = useState(null);                 // { owner, property }
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  /* ─────────────────── Fetch once ─────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${BASE_URL}/tenant/owner-info`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(data);
      } catch (err) {
        setError(
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Failed to fetch owner information"
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ─────────────────── Loading / error states ─────────────────── */
  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  if (!data?.owner)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Alert severity="info">No owner information available.</Alert>
      </Box>
    );

  /* ─────────────────── Data destructuring ─────────────────── */
  const { owner, property } = data;
  const { name, email, phone, country } = owner;
  const imageSrc = property?.image
    ? `${BASE_URL}/uploads/${property.image}` // adjust if images are hosted elsewhere
    : "https://via.placeholder.com/600x400?text=No+Image";

  /* ─────────────────── Card UI ─────────────────── */
  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Card sx={{ maxWidth: 500, width: "100%" }}>
        {/* Property image */}
        <CardMedia
          component="img"
          height="220"
          image={imageSrc}
          alt={property?.name || "Property image"}
        />

        {/* Header with owner avatar */}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {name?.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={name}
          subheader={
            property && (
              <Typography variant="body2" color="text.secondary">
                Owner of: <strong>{property.name}</strong>
              </Typography>
            )
          }
        />

        {/* Contact details */}
        <CardContent>
          <Box display="flex" alignItems="center" mb={1}>
            <EmailIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography>{email}</Typography>
          </Box>

          <Box display="flex" alignItems="center" mb={1}>
            <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography>{phone}</Typography>
          </Box>

          {country && (
            <Typography variant="body2" color="text.secondary">
              Country: {country}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default OwnerInfo;
