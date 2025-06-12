const express = require('express');
const userRoutes = require('./routes/user');
const propertyRoutes = require('./routes/Property');
const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // only if you're using cookies
}));

app.use(express.json());
app.use('/', userRoutes);
app.use('/property', propertyRoutes);

module.exports = app;