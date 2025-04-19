const mongoose = require("mongoose");

const participationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prn: { type: String, required: true },
  branch: { type: String, required: true },
  division: { type: String, required: true },
  college: { type: String, required: true },
  members: { type: String, required: true },
  eventId: { type: String }, // Optional for linking to event
});

module.exports = mongoose.model("Participation", participationSchema);
