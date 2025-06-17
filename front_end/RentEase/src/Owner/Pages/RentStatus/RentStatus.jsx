import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";

const RentStatus = () => {
  const [rentRecords, setRentRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    tenantId: "",
    propertyId: "",
    amount: "",
    status: "Paid",
    paymentDate: "",
    paymentMode: "",
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRentStatus();
  }, []);

  const fetchRentStatus = async () => {
    try {
      const res = await axios.get(`${API_URL}/rent-status/get-rent-status`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRentRecords(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load rent status");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/rent-status/update-rent-status`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Rent status added successfully");
      setForm({
        tenantId: "",
        propertyId: "",
        amount: "",
        status: "Paid",
        paymentDate: "",
        paymentMode: "",
      });
      fetchRentStatus();
    } catch (err) {
      console.error(err);
      alert("Failed to add rent status");
    }
  };

  return (
    <Box p={3}>
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add Rent Status
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Tenant ID"
                  name="tenantId"
                  value={form.tenantId}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Property ID"
                  name="propertyId"
                  value={form.propertyId}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Amount"
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  {["Paid", "Unpaid"].map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Payment Date"
                  name="paymentDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={form.paymentDate}
                  onChange={handleChange}
                  fullWidth
                  required={form.status === "Paid"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Payment Mode"
                  name="paymentMode"
                  value={form.paymentMode}
                  onChange={handleChange}
                  fullWidth
                  disabled={form.status === "Unpaid"}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Add Rent Status
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Rent Payment Records
          </Typography>

          {loading ? (
            <Box textAlign="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
          ) : rentRecords.length === 0 ? (
            <Alert severity="info" sx={{ mt: 2 }}>No rent records found.</Alert>
          ) : (
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell><strong>Tenant</strong></TableCell>
                    <TableCell><strong>Property</strong></TableCell>
                    <TableCell><strong>Rent Amount</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Payment Date</strong></TableCell>
                    <TableCell><strong>Payment Mode</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rentRecords.map((rent) => (
                    <TableRow key={rent._id}>
                      <TableCell>{rent.tenant?.name || rent.tenantId || "N/A"}</TableCell>
                      <TableCell>{rent.property?.name || rent.propertyId || "N/A"}</TableCell>
                      <TableCell>₹{rent.amount?.toLocaleString()}</TableCell>
                      <TableCell>
                        <Typography
                          color={rent.status === "Paid" ? "green" : "red"}
                          fontWeight={600}
                        >
                          {rent.status}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {rent.paymentDate
                          ? new Date(rent.paymentDate).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell>{rent.paymentMode || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default RentStatus;
