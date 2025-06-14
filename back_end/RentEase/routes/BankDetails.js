const express = require("express");
const router = express.Router();
const { getBankDetails , updateBankDetails } = require("../controller/BankDetailsController");
const verifyToken = require("../middleware/auth");

router.get("/bank-details/:id", verifyToken, getBankDetails);
router.post("/update-bank-details/:id", verifyToken, updateBankDetails);


module.exports = router;
