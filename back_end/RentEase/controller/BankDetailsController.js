const User = require("../models/UserModel");
const BankDetails = require("../models/BankDetailsModel");


exports.getBankDetails = async (req, res) => {
  try {
    const ownerId = req.user.id;

    // Find bank details for the current owner
    const bankDetails = await BankDetails.findOne({ owner: ownerId });
    if (!bankDetails) {
      return res.status(404).json({ message: "Bank details not found" });
    }  
    res.json(bankDetails);
  } catch (err) {
    console.error("Error fetching bank details:", err);
    res.status(500).json({ message: "Server error while fetching bank details" });
  } 
}
exports.updateBankDetails = async (req, res) => {
  const ownerId = req.user.id;
  const { bankName, accountNumber, ifscCode, accountHolderName, upiId ,upiNumber} = req.body;

  try {
    // Find existing bank details or create a new one
    let bankDetails = await BankDetails.findOne({ owner: ownerId });
    if (!bankDetails) {
      bankDetails = new BankDetails({ owner: ownerId });
    }

    // Update bank details
    bankDetails.bankName = bankName;
    bankDetails.accountNumber = accountNumber;
    bankDetails.ifscCode = ifscCode;
    bankDetails.accountHolderName = accountHolderName;
    bankDetails.upiId = upiId;
    bankDetails.upiNumber = upiNumber;

    await bankDetails.save();
    res.status(200).json({ message: "Bank details updated successfully", bankDetails });
  } catch (error) {
    console.error("Error updating bank details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};