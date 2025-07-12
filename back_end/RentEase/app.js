const express = require('express');
const userRoutes = require('./routes/user');
const propertyRoutes = require('./routes/Property');
const TenantRoutes = require('./routes/Tenant');
const OwnerRoutes = require('./routes/Owner');
const UtilityRoutes = require('./routes/Utility.js');
const BankDetailsRoutes = require('./routes/BankDetails');
const RentStatusRoutes = require('./routes/RentStatus');
const OwnerTermsAndConditionRoutes = require('./routes/OwnerTermsAndCondition');
const PrivacyAndPolicyRoutes = require('./routes/PrivacyAndPolicy');
const TenantPrivacyAndPolicyRoutes = require('./routes/TenantPrivacyAndPolicy');
const TenantTermsAndConditionRoutes = require('./routes/TenantTermsAndCondition');
const RentalAgreementRoutes = require('./routes/RentalAgreement');



const PaymentRoutes = require('./routes/Payment'); // Import the Payment routes
const app = express();
const cors = require('cors');
const path = require("path");
app.use(cors({
  origin: ["http://localhost:5173", "http://192.168.29.158:5173", "https://rentease-4158.onrender.com"], // ✅ Add your local IP here
  credentials: true
}));

app.use(express.json());
app.use('/', userRoutes);
app.use('/property', propertyRoutes);
app.use('/tenant', TenantRoutes);
app.use('/owner', OwnerRoutes);
app.use('/owner/utilities', UtilityRoutes);
app.use('/bank-details', BankDetailsRoutes);
app.use("/rent-status", RentStatusRoutes); 
app.use('/owner/terms', OwnerTermsAndConditionRoutes);
app.use('/owner/privacy', PrivacyAndPolicyRoutes);

app.use("/api/payment",PaymentRoutes );
app.use('/tenant/privacy-and-policy', TenantPrivacyAndPolicyRoutes);
app.use('/tenant/terms-and-conditions', TenantTermsAndConditionRoutes);
app.use('/rental-agreement', RentalAgreementRoutes);



app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;