const express = require("express");
const router = express.Router();
const { updateOwnerPrivacy , getOwnerPrivacy} = require("../controller/PrivacyAndPolicy");
const verifyToken = require("../middleware/auth");

router.get("/get-privacy", verifyToken, getOwnerPrivacy);
router.post("/update-privacy", verifyToken, updateOwnerPrivacy);


module.exports = router;
