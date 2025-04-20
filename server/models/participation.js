const mongoose = require("mongoose");

const participationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prn: { type: String, required: true },
  branch: { type: String, required: true },
  division: { type: String, required: true },
  college: { type: String, required: true },
  members: { type: String, required: true },
  eventId: { type: String, required: true }, // Now required to ensure uniqueness
});

// Compound index to prevent same PRN from registering for the same event more than once
participationSchema.index({ prn: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model("Participation", participationSchema);
