const express = require("express");
const Bus = require("../models/Bus");
const { authRequired, requireRole } = require("../middleware/auth");
const router = express.Router();

async function seedBusesIfEmpty() {
  try {
    const count = await Bus.countDocuments();
    if (count === 0) {
      await Bus.insertMany([
        {
          busNumber: "ND-4521 (EX-1)",
          route: "Colombo (Bastian Mawatha) → Kandy (Goods Shed)",
          driverName: "Kusal Perera",
          driverContact: "+94 77 123 4567",
          capacity: 45,
          busType: "AC",
          status: "Active",
          latitude: 6.9271,
          longitude: 79.8612,
          speedKmph: 48,
        },
        {
          busNumber: "NC-8812 (EX-E01)",
          route: "Colombo (Maharagama) → Galle Highway Express",
          driverName: "Nimal Fernando",
          driverContact: "+94 71 987 6543",
          capacity: 50,
          busType: "AC",
          status: "Active",
          latitude: 6.8480,
          longitude: 79.9265,
          speedKmph: 72,
        },
        {
          busNumber: "NA-1029 (SLTB)",
          route: "Colombo → Kurunegala (Central Line)",
          driverName: "Sunil Shantha",
          driverContact: "+94 76 555 1212",
          capacity: 54,
          busType: "Non-AC",
          status: "Delayed",
          latitude: 7.2000,
          longitude: 79.9800,
          speedKmph: 32,
        },
        {
          busNumber: "WP-6734 (BIA)",
          route: "Colombo Fort → Katunayake BIA Airport",
          driverName: "Dinesh Gunawardena",
          driverContact: "+94 70 333 4455",
          capacity: 35,
          busType: "AC",
          status: "Active",
          latitude: 7.1808,
          longitude: 79.8841,
          speedKmph: 65,
        }
      ]);
      console.log("🇱🇰 Seeded Sri Lanka public & private transit fleet data");
    }
  } catch (e) {
    console.error("Seed error:", e);
  }
}

seedBusesIfEmpty();

router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find().sort({ updatedAt: -1 });
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", authRequired, requireRole("admin"), async (req, res) => {
  const { busNumber, driverName, driverContact, route, capacity, busType, status, latitude, longitude } = req.body;

  if (!busNumber || !driverName || !route) {
    return res.status(400).json({ message: "busNumber, driverName, and route are required" });
  }

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  try {
    const newBus = new Bus({
      busNumber,
      route,
      driverName,
      driverContact,
      capacity: capacity || 40,
      busType: busType || "AC",
      status: status || "Active",
      latitude: Number.isFinite(lat) ? lat : 6.9271,
      longitude: Number.isFinite(lng) ? lng : 79.8612,
    });

    const savedBus = await newBus.save();
    
    const io = req.app.get("io");
    if (io) io.emit("busAdded", savedBus);

    res.status(201).json(savedBus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id/location", async (req, res) => {
  try {
    const { latitude, longitude, speedKmph, status } = req.body;
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return res.status(400).json({ message: "Valid latitude and longitude required" });
    }

    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    bus.latitude = lat;
    bus.longitude = lng;
    if (Number.isFinite(speedKmph)) bus.speedKmph = speedKmph;
    if (status) bus.status = status;
    bus.lastUpdatedAt = new Date();

    await bus.save();

    const io = req.app.get("io");
    if (io) {
      io.emit("updateBusLocation", {
        busId: bus._id.toString(),
        latitude: bus.latitude,
        longitude: bus.longitude,
        speedKmph: bus.speedKmph,
        status: bus.status,
        updatedAt: bus.lastUpdatedAt,
      });
    }

    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
