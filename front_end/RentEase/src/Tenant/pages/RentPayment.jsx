import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Paper,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const RentPayment = () => {
  const [tenant, setTenant] = useState(null);
  const [owner, setOwner] = useState(null);
  const [property, setProperty] = useState(null);
  const [rentAmount, setRentAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");

  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const res = await axios.get(`${API_URL}/tenant/tenant-info`, authHeader);
        setTenant(res.data.tenant);
        setOwner(res.data.owner);
        setProperty(res.data.property);
        setRentAmount(res.data.property?.rent || 0);
      } catch (err) {
        console.error("Failed to fetch rent data:", err);
        toast.error("Failed to load rent info");
      } finally {
        setLoading(false);
      }
    };

    fetchTenantData();
  }, []);

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/payment/create-order`,
        { amount: rentAmount },
        authHeader
      );

      const { order } = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "RentEase",
        description: "Monthly Rent Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            await axios.post(
              `${API_URL}/api/payment/save-payment`,
              {
                tenantId: tenant._id,
                ownerId: owner._id,
                propertyId: property._id,
                amount: rentAmount,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                status: "success",
              },
              authHeader
            );
            toast.success("Payment successful!");
          } catch (err) {
            toast.error("Payment succeeded but saving failed.");
            console.error("Save error:", err);
          }
        },
        prefill: {
          name: tenant.name,
          email: tenant.email,
        },
        theme: {
          color: "#0d6efd",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment init error:", error);
      toast.error("Payment failed to initiate.");
    }
  };

  if (loading || !tenant || !owner || !property) {
    return (
      <Box mt={6} textAlign="center">
        <CircularProgress />
        <Typography mt={2}>Loading rent details...</Typography>
      </Box>
    );
  }

  return (
    <Box
      px={isMobile ? 2 : 4}
      py={4}
      maxWidth="700px"
      mx="auto"
      minHeight="100vh"
      bgcolor="#f9fafb"
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          💰 Rent Payment
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Box mb={2}>
          <Typography variant="subtitle1">Tenant Name:</Typography>
          <Typography variant="body1">{tenant.name}</Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle1">Property:</Typography>
          <Typography variant="body1">{property.name}</Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle1">Owner:</Typography>
          <Typography variant="body1">{owner.name}</Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle1">Amount Due:</Typography>
          <Typography variant="h6" color="primary">
            ₹{rentAmount}
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          onClick={handlePayment}
        >
          Pay Now
        </Button>
      </Paper>
    </Box>
  );
};

export default RentPayment;
