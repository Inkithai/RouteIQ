# 📖 RouteIQ 2.0 - Local Setup & Free Cloud Deployment Guide

This comprehensive guide covers how to set up, configure environment variables, run locally, and deploy **RouteIQ 2.0** completely for free using modern cloud hosting services.

---

## 🛠️ Section 1: Local Development Setup

### 1. System Prerequisites
Ensure you have the following software installed on your machine:
- **Node.js**: v18.0.0 or higher (`node -v`)
- **npm**: v9.0.0 or higher (`npm -v`)
- **Git**: (`git --version`)
- **MongoDB**: Local MongoDB instance or free MongoDB Atlas cluster.

---

### 2. Project Clone & Directory Structure
```bash
# Clone your repository
git clone https://github.com/Inkithai/routeiq.git
cd routeiq
```

The repository contains two main applications:
- `/backend`: Express.js REST API & Socket.IO WebSocket telemetry server.
- `/frontend`: Vite + React SPA dashboard and interactive live map interface.

---

### 3. Installing Dependencies

#### Step A: Install Backend Packages
```bash
cd backend
npm install
```

#### Step B: Install Frontend Packages
```bash
cd ../frontend
npm install
```

---

## 🔑 Section 2: Environment Variables Specification

Environment variables configure database connectivity, JWT secret signatures, Stripe payment processing keys, and cross-origin resource sharing (CORS).

### 1. Backend Environment Configuration (`backend/.env`)

Create a `.env` file inside the `backend/` directory:

```env
# Server Port Configuration
PORT=5000
NODE_ENV=development

# Database Connection (MongoDB Atlas or Local MongoDB)
MONGO_URI=mongodb+srv://<db_user>:<db_password>@cluster0.mongodb.net/routeiq-db?retryWrites=true&w=majority

# JWT Authentication Secrets
JWT_SECRET=routeiq_access_token_secret_key_2026_change_in_prod
JWT_REFRESH_SECRET=routeiq_refresh_token_secret_key_2026_change_in_prod
OTP_SECRET=routeiq_otp_hmac_secret_2026

# Admin Signup Protection Key
ADMIN_SIGNUP_KEY=ADMIN123

# Allowed Frontend Client URL (For CORS Whitelisting)
FRONTEND_URL=http://localhost:5173

# Stripe Payment Gateway Credentials (Optional / Dev Sandbox Mode)
STRIPE_SECRET_KEY=sk_test_51Px...

# Email Gateway Settings (Nodemailer SMTP for OTPs)
SMTP_SERVICE=gmail
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your_email@gmail.com
APP_NAME=RouteIQ
```

#### Detailed Breakdown of Backend Variables:
| Variable Name | Description | Required? | Default / Example |
| :--- | :--- | :---: | :--- |
| `PORT` | Local HTTP server execution port | Yes | `5000` |
| `MONGO_URI` | MongoDB Connection URI string | Yes | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key used to sign 15-minute access JWTs | Yes | Any random 32+ char string |
| `JWT_REFRESH_SECRET` | Secret key used to sign 7-day refresh JWTs | Yes | Any random 32+ char string |
| `ADMIN_SIGNUP_KEY` | Secret phrase required when registering an admin | Yes | `ADMIN123` |
| `FRONTEND_URL` | URL allowed to make HTTP and WebSocket requests | Yes | `http://localhost:5173` |
| `STRIPE_SECRET_KEY` | Secret API key from Stripe Dashboard | No (Fallback simulated) | `sk_test_...` |

---

### 2. Frontend Environment Configuration (`frontend/.env`)

Create a `.env` file inside the `frontend/` directory:

```env
# Backend REST & Socket.IO URL
VITE_API_BASE_URL=http://localhost:5000
```

---

## 🏃 Section 3: Execution & Testing Commands

### 1. Starting Development Servers

#### Option 1: Running in Two Terminal Windows

**Terminal 1 (Backend API & Telemetry Engine)**:
```bash
cd backend
npm run dev
```
*(Runs backend server at `http://localhost:5000` with hot-reloading)*

**Terminal 2 (Frontend Interface)**:
```bash
cd frontend
npm run dev
```
*(Runs Vite development server at `http://localhost:5173`)*

---

### 2. Running Test Suite & Linter

```bash
# Execute Backend Sanity Unit Tests:
cd backend
npm test

# Execute Frontend ESLint Static Analysis:
cd frontend
npm run lint

# Test Production Vite Bundle Build:
cd frontend
npm run build
```

---

## 🚀 Section 4: Free Cloud Deployment Guide

You can deploy the full stack completely for free using:
- **Database**: MongoDB Atlas Free M0 Cluster
- **Backend API**: Render.com Web Service / Koyeb / Railway (Free Tiers)
- **Frontend App**: Vercel / Netlify (Free Tiers)

---

### Step 1: Deploy Database on MongoDB Atlas (Free Tier)
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free **M0 Shared Cluster**.
3. Under **Database Access**, create a user with a secure password.
4. Under **Network Access**, add IP `0.0.0.0/0` (Allows access from cloud deployment providers).
5. Click **Connect** -> **Connect your application** and copy the URI string.

---

### Step 2: Deploy Backend API on Render.com (Free Tier)
1. Push your code to your GitHub repository.
2. Log in to [Render.com](https://render.com) and click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Set the following settings:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. In the **Environment Variables** section on Render, add:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `MONGO_URI`: *(Your MongoDB Atlas URI from Step 1)*
   - `JWT_SECRET`: *(Your secure secret)*
   - `JWT_REFRESH_SECRET`: *(Your secure refresh secret)*
   - `FRONTEND_URL`: *(Your Vercel frontend URL, e.g. `https://routeiq.vercel.app`)*
6. Click **Deploy Web Service**.
7. Copy your deployed backend URL (e.g. `https://routeiq-backend.onrender.com`).

---

### Step 3: Deploy Frontend Application on Vercel (Free Tier)
1. Log in to [Vercel.com](https://vercel.com) and click **Add New** -> **Project**.
2. Select your GitHub repository.
3. In the project deployment settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables** and add:
   - `VITE_API_BASE_URL`: `https://routeiq-backend.onrender.com` *(Your Render backend URL from Step 2)*
5. Click **Deploy**.

---

### Step 4: Final Domain Verification
1. Open your backend dashboard on Render and ensure `FRONTEND_URL` matches your deployed Vercel domain (`https://your-app.vercel.app`).
2. Open your Vercel URL in your browser or mobile phone to verify live telemetry maps, driver location sharing, seat bookings, and PWA offline storage!
