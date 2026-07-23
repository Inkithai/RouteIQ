import React from "react";
import { Link } from "react-router-dom";

function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-slate-100 rounded-3xl shadow-sm p-4 sm:p-5">
          <div className="flex items-start sm:items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-semibold tracking-wider text-rose-700 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full w-fit">
                MY ACCOUNT
              </p>
              <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
                My Trips
              </h1>
              <p className="mt-1 text-slate-600 text-sm">
                Book tickets, track buses live, and get trip updates.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/Login"
                className="bg-rose-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-rose-700 transition-colors shadow-sm"
              >
                Account
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/book"
            className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
          >
            <p className="text-xs font-semibold tracking-wider text-rose-700 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full w-fit">
              BOOK
            </p>
            <h2 className="mt-4 text-xl font-extrabold text-slate-900">Book Ticket</h2>
            <p className="mt-2 text-sm text-slate-600">
              Search routes and continue to seat booking.
            </p>
          </Link>

          <Link
            to="/dashboard/customer/bookings"
            className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
          >
            <p className="text-xs font-semibold tracking-wider text-rose-700 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full w-fit">
              TICKETS
            </p>
            <h2 className="mt-4 text-xl font-extrabold text-slate-900">My Bookings</h2>
            <p className="mt-2 text-sm text-slate-600">
              View your confirmed tickets and seat details.
            </p>
          </Link>

          <Link
            to="/BusMapPreview"
            className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
          >
            <p className="text-xs font-semibold tracking-wider text-rose-700 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full w-fit">
              LIVE
            </p>
            <h2 className="mt-4 text-xl font-extrabold text-slate-900">Live Tracking</h2>
            <p className="mt-2 text-sm text-slate-600">
              Track buses in real time on the map.
            </p>
          </Link>

          <Link
            to="/Login"
            className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
          >
            <p className="text-xs font-semibold tracking-wider text-rose-700 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full w-fit">
              ACCOUNT
            </p>
            <h2 className="mt-4 text-xl font-extrabold text-slate-900">Profile</h2>
            <p className="mt-2 text-sm text-slate-600">
              Manage your account and preferences.
            </p>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-gradient-to-r from-rose-600 to-fuchsia-600 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
            <p className="text-sm font-semibold tracking-wide text-white/90">OFFERS</p>
            <h3 className="mt-2 text-2xl font-extrabold">Save more on your next booking</h3>
            <p className="mt-2 text-white/90 text-sm max-w-2xl">
              Use code <span className="font-extrabold">ROUTEIQ20</span> and get up to 20% off on selected routes.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/book"
                className="bg-white text-rose-700 px-4 py-2.5 rounded-xl font-extrabold hover:bg-rose-50 transition"
              >
                View Deals
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 border border-white/15 text-white px-4 py-2.5 rounded-xl font-extrabold hover:bg-white/15 transition"
              >
                Get Help
              </Link>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
            <p className="text-sm font-extrabold text-slate-900">Quick Help</p>
            <p className="mt-1 text-sm text-slate-600">Cancellations, refunds & live tracking support.</p>
            <div className="mt-4 grid gap-2">
              <Link
                to="/contact"
                className="rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors p-4"
              >
                <p className="font-semibold text-slate-900">Contact Support</p>
                <p className="text-xs text-slate-600 mt-0.5">24x7 help center</p>
              </Link>
              <Link
                to="/BusMapPreview"
                className="rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors p-4"
              >
                <p className="font-semibold text-slate-900">Track My Bus</p>
                <p className="text-xs text-slate-600 mt-0.5">Live location + ETA</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
