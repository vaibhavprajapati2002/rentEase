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
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/send-otp", {
        phone: phone
      });
      console.log(response.data);
      const otp = response.data.otp;
      console.log("OTP:", otp);
      navigate('/verify-otp', { state: { phone, otp } });
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Register to continue
        </Typography>
        <Typography variant="h4" gutterBottom align="center">
          <img src={logo} alt="Logo" style={{ height:"80px",width:"120px" }} />
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
