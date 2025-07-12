import React from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Alert,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const TenantTermsAndConditions = () => {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/tenant/terms-and-conditions/get-terms`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPolicy(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading T&C:", err);
        setLoading(false);
      });
  }, []);

  const sampleTerms = [
    {
      title: "1. Acceptance of Terms",
      description:
        "By using the RentEase platform, you agree to comply with and be legally bound by these terms of use.",
    },
    {
      title: "2. Platform Access",
      description:
        "We grant you limited access to use RentEase for rental-related tasks. Misuse may result in suspension of access.",
    },
    {
      title: "3. Account Security",
      description:
        "You are responsible for maintaining the confidentiality of your login credentials. Any activity under your account will be deemed yours.",
    },
    {
      title: "4. Document Handling",
      description:
        "Documents uploaded to RentEase must be genuine and relevant. Any false documentation may lead to legal action.",
    },
    {
      title: "5. Rent Payments",
      description:
        "Payments made through RentEase must follow the due dates and amounts as agreed in the rental agreement. Late fees may apply.",
    },
    {
      title: "6. Communication & Conduct",
      description:
        "Abusive language or fraudulent claims against property owners or RentEase representatives will not be tolerated.",
    },
    {
      title: "7. Termination of Access",
      description:
        "RentEase reserves the right to suspend or terminate access without prior notice in case of policy violations or misuse.",
    },
    {
      title: "8. Limitation of Liability",
      description:
        "RentEase shall not be held liable for disputes between tenants and owners or for any technical issues beyond reasonable control.",
    },
    {
      title: "9. Changes to Terms",
      description:
        "These Terms may be updated periodically. Continued use of the platform implies your acceptance of the new terms.",
    },
    {
      title: "10. Contact",
      description:
        "For any legal queries, please contact: 📧 legal@rentease.com | 📞 +91-88888-88888",
    },
  ];

  return (
    <Box
      px={isMobile ? 2 : 4}
      py={4}
      maxWidth="900px"
      mx="auto"
      bgcolor="#f9fafb"
      minHeight="100vh"
    >
      {loading ? (
        <Box mt={6} textAlign="center">
          <CircularProgress />
          <Typography mt={2}>Loading Terms & Conditions...</Typography>
        </Box>
      ) : !policy ? (
        <Box mt={6}>
          <Alert severity="error">
            No Terms & Conditions found for your assigned property.
          </Alert>
        </Box>
      ) : (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Terms & Conditions
          </Typography>
          <Divider sx={{ my: 3 }} />

          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Owner Name
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {policy.ownerName || "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Legal Agreement
            </Typography>
            <Box
              bgcolor="#ffffffff"
              p={2}
              borderRadius={2}
              sx={{
                whiteSpace: "pre-line",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "#333",
              }}
            >
              {policy.termsAndConditions
                ? policy.termsAndConditions
                : sampleTerms.map((item, idx) => (
                    <Box key={idx} mb={2}>
                      <Typography fontWeight="bold">{item.title}</Typography>
                      <Typography>{item.description}</Typography>
                    </Box>
                  ))}
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default TenantTermsAndConditions;
