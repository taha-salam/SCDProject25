require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Import Routes
app.use('/api/records', require('./routes/recordRoutes'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB Error:', err));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Auto-backup
const autoBackup = require("./helpers/backup");

// Run a backup every 30 seconds
setInterval(autoBackup, 30000);

console.log("⏳ Auto-backup system activated (every 30 seconds)");

