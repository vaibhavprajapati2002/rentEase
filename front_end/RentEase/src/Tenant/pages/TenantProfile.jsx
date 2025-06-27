// TenantProfile.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  TextField,
  Button,
  Grid,
  Collapse,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

/* helper: convert dd/mm/yyyy → yyyy-mm-dd */
const toISO = (d) => {
  if (!d || d.includes("-")) return d;
  const [day, month, year] = d.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const TenantProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [profile, setProfile]   = useState(null);
  const [editData, setEditData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview]   = useState("");
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [alert, setAlert]       = useState({ type: "", msg: "" });

  /* ─── Fetch profile once ─── */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/tenant/tenant-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data);
      } catch (err) {
        setAlert({
          type: "error",
          msg: err?.response?.data?.error || "Failed to load profile",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ─── Start editing ─── */
  const startEdit = () => {
    setEditData({
      name:             profile.name             || "",
      email:            profile.email            || "",
      phone:            profile.phone            || "",
      country:          profile.country          || "",
      fatherName:       profile.fatherName       || "",
      permanentAddress: profile.permanentAddress || "",
      gender:           profile.gender           || "",
      dob:              profile.dob ? profile.dob.slice(0, 10) : "",
      password:         "",
    });
    setImageFile(null);
    setPreview("");
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setAlert({ type: "", msg: "" });
  };

  const handleChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /* ─── Logout handler ─── */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAlert({ type: "success", msg: "Logged out successfully." });
    setTimeout(() => navigate("/"), 800);          // adjust route as needed
  };

  /* ─── Save profile ─── */
  const saveProfile = async () => {
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(editData).forEach(([k, v]) => {
        if (!v) return;
        fd.append(k, k === "dob" ? toISO(v) : v);
      });
      if (imageFile) fd.append("profileImage", imageFile);

      const { data } = await axios.put(
        `${BASE_URL}/tenant/update-tenant-profile`,
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfile(data.tenant);
      setAlert({ type: "success", msg: "Profile updated successfully" });
      setEditMode(false);
    } catch (err) {
      setAlert({
        type: "error",
        msg: err?.response?.data?.error || "Update failed",
      });
    } finally {
      setSaving(false);
    }
  };

  /* ─── Loading / error states ─── */
  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (!profile)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Alert severity="error">Profile not found.</Alert>
      </Box>
    );

  /* avatar source */
  const avatarSrc = preview
    ? preview
    : profile.profileImage
    ? profile.profileImage.startsWith("http")
      ? profile.profileImage
      : `${BASE_URL}/uploads/${profile.profileImage}`
    : undefined;

  const { property } = profile;

  /* ─── Render ─── */
  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Card sx={{ maxWidth: 640, width: "100%", p: 2 }}>
        <CardHeader
          avatar={<Avatar src={avatarSrc} sx={{ width: 56, height: 56 }} />}
          title={profile.name}
          subheader={profile.email}
          action={
            !editMode && (
              <>
                <IconButton onClick={startEdit} sx={{ mr: 1 }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleLogout} color="error">
                  <LogoutIcon />
                </IconButton>
              </>
            )
          }
        />

        <CardContent>
          {/* Alerts */}
          <Collapse in={alert.msg !== ""}>
            <Alert
              severity={alert.type}
              action={
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => setAlert({ type: "", msg: "" })}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {alert.msg}
            </Alert>
          </Collapse>

          {/* READ-ONLY */}
          {!editMode && (
            <Box>
              {[
                ["Phone", profile.phone],
                ["Country", profile.country],
                ["Father Name", profile.fatherName],
                ["Permanent Address", profile.permanentAddress],
                ["Gender", profile.gender],
                ["DOB", profile.dob?.slice(0, 10)],
              ].map(
                ([label, val]) =>
                  val && (
                    <Typography key={label} variant="body2" mb={1}>
                      {label}: {val}
                    </Typography>
                  )
              )}
              {property && (
                <Typography variant="body2">
                  Property: {property.name} — {property.address}
                </Typography>
              )}
            </Box>
          )}

          {/* EDIT MODE */}
          {editMode && (
            <Box component="form" noValidate autoComplete="off">
              <Grid container spacing={2}>
                {[
                  "name",
                  "email",
                  "phone",
                  "country",
                  "fatherName",
                  "permanentAddress",
                  "gender",
                ].map((field) => (
                  <Grid item xs={12} sm={6} key={field}>
                    <TextField
                      label={field.replace(/([A-Z])/g, " $1")}
                      name={field}
                      value={editData[field]}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                ))}

                <Grid item xs={12} sm={6}>
                  <TextField
                    type="date"
                    label="DOB"
                    name="dob"
                    value={editData.dob}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="New Password"
                    name="password"
                    type="password"
                    value={editData.password}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button variant="outlined" component="label">
                    Upload Profile Image
                    <input hidden type="file" accept="image/*" onChange={handleFileChange} />
                  </Button>
                  {preview && (
                    <Box mt={2}>
                      <Avatar src={preview} sx={{ width: 80, height: 80 }} />
                    </Box>
                  )}
                </Grid>
              </Grid>

              <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
                <Button
                  variant="outlined"
                  onClick={cancelEdit}
                  startIcon={<CloseIcon />}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={saveProfile}
                  startIcon={<SaveIcon />}
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save"}
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TenantProfile;
