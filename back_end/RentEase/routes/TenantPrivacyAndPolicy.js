const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getOwnerPoliciesForTenant } = require("../controller/TenantPrivacyAndPolicy");

router.get("/get-policies", auth, getOwnerPoliciesForTenant);

module.exports = router;
