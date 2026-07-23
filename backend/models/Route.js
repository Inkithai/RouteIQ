const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  sequenceOrder: { type: Number, required: true },
});

const routeSchema = new mongoose.Schema(
  {
    routeName: { type: String, required: true, trim: true, unique: true },
    origin: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    distanceKm: { type: Number, default: 0 },
    estimatedDurationMinutes: { type: Number, default: 0 },
    stops: [stopSchema],
    farePrice: { type: Number, default: 100 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Route || mongoose.model("Route", routeSchema);
