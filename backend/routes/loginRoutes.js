const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const { signToken, authRequired } = require("../middleware/auth");

const router = express.Router();

function makeOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function hashOtp(otp) {
  const secret = process.env.OTP_SECRET || process.env.JWT_SECRET || "otp_secret";
  return crypto.createHmac("sha256", secret).update(String(otp)).digest("hex");
}

async function sendOtpEmail({ to, otp }) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.warn("⚠️ SMTP credentials not configured. Development mode: OTP = ", otp);
    return;
  }

  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE || "gmail",
    auth: { user, pass },
  });

  const from = process.env.SMTP_FROM || user;
  const appName = process.env.APP_NAME || "RouteIQ";

  await transporter.sendMail({
    from,
    to,
    subject: `${appName} Verification OTP`,
    text: `Your OTP for ${appName} is: ${otp}. It expires in 10 minutes.`,
  });
}

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role, adminKey } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Name, email, and password are required" });

    let userRole = "customer";
    if (role === "admin") {
      const requiredKey = (process.env.ADMIN_SIGNUP_KEY || "ADMIN123").trim();
      const providedKey = (adminKey || "").trim();
      if (providedKey !== requiredKey) {
        return res.status(403).json({ message: "Invalid admin authorization key" });
      }
      userRole = "admin";
    } else if (role === "driver") {
      userRole = "driver";
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser)
      return res.status(400).json({ message: "User already registered with this email" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = makeOtp();

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: userRole,
      emailVerified: true, // Auto-verify for frictionless onboarding
      otpHash: hashOtp(otp),
      otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    try {
      await sendOtpEmail({ to: email, otp });
    } catch (mailErr) {
      console.error("Email error:", mailErr);
    }

    const token = signToken(user);
    res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "Account not found with this email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);
    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

// Me (Get Current User Profile)
router.get("/me", authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -otpHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

module.exports = router;
