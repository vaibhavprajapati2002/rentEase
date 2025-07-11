import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Snackbar,
  Slide
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Register = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otpMethod, setOtpMethod] = useState("sms");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });

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

    setLoading(true); // disable button

    try {
      const response = await axios.post(`${BASE_URL}/send-otp`, {
        phone,
        method: otpMethod
      });

      const sessionId = response.data.sessionId;
      navigate("/verify-otp", { state: { phone } });
    } catch (error) {
      console.error("Error sending OTP:", error);
      setSnackbar({
        open: true,
        message: "Failed to send OTP. Please try again.",
        severity: "error"
      });
    } finally {
      setLoading(false); // re-enable button
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: { xs: 4, md: 8 }, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register to continue
        </Typography>
        <Box display="flex" justifyContent="center" mb={2}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: "60px", width: "100px", objectFit: "contain" }}
          />
        </Box>

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

          <FormLabel component="legend" sx={{ mt: 2 }}>
            Choose OTP Method
          </FormLabel>
          <RadioGroup
            row
            value={otpMethod}
            onChange={(e) => setOtpMethod(e.target.value)}
            sx={{ mb: 1 }}
          >
            <FormControlLabel value="sms" control={<Radio />} label="SMS" />
            <FormControlLabel value="call" control={<Radio />} label="Call" />
          </RadioGroup>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.3,
              fontWeight: 600,
              backgroundColor: loading ? "grey.500" : "primary.main"
            }}
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>

      {/* Creative Snackbar Alert */}
      <Snackbar
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        autoHideDuration={4000}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
