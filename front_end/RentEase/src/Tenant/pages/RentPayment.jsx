// TenantRentPayment.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Typography, CircularProgress, Paper } from "@mui/material";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const RentPayment = ({ user }) => {
  const [rentAmount, setRentAmount] = useState(null);
  const [owner, setOwner] = useState(null);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenantInfo = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/tenant/details/${user._id}`);
        setRentAmount(res.data.rentAmount);
        setOwner(res.data.owner);
        setProperty(res.data.property);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tenant info", err);
        toast.error("Failed to load rent details");
      }
    };

    fetchTenantInfo();
  }, [user._id]);

  const handlePayment = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/payment/create-order`, {
        amount: rentAmount,
      });

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
            await axios.post(`${API_URL}/api/payment/save-payment`, {
              tenantId: user._id,
              ownerId: owner._id,
              propertyId: property._id,
              amount: rentAmount,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              status: "success",
            });

            toast.success("Payment successful!");
          } catch (err) {
            toast.error("Payment went through but saving failed!");
            console.error("Saving failed", err);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#0d6efd",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in payment", error);
      toast.error("Payment initialization failed");
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h5" gutterBottom>Pay Your Rent</Typography>
      <Typography variant="body1" gutterBottom>
        Amount Due: ₹{rentAmount}
      </Typography>
      <Button variant="contained" color="primary" onClick={handlePayment}>
        Pay Now
      </Button>
    </Paper>
  );
};

export default RentPayment;
