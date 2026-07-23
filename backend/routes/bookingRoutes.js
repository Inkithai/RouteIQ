const express = require("express");
const Booking = require("../models/Booking");
const Bus = require("../models/Bus");
const { authRequired, requireRole } = require("../middleware/auth");
const router = express.Router();

// Get booked seats for route and travel date
router.get("/seats", async (req, res) => {
  try {
    const { routeId, travelDate } = req.query;
    if (!routeId || !travelDate) {
      return res.status(400).json({ message: "routeId and travelDate parameters are required" });
    }

    const bookings = await Booking.find({
      routeId,
      travelDate,
      status: "confirmed",
    });

    const bookedSeats = bookings.flatMap((b) => b.seats);
    res.json({ routeId, travelDate, bookedSeats });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create booking
router.post("/", authRequired, async (req, res) => {
  try {
    const { routeId, busNumber, from, to, travelDate, seats, amount } = req.body;

    if (!routeId || !from || !to || !travelDate || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ message: "All booking parameters (routeId, from, to, travelDate, seats) are required" });
    }

    // Check existing confirmed seats
    const existingBookings = await Booking.find({
      routeId,
      travelDate,
      status: "confirmed",
    });

    const existingSeats = new Set(existingBookings.flatMap((b) => b.seats));
    const doubleBooked = seats.filter((seat) => existingSeats.has(seat));

    if (doubleBooked.length > 0) {
      return res.status(400).json({
        message: `Seats already booked: ${doubleBooked.join(", ")}`,
      });
    }

    const booking = new Booking({
      userId: req.user.id,
      userName: req.user.name || "Passenger",
      userEmail: req.user.email || "",
      routeId,
      busNumber: busNumber || "BUS-Express",
      from,
      to,
      travelDate,
      seats,
      amount: amount || seats.length * 450,
      status: "confirmed",
      paymentStatus: "paid",
    });

    const saved = await booking.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's bookings
router.get("/my", authRequired, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: Get all bookings
router.get("/", authRequired, requireRole("admin"), async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cancel booking
router.patch("/:id/cancel", authRequired, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking record not found" });

    if (booking.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized to cancel this booking" });
    }

    booking.status = "cancelled";
    await booking.save();
    res.json({ message: "Booking cancelled successfully", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
