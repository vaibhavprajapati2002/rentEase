const express = require("express");
const router = express.Router();
const { getOwnerTenants ,unassignTenant} = require("../controller/OwnerController");
const verifyToken = require("../middleware/auth");

router.get("/allTenants", verifyToken, getOwnerTenants);
router.patch("/unassign-tenant/:id", verifyToken, unassignTenant);


module.exports = router;
