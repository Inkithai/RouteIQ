const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    domain: { type: String, default: "", trim: true },
    contactEmail: { type: String, required: true, trim: true },
    plan: { type: String, enum: ["free", "pro", "enterprise"], default: "pro" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Organization || mongoose.model("Organization", organizationSchema);
