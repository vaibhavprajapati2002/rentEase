import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OwnerUtilities = () => {
  const [utilities, setUtilities] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  const fetchUtilities = async () => {
    try {
      const res = await axios.get(`${API_URL}/owner/utilities/get-utility`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUtilities(res.data);
    } catch (error) {
      console.error("Failed to fetch utilities:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsPaid = async (id) => {
    try {
      await axios.put(`${API_URL}/owner/utilities/${id}`, {
        isPaid: true,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUtilities();
    } catch (error) {
      console.error("Error marking as paid:", error);
    }
  };

  const deleteUtility = async (id) => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      try {
        await axios.delete(`${API_URL}/owner/utilities/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchUtilities();
      } catch (error) {
        console.error("Error deleting utility:", error);
      }
    }
  };

  useEffect(() => {
    fetchUtilities();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Utility Bills
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : utilities.length === 0 ? (
        <Typography>No utility bills found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tenant</TableCell>
                <TableCell>Property</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Usage</TableCell>
                <TableCell>Unit Cost</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {utilities.map((util) => (
                <TableRow key={util._id}>
                  <TableCell>{util.tenant?.name || "N/A"}</TableCell>
                  <TableCell>{util.property?.name || "N/A"}</TableCell>
                  <TableCell>{util.utilityType}</TableCell>
                  <TableCell>{util.month}</TableCell>
                  <TableCell>{util.usage}</TableCell>
                  <TableCell>{util.unitCost}</TableCell>
                  <TableCell>{util.totalAmount}</TableCell>
                  <TableCell>
                    {util.isPaid ? "Paid" : "Pending"}
                  </TableCell>

                  <TableCell>
                    {!util.isPaid && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => markAsPaid(util._id)}
                      >
                        Mark Paid
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      onClick={() => navigate("/owner/add-utility", {
                        state: {
                          tenantId: util.tenant._id,
                          propertyId: util.property._id,
                        },
                      })}
                        >
                        Add Bill
                    </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => deleteUtility(util._id)}
                    style={{ marginLeft: 8 }}
                  >
                    Delete
                  </Button>
                </TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
        </TableContainer>
  )
}
    </Box >
  );
};

export default OwnerUtilities;
