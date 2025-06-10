import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    console.log  ("Email submitted:", email);
    try {
      const response = await axios.post("http://localhost:5000/verify-email", { email });
      if (response.data.success) {
        navigate(`/reset-password/${email}`);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Forgot Password
        </Typography>
        <form onSubmit={handleEmailSubmit}>
          <TextField
            label="Enter your email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Continue
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
