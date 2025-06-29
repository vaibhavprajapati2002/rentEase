// RentPayment.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Typography, CircularProgress, Paper } from "@mui/material";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const RentPayment = () => {
  const [tenant, setTenant] = useState(null);
  const [owner, setOwner] = useState(null);
  const [property, setProperty] = useState(null);
  const [rentAmount, setRentAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const res = await axios.get(`${API_URL}/tenant/tenant-info`, authHeader);
        console.log("Tenant data:", res.data);
        setTenant(res.data.tenant);
        setOwner(res.data.owner);
        setProperty(res.data.property);
        setRentAmount(res.data.property.rent);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch rent data:", err);
        toast.error("Failed to load rent info");
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
            toast.error("Payment successful but failed to save record.");
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
      toast.error("Payment failed to start.");
    }
  };

  if (loading || !tenant || !owner || !property) return <CircularProgress />;

  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h5" gutterBottom>
        Pay Your Rent
      </Typography>
      <Typography variant="body1" gutterBottom>
        Rent Amount Due: ₹{rentAmount}
      </Typography>
      <Button variant="contained" color="primary" onClick={handlePayment}>
        Pay Now
      </Button>
    </Paper>
  );
};

export default RentPayment;
