import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("Submitting form...");
    // console.log("Form data submitted:", formData);

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: formData.email,
        password: formData.password,
      });

      // console.log("Login successful:", response.data);

      const { token, role , _id } = response.data;

      // Store the token (if returned)
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", _id);


      if (role ==="tenant") {
        navigate("/tenant/dashboard");
      } else if (role === "owner") {
        navigate("/owner/dashboard");
      } 
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Login to continue
        </Typography>
        <Box textAlign="center" mb={2}>
          <img src={logo} alt="Logo" style={{ height: "80px", width: "120px" }} />
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="body2">
              <Link to="/forgot-password" style={{ color: "black" }}>
                Forgot Password
              </Link>
            </Typography>

            <Typography variant="body2">
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "black" }}>
                Register
              </Link>
            </Typography>
          </Box>

        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
