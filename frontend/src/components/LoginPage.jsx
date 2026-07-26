import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { setAuthToken, setAuthUser } from "../lib/auth";
import { Bus, Lock, Mail, ArrowRight } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, form);
      if (res.data?.token) {
        setAuthToken(res.data.token);
        setAuthUser(res.data.user);
      }

      const role = res.data?.user?.role;
      if (role === "admin") {
        navigate("/dashboard/admin");
      } else if (role === "driver") {
        navigate("/BusMapPreview");
      } else {
        navigate("/dashboard/customer");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
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
          <h1 className="text-2xl sm:text-3xl font-black text-[#F9FAFB]">Welcome Back</h1>
          <p className="text-[#9CA3AF] text-sm mt-1">Log in to manage your fleet and track buses</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-[#4F6BF6]/60 absolute left-3 top-2.5" />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-[#1F2937]/60 border border-[#374151]/40 rounded-xl focus:bg-[#1F2937] focus:ring-2 focus:ring-[#4F6BF6] focus:outline-none transition text-sm text-[#F9FAFB] placeholder-[#9CA3AF]"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-[#4F6BF6]/60 absolute left-3 top-2.5" />
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-[#1F2937]/60 border border-[#374151]/40 rounded-xl focus:bg-[#1F2937] focus:ring-2 focus:ring-[#4F6BF6] focus:outline-none transition text-sm text-[#F9FAFB] placeholder-[#9CA3AF]"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-[#F87171]/15 border border-[#F87171]/30 rounded-xl text-[#F87171] text-xs font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#4F6BF6] hover:bg-[#3B5BDB] text-white font-bold rounded-xl shadow-lg shadow-[#4F6BF6]/20 transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Authenticating..." : "Log In"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-[#9CA3AF] mt-6">
          Don't have an account?{" "}
          <Link to="/Signup" className="text-[#4F6BF6] font-semibold hover:text-[#22D3EE] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
