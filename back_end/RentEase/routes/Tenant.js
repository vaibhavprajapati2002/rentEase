const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); 
const { assignPropertyToTenant ,getOwnerInfo , getProfile,updateProfile} = require("../controller/TenantController");
const authMiddleware = require("../middleware/auth");

router.post("/assign-property", authMiddleware, assignPropertyToTenant);
router.get("/owner-info", authMiddleware, getOwnerInfo);
router.get("/tenant-profile", authMiddleware, getProfile);   // GET /tenant/profile
router.put("/update-tenant-profile", authMiddleware, upload.single("profileImage"), updateProfile);

module.exports = router;
