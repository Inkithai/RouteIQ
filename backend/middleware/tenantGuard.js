const Organization = require("../models/Organization");

async function tenantGuard(req, res, next) {
  try {
    const tenantSlug = req.headers["x-tenant-slug"] || "default-transit";
    
    let org = await Organization.findOne({ slug: tenantSlug });
    if (!org) {
      org = await Organization.create({
        name: "Sri Lanka Transport Board (SLTB)",
        slug: tenantSlug,
        contactEmail: "info@sltb.lk",
        plan: "enterprise"
      });
    }

    req.tenant = org;
    req.tenantId = org._id;
    next();
  } catch (err) {
    console.error("Tenant Guard Error:", err);
    next();
  }
}

module.exports = tenantGuard;
