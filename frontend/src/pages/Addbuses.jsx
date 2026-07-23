import React, { useEffect, useState } from "react";
import AddBusForm from "../components/AddBusForm";
import BusList from "./BusList";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://bus-tracking-mern.onrender.com";

function Addbuses() {
  const [buses, setBuses] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch buses from backend
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/buses`)
      .then((res) => setBuses(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add new bus to list
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
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-white">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden"
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
              bg-white border border-slate-100
              rounded-none lg:rounded-3xl
              shadow-sm
              p-5
              transition-transform duration-200
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-wider text-rose-700 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full w-fit">
                  ADMIN
                </p>
                <h2 className="mt-3 text-lg font-extrabold text-slate-900">Dashboard</h2>
              </div>
              <button
                type="button"
                className="lg:hidden rounded-xl border border-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-50"
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/60">
                <p className="text-xs font-semibold text-slate-600">Today</p>
                <p className="mt-1 text-sm text-slate-800">
                  Keep buses updated for accurate live tracking.
                </p>
              </div>

              <div className="grid gap-2">
                <a
                  href="#add-bus"
                  className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-slate-900 hover:bg-rose-100 transition-colors"
                >
                  <p className="text-sm font-semibold">➕ Add Bus</p>
                  <p className="text-xs text-slate-600 mt-0.5">Create and assign a route</p>
                </a>
                <a
                  href="#all-buses"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <p className="text-sm font-semibold">📊 View Buses</p>
                  <p className="text-xs text-slate-600 mt-0.5">Verify driver and route info</p>
                </a>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 bg-white">
                <p className="text-xs font-semibold text-slate-600">Quick Stats</p>
                <div className="mt-3 grid gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Total buses</span>
                    <span className="font-semibold text-slate-900">{totalBuses}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Active GPS</span>
                    <span className="font-semibold text-slate-900">{activeBuses}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Routes covered</span>
                    <span className="font-semibold text-slate-900">{routesCovered}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="col-span-12 lg:col-span-9">
            {/* Top bar */}
            <div className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-slate-100 rounded-3xl shadow-sm p-4 sm:p-5">
              <div className="flex items-start sm:items-center justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    className="lg:hidden rounded-xl border border-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-50"
                    onClick={() => setSidebarOpen(true)}
                  >
                    ☰
                  </button>

                  <div>
                    <p className="text-xs font-semibold tracking-wider text-rose-700 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full w-fit">
                      ADMIN
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      Manage Buses
                    </h1>
                    <p className="mt-1 text-slate-600 text-sm">
                      Admin panel for bus inventory, drivers and routes.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to="/dashboard/customer"
                    className="bg-white text-slate-900 border border-slate-200 px-4 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Customer
                  </Link>
                  <Link
                    to="/Login"
                    className="bg-rose-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-rose-700 transition-colors shadow-sm"
                  >
                    Login
                  </Link>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="#add-bus"
                  className="bg-rose-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-rose-700 transition-colors shadow-sm"
                >
                  Add Bus
                </a>
                <a
                  href="#all-buses"
                  className="bg-white text-slate-900 border border-slate-200 px-4 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  View List
                </a>
              </div>
            </div>

            {/* Stat cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
                <p className="text-xs font-semibold tracking-wider text-slate-600">TOTAL BUSES</p>
                <p className="mt-2 text-3xl font-extrabold text-slate-900">{totalBuses}</p>
                <p className="mt-1 text-sm text-slate-600">Registered in the system</p>
              </div>
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
                <p className="text-xs font-semibold tracking-wider text-slate-600">ACTIVE GPS</p>
                <p className="mt-2 text-3xl font-extrabold text-slate-900">{activeBuses}</p>
                <p className="mt-1 text-sm text-slate-600">Sending valid coordinates</p>
              </div>
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
                <p className="text-xs font-semibold tracking-wider text-slate-600">ROUTES COVERED</p>
                <p className="mt-2 text-3xl font-extrabold text-slate-900">{routesCovered}</p>
                <p className="mt-1 text-sm text-slate-600">Unique route names</p>
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
