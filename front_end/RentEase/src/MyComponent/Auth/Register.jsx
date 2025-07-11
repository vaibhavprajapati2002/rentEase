import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper
} from "@mui/material";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  const validatePhone = (number) => /^[6-9]\d{9}$/.test(number);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number starting with 6-9.");
      return;
    } else {
      setPhoneError("");
    }

    try {
      const response = await axios.post(`${BASE_URL}/send-otp`, { phone });

      const sessionId = response.data.sessionId;

      navigate('/verify-otp', { state: { phone } });
    } catch (error) {
      console.error("Error sending OTP:", error);
      window.alert("Failed to send OTP");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Register to continue
        </Typography>
        <Typography variant="h4" gutterBottom align="center">
          <img src={logo} alt="Logo" style={{ height: "80px", width: "120px" }} />
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            required
            error={!!phoneError}
            helperText={phoneError}
          />

          <Button type="submit" fullWidth variant="contained">
            Send OTP
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "black" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
