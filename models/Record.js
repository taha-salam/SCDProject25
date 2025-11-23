const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    title: String,
    username: String,
    password: String,
    category: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Record", recordSchema);
