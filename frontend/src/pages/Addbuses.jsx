import React, { useEffect, useState } from "react";
import AddBusForm from "../components/AddBusForm";
import BusList from "./BusList";
import axios from "axios";
import { Link } from "react-router-dom";
import { BarChart3, Plus } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

function Addbuses() {
  const [buses, setBuses] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/buses`)
      .then((res) => setBuses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addBusToList = (newBus) => {
    setBuses([...buses, newBus]);
  };

  const totalBuses = buses.length;
  const activeBuses = buses.filter(
    (bus) => !isNaN(parseFloat(bus.latitude)) && !isNaN(parseFloat(bus.longitude))
  ).length;
  const routesCovered = new Set(
    buses
      .map((b) => (b.route || "").trim())
      .filter((r) => r.length > 0)
      .map((r) => r.toLowerCase())
  ).size;

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 bg-[#0A0E1A]/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-7">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside
            className={`
              fixed lg:static z-50 lg:z-auto
              top-0 left-0 h-full lg:h-auto
              w-[280px] lg:w-auto
              col-span-12 lg:col-span-3
              bg-[#111827] border border-[#374151]/30
              rounded-none lg:rounded-3xl
              shadow-xl
              p-5 backdrop-blur-md
              transition-transform duration-200
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4F6BF6]/10 border border-[#4F6BF6]/15 rounded-lg text-[11px] font-extrabold uppercase tracking-[.13em] text-[#4F6BF6]">
                  <span className="w-[17px] h-[1px] bg-[#4F6BF6]" /> ADMIN
                </span>
                <h2 className="mt-3 text-lg font-extrabold text-[#F9FAFB]">Dashboard</h2>
              </div>
              <button
                type="button"
                className="lg:hidden rounded-xl border border-[#374151]/30 px-3 py-2 text-[#9CA3AF] hover:bg-[#1F2937]"
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-[#374151]/30 p-4 bg-[#0A0E1A]/40">
                <p className="text-xs font-semibold text-[#9CA3AF]">Today</p>
                <p className="mt-1 text-sm text-[#9CA3AF]">
                  Keep buses updated for accurate live tracking.
                </p>
              </div>

              <div className="grid gap-2">
                <a
                  href="#add-bus"
                  className="rounded-2xl border border-[#4F6BF6]/20 bg-[#4F6BF6]/8 px-4 py-3 text-[#F9FAFB] hover:bg-[#4F6BF6]/15 transition-colors"
                >
                  <p className="text-sm font-semibold flex items-center gap-1"><Plus size={14} className="text-[#4F6BF6]" /> Add Bus</p>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">Create and assign a route</p>
                </a>
                <a
                  href="#all-buses"
                  className="rounded-2xl border border-[#374151]/30 bg-[#0A0E1A]/40 px-4 py-3 text-[#F9FAFB] hover:bg-[#1F2937] transition-colors"
                >
                  <p className="text-sm font-semibold flex items-center gap-1"><BarChart3 size={14} className="text-[#22D3EE]" /> View Buses</p>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">Verify driver and route info</p>
                </a>
              </div>

              <div className="rounded-2xl border border-[#374151]/30 p-4 bg-[#0A0E1A]/40">
                <p className="text-xs font-semibold text-[#9CA3AF]">Quick Stats</p>
                <div className="mt-3 grid gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#9CA3AF]">Total buses</span>
                    <span className="font-semibold text-[#F9FAFB]">{totalBuses}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#9CA3AF]">Active GPS</span>
                    <span className="font-semibold text-[#34D399]">{activeBuses}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#9CA3AF]">Routes covered</span>
                    <span className="font-semibold text-[#4F6BF6]">{routesCovered}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="col-span-12 lg:col-span-9">
            {/* Top bar */}
            <div className="bg-[#111827]/80 backdrop-blur-xl border border-[#374151]/30 rounded-3xl shadow-xl p-4 sm:p-5">
              <div className="flex items-start sm:items-center justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    className="lg:hidden rounded-xl border border-[#374151]/30 px-3 py-2 text-[#9CA3AF] hover:bg-[#1F2937]"
                    onClick={() => setSidebarOpen(true)}
                  >
                    ☰
                  </button>

                  <div>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4F6BF6]/10 border border-[#4F6BF6]/15 rounded-lg text-[11px] font-extrabold uppercase tracking-[.13em] text-[#4F6BF6]">
                      <span className="w-[17px] h-[1px] bg-[#4F6BF6]" /> ADMIN
                    </span>
                    <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#F9FAFB] tracking-[-0.04em]">
                      Manage Buses
                    </h1>
                    <p className="mt-1 text-[#9CA3AF] text-sm">
                      Admin panel for bus inventory, drivers and routes.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to="/dashboard/customer"
                    className="bg-[#1F2937] text-[#9CA3AF] border border-[#374151]/30 px-4 py-2.5 rounded-xl font-semibold hover:bg-[#374151]/40 hover:text-[#F9FAFB] transition-colors"
                  >
                    Customer
                  </Link>
                  <Link
                    to="/Login"
                    className="bg-[#4F6BF6] text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-[#3B5BDB] transition shadow-lg shadow-[#4F6BF6]/20"
                  >
                    Login
                  </Link>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="#add-bus"
                  className="bg-[#4F6BF6] text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-[#3B5BDB] transition shadow-lg shadow-[#4F6BF6]/20"
                >
                  Add Bus
                </a>
                <a
                  href="#all-buses"
                  className="bg-[#1F2937] text-[#9CA3AF] border border-[#374151]/30 px-4 py-2.5 rounded-xl font-semibold hover:bg-[#374151]/40 hover:text-[#F9FAFB] transition-colors"
                >
                  View List
                </a>
              </div>
            </div>

            {/* Stat cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#111827] rounded-3xl border border-[#374151]/30 shadow-xl p-5 backdrop-blur-md">
                <p className="text-xs font-semibold tracking-wider text-[#9CA3AF]">TOTAL BUSES</p>
                <p className="mt-2 text-3xl font-extrabold text-[#F9FAFB]">{totalBuses}</p>
                <p className="mt-1 text-sm text-[#9CA3AF]">Registered in the system</p>
              </div>
              <div className="bg-[#111827] rounded-3xl border border-[#374151]/30 shadow-xl p-5 backdrop-blur-md">
                <p className="text-xs font-semibold tracking-wider text-[#9CA3AF]">ACTIVE GPS</p>
                <p className="mt-2 text-3xl font-extrabold text-[#34D399]">{activeBuses}</p>
                <p className="mt-1 text-sm text-[#9CA3AF]">Sending valid coordinates</p>
              </div>
              <div className="bg-[#111827] rounded-3xl border border-[#374151]/30 shadow-xl p-5 backdrop-blur-md">
                <p className="text-xs font-semibold tracking-wider text-[#9CA3AF]">ROUTES COVERED</p>
                <p className="mt-2 text-3xl font-extrabold text-[#4F6BF6]">{routesCovered}</p>
                <p className="mt-1 text-sm text-[#9CA3AF]">Unique route names</p>
              </div>
            </div>

            {/* Content */}
            <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
              <section id="add-bus" className="scroll-mt-24">
                <AddBusForm addBusToList={addBusToList} />
              </section>

              <section id="all-buses" className="scroll-mt-24">
                <BusList buses={buses} />
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Addbuses;
