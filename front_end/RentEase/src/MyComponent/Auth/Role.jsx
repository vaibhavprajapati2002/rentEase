import React, { useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Alert,
    Box,
    Button,
    TextField
} from '@mui/material';

import logo from "../../assets/images/logo.png";
import { useNavigate, useLocation } from 'react-router-dom';

const Role = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const phoneFromState = location.state?.phone || '';
    const [phone] = useState(phoneFromState); // keep phone as constant
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const roles = ['owner', 'tenant'];

    const handleRoleChange = (event) => {
        setRole(event.target.value);
        setSuccessMsg('');
        setErrorMsg('');
    };

    const handleContinue = async () => {
        if (!role) {
            setErrorMsg("Please select a role to continue.");
            return;
        }

        setLoading(true);

        try {
            await axios.post("http://localhost:5000/define-role",{
                phone,
                role
            })
           
                
                navigate('/user' ,{
                    state: { phone, role } // Pass phone and role to next page
                }); // Navigate to dashboard or appropriate page
            
        } catch (err) {
            console.error(err);
            setErrorMsg('Failed to update role');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{ maxWidth: 400, margin: 'auto', mt: 4, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                    Register to continue
                </Typography>

                <Box display="flex" justifyContent="center" mb={2}>
                    <img src={logo} alt="Logo" style={{ height: "80px", width: "120px" }} />
                </Box>

                <TextField
                    label="Phone Number"
                    value={phone}
                    disabled
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                />

                <FormControl fullWidth sx={{ mt: 3 }}>
                    <InputLabel id="role-label">Select your role</InputLabel>
                    <Select
                        labelId="role-label"
                        value={role}
                        label="Select your role"
                        onChange={handleRoleChange}
                        disabled={loading}
                    >
                        <MenuItem value="">-- Select Role --</MenuItem>
                        {roles.map((r) => (
                            <MenuItem key={r} value={r}>
                                {r.charAt(0).toUpperCase() + r.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {successMsg && <Alert severity="success" sx={{ mt: 2 }}>{successMsg}</Alert>}
                {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}

                {loading && (
                    <Box display="flex" justifyContent="center" mt={2}>
                        <CircularProgress />
                    </Box>
                )}

                <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={handleContinue}
                    sx={{ mt: 3 }}
                    disabled={loading}
                >
                    Continue
                </Button>
            </CardContent>
        </Card>
    );
};

export default Role;
