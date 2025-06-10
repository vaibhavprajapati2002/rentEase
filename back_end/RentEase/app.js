const express = require('express');
const userRoutes = require('./routes/user');
const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // only if you're using cookies
}));

app.use(express.json());
app.use('/', userRoutes);

module.exports = app;