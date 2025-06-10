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
import { Link, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Verifyotp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Destructure phone and otp from navigation state exactly as sent
  const { phone: initialPhone, otp: initialOtp } = location.state || {};

  const [otp, setOtp] = useState(initialOtp || "");
  // phone is not editable, so no state for it needed

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", {
        phone: initialPhone,
        otp: otp
      });
      console.log(response.data);
      window.alert("OTP verified successfully");


      navigate("/role", {
        state: { phone: initialPhone } // Pass phone to next page
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      window.alert("OTP verification failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Verify OTP
        </Typography>
        <Typography variant="h4" gutterBottom align="center">
          <img src={logo} alt="Logo" style={{ height:"80px",width:"120px" }} />
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            value={initialPhone || ""}
            type="text"
            disabled // phone not editable
          />
          <TextField
            fullWidth
            margin="normal"
            label="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            required
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Verify OTP
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

export default Verifyotp;
