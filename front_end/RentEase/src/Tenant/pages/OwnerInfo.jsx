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
  useMediaQuery,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HouseIcon from "@mui/icons-material/House";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import axios from "axios";

const OwnerInfo = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

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

  if (!data?.owner) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Alert severity="info">No owner information available.</Alert>
      </Box>
    );
  }

  const { owner, property } = data;
  const { name, email, phone, country } = owner;
  const imageSrc = property?.image
    ? `${BASE_URL}/uploads/${property.image}`
    : "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <Box
      mt={4}
      display="flex"
      justifyContent="center"
      px={isMobile ? 1 : 3}
    >
      <Card sx={{ width: "100%", maxWidth: 500, borderRadius: 3, boxShadow: 5 }}>
        {/* Property image */}
        <CardMedia
          component="img"
          height={isMobile ? "180" : "220"}
          image={imageSrc}
          alt={property?.name || "Property image"}
        />

        {/* Owner header */}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {name?.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={<Typography variant="h6">{name}</Typography>}
          subheader={
            property?.name && (
              <Typography variant="body2" color="text.secondary">
                Owner of: <strong>{property.name}</strong>
              </Typography>
            )
          }
        />

        {/* Owner contact & property details */}
        <CardContent sx={{ pt: 0 }}>
          <Box display="flex" alignItems="center" mb={1}>
            <EmailIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">{email || "Not provided"}</Typography>
          </Box>

          <Box display="flex" alignItems="center" mb={1}>
            <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">{phone || "Not provided"}</Typography>
          </Box>

          {/* WhatsApp link */}
          {phone && (
            <Box display="flex" alignItems="center" mb={1}>
              <WhatsAppIcon fontSize="small" sx={{ mr: 1, color: "#25D366" }} />
              <a
                href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#25D366" }}
              >
                Chat on WhatsApp
              </a>
            </Box>
          )}

          {/* Property address (optional) */}
          {property?.address && (
            <Box display="flex" alignItems="center" mb={1}>
              <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">{property.address}</Typography>
            </Box>
          )}

          {/* Property type (optional) */}
          {property?.type && (
            <Box display="flex" alignItems="center" mb={1}>
              <HouseIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">
                Type: {property.type}
              </Typography>
            </Box>
          )}

          {/* Country */}
          {country && (
            <Typography variant="body2" color="text.secondary" mt={1}>
              Country: {country}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default OwnerInfo;
