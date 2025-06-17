const express = require("express");
const router = express.Router();
const {
  getOwnerRentStatus,
  addOrUpdateRentStatus,
  getRentStatus
} = require("../controller/RentStatusController");
const verifyToken = require("../middleware/auth");

// ✅ GET: View rent status for all properties owned by the logged-in owner
router.get("/get/rent-status", verifyToken, getOwnerRentStatus);

// ✅ POST: Add or update a tenant's rent status for a property/month
router.post("/update/rent-status", verifyToken, addOrUpdateRentStatus);

router.get("/get-rent-status", verifyToken, getRentStatus);

module.exports = router;
