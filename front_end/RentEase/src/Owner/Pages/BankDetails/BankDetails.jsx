import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Grid,
} from "@mui/material";
import axios from "axios";

const BankDetails = () => {
  const [form, setForm] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    upiId: "",
    upiNumber: "",
  });

  const [errors, setErrors] = useState({});

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "ifscCode") {
      setErrors((prev) => ({
        ...prev,
        ifscCode: ifscRegex.test(value) ? "" : "Invalid IFSC format",
      }));
    }

    if (name === "upiId") {
      setErrors((prev) => ({
        ...prev,
        upiId: value && !upiRegex.test(value) ? "Invalid UPI ID format" : "",
      }));
    }
  };

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${API_URL}/bank-details/bank-details/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) {
        setForm(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch bank details", err);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!ifscRegex.test(form.ifscCode)) {
      newErrors.ifscCode = "Invalid IFSC format";
    }
    if (form.upiId && !upiRegex.test(form.upiId)) {
      newErrors.upiId = "Invalid UPI ID format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please correct validation errors before saving.");
      return;
    }

    try {
      await axios.post(`${API_URL}/bank-details/update-bank-details/${userId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Bank details saved successfully!");
      fetchDetails();
    } catch (err) {
      console.error("Error saving bank details:", err);
      alert("Failed to save bank details.");
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <Box maxWidth="sm" mx="auto" p={3}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Owner Bank Details
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Bank Name"
                name="bankName"
                value={form.bankName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Account Number"
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="IFSC Code"
                name="ifscCode"
                value={form.ifscCode}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.ifscCode}
                helperText={errors.ifscCode || ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Account Holder Name"
                name="accountHolderName"
                value={form.accountHolderName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="UPI ID"
                name="upiId"
                value={form.upiId}
                onChange={handleChange}
                fullWidth
                error={!!errors.upiId}
                helperText={errors.upiId || ""}
              />
            </Grid>
              <Grid item xs={12}>
              <TextField
                label="UPI Number"
                name="upiNumber"
                value={form.upiNumber}
                onChange={handleChange}
                fullWidth
                error={!!errors.upiNumber}
                helperText={errors.upiNumber || ""}
              />
            </Grid>

          </Grid>

            <div style={{ height: "20px"  ,fullWidth: "100%", marginTop: "20px"}}>
              <Button variant="contained" type="submit" fullWidth>
                Save Details
              </Button></div>
              
            
        
        </Box>
      </Paper>
    </Box>
  );
};

export default BankDetails;
