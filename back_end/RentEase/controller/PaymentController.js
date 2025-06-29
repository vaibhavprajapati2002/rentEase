// controllers/paymentController.js
const RentTransaction = require("../models/RentTransaction");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
exports.createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};

exports.savePayment = async (req, res) => {
  try {
    const {
      tenantId,
      ownerId,
      propertyId,
      amount,
      razorpay_payment_id,
      razorpay_order_id,
      status,
    } = req.body;

    const newTransaction = new RentTransaction({
      tenantId,
      ownerId,
      propertyId,
      amount,
      razorpay_payment_id,
      razorpay_order_id,
      status,
    });

    const savedTransaction = await newTransaction.save();

    res.status(201).json({ success: true, transaction: savedTransaction });
  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({ success: false, message: "Failed to save transaction", error });
  }
};
 