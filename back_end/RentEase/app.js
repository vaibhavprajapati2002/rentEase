const express = require('express');
const userRoutes = require('./routes/user');
const propertyRoutes = require('./routes/Property');
const TenantRoutes = require('./routes/Tenant');
const OwnerRoutes = require('./routes/Owner');
const UtilityRoutes = require('./routes/Utility.js');
const BankDetailsRoutes = require('./routes/BankDetails');
const RentStatusRoutes = require('./routes/RentStatus'); // Assuming you have a RentStatusRoutes file
const app = express();
const cors = require('cors');
const path = require("path");
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // only if you're using cookies
}));

app.use(express.json());
app.use('/', userRoutes);
app.use('/property', propertyRoutes);
app.use('/tenant', TenantRoutes);
app.use('/owner', OwnerRoutes);
app.use('/owner/utilities', UtilityRoutes);
app.use('/bank-details', BankDetailsRoutes);
app.use("/rent-status", RentStatusRoutes); // Add RentStatus routes

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;