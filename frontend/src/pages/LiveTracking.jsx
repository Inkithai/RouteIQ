import React, { useEffect, useState } from "react";
import axios from "axios";
import BusMapPreview from "../components/BusMapPreview";
import DriverTrackingPanel from "../components/DriverTrackingPanel";
import { getUserRole } from "../lib/auth";
import { Bus, Navigation, Search } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

export default function LiveTracking() {
  const [buses, setBuses] = useState([]);
  const selectedRoute = "all";
  const [searchTerm, setSearchTerm] = useState("");
  const role = getUserRole();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/buses`)
      .then((res) => setBuses(Array.isArray(res.data) ? res.data : []))
      .catch(() => setBuses([]));
  }, []);

  const filteredBuses = buses.filter((b) => {
    const matchesRoute =
      selectedRoute === "all" ||
      (b.route || "").toLowerCase().includes(selectedRoute.toLowerCase());
    const matchesSearch =
      (b.busNumber || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.driverName || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRoute && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-[#F9FAFB] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#111827]/80 p-6 rounded-3xl border border-[#374151]/30 backdrop-blur-md">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/15 rounded-lg text-[11px] font-extrabold uppercase tracking-wider mb-2">
              <Navigation className="w-3.5 h-3.5" /> Real-time Satellite Telemetry
            </div>
            <h1 className="text-3xl font-black text-[#F9FAFB]">Live Fleet Tracking</h1>
            <p className="text-[#9CA3AF] text-sm mt-1">
              Track real-time bus locations, speeds, and estimated arrival times (ETA).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search bus or driver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-[#1F2937]/60 border border-[#374151]/40 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#4F6BF6] text-[#F9FAFB] placeholder-[#9CA3AF] w-48 sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Driver GPS Broadcast section if role is driver */}
        {(role === "driver" || role === "admin") && buses.length > 0 && (
          <DriverTrackingPanel busId={buses[0]._id} />
        )}

        {/* Main Map */}
        <BusMapPreview buses={filteredBuses} />

        {/* Fleet Grid Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredBuses.map((bus) => (
            <div
              key={bus._id}
              className="bg-[#111827] border border-[#374151]/30 p-5 rounded-2xl hover:border-[#4F6BF6]/20 hover:translate-y-[-2px] hover:shadow-[0_20px_40px_rgba(0,0,0,.2)] transition-all backdrop-blur-md"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#4F6BF6]/15 text-[#4F6BF6] rounded-lg">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-[#F9FAFB] text-base">{bus.busNumber}</h3>
                    <p className="text-xs text-[#9CA3AF]">{bus.route}</p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full ${
                    bus.status === "Delayed"
                      ? "bg-[#F87171]/10 text-[#F87171] border border-[#F87171]/20"
                      : "bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/20"
                  }`}
                >
                  {bus.status || "On Route"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#9CA3AF] bg-[#0A0E1A]/60 p-3 rounded-xl border border-[#374151]/30">
                <div>
                  <span className="text-[#9CA3AF]/50 block text-[10px] uppercase font-bold">Driver</span>
                  <span className="font-semibold text-[#9CA3AF]">{bus.driverName}</span>
                </div>
                <div>
                  <span className="text-[#9CA3AF]/50 block text-[10px] uppercase font-bold">Live Speed</span>
                  <span className="font-semibold text-[#34D399]">{bus.speedKmph || 35} km/h</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
