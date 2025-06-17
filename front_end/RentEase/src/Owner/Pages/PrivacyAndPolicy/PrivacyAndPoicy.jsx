import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";

const PrivacyAndPolicy = () => {
  const [policy, setPolicy] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchPolicy = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/owner/privacy/get-privacy", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setPolicy(response.data.privacyAndPolicy || "");
    } catch (error) {
      console.error("Failed to fetch privacy policy:", error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/owner/privacy/update-privacy",
        { privacyAndPolicy: policy },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setMessage("Privacy policy updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update privacy policy:", error);
      setMessage("Failed to update privacy policy.");
    }
    setSaving(false);
  };

  useEffect(() => {
    fetchPolicy();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Privacy and Policy
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
                value={policy}
                onChange={(e) => setPolicy(e.target.value)}
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
              <Typography
                variant="body1"
                style={{ whiteSpace: "pre-line", background: "#f9f9f9", padding: "1rem", borderRadius: "8px" }}
              >
                {policy || "No privacy policy set."}
              </Typography>
              <Box mt={2}>
                <Button variant="contained" onClick={() => setEditMode(true)}>
                  Edit Policy
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

export default PrivacyAndPolicy;
