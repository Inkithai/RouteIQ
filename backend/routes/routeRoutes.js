const express = require("express");
const Route = require("../models/Route");
const { authRequired, requireRole } = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", authRequired, requireRole("admin"), async (req, res) => {
  try {
    const newRoute = new Route(req.body);
    const saved = await newRoute.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
