const express = require("express");
const router = express.Router();
const Bus = require("../models/Bus");
const Booking = require("../models/Booking");
const { authRequired, requireRole } = require("../middleware/auth");

router.get("/summary", authRequired, requireRole("admin"), async (req, res) => {
  try {
    const buses = await Bus.find();
    const bookings = await Booking.find({ status: "confirmed" });

    const delayedBuses = buses.filter((b) => b.status === "Delayed");
    const avgDelayMinutes = buses.length > 0 ? (delayedBuses.length * 14.5) / buses.length : 0;

    const totalFleetKms = buses.reduce((acc, b) => acc + (b.speedKmph || 35) * 4.5, 0);
    const avgFuelMileageKmPerLiter = 4.2;
    const fuelConsumedLiters = Math.round(totalFleetKms / avgFuelMileageKmPerLiter);

    const peakHoursDistribution = [
      { hour: "06:00 AM", passengers: 120 },
      { hour: "08:00 AM", passengers: 450 },
      { hour: "10:00 AM", passengers: 210 },
      { hour: "12:00 PM", passengers: 180 },
      { hour: "02:00 PM", passengers: 240 },
      { hour: "05:00 PM", passengers: 510 },
      { hour: "08:00 PM", passengers: 290 },
      { hour: "10:00 PM", passengers: 95 },
    ];

    const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);

    res.json({
      fleetCount: buses.length,
      activeVehicles: buses.filter((b) => b.status === "Active" || b.status === "On Route").length,
      avgDelayMinutes: Math.round(avgDelayMinutes * 10) / 10,
      fuelConsumedLiters,
      totalFleetKms: Math.round(totalFleetKms),
      totalRevenue,
      confirmedBookingsCount: bookings.length,
      peakHoursDistribution,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
