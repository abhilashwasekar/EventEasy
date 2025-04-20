const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Event = require("../models/Event");

// Updated schema with compound unique index
const participationSchema = new mongoose.Schema({
  name: String,
  prn: String,
  branch: String,
  division: String,
  college: String,
  members: String,
  eventId: String,
});

// Compound index to prevent duplicate registration per event
participationSchema.index({ prn: 1, eventId: 1 }, { unique: true });

router.post("/", async (req, res) => {
  const { eventId, ...formData } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const collectionName = event.title.toLowerCase().replace(/\s+/g, "_");

    // Use or create the model dynamically
    const DynamicParticipation = mongoose.models[collectionName] || mongoose.model(
      collectionName,
      participationSchema,
      collectionName
    );

    // Try to save the new entry
    const newEntry = new DynamicParticipation({ ...formData, eventId });
    await newEntry.save();

    res.status(201).json({ message: "Participation registered successfully" });

  } catch (err) {
    console.error("Error saving participation:", err);

    // Handle duplicate registration
    if (err.code === 11000) {
      return res.status(400).json({ message: "You have already registered for this event." });
    }

    res.status(500).json({ message: "Server error" });
  }
});


// GET route to check if a user is already registered for an event
router.get("/check", async (req, res) => {
  const { eventId, prn } = req.query;

  if (!eventId || !prn) {
    return res.status(400).json({ message: "Missing eventId or prn" });
  }

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const collectionName = event.title.toLowerCase().replace(/\s+/g, "_");

    const DynamicParticipation = mongoose.models[collectionName] || mongoose.model(
      collectionName,
      participationSchema,
      collectionName
    );

    const existing = await DynamicParticipation.findOne({ eventId, prn });

    if (existing) {
      return res.status(200).json({ registered: true, message: "Already registered" });
    } else {
      return res.status(200).json({ registered: false, message: "Not registered yet" });
    }
  } catch (err) {
    console.error("Error checking registration:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
