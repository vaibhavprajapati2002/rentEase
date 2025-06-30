import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Pagination,
} from "@mui/material";
import axios from "axios";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${API_URL}/property/allProperty`);
        setProperties(res.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedProperties = properties.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (properties.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography>No properties found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        {paginatedProperties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property._id}>
            <Card
              sx={{
                width: 300,
                height: 450,
                display: "flex",
                flexDirection: "column",
                mx: "auto",
              }}
            >
              <CardMedia
                component="img"
                image={`${API_URL}/uploads/${property.image}`}
                alt={property.name}
                sx={{ height: 160, objectFit: "cover" }}
              />
              <CardContent sx={{ flex: 1, overflow: "hidden" }}>
                <Typography variant="h6" noWrap>
                  {property.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {property.address}, {property.city}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2">BHK: {property.bhk}</Typography>
                <Typography variant="body2">Type: {property.type}</Typography>
                <Typography variant="body2">
                  Size: {property.size} sq ft
                </Typography>
                <Typography variant="body2">Rent: ₹{property.rent}</Typography>
                <Typography variant="body2">
                  Deposit: ₹{property.deposit}
                </Typography>
                <Typography variant="body2">
                  Available:{" "}
                  {new Date(property.availableFrom).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  Status: {property.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(properties.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Property;
