import React, { useEffect, useState } from "react";
import axios from "axios";
import BusMapPreview from "../components/BusMapPreview";
import DriverTrackingPanel from "../components/DriverTrackingPanel";
import { getUserRole } from "../lib/auth";
import { Bus, Navigation, Clock, Search, Filter } from "lucide-react";

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
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 backdrop-blur-md">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Navigation className="w-3.5 h-3.5" /> Real-time Satellite Telemetry
            </div>
            <h1 className="text-3xl font-black text-white">Live Fleet Tracking</h1>
            <p className="text-slate-400 text-sm mt-1">
              Track real-time bus locations, speeds, and estimated arrival times (ETA).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search bus or driver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 text-white w-48 sm:w-64"
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
              className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-slate-700 transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-rose-600/20 text-rose-400 rounded-lg">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base">{bus.busNumber}</h3>
                    <p className="text-xs text-slate-400">{bus.route}</p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full ${
                    bus.status === "Delayed"
                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  }`}
                >
                  {bus.status || "On Route"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-850">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Driver</span>
                  <span className="font-semibold">{bus.driverName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Live Speed</span>
                  <span className="font-semibold text-emerald-400">{bus.speedKmph || 35} km/h</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
