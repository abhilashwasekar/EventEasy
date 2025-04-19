// server/routes/registration.js

const express = require("express");
const router = express.Router();
const Registration = require("../models/registration"); // Adjust the path as necessary

router.post("/", async (req, res) => {
  try {
    const newEntry = new Registration(req.body);
    await newEntry.save();
    res.status(201).json({ message: "Registration saved" });
  } catch (err) {
    console.error("Error saving registration:", err);
    res.status(500).json({ error: "Failed to save registration" });
  }
});

module.exports = router;
