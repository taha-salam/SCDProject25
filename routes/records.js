const express = require("express");
const router = express.Router();
const Record = require("../models/Record");
const fs = require("fs");
const path = require("path");

// CREATE
router.post("/", async (req, res) => {
    try {
        const rec = new Record(req.body);
        await rec.save();
        res.json({ message: "Record added", data: rec });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SEARCH
router.get("/search", async (req, res) => {
    const q = req.query.q;
    const results = await Record.find({
        $or: [
            { title: { $regex: q, $options: "i" } },
            { username: { $regex: q, $options: "i" } }
        ]
    });
    res.json(results);
});

// SORT
router.get("/sort", async (req, res) => {
    const by = req.query.by || "createdAt";
    const order = req.query.order === "desc" ? -1 : 1;

    const results = await Record.find().sort({ [by]: order });
    res.json(results);
});

// EXPORT
router.get("/export", async (req, res) => {
    const records = await Record.find();
    const folder = path.join(__dirname, "../backups");

    if (!fs.existsSync(folder)) fs.mkdirSync(folder);

    const filePath = path.join(folder, "export.txt");

    let content = "";
    records.forEach(r => {
        content += `Title: ${r.title}\nUsername: ${r.username}\nPassword: ${r.password}\nCategory: ${r.category}\n\n`;
    });

    fs.writeFileSync(filePath, content);

    res.download(filePath);
});

// STATS
router.get("/stats", async (req, res) => {
    const total = await Record.countDocuments();
    const categories = await Record.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    res.json({ totalRecords: total, categoryBreakdown: categories });
});

module.exports = router;
