const jwt = require("jsonwebtoken");

function getJwtSecret() {
  return process.env.JWT_SECRET || "fallback_jwt_secret_key_change_in_production";
}

function authRequired(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const decoded = jwt.verify(token, getJwtSecret());
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired authorization token" });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) {
      return res.status(403).json({ message: "Forbidden: insufficient permissions" });
    }
    return next();
  };
}

function signToken(user) {
  const payload = {
    id: user._id?.toString() || user.id,
    _id: user._id?.toString() || user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };

  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

module.exports = {
  authRequired,
  requireRole,
  signToken,
};
