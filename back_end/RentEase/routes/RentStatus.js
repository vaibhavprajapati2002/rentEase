// routes/rentStatusRoutes.js
require("../models/RentStatusModel.js")

const express = require("express");
const router = express.Router();
const { getOwnerRentStatus, addOrUpdateRentStatus } = require("../controller/RentStatusController");
const  verifyToken = require("../middleware/auth.js");

// Get all rent status for owner's properties (optionally filtered)
router.get("/get-rent-status", verifyToken, getOwnerRentStatus);

// Add or update rent status
router.post("/update-rent-status", verifyToken, addOrUpdateRentStatus);

module.exports = router;
