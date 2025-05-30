const Crop = require("../models/Crop");
const { validateCoordinates } = require("../utils/validators");


exports.addCrop = async (req, res) => {
  const {
    name,
    floweringStart,
    floweringEnd,
    latitude,
    longitude,
    recommendedHiveDensity,
  } = req.body;

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  if (!validateCoordinates(lat, lng)) {
    return res.status(400).json({ error: "Invalid coordinates" });
  }

  try {
    const crop = new Crop({
      name,
      floweringStart,
      floweringEnd,
      latitude: lat,
      longitude: lng,
      recommendedHiveDensity,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
    });

    await crop.save();
    res.status(201).json(crop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getNearbyCrops = async (req, res) => {
  const {
    latitude,
    longitude,
    radius = 100,
    date = new Date().toISOString(),
  } = req.query;

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  if (!validateCoordinates(lat, lng)) {
    return res.status(400).json({ error: "Invalid coordinates" });
  }

  const dateObj = new Date(date);

  try {
    const crops = await Crop.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lng, lat],
          },
          distanceField: "dist.calculated",
          spherical: true,
          maxDistance: radius * 1000,
        },
      },
      {
        $match: {
          floweringStart: { $lte: dateObj },
          floweringEnd: { $gte: dateObj },
        },
      },
    ]);
    res.json(crops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
