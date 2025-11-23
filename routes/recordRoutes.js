const express = require("express");
const router = express.Router();

const recordController = require("../controllers/recordController");

// Add new record
router.post("/", recordController.addRecord);

// Get all records
router.get("/", recordController.getAllRecords);

router.get("/search", recordController.searchRecords);

router.get("/sort", recordController.sortRecords);

router.get("/export", recordController.exportRecords);

module.exports = router;

