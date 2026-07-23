const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../../models/User");

function getJwtSecret() { return process.env.JWT_SECRET || "access_secret_2026"; }
function getRefreshSecret() { return process.env.JWT_REFRESH_SECRET || "refresh_secret_2026"; }

function signTokens(user) {
  const payload = { id: user._id.toString(), email: user.email, role: user.role, name: user.name };
  const accessToken = jwt.sign(payload, getJwtSecret(), { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: user._id.toString() }, getRefreshSecret(), { expiresIn: "7d" });
  return { accessToken, refreshToken };
}

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), password: hashedPassword, role: role || "customer" });
    const tokens = signTokens(user);

    res.status(201).json({ message: "Account registered", ...tokens, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "Account not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const tokens = signTokens(user);
    res.json({ message: "Authenticated", ...tokens, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });

    const decoded = jwt.verify(refreshToken, getRefreshSecret());
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User session revoked" });

    const tokens = signTokens(user);
    res.json({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};
