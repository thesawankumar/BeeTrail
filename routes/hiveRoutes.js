const express = require("express");
const router = express.Router();
const { addHive, getHives } = require("../controllers/hiveController");

router.post("/hives", addHive);
router.get("/all", getHives);

module.exports = router;
