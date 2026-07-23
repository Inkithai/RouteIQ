const express = require("express");
const Driver = require("../models/Driver");
const Bus = require("../models/Bus");
const { authRequired, requireRole } = require("../middleware/auth");
const router = express.Router();

router.get("/", authRequired, requireRole("admin"), async (req, res) => {
  try {
    const drivers = await Driver.find().populate("assignedBusId");
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/broadcast-gps", authRequired, requireRole("driver", "admin"), async (req, res) => {
  try {
    const { busId, latitude, longitude, speedKmph } = req.body;
    if (!busId || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: "busId, latitude, and longitude required" });
    }

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Assigned bus not found" });

    bus.latitude = parseFloat(latitude);
    bus.longitude = parseFloat(longitude);
    if (speedKmph !== undefined) bus.speedKmph = parseFloat(speedKmph);
    bus.lastUpdatedAt = new Date();

    await bus.save();

    const io = req.app.get("io");
    if (io) {
      io.emit("updateBusLocation", {
        busId: bus._id.toString(),
        busNumber: bus.busNumber,
        route: bus.route,
        latitude: bus.latitude,
        longitude: bus.longitude,
        speedKmph: bus.speedKmph,
        lastUpdatedAt: bus.lastUpdatedAt,
      });
    }

    res.json({ message: "GPS telemetry updated successfully", bus });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
