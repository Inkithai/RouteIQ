# 🚌 RouteIQ - AI-Powered Transit Telemetry & SaaS Fleet Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/Inkithai/RouteIQ)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/frontend-React%2018%20%2B%20Vite%205-61dafb.svg)](https://react.dev)
[![Node.js](https://img.shields.io/badge/backend-Node.js%2020%20%2B%20Express%204-green.svg)](https://nodejs.org)
[![Docker](https://img.shields.io/badge/containerized-Docker%20%2B%20Compose-2496ed.svg)](https://www.docker.com)

**RouteIQ** is an enterprise-grade, full-stack transit management, real-time satellite vehicle tracking, and intelligent seat reservation system. Designed as a SaaS-ready multi-tenant platform, it features low-latency WebSocket coordinate streaming, AI-driven traffic arrival estimation, mobile driver location broadcasting, Stripe card checkout, and PWA offline ticket vault storage.

---

## 🌟 Key Platform Features

### 📡 Real-Time Telemetry & Driver GPS Broadcast Mode
- **Zero-Latency Telemetry**: Bidirectional WebSocket communication powered by `Socket.IO`.
- **HTML5 Geolocation Driver Mode**: Drivers can toggle live tracking from any mobile device, streaming latitude, longitude, and calculated speed (km/h) to connected riders in real time.
- **Proximity Alerts**: Integrated Firebase Cloud Messaging (FCM) dispatching alerts when a bus is 2 stops away.

### 🗺️ Dynamic Interactive Radar Maps
- **CartoDB Dark Tiles**: Modern, responsive dark-mode map tiles styled for high visibility.
- **Route Polyline Overlay**: Dashed vector paths (`Leaflet <Polyline>`) displaying active transit corridors.
- **Bus Stop Markers**: Dynamic station markers displaying stop order, names, and dynamic arrival tooltips.
- **Custom Marker Badges**: CSS HTML/SVG div icons with live green status indicators.

### 🤖 AI Transit Intelligence Engine (`/api/ai`)
- **Machine Learning ETA Regressor**: Computes travel times factoring in urban traffic levels and weather conditions (rain, storms).
- **Occupancy & Demand Predictor**: Forecasts peak bus passenger load percentages and crowd density categories.
- **Smart Passenger AI Chatbot**: Embedded floating assistant answering rider questions regarding schedules, fares, and delays.

### 💳 Commercial Stripe Seat Booking System
- **Interactive 32-Seat Grid Matrix**: Real-time seat lock state with availability checking per travel date.
- **256-Bit Encrypted Stripe Checkout**: Card intent processing via `stripe` integration.
- **PWA Offline Ticket Vault**: Service Worker caching (`sw.js`) and IndexedDB local storage (`IndexedDB`) enabling instant ticket verification without cellular connection.

### 📊 SaaS Operations Analytics & Multi-Tenancy
- **Multi-Tenant Operator Headers**: Fleet partitioning using `X-Tenant-Slug` headers.
- **Fleet Metrics Dashboard**: Aggregates average trip delays (mins), total fuel consumption (Liters at 4.2 km/L), and peak passenger hour density histograms.

---

## 🏗️ Architecture & Folder Structure

RouteIQ follows a modular, domain-driven architecture:

```
repo/
 ├── backend/
 │    ├── src/
 │    │    └── modules/
 │    │         ├── ai/           # AI ETA regression, occupancy forecasting, chatbot
 │    │         ├── auth/         # JWT Access (15m) & Refresh Token (7d) rotation
 │    │         ├── analytics/    # Operational fleet KPI aggregations
 │    │         ├── booking/      # Seat conflict locks & reservation management
 │    │         ├── bus/          # Bus CRUD & GPS telemetry patch endpoints
 │    │         ├── payment/      # Stripe payment intent service
 │    │         └── route/        # Waypoints & transit stop definitions
 │    ├── middleware/             # Auth JWT, TenantGuard, RateLimiter, ErrorHandler
 │    ├── models/                 # Mongoose ODM schemas (User, Bus, Booking, Organization)
 │    ├── services/               # Firebase FCM proximity messaging
 │    ├── tests/                  # Unit & integration sanity tests
 │    └── Dockerfile              # Production Node Alpine container
 ├── frontend/
 │    ├── public/                 # PWA Manifest & sw.js Service Worker
 │    ├── src/
 │    │    ├── components/        # Driver tracking HUD, BusMapPreview, AI Chatbot Modal
 │    │    ├── lib/               # Auth storage, Geo Haversine, IndexedDB storage
 │    │    ├── pages/             # Admin Dashboard, Live Tracking, Customer Booking
 │    │    └── types/             # TypeScript interface contracts
 │    └── Dockerfile              # Multi-stage Nginx builder container
 └── docker-compose.yml           # Full stack container orchestration
```

---

## 🛠️ Tech Stack Overview

| Tier | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 5, Tailwind CSS v3, Lucide React, Leaflet, React-Leaflet, Socket.IO Client |
| **Backend** | Node.js 20, Express 4.19, Mongoose ODM, Socket.IO Server, Helmet, Express-Rate-Limit, Zod |
| **Database** | MongoDB Atlas / Local MongoDB Document Store |
| **DevOps & PWA** | Multi-Stage Docker, Docker Compose, Service Workers, IndexedDB, GitHub Actions CI/CD |

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Active connection URI

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/Inkithai/RouteIQ.git
cd RouteIQ

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Configure Environment Variables

**Backend (`backend/.env`)**:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/routeiq-db?retryWrites=true&w=majority
JWT_SECRET=super_secret_jwt_key_2026
JWT_REFRESH_SECRET=super_secret_refresh_key_2026
ADMIN_SIGNUP_KEY=ADMIN123
FRONTEND_URL=http://localhost:5173
STRIPE_SECRET_KEY=sk_test_mock_stripe_key
```

**Frontend (`frontend/.env`)**:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Run Development Servers
```bash
# Terminal 1: Backend API & WebSocket Server
cd backend
npm run dev

# Terminal 2: Frontend Vite App
cd frontend
npm run dev
```

Visit the application at `http://localhost:5173`.

---

## 🐳 Docker Deployment

To launch the entire stack (MongoDB + Express Backend + Nginx Static Frontend) with a single command:

```bash
docker-compose up --build -d
```

Access the application at `http://localhost`.

---

## 🧪 Testing & Code Quality Audit

```bash
# Run Backend Unit Tests:
cd backend
npm test

# Run Frontend ESLint:
cd frontend
npm run lint

# Compile Production Asset Bundle:
cd frontend
npm run build
```

---

## 📄 License & Attribution

Distributed under the MIT License. Developed as a modernized SaaS application for **RouteIQ Platform**.
