import React, { useState } from "react";
import axios from "axios";
import { getAuthHeader } from "../lib/auth";
import { Bus } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

export default function AddBusForm({ addBusToList }) {
  const [form, setForm] = useState({
    busNumber: "",
    driverName: "",
    route: "",
    latitude: "6.9271",
    longitude: "79.8612",
    busType: "AC",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.busNumber || !form.driverName || !form.route) {
      setError("Bus Number, Driver Name, and Route are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/buses`, form, {
        headers: getAuthHeader(),
      });
      addBusToList(res.data);
      setForm({
        busNumber: "",
        driverName: "",
        route: "",
        latitude: "6.9271",
        longitude: "79.8612",
        busType: "AC",
      });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add bus.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111827] border border-[#374151]/30 rounded-3xl p-6 shadow-md backdrop-blur-md">
      <h3 className="text-lg font-black text-[#F9FAFB] mb-4 flex items-center gap-2">
        <Bus className="w-5 h-5 text-[#4F6BF6]" /> Register New Bus Vehicle
      </h3>

      {error && (
        <div className="p-3 bg-[#F87171]/10 text-[#F87171] text-xs font-bold rounded-xl mb-4 border border-[#F87171]/20">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Bus Number</label>
          <input
            type="text"
            required
            placeholder="e.g. WP-CA-1001"
            value={form.busNumber}
            onChange={(e) => setForm({ ...form, busNumber: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#1F2937]/60 border border-[#374151]/40 rounded-xl text-sm text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#4F6BF6] placeholder-[#9CA3AF]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Driver Name</label>
          <input
            type="text"
            required
            placeholder="Driver Name"
            value={form.driverName}
            onChange={(e) => setForm({ ...form, driverName: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#1F2937]/60 border border-[#374151]/40 rounded-xl text-sm text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#4F6BF6] placeholder-[#9CA3AF]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Route Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Colombo Fort → Katunayake Airport"
            value={form.route}
            onChange={(e) => setForm({ ...form, route: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#1F2937]/60 border border-[#374151]/40 rounded-xl text-sm text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#4F6BF6] placeholder-[#9CA3AF]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Initial Latitude</label>
          <input
            type="number"
            step="any"
            value={form.latitude}
            onChange={(e) => setForm({ ...form, latitude: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#1F2937]/60 border border-[#374151]/40 rounded-xl text-sm text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#4F6BF6]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Initial Longitude</label>
          <input
            type="number"
            step="any"
            value={form.longitude}
            onChange={(e) => setForm({ ...form, longitude: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#1F2937]/60 border border-[#374151]/40 rounded-xl text-sm text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#4F6BF6]"
          />
        </div>

        <div className="sm:col-span-2 md:col-span-1 flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#4F6BF6] hover:bg-[#3B5BDB] text-white font-bold rounded-xl transition shadow-lg shadow-[#4F6BF6]/20"
          >
            {loading ? "Adding..." : "Register Bus"}
          </button>
        </div>
      </form>
    </div>
  );
}
