import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    IconButton,
    InputAdornment
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../../assets/images/logo.png";
import axios from "axios";

const UserDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { phone, role } = location.state || {};

    

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[a-zA-Z\s]+$/, "Full Name must contain only letters")
            .min(2, "Full Name must be at least 2 characters")
            .max(20, "Full Name must be at most 20 characters")
            .required("Full Name is required"),

        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),

        country: Yup.string()
            .min(2, "Country name is too short")
            .required("Country is required"),

        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/\d/, "Password must contain at least one number")
            .matches(
                /[@$!%*?&]/,
                "Password must contain at least one special character (@$!%*?&)"
            )
            .required("Password is required"),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required")
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            country: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await axios.post("http://localhost:5000/register-info", {
                    name: values.name,
                    email: values.email,
                    country: values.country,
                    phone: phone,
                    role: role,
                    password: values.password
                });

                window.alert("Registration successful!");
                navigate("/login");
            } catch (error) {
                console.error("Error submitting form:", error);
                window.alert("Registration failed!");
            }
        }
    });

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
                <Box display="flex" justifyContent="center" mb={2}>
                    <img src={logo} alt="Logo" style={{ height: "80px", width: "120px" }} />
                </Box>

                <Typography variant="h5" align="center" gutterBottom sx={{ mt: 3 }}>
                    Enter Your Details
                </Typography>

                <form onSubmit={formik.handleSubmit} noValidate>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Full Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Country"
                        name="country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.country && Boolean(formik.errors.country)}
                        helperText={formik.touched.country && formik.errors.country}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Phone"
                        name="phone"
                        value={phone || ""}
                        disabled
                        InputProps={{
                            style: {
                                backgroundColor: "#f5f5f5",
                                cursor: "not-allowed"
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Role"
                        name="role"
                        value={role || ""}
                        disabled
                        InputProps={{
                            style: {
                                backgroundColor: "#f5f5f5",
                                cursor: "not-allowed"
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                        Submit
                    </Button>

                    <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                        Have an account?{" "}
                        <Link to="/login" style={{ color: "black" }}>
                            Login
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Container>
    );
};

export default UserDetails;
