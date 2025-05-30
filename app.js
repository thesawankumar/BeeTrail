const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const hiveRoutes = require("./routes/hiveRoutes");
const cropRoutes = require("./routes/cropRoutes");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", hiveRoutes);
app.use("/api", cropRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));




module.exports = app;
