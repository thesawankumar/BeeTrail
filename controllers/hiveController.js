const Hive = require("../models/Hive");
const { validateCoordinates } = require("../utils/validators");

exports.addHive = async (req, res) => {
  const { hiveId, datePlaced, latitude, longitude, numColonies } = req.body;

  if (!validateCoordinates(latitude, longitude)) {
    return res.status(400).json({ error: "Invalid coordinates" });
  }

  try {
    const hive = new Hive({
      hiveId,
      datePlaced,
      latitude,
      longitude,
      numColonies,
    });
    await hive.save();
    res.status(201).json(hive);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: "Hive ID must be unique" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

exports.getHives = async (req, res) => {
  const { startDate, endDate, page = 1, limit = 10 } = req.query;
  let filter = {};

  if (startDate || endDate) {
    filter.datePlaced = {};
    if (startDate) filter.datePlaced.$gte = new Date(startDate);
    if (endDate) filter.datePlaced.$lte = new Date(endDate);
  }

  try {
    const hives = await Hive.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(hives);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
