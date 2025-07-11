import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Slide
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import logo from "../../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Verifyotp = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const navigate = useNavigate();

  const { phone } = location.state || {};
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [disableResend, setDisableResend] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  // Timer countdown
  useEffect(() => {
    let timer;
    if (resendTimer > 0 && disableResend) {
      timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setDisableResend(false);
    }
    return () => clearTimeout(timer);
  }, [resendTimer, disableResend]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return;

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/verify-otp`, {
        phone,
        otp
      });

      setSnackbar({
        open: true,
        message: "OTP verified successfully",
        severity: "success"
      });

      setTimeout(() => {
        navigate("/role", { state: { phone } });
      }, 1000);
    } catch (error) {
      console.error("Error verifying OTP:", error?.response?.data || error);
      setSnackbar({
        open: true,
        message: "Invalid or expired OTP",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await axios.post(`${BASE_URL}/send-otp`, { phone, method: "sms" });
      setSnackbar({ open: true, message: "OTP resent via SMS", severity: "info" });
      setDisableResend(true);
      setResendTimer(30);
    } catch (error) {
      console.error("Error resending OTP:", error);
      setSnackbar({
        open: true,
        message: "Failed to resend OTP. Try again later.",
        severity: "error"
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: { xs: 4, md: 8 }, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h5" align="center" gutterBottom>
          Verify OTP
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
            value={phone || ""}
            type="text"
            disabled
          />
          <TextField
            fullWidth
            margin="normal"
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Typography variant="body2" color="text.secondary">
              {disableResend
                ? `Resend available in ${resendTimer}s`
                : "Didn't receive the code?"}
            </Typography>
            <Button
              variant="text"
              onClick={handleResend}
              disabled={disableResend}
              sx={{ textTransform: "none" }}
            >
              Resend OTP
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>

      {/* Snackbar Notification */}
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

export default Verifyotp;
