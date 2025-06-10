require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

// Connect DB and start server
connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
