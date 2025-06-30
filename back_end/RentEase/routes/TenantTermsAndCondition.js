const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getOwnerTermsForTenant } = require("../controller/TenantTermsAndCondition");

router.get("/get-terms", auth, getOwnerTermsForTenant);

module.exports = router;
