import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import LiveTracking from "./pages/LiveTracking";
import CustomerBooking from "./pages/CustomerBooking";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAllBookings from "./pages/AdminAllBookings";
import BusList from "./pages/BusList";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import AiChatbotModal from "./components/AiChatbotModal";

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0A0E1A] font-sans antialiased text-[#F9FAFB]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Signup" element={<SignupPage />} />
          <Route path="/BusMapPreview" element={<LiveTracking />} />
          <Route path="/BusList" element={<BusList />} />

          {/* Protected Routes */}
          <Route
            path="/book"
            element={
              <ProtectedRoute allow={["customer", "admin"]}>
                <CustomerBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute allow={["customer", "admin"]}>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allow={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/all-bookings"
            element={
              <ProtectedRoute allow={["admin"]}>
                <AdminAllBookings />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Home />} />
        </Routes>
        <AiChatbotModal />
      </div>
    </ErrorBoundary>
  );
}
