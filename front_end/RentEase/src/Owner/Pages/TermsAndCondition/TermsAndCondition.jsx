import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useMediaQuery,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const defaultTerms = [
  "Tenants must upload valid ID and rental documents.",
  "Rent must be paid by the 5th of every month.",
  "Owners must address maintenance issues within 48 hours.",
  "A 30-day notice must be given for eviction or termination.",
  "Property visits require 24-hour prior notice to tenants.",
];

const TermsAndCondition = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [selectedTerms, setSelectedTerms] = useState([]);
  const [customTerms, setCustomTerms] = useState([]);
  const [newTerm, setNewTerm] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchTerms = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/owner/terms/get-terms", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const fetched = res.data.termsAndConditions?.split("\n") || [];
      const matchedDefaults = defaultTerms.filter((term) => fetched.includes(term));
      const rest = fetched.filter((term) => !defaultTerms.includes(term));
      setSelectedTerms(matchedDefaults);
      setCustomTerms(rest);
    } catch (err) {
      console.error("Error fetching terms:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  const handleCheckboxToggle = (term) => {
    setSelectedTerms((prev) =>
      prev.includes(term) ? prev.filter((t) => t !== term) : [...prev, term]
    );
  };

  const handleAddCustomTerm = () => {
    if (newTerm.trim()) {
      setCustomTerms([...customTerms, newTerm.trim()]);
      setNewTerm("");
    }
  };

  const handleDeleteCustom = (index) => {
    const copy = [...customTerms];
    copy.splice(index, 1);
    setCustomTerms(copy);
  };

  const handleSave = async () => {
    const allTerms = [...selectedTerms, ...customTerms].join("\n");
    setSaving(true);
    try {
      await axios.post(
        "http://localhost:5000/owner/terms/update-terms",
        { termsAndConditions: allTerms },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage("✅ Terms and conditions updated!");
      setEditMode(false);
    } catch (err) {
      setMessage("❌ Failed to update terms.");
      console.error("Save error:", err);
    }
    setSaving(false);
  };

  return (
    <Box
      p={isMobile ? 2 : 4}
      maxWidth="900px"
      mx="auto"
      minHeight="100vh"
      bgcolor="#f9fafb"
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Terms & Conditions
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : editMode ? (
          <>
            <Typography variant="subtitle1" mt={2}>
              ✅ Select Default Terms:
            </Typography>
            <List dense>
              {defaultTerms.map((term) => (
                <ListItem key={term} disablePadding>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedTerms.includes(term)}
                      onChange={() => handleCheckboxToggle(term)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={term} />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1">➕ Add Custom Terms:</Typography>
            <Box display="flex" gap={2} mt={1}>
              <TextField
                fullWidth
                label="Enter new term"
                value={newTerm}
                onChange={(e) => setNewTerm(e.target.value)}
              />
              <Button onClick={handleAddCustomTerm} variant="contained">
                Add
              </Button>
            </Box>

            <List dense sx={{ mt: 2 }}>
              {customTerms.map((term, index) => (
                <ListItem key={index} secondaryAction={
                  <IconButton edge="end" onClick={() => handleDeleteCustom(index)}>
                    <DeleteIcon />
                  </IconButton>
                }>
                  <ListItemText primary={term} />
                </ListItem>
              ))}
            </List>

            <Box mt={3}>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Terms"}
              </Button>
              <Button
                variant="outlined"
                sx={{ ml: 2 }}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                whiteSpace: "pre-line",
                background: "#f9f9f9",
                padding: "1rem",
                borderRadius: "8px",
                fontSize: "0.95rem",
              }}
            >
              {[...selectedTerms, ...customTerms].join("\n") ||
                "No terms set. Please click 'Edit Terms' to begin."}
            </Box>
            <Box mt={2}>
              <Button variant="contained" onClick={() => setEditMode(true)}>
                Edit Terms
              </Button>
            </Box>
          </>
        )}

        {message && (
          <Typography mt={2} color="primary">
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default TermsAndCondition;
