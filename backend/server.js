require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const { Server } = require("socket.io");
const connectDb = require("./config/db");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

// 🔒 Security Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(morgan("dev"));

// 🚦 Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { message: "Too many requests from this IP, please try again later." }
});
app.use("/api/", limiter);

// 🌐 CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.CORS_ORIGIN,
  "http://localhost:5173",
  "http://localhost:3000",
  "https://bus-tracking-mern.vercel.app",
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }
    return callback(null, true); // Permissive in dev/staging mode
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// 🗄️ Database Connection
connectDb();

// 🛣️ Route Handlers
const busRoutes = require("./routes/busRoutes");
const authRoutes = require("./routes/loginRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const driverRoutes = require("./routes/driverRoutes");
const routeRoutes = require("./routes/routeRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const aiRoutes = require("./src/modules/ai/aiRoutes");
const modularAuthRoutes = require("./src/modules/auth/authRoutes");
const tenantGuard = require("./middleware/tenantGuard");

app.use("/api/buses", busRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth/v2", modularAuthRoutes);
app.use(tenantGuard);

app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString(), uptime: process.uptime() });
});

app.get("/", (req, res) => {
  res.send("✅ RouteIQ Colombo — Sri Lanka Smart Transit Engine 2.0 Running & Operational");
});

// ⚡ Socket.IO Integration
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log(`🔌 Client connected to Socket.IO: ${socket.id}`);

  socket.on("joinDriverRoom", (driverId) => {
    socket.join(`driver_${driverId}`);
    console.log(`Driver joined room: driver_${driverId}`);
  });

  socket.on("driverLocationUpdate", (data) => {
    // Broadcast live location update to all listeners
    io.emit("updateBusLocation", data);
  });

  socket.on("disconnect", () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

// 404 & Global Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 RouteIQ Colombo Engine 2.0 server listening on port ${PORT}`);
});

module.exports = { app, server };
