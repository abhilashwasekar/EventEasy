const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Event = require("../models/Event");

// Reusable schema for participation
const participationSchema = new mongoose.Schema({
  name: String,
  prn: String,
  branch: String,
  division: String,
  college: String,
  members: String,
  eventId: String,
});

// POST route
router.post("/", async (req, res) => {
  const { eventId, ...formData } = req.body;

  try {
    // Fetch event title using eventId
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Normalize event name for MongoDB collection naming
    const collectionName = event.title.toLowerCase().replace(/\s+/g, "_");

    // Dynamically create model using event name
    const DynamicParticipation = mongoose.model(
      collectionName,
      participationSchema,
      collectionName // specify custom collection name
    );

    // Save to the appropriate collection
    const newEntry = new DynamicParticipation({ ...formData, eventId });
    await newEntry.save();

    res.status(201).json({ message: "Participation registered successfully" });
  } catch (err) {
    console.error("Error saving participation:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
