const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  title: String,
  username: String,
  password: String,
  category: String,
}, { timestamps: true });

module.exports = mongoose.model("Record", recordSchema);
