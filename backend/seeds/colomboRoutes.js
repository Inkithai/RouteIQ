/**
 * Seed script: Colombo Metropolitan Bus Routes
 * Run: node seeds/colomboRoutes.js
 * Requires: MONGO_URI in .env
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Route = require("../models/Route");
const Bus = require("../models/Bus");
const connectDb = require("../config/db");

const COLOMBO_ROUTES = [
  {
    routeName: "Colombo Fort → Kandy",
    origin: "Colombo Fort",
    destination: "Kandy",
    distanceKm: 116,
    estimatedDurationMinutes: 150,
    farePrice: 520,
    active: true,
    stops: [
      { name: "Colombo Fort Bus Station", latitude: 6.9271, longitude: 79.8612, sequenceOrder: 1 },
      { name: "Pettah Bus Stand", latitude: 6.9487, longitude: 79.8593, sequenceOrder: 2 },
      { name: "Kadawatha Interchange", latitude: 7.0840, longitude: 79.9926, sequenceOrder: 3 },
      { name: "Nittambuwa Station", latitude: 7.2000, longitude: 79.9800, sequenceOrder: 4 },
      { name: "Mawanella Central", latitude: 7.2483, longitude: 80.3458, sequenceOrder: 5 },
      { name: "Kandy Goods Shed", latitude: 7.2906, longitude: 80.6337, sequenceOrder: 6 },
    ],
  },
  {
    routeName: "Colombo Fort → Galle",
    origin: "Colombo Fort",
    destination: "Galle",
    distanceKm: 119,
    estimatedDurationMinutes: 135,
    farePrice: 480,
    active: true,
    stops: [
      { name: "Colombo Fort Bus Station", latitude: 6.9271, longitude: 79.8612, sequenceOrder: 1 },
      { name: "Wellawatte Junction", latitude: 6.8890, longitude: 79.8531, sequenceOrder: 2 },
      { name: "Panadura Bus Stand", latitude: 6.7905, longitude: 79.9057, sequenceOrder: 3 },
      { name: "Kalutara South", latitude: 6.6833, longitude: 79.9000, sequenceOrder: 4 },
      { name: "Beruwala", latitude: 6.5833, longitude: 80.1500, sequenceOrder: 5 },
      { name: "Galle Main Stand", latitude: 6.0535, longitude: 80.2208, sequenceOrder: 6 },
    ],
  },
  {
    routeName: "Colombo Fort → Negombo",
    origin: "Colombo Fort",
    destination: "Negombo",
    distanceKm: 37,
    estimatedDurationMinutes: 55,
    farePrice: 180,
    active: true,
    stops: [
      { name: "Colombo Fort Bus Station", latitude: 6.9271, longitude: 79.8612, sequenceOrder: 1 },
      { name: "Ja-Ela Junction", latitude: 7.0033, longitude: 79.8833, sequenceOrder: 2 },
      { name: "Seeduwa", latitude: 7.0833, longitude: 79.8833, sequenceOrder: 3 },
      { name: "Katunayake Airport", latitude: 7.1500, longitude: 79.8500, sequenceOrder: 4 },
      { name: "Negombo Bus Stand", latitude: 7.2100, longitude: 79.8300, sequenceOrder: 5 },
    ],
  },
  {
    routeName: "Colombo Fort → Matara",
    origin: "Colombo Fort",
    destination: "Matara",
    distanceKm: 160,
    estimatedDurationMinutes: 180,
    farePrice: 650,
    active: true,
    stops: [
      { name: "Colombo Fort Bus Station", latitude: 6.9271, longitude: 79.8612, sequenceOrder: 1 },
      { name: "Kalutara South", latitude: 6.6833, longitude: 79.9000, sequenceOrder: 2 },
      { name: "Ambalangoda", latitude: 6.4500, longitude: 80.0500, sequenceOrder: 3 },
      { name: "Hikkaduwa", latitude: 6.2500, longitude: 80.1000, sequenceOrder: 4 },
      { name: "Galle Main Stand", latitude: 6.0535, longitude: 80.2208, sequenceOrder: 5 },
      { name: "Matara Bus Complex", latitude: 5.9485, longitude: 80.5353, sequenceOrder: 6 },
    ],
  },
  {
    routeName: "Colombo Fort → Nuwara Eliya",
    origin: "Colombo Fort",
    destination: "Nuwara Eliya",
    distanceKm: 180,
    estimatedDurationMinutes: 240,
    farePrice: 780,
    active: true,
    stops: [
      { name: "Colombo Fort Bus Station", latitude: 6.9271, longitude: 79.8612, sequenceOrder: 1 },
      { name: "Kadawatha Interchange", latitude: 7.0840, longitude: 79.9926, sequenceOrder: 2 },
      { name: "Kandy Goods Shed", latitude: 7.2906, longitude: 80.6337, sequenceOrder: 3 },
      { name: "Peradeniya Junction", latitude: 7.2733, longitude: 80.5833, sequenceOrder: 4 },
      { name: "Hatton", latitude: 6.8889, longitude: 80.5833, sequenceOrder: 5 },
      { name: "Nuwara Eliya Bus Stand", latitude: 6.9493, longitude: 80.7888, sequenceOrder: 6 },
    ],
  },
  {
    routeName: "Colombo Fort → Jaffna",
    origin: "Colombo Fort",
    destination: "Jaffna",
    distanceKm: 397,
    estimatedDurationMinutes: 480,
    farePrice: 1250,
    active: true,
    stops: [
      { name: "Colombo Fort Bus Station", latitude: 6.9271, longitude: 79.8612, sequenceOrder: 1 },
      { name: "Kadawatha Interchange", latitude: 7.0840, longitude: 79.9926, sequenceOrder: 2 },
      { name: "Kurunegala", latitude: 7.4863, longitude: 80.3647, sequenceOrder: 3 },
      { name: "Anuradhapura", latitude: 8.3114, longitude: 80.4037, sequenceOrder: 4 },
      { name: "Vavuniya", latitude: 8.7380, longitude: 80.4770, sequenceOrder: 5 },
      { name: "Jaffna Bus Stand", latitude: 9.6615, longitude: 80.0255, sequenceOrder: 6 },
    ],
  },
  {
    routeName: "Colombo Pettah → Kadawatha (Local)",
    origin: "Colombo Pettah",
    destination: "Kadawatha",
    distanceKm: 16,
    estimatedDurationMinutes: 35,
    farePrice: 80,
    active: true,
    stops: [
      { name: "Colombo Pettah Stand", latitude: 6.9487, longitude: 79.8593, sequenceOrder: 1 },
      { name: "Maradana", latitude: 6.9328, longitude: 79.8742, sequenceOrder: 2 },
      { name: "Kelaniya Temple", latitude: 6.9567, longitude: 79.9267, sequenceOrder: 3 },
      { name: "Kiribathgoda", latitude: 6.9700, longitude: 79.9300, sequenceOrder: 4 },
      { name: "Kadawatha Interchange", latitude: 7.0840, longitude: 79.9926, sequenceOrder: 5 },
    ],
  },
  {
    routeName: "Colombo Fort → Gampaha",
    origin: "Colombo Fort",
    destination: "Gampaha",
    distanceKm: 33,
    estimatedDurationMinutes: 55,
    farePrice: 150,
    active: true,
    stops: [
      { name: "Colombo Fort Bus Station", latitude: 6.9271, longitude: 79.8612, sequenceOrder: 1 },
      { name: "Kelaniya Temple", latitude: 6.9567, longitude: 79.9267, sequenceOrder: 2 },
      { name: "Kiribathgoda", latitude: 6.9700, longitude: 79.9300, sequenceOrder: 3 },
      { name: "Kadawatha Interchange", latitude: 7.0840, longitude: 79.9926, sequenceOrder: 4 },
      { name: "Gampaha Bus Stand", latitude: 7.0872, longitude: 80.0144, sequenceOrder: 5 },
    ],
  },
];

// Sample bus fleet seeded on each route
const COLOMBO_BUSES = [
  { busNumber: "WP-CA-1001", route: "Colombo Fort → Kandy", driverName: "Kumara Perera", driverContact: "+94771234001", capacity: 45, busType: "AC", status: "Active", latitude: 6.9271, longitude: 79.8612, speedKmph: 55 },
  { busNumber: "WP-CA-1002", route: "Colombo Fort → Kandy", driverName: "Sunil Jayawardena", driverContact: "+94771234002", capacity: 45, busType: "Non-AC", status: "Active", latitude: 7.0840, longitude: 79.9926, speedKmph: 45 },
  { busNumber: "WP-CA-2001", route: "Colombo Fort → Galle", driverName: "Ruwan Fernando", driverContact: "+94771234003", capacity: 50, busType: "AC", status: "Active", latitude: 6.6833, longitude: 79.9000, speedKmph: 60 },
  { busNumber: "SP-GA-1501", route: "Colombo Fort → Galle", driverName: "Anura Bandara", driverContact: "+94771234004", capacity: 50, busType: "Express", status: "On Route", latitude: 6.0535, longitude: 80.2208, speedKmph: 65 },
  { busNumber: "WP-CA-3001", route: "Colombo Fort → Negombo", driverName: "Dinesh Silva", driverContact: "+94771234005", capacity: 40, busType: "Non-AC", status: "Active", latitude: 7.0033, longitude: 79.8833, speedKmph: 40 },
  { busNumber: "WP-CA-3002", route: "Colombo Fort → Negombo", driverName: "Mahinda Rajapakshe", driverContact: "+94771234006", capacity: 40, busType: "AC", status: "Active", latitude: 7.1500, longitude: 79.8500, speedKmph: 50 },
  { busNumber: "SP-MT-4001", route: "Colombo Fort → Matara", driverName: "Prasanna Kumara", driverContact: "+94771234007", capacity: 50, busType: "Express", status: "On Route", latitude: 6.2500, longitude: 80.1000, speedKmph: 70 },
  { busNumber: "CP-NE-5001", route: "Colombo Fort → Nuwara Eliya", driverName: "Saman Wijesinghe", driverContact: "+94771234008", capacity: 45, busType: "AC", status: "Active", latitude: 7.2906, longitude: 80.6337, speedKmph: 40 },
  { busNumber: "NP-JF-6001", route: "Colombo Fort → Jaffna", driverName: "Vijaya Rajan", driverContact: "+94771234009", capacity: 50, busType: "Sleeper", status: "Active", latitude: 8.3114, longitude: 80.4037, speedKmph: 65 },
  { busNumber: "WP-LC-7001", route: "Colombo Pettah → Kadawatha (Local)", driverName: "Nimal de Silva", driverContact: "+94771234010", capacity: 55, busType: "Non-AC", status: "Active", latitude: 6.9487, longitude: 79.8593, speedKmph: 30 },
  { busNumber: "WP-LC-7002", route: "Colombo Pettah → Kadawatha (Local)", driverName: "Asanka Gunasekara", driverContact: "+94771234011", capacity: 55, busType: "Non-AC", status: "Active", latitude: 6.9567, longitude: 79.9267, speedKmph: 35 },
  { busNumber: "WP-GP-8001", route: "Colombo Fort → Gampaha", driverName: "Lakshman Peris", driverContact: "+94771234012", capacity: 45, busType: "Non-AC", status: "Active", latitude: 7.0872, longitude: 80.0144, speedKmph: 45 },
];

async function seed() {
  await connectDb();

  // Clear existing demo data
  await Route.deleteMany({});
  await Bus.deleteMany({});
  console.log("🧹 Cleared existing routes and buses");

  // Insert routes
  const routes = await Route.insertMany(COLOMBO_ROUTES);
  console.log(`✅ Inserted ${routes.length} Colombo routes`);

  // Link buses to routes
  const busesWithRouteId = COLOMBO_BUSES.map((bus) => {
    const route = routes.find((r) => r.routeName === bus.route);
    return { ...bus, routeId: route ? route._id : null };
  });

  const buses = await Bus.insertMany(busesWithRouteId);
  console.log(`✅ Inserted ${buses.length} buses on Colombo routes`);

  console.log("\n🚍 Seeded Colombo routes:");
  routes.forEach((r) => console.log(`   • ${r.routeName} (${r.distanceKm} km, LKR ${r.farePrice})`));

  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
