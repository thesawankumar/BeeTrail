
const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  floweringStart: { type: Date, required: true },
  floweringEnd: { type: Date, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  recommendedHiveDensity: { type: Number, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  createdAt: { type: Date, default: Date.now },
});

// Geospatial index
cropSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Crop", cropSchema);
