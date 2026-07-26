import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { setAuthToken, setAuthUser } from "../lib/auth";
import { Bus, ArrowRight } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

export default function SignupPage() {
  const [role, setRole] = useState("customer");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminKey: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role,
        adminKey: role === "admin" ? form.adminKey : undefined,
      };

      const res = await axios.post(`${API_BASE_URL}/api/auth/signup`, payload);
      if (res.data?.token) {
        setAuthToken(res.data.token);
        setAuthUser(res.data.user);
      }

      const userRole = res.data?.user?.role || role;
      if (userRole === "admin") {
        navigate("/dashboard/admin");
      } else if (userRole === "driver") {
        navigate("/BusMapPreview");
      } else {
        navigate("/dashboard/customer");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center bg-gradient-to-br from-[#0A0E1A] via-[#111827] to-[#0A0E1A] p-4 sm:p-6">
      <div className="w-full max-w-md bg-[#111827]/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-[#374151]/40 p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#4F6BF6]/15 text-[#4F6BF6] rounded-2xl mb-3">
            <Bus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F9FAFB]">Create Account</h1>
          <p className="text-[#9CA3AF] text-sm mt-1">Join RouteIQ — the operating system for modern bus operations</p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-3 gap-2 bg-[#1F2937]/40 p-1.5 rounded-2xl mb-6">
          {[
            { id: "customer", label: "Passenger" },
            { id: "driver", label: "Driver" },
            { id: "admin", label: "Admin" },
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setRole(r.id);
                setError("");
              }}
              className={`py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                role === r.id
                  ? "bg-[#4F6BF6] text-white shadow-lg shadow-[#4F6BF6]/20"
                  : "text-[#9CA3AF] hover:text-[#F9FAFB]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-[#1F2937]/60 border border-[#374151]/40 rounded-xl focus:bg-[#1F2937] focus:ring-2 focus:ring-[#4F6BF6] focus:outline-none transition text-sm text-[#F9FAFB] placeholder-[#9CA3AF]"
              placeholder="e.g. Rajesh Perera"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-[#1F2937]/60 border border-[#374151]/40 rounded-xl focus:bg-[#1F2937] focus:ring-2 focus:ring-[#4F6BF6] focus:outline-none transition text-sm text-[#F9FAFB] placeholder-[#9CA3AF]"
              placeholder="rajesh@example.com"
            />
          </div>

          {role === "admin" && (
            <div>
              <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
                Admin Authorization Key
              </label>
              <input
                type="password"
                name="adminKey"
                required
                value={form.adminKey}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1F2937]/60 border border-[#374151]/40 rounded-xl focus:bg-[#1F2937] focus:ring-2 focus:ring-[#4F6BF6] focus:outline-none transition text-sm text-[#F9FAFB] placeholder-[#9CA3AF]"
                placeholder="Enter Secret Admin Key"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-[#1F2937]/60 border border-[#374151]/40 rounded-xl focus:bg-[#1F2937] focus:ring-2 focus:ring-[#4F6BF6] focus:outline-none transition text-sm text-[#F9FAFB] placeholder-[#9CA3AF]"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-[#1F2937]/60 border border-[#374151]/40 rounded-xl focus:bg-[#1F2937] focus:ring-2 focus:ring-[#4F6BF6] focus:outline-none transition text-sm text-[#F9FAFB] placeholder-[#9CA3AF]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-[#F87171]/15 border border-[#F87171]/30 rounded-xl text-[#F87171] text-xs font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#4F6BF6] to-[#8B5CF6] text-white font-bold rounded-xl shadow-lg shadow-[#4F6BF6]/20 hover:from-[#3B5BDB] hover:to-[#7C3AED] transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Creating Account..." : "Sign Up"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-[#9CA3AF] mt-6">
          Already have an account?{" "}
          <Link to="/Login" className="text-[#4F6BF6] font-semibold hover:text-[#22D3EE] hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
