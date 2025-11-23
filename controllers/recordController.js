const Record = require("../models/record");

exports.addRecord = async (req, res) => {
  try {
    const record = new Record(req.body);
    await record.save();
    res.json({ message: "Record added", data: record });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchRecords = async (req, res) => {
  try {
    const { title, category } = req.query;

    const filter = {};

    if (title) filter.title = { $regex: title, $options: "i" };
    if (category) filter.category = { $regex: category, $options: "i" };

    const records = await Record.find(filter);
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sortRecords = async (req, res) => {
  try {
    const { field = "createdAt", order = "asc" } = req.query;

    // Allowed fields for sorting
    const validFields = ["title", "category", "createdAt"];

    if (!validFields.includes(field)) {
      return res.status(400).json({ message: "Invalid sort field" });
    }

    const sortOrder = order === "desc" ? -1 : 1;

    const records = await Record.find().sort({ [field]: sortOrder });
    res.json(records);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const fs = require("fs");

exports.exportRecords = async (req, res) => {
  try {
    const records = await Record.find();

    // Convert to JSON string
    const jsonData = JSON.stringify(records, null, 2);

    // Create a temporary file
    const filePath = "records_export.json";
    fs.writeFileSync(filePath, jsonData);

    // Send the file as download
    res.download(filePath, "records_export.json", err => {
      if (err) console.error(err);
      fs.unlinkSync(filePath); // Delete after sending
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
