import React, { useState, useEffect } from "react";
import axios from "axios";
import AddBusForm from "../components/AddBusForm";
import BusList from "./BusList";
import { getAuthHeader } from "../lib/auth";
import { Bus, Shield, Ticket, Plus, Activity, Fuel, Clock, Building2, TrendingUp, BarChart3 } from "lucide-react";

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
    <div className="min-h-screen bg-[#0A0E1A] text-[#F9FAFB] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Multi-Tenant Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#111827] border border-[#374151]/30 p-6 rounded-3xl shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4F6BF6]/15 text-[#4F6BF6] border border-[#4F6BF6]/20 rounded-full text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" /> Multi-Tenant Operator Engine
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/20 rounded-full text-xs font-extrabold">
                <Building2 className="w-3.5 h-3.5" /> Org: {selectedTenant}
              </span>
            </div>
            <h1 className="text-3xl font-black text-[#F9FAFB]">Fleet & Operations Control Center</h1>
            <p className="text-[#9CA3AF] text-sm mt-1">Manage tenant fleets, drivers, real-time analytics & telemetry.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("fleet")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                activeTab === "fleet" ? "bg-[#4F6BF6] text-white shadow-lg shadow-[#4F6BF6]/20" : "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]/40"
              }`}
            >
              Fleet Roster
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                activeTab === "analytics" ? "bg-[#4F6BF6] text-white shadow-lg shadow-[#4F6BF6]/20" : "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]/40"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Analytics
            </button>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-[#34D399] hover:bg-[#2DD4BF] text-[#0A0E1A] font-extrabold text-xs rounded-xl transition shadow-lg shadow-[#34D399]/20 flex items-center gap-1"
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
              <div className="bg-[#111827] border border-[#374151]/30 p-5 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#9CA3AF] uppercase">Registered Fleet</span>
                  <Bus className="w-5 h-5 text-[#4F6BF6]" />
                </div>
                <p className="text-3xl font-black text-[#F9FAFB] mt-2">{buses.length}</p>
              </div>

              <div className="bg-[#111827] border border-[#374151]/30 p-5 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#9CA3AF] uppercase">Live GPS Active</span>
                  <Activity className="w-5 h-5 text-[#34D399]" />
                </div>
                <p className="text-3xl font-black text-[#F9FAFB] mt-2">
                  {buses.filter((b) => Number.isFinite(parseFloat(b.latitude))).length}
                </p>
              </div>

              <div className="bg-[#111827] border border-[#374151]/30 p-5 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#9CA3AF] uppercase">Served Routes</span>
                  <Ticket className="w-5 h-5 text-[#4F6BF6]" />
                </div>
                <p className="text-3xl font-black text-[#F9FAFB] mt-2">
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
              <div className="bg-[#111827] border border-[#374151]/30 p-5 rounded-2xl">
                <div className="flex items-center justify-between text-[#9CA3AF]">
                  <span className="text-[10px] font-extrabold uppercase">Avg Delay</span>
                  <Clock className="w-4 h-4 text-[#22D3EE]" />
                </div>
                <p className="text-2xl font-black text-[#F9FAFB] mt-2">
                  {analytics?.avgDelayMinutes ?? 2.4} <span className="text-xs text-[#22D3EE]">mins</span>
                </p>
                <p className="text-[10px] text-[#9CA3AF]/50 mt-1">Measured across active routes</p>
              </div>

              <div className="bg-[#111827] border border-[#374151]/30 p-5 rounded-2xl">
                <div className="flex items-center justify-between text-[#9CA3AF]">
                  <span className="text-[10px] font-extrabold uppercase">Fuel Consumed</span>
                  <Fuel className="w-4 h-4 text-[#FBBF24]" />
                </div>
                <p className="text-2xl font-black text-[#F9FAFB] mt-2">
                  {analytics?.fuelConsumedLiters ?? 380} <span className="text-xs text-[#FBBF24]">Liters</span>
                </p>
                <p className="text-[10px] text-[#9CA3AF]/50 mt-1">Fleet mileage efficiency: 4.2 km/L</p>
              </div>

              <div className="bg-[#111827] border border-[#374151]/30 p-5 rounded-2xl">
                <div className="flex items-center justify-between text-[#9CA3AF]">
                  <span className="text-[10px] font-extrabold uppercase">Confirmed Revenue</span>
                  <TrendingUp className="w-4 h-4 text-[#34D399]" />
                </div>
                <p className="text-2xl font-black text-[#34D399] mt-2">
                  LKR {analytics?.totalRevenue ?? 18450}
                </p>
                <p className="text-[10px] text-[#9CA3AF]/50 mt-1">Stripe payment processed tickets</p>
              </div>

              <div className="bg-[#111827] border border-[#374151]/30 p-5 rounded-2xl">
                <div className="flex items-center justify-between text-[#9CA3AF]">
                  <span className="text-[10px] font-extrabold uppercase">Operated Distance</span>
                  <Activity className="w-4 h-4 text-[#4F6BF6]" />
                </div>
                <p className="text-2xl font-black text-[#F9FAFB] mt-2">
                  {analytics?.totalFleetKms ?? 1590} <span className="text-xs text-[#4F6BF6]">Km</span>
                </p>
                <p className="text-[10px] text-[#9CA3AF]/50 mt-1">Combined odometer reading</p>
              </div>
            </div>

            {/* Peak Passenger Hours Histogram */}
            <div className="bg-[#111827] border border-[#374151]/30 p-6 rounded-3xl">
              <h3 className="text-lg font-black text-[#F9FAFB] mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#4F6BF6]" /> Peak Passenger Hours Density Histogram
              </h3>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 items-end h-48 pt-6 border-b border-[#374151]/30 pb-2">
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
                      <span className="text-[10px] font-bold text-[#9CA3AF] opacity-0 group-hover:opacity-100 transition">
                        {item.passengers}
                      </span>
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-[#4F6BF6]/80 to-[#4F6BF6] rounded-t-lg transition-all duration-500 group-hover:bg-[#22D3EE]"
                      />
                      <span className="text-[10px] font-mono text-[#9CA3AF]/60">{item.hour.split(' ')[0]}</span>
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
