const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: { type: String, default: "Passenger" },
    userEmail: { type: String, default: "" },
    routeId: { type: String, required: true, trim: true },
    busNumber: { type: String, default: "Bus" },
    from: { type: String, required: true, trim: true },
    to: { type: String, required: true, trim: true },
    travelDate: { type: String, required: true, trim: true },
    seats: [{ type: String, required: true }],
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
    paymentStatus: { type: String, enum: ["paid", "pending"], default: "paid" },
  },
  { timestamps: true }
);

bookingSchema.index({ routeId: 1, travelDate: 1 });
bookingSchema.index({ userId: 1 });

module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
