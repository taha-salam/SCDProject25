const fs = require("fs");
const path = require("path");
const Record = require("../models/record");

async function autoBackup() {
  try {
    const records = await Record.find();
    const data = JSON.stringify(records, null, 2);

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `backup-${timestamp}.json`;
    const filePath = path.join(__dirname, "../backups", fileName);

    fs.writeFileSync(filePath, data);

    console.log(`📦 Backup created: ${fileName}`);
  } catch (err) {
    console.error("Backup error:", err);
  }
}

module.exports = autoBackup;
