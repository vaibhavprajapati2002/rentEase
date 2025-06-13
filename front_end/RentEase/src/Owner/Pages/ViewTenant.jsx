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
  CircularProgress,
  TextField,
  MenuItem,
  TablePagination,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ViewTenant = () => {
  const [allTenants, setAllTenants] = useState([]);
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [search, setSearch] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const fetchTenants = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/owner/allTenants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllTenants(res.data);
      setFilteredTenants(res.data);
    } catch (err) {
      console.error("Failed to fetch tenants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  useEffect(() => {
    let data = [...allTenants];

    // Search filter
    if (search.trim()) {
      const query = search.toLowerCase();
      data = data.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.phone.toLowerCase().includes(query)
      );
    }

    // Property filter
    if (propertyFilter) {
      data = data.filter((t) => t.property?.name === propertyFilter);
    }

    setFilteredTenants(data);
    setPage(0);
  }, [search, propertyFilter, allTenants]);

  const uniqueProperties = [
    ...new Set(allTenants.map((t) => t.property?.name).filter(Boolean)),
  ];

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleRemoveTenant = async (tenantId) => {
    const confirm = window.confirm("Are you sure you want to unassign this tenant?");
    if (!confirm) return;

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");

      await axios.patch(`${API_URL}/owner/unassign-tenant/${tenantId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update UI
      setAllTenants((prev) =>
        prev.map((t) =>
          t._id === tenantId ? { ...t, property: null } : t
        )
      );

      alert("Tenant unassigned successfully.");
    } catch (err) {
      console.error("Error unassigning tenant", err);
      alert("Something went wrong.");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Assigned Tenants
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box display="flex" gap={2} mb={2} mt={4}>
            <TextField
              label="Search by Name or Phone"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              fullWidth
            />
            <TextField
              label="Filter by Property"
              select
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem value="">All</MenuItem>
              {uniqueProperties.map((prop) => (
                <MenuItem key={prop} value={prop}>
                  {prop}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {filteredTenants.length === 0 ? (
            <Typography>No tenants found.</Typography>
          ) : (
            <>
              <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Name</strong></TableCell>
                      <TableCell><strong>Phone</strong></TableCell>
                      <TableCell><strong>Email</strong></TableCell>
                      <TableCell><strong>Assigned Property</strong></TableCell>
                      <TableCell><strong>Action</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTenants
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((tenant) => (
                        <TableRow key={tenant._id}>
                          <TableCell>{tenant.name}</TableCell>
                          <TableCell>{tenant.phone}</TableCell>
                          <TableCell>{tenant.email}</TableCell>
                          <TableCell>
                            {tenant.property?.name || "Not Assigned"}
                          </TableCell>
                          <TableCell>
                            {tenant.property && (
                              <Tooltip title="Unassign Tenant">
                                <IconButton
                                  onClick={() => handleRemoveTenant(tenant._id)}
                                  color="error"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                component="div"
                count={filteredTenants.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[rowsPerPage]}
              />
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ViewTenant;
