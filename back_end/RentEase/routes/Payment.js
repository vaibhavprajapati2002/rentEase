const express = require("express");
const router = express.Router();

const { createOrder, savePayment } = require("../controller/PaymentController");

router.post("/save-payment", savePayment);
router.post("/create-order", createOrder);

module.exports = router;