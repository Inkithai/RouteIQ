const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busNumber: { type: String, required: true, trim: true, unique: true },
    route: { type: String, required: true, trim: true },
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route", default: null },
    driverName: { type: String, required: true, trim: true },
    driverContact: { type: String, default: "", trim: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", default: null },
    capacity: { type: Number, default: 40, min: 1 },
    busType: { type: String, enum: ["AC", "Non-AC", "Sleeper", "Express"], default: "Non-AC" },
    status: { type: String, enum: ["Active", "Inactive", "Delayed", "On Route", "Maintenance"], default: "Active" },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    speedKmph: { type: Number, default: 0 },
    heading: { type: Number, default: 0 },
    lastUpdatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// busNumber index already defined via unique
busSchema.index({ route: 1 });

module.exports = mongoose.models.Bus || mongoose.model("Bus", busSchema);
