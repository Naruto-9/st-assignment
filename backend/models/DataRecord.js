const mongoose = require("mongoose");

// Flexible schema: accepts any CSV columns
const DataRecordSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("DataRecord", DataRecordSchema);
