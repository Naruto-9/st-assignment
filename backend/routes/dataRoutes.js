const express = require("express");
const upload = require("../middleware/upload");
const DataRecord = require("../models/DataRecord");
const csvParser = require("csv-parser");
const { Readable } = require("stream");

const router = express.Router();

// Upload CSV
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const results = [];
    const stream = Readable.from(req.file.buffer.toString());

    stream.pipe(csvParser())
      .on("data", (row) => results.push(row))
      .on("end", async () => {
        await DataRecord.insertMany(results);
        res.json({ message: "Upload successful", count: results.length });
      });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// List with pagination
router.get("/data", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const data = await DataRecord.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await DataRecord.countDocuments();
    res.json({ data, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: "Error fetching data", error: err.message });
  }
});

// Search
// routes/dataRoutes.js
router.get("/search", async (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) return res.status(400).json({ message: "Search query required" });

  try {
    const allDocs = await DataRecord.find().limit(200); // fetch a batch
    const results = allDocs.filter(doc =>
      Object.values(doc.toObject()).some(val =>
        typeof val === "string" && val.toLowerCase().includes(query)
      )
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
});



module.exports = router;
