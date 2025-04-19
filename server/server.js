const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

app.use("/api/events", require("./routes/events"));
app.use("/api/participation", require("./routes/participation")); // ← 👈 important

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
