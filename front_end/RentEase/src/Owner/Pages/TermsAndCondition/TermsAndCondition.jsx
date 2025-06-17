import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";

const TermsAndCondition = () => {
  const [terms, setTerms] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchTerms = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/owner/terms/get-terms", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setTerms(response.data.termsAndConditions || "");
    } catch (error) {
      console.error("Failed to fetch terms:", error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/owner/terms/update-terms",
        { termsAndConditions: terms },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setMessage("Terms updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update terms:", error);
      setMessage("Failed to update terms.");
    }
    setSaving(false);
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Terms and Conditions
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {editMode ? (
            <>
              <TextField
                fullWidth
                multiline
                minRows={6}
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                variant="outlined"
              />
              <Box mt={2}>
                <Button variant="contained" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </Button>
                <Button variant="outlined" onClick={() => setEditMode(false)} sx={{ ml: 2 }}>
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="body1" style={{ whiteSpace: "pre-line", background: "#f9f9f9", padding: "1rem", borderRadius: "8px" }}>
                {terms || "No terms and conditions set."}
              </Typography>
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
        </>
      )}
    </Box>
  );
};

export default TermsAndCondition;
