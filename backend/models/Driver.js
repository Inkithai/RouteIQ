const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    licenseNumber: { type: String, default: "", trim: true },
    assignedBusId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", default: null },
    status: { type: String, enum: ["Available", "On Duty", "Off Duty"], default: "Available" },
    lastLocation: {
      latitude: { type: Number, default: null },
      longitude: { type: Number, default: null },
      speedKmph: { type: Number, default: 0 },
      lastUpdatedAt: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Driver || mongoose.model("Driver", driverSchema);
