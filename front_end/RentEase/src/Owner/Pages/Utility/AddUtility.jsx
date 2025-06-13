import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    MenuItem,
    Button,
    Paper,
    Grid,
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddUtility = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { tenantId, propertyId } = location.state || {};

    const [form, setForm] = useState({
        property: propertyId || "",
        tenant: tenantId || "",
        utilityType: "",
        month: "",
        usage: "",
        unitCost: "",
    });

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const totalAmount = parseFloat(form.usage) * parseFloat(form.unitCost);

        try {
            await axios.post(
                `${API_URL}/owner/utilities/create-utility`,
                { ...form, totalAmount },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Utility bill added successfully!");
            navigate("/owner/utilities");
        } catch (error) {
            console.error("Error adding utility:", error);
            alert("Failed to add utility.");
        }
    };

    return (
        <Box maxWidth="md" mx="auto" p={3}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
                    Add Utility Bill
                </Typography>

                <Box component="form" onSubmit={handleSubmit} mt={3}>
                    <Box component="form" onSubmit={handleSubmit} mt={3}>
                        <TextField
                            select
                            label="Utility Type"
                            name="utilityType"
                            value={form.utilityType}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ mb: 3 }}
                        >
                            {["Electricity", "Water", "Gas"].map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Month"
                            name="month"
                            type="month"
                            value={form.month}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputLabelProps={{ shrink: true }}
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            label="Usage (units)"
                            name="usage"
                            type="number"
                            value={form.usage}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            label="Unit Cost"
                            name="unitCost"
                            type="number"
                            value={form.unitCost}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ mb: 3 }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ mt: 1 }}
                        >
                            Add Bill
                        </Button>
                    </Box>

                </Box>
            </Paper>
        </Box>
    );
};

export default AddUtility;
