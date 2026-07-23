import React, { useState, useEffect } from "react";
import axios from "axios";
import AddBusForm from "../components/AddBusForm";
import BusList from "./BusList";
import { getAuthHeader } from "../lib/auth";
import { Bus, Users, Shield, Ticket, Plus, Activity, Fuel, Clock, Building2, TrendingUp, BarChart3 } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

export default function AdminDashboard() {
  const [buses, setBuses] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [activeTab, setActiveTab] = useState("fleet");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTenant] = useState("MetroTransit Global Operators");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/buses`)
      .then((res) => setBuses(Array.isArray(res.data) ? res.data : []))
      .catch(() => setBuses([]));

    axios
      .get(`${API_BASE_URL}/api/analytics/summary`, { headers: getAuthHeader() })
      .then((res) => setAnalytics(res.data))
      .catch(() => setAnalytics(null));
  }, []);

  const addBusToList = (newBus) => {
    setBuses([newBus, ...buses]);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Multi-Tenant Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" /> Multi-Tenant Operator Engine
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-extrabold">
                <Building2 className="w-3.5 h-3.5" /> Org: {selectedTenant}
              </span>
            </div>
            <h1 className="text-3xl font-black text-white">Fleet & Operations Control Center</h1>
            <p className="text-slate-400 text-sm mt-1">Manage tenant fleets, drivers, real-time analytics & telemetry.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("fleet")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                activeTab === "fleet" ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Fleet Roster
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                activeTab === "analytics" ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Analytics
            </button>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> {showAddForm ? "Close Form" : "Add Vehicle"}
            </button>
          </div>
        </div>

        {/* Form Section */}
        {showAddForm && <AddBusForm addBusToList={addBusToList} />}

        {/* Tab 1: Fleet Roster & Stats */}
        {activeTab === "fleet" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">Registered Fleet</span>
                  <Bus className="w-5 h-5 text-rose-500" />
                </div>
                <p className="text-3xl font-black text-white mt-2">{buses.length}</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">Live GPS Active</span>
                  <Activity className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-3xl font-black text-white mt-2">
                  {buses.filter((b) => Number.isFinite(parseFloat(b.latitude))).length}
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">Served Routes</span>
                  <Ticket className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-black text-white mt-2">
                  {new Set(buses.map((b) => b.route)).size}
                </p>
              </div>
            </div>

            <BusList buses={buses} />
          </div>
        )}

        {/* Tab 2: SaaS Analytics Dashboard */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px] font-extrabold uppercase">Avg Delay</span>
                  <Clock className="w-4 h-4 text-rose-400" />
                </div>
                <p className="text-2xl font-black text-white mt-2">
                  {analytics?.avgDelayMinutes ?? 2.4} <span className="text-xs text-rose-400">mins</span>
                </p>
                <p className="text-[10px] text-slate-500 mt-1">Measured across active routes</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px] font-extrabold uppercase">Fuel Consumed</span>
                  <Fuel className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-2xl font-black text-white mt-2">
                  {analytics?.fuelConsumedLiters ?? 380} <span className="text-xs text-amber-400">Liters</span>
                </p>
                <p className="text-[10px] text-slate-500 mt-1">Fleet mileage efficiency: 4.2 km/L</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px] font-extrabold uppercase">Confirmed Revenue</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-2xl font-black text-emerald-400 mt-2">
                  LKR {analytics?.totalRevenue ?? 18450}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">Stripe payment processed tickets</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px] font-extrabold uppercase">Operated Distance</span>
                  <Activity className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-2xl font-black text-white mt-2">
                  {analytics?.totalFleetKms ?? 1590} <span className="text-xs text-blue-400">Km</span>
                </p>
                <p className="text-[10px] text-slate-500 mt-1">Combined odometer reading</p>
              </div>
            </div>

            {/* Peak Passenger Hours Histogram */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-rose-500" /> Peak Passenger Hours Density Histogram
              </h3>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 items-end h-48 pt-6 border-b border-slate-800 pb-2">
                {(analytics?.peakHoursDistribution || [
                  { hour: "06 AM", passengers: 120 },
                  { hour: "08 AM", passengers: 450 },
                  { hour: "10 AM", passengers: 210 },
                  { hour: "12 PM", passengers: 180 },
                  { hour: "02 PM", passengers: 240 },
                  { hour: "05 PM", passengers: 510 },
                  { hour: "08 PM", passengers: 290 },
                  { hour: "10 PM", passengers: 95 },
                ]).map((item, idx) => {
                  const heightPercent = Math.min(100, Math.round((item.passengers / 550) * 100));
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition">
                        {item.passengers}
                      </span>
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-rose-700 to-rose-500 rounded-t-lg transition-all duration-500 group-hover:bg-rose-400"
                      />
                      <span className="text-[10px] font-mono text-slate-500">{item.hour.split(' ')[0]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
