import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden w-full">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-white to-white"></div>
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-200/25 blur-3xl"></div>
      <div className="absolute top-24 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-rose-200/30 via-white to-fuchsia-200/20 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-10 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold tracking-wider text-rose-700 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full w-fit">
                SAVE MORE ON EVERY TRIP
              </p>
              <p className="text-xs font-semibold tracking-wider text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full w-fit">
                Use code <span className="font-extrabold text-slate-900">ROUTEIQ20</span>
              </p>
            </div>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-900">
              Book bus tickets.
              <span className="text-rose-600"> Track your ride live.</span>
              <br />
              Travel with confidence.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
              Discover routes, compare buses, grab deals, and reach your destination on time — with real-time tracking and smart alerts.
            </p>

            {/* Search Form */}
            <div className="mt-7 bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-100">
              <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-50 to-fuchsia-50 rounded-2xl border border-white/60">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4 h-14 flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-rose-300 transition">
                    <span className="px-3 text-rose-600 text-2xl">🏙️</span>
                    <input
                      type="text"
                      placeholder="From (e.g., Mumbai)"
                      className="w-full h-full px-1 border-none outline-none bg-transparent text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div className="md:col-span-4 h-14 flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-rose-300 transition">
                    <span className="px-3 text-rose-600 text-2xl">🏙️</span>
                    <input
                      type="text"
                      placeholder="To (e.g., Pune)"
                      className="w-full h-full px-1 border-none outline-none bg-transparent text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div className="md:col-span-2 h-14 flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-rose-300 transition">
                    <span className="px-3 text-rose-600 text-xl">📅</span>
                    <input
                      type="date"
                      className="w-full h-full px-1 border-none outline-none bg-transparent text-slate-900"
                    />
                  </div>

                  <button className="md:col-span-2 h-14 bg-rose-600 hover:bg-rose-700 text-white px-6 rounded-2xl font-semibold shadow-sm transition">
                    Search Buses
                  </button>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/book"
                  className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl shadow-sm transition font-semibold"
                >
                  Book Ticket
                </Link>
                <Link
                  to="/BusMapPreview"
                  className="bg-white hover:bg-slate-50 text-slate-900 px-4 py-2.5 rounded-xl shadow-sm transition border border-slate-200 font-semibold"
                >
                  Live Tracking
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-extrabold text-slate-900">Trending destinations</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Goa", "Manali", "Jaipur", "Pune", "Udaipur", "Rishikesh"].map((d) => (
                  <span
                    key={d}
                    className="text-sm bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50/60 transition px-3 py-1.5 rounded-full text-slate-800"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right illustration (no external image) */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
              <div className="relative h-[520px]">
                <img
                  src="https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1200&q=80"
                  alt="Travel by bus"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/65 via-black/25 to-transparent" />

                <div className="absolute left-6 right-6 bottom-6 rounded-3xl border border-white/15 bg-black/30 backdrop-blur p-5 text-white">
                  <p className="text-xs font-semibold tracking-wider text-white/90">LIVE TRACKING</p>
                  <p className="mt-2 text-xl font-extrabold">See your bus on the map, instantly</p>
                  <p className="mt-1 text-sm text-white/90">
                    Track location, check ETA, and stay updated during the journey.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/15">Dark Map</span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/15">ETA</span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/15">Alerts</span>
                  </div>
                </div>

                <div className="relative p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-extrabold text-white">Today’s Deals</p>
                    <span className="text-xs font-semibold tracking-wider text-white bg-white/10 border border-white/15 px-3 py-1 rounded-full">
                      LIMITED
                    </span>
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/25 bg-black/45 backdrop-blur p-5 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white/80">From</p>
                        <p className="text-lg font-extrabold">Mumbai</p>
                      </div>
                      <div className="text-rose-300 font-extrabold">→</div>
                      <div className="text-right">
                        <p className="text-xs text-white/80">To</p>
                        <p className="text-lg font-extrabold">Pune</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-white/20 bg-black/35 backdrop-blur p-3">
                      <p className="text-[11px] text-white/80">Discount</p>
                      <p className="mt-1 text-sm font-bold">20%</p>
                    </div>
                    <div className="rounded-xl border border-white/20 bg-black/35 backdrop-blur p-3">
                      <p className="text-[11px] text-white/80">Starts from</p>
                      <p className="mt-1 text-sm font-bold">LKR 450</p>
                    </div>
                    <div className="rounded-xl border border-white/20 bg-black/35 backdrop-blur p-3">
                      <p className="text-[11px] text-white/80">Live tracking</p>
                      <p className="mt-1 text-sm font-bold">Available</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="text-white/80">Offer validity</span>
                    <span className="font-semibold">Today only</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/25 bg-black/30 backdrop-blur p-4 text-white">
                    <p className="text-xs text-white/80">Free Cancellation</p>
                    <p className="mt-1 text-sm font-bold">On select buses</p>
                  </div>
                  <div className="rounded-2xl border border-white/25 bg-black/30 backdrop-blur p-4 text-white">
                    <p className="text-xs text-white/80">Trusted operators</p>
                    <p className="mt-1 text-sm font-bold">Top rated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
