import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Paper,
  Alert,
  useMediaQuery,
} from "@mui/material";

const PrivacyAndPolicy = () => {
  const [policy, setPolicy] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
  const isMobile = useMediaQuery("(max-width:600px)");

  const fetchPolicy = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/owner/privacy/get-privacy`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPolicy(res.data.privacyAndPolicy || "");
    } catch (err) {
      console.error("Failed to fetch policy:", err);
      setMessage({ type: "error", text: "Error loading privacy policy." });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post(
        `${BASE_URL}/owner/privacy/update-privacy`,
        { privacyAndPolicy: policy },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage({ type: "success", text: "Privacy policy updated successfully!" });
      setEditMode(false);
    } catch (err) {
      console.error("Update failed:", err);
      setMessage({ type: "error", text: "Failed to update privacy policy." });
    }
    setSaving(false);
  };

  useEffect(() => {
    fetchPolicy();
  }, []);

  return (
    <Box
      bgcolor="#f9fafb"
      minHeight="100vh"
      px={isMobile ? 2 : 4}
      py={4}
      display="flex"
      justifyContent="center"
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: "900px", width: "100%" }}>
        <Typography variant="h4" gutterBottom align="center">
          Privacy & Policy
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {editMode ? (
              <>
                <TextField
                  fullWidth
                  multiline
                  minRows={8}
                  value={policy}
                  onChange={(e) => setPolicy(e.target.value)}
                  variant="outlined"
                  label="Edit Privacy Policy"
                />
                <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
                  <Button variant="outlined" onClick={() => setEditMode(false)} disabled={saving}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box
                  bgcolor="#f1f5f9"
                  p={2}
                  borderRadius={2}
                  sx={{ whiteSpace: "pre-line", fontSize: "0.95rem", color: "#333" }}
                >
                  {policy || "No privacy policy set."}
                </Box>

                <Box display="flex" justifyContent="flex-end" mt={3}>
                  <Button variant="contained" onClick={() => setEditMode(true)}>
                    Edit Policy
                  </Button>
                </Box>
              </>
            )}

            {message.text && (
              <Alert severity={message.type} sx={{ mt: 3 }}>
                {message.text}
              </Alert>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default PrivacyAndPolicy;
