const express = require("express");
const router = express.Router();
const { updateOwnerTerms , getOwnerTerms } = require("../controller/OwnerTermsAndConditionController");
const verifyToken = require("../middleware/auth");

router.get("/get-terms", verifyToken, getOwnerTerms);
router.post("/update-terms", verifyToken, updateOwnerTerms);


module.exports = router;
