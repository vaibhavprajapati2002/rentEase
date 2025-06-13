const express = require("express");
const router = express.Router();
const { assignPropertyToTenant } = require("../controller/TenantController");
const authMiddleware = require("../middleware/auth");

router.post("/assign-property", authMiddleware, assignPropertyToTenant);

module.exports = router;
