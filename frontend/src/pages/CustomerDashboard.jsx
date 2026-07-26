import React from "react";
import { Link } from "react-router-dom";
import { Ticket, Navigation } from "lucide-react";

function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-[#374151]/30 rounded-3xl shadow-xl p-4 sm:p-5">
          <div className="flex items-start sm:items-center justify-between gap-4 flex-wrap">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4F6BF6]/10 border border-[#4F6BF6]/15 rounded-lg text-[11px] font-extrabold uppercase tracking-[.13em] text-[#4F6BF6]">
                <span className="w-[17px] h-[1px] bg-[#4F6BF6]" /> MY ACCOUNT
              </span>
              <h1 className="mt-3 text-2xl sm:text-3xl font-black text-[#F9FAFB] tracking-[-0.04em]">
                My Trips
              </h1>
              <p className="mt-1 text-[#9CA3AF] text-sm">
                Book tickets, track buses live, and get trip updates.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/Login"
                className="bg-[#4F6BF6] text-white px-4 py-2.5 rounded-xl font-bold hover:bg-[#3B5BDB] transition shadow-lg shadow-[#4F6BF6]/20"
              >
                Account
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/book"
            className="bg-[#111827]/80 border border-[#374151]/30 rounded-3xl p-6 hover:border-[#4F6BF6]/20 hover:translate-y-[-2px] hover:shadow-[0_20px_40px_rgba(0,0,0,.2)] transition-all group backdrop-blur-md"
          >
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#4F6BF6]/10 border border-[#4F6BF6]/15 rounded-lg text-[11px] font-extrabold uppercase tracking-wider text-[#4F6BF6]">
              <Ticket size={12} /> BOOK
            </span>
            <h2 className="mt-4 text-xl font-black text-[#F9FAFB]">Book Ticket</h2>
            <p className="mt-2 text-sm text-[#9CA3AF]">
              Search routes and continue to seat booking.
            </p>
          </Link>

          <Link
            to="/my-bookings"
            className="bg-[#111827]/80 border border-[#374151]/30 rounded-3xl p-6 hover:border-[#4F6BF6]/20 hover:translate-y-[-2px] hover:shadow-[0_20px_40px_rgba(0,0,0,.2)] transition-all group backdrop-blur-md"
          >
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#8B5CF6]/10 border border-[#8B5CF6]/15 rounded-lg text-[11px] font-extrabold uppercase tracking-wider text-[#8B5CF6]">
              <Ticket size={12} /> TICKETS
            </span>
            <h2 className="mt-4 text-xl font-black text-[#F9FAFB]">My Bookings</h2>
            <p className="mt-2 text-sm text-[#9CA3AF]">
              View your confirmed tickets and seat details.
            </p>
          </Link>

          <Link
            to="/BusMapPreview"
            className="bg-[#111827]/80 border border-[#374151]/30 rounded-3xl p-6 hover:border-[#22D3EE]/20 hover:translate-y-[-2px] hover:shadow-[0_20px_40px_rgba(0,0,0,.2)] transition-all group backdrop-blur-md"
          >
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#22D3EE]/10 border border-[#22D3EE]/15 rounded-lg text-[11px] font-extrabold uppercase tracking-wider text-[#22D3EE]">
              <Navigation size={12} /> LIVE
            </span>
            <h2 className="mt-4 text-xl font-black text-[#F9FAFB]">Live Tracking</h2>
            <p className="mt-2 text-sm text-[#9CA3AF]">
              Track buses in real time on the map.
            </p>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-gradient-to-r from-[#4F6BF6] to-[#8B5CF6] text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <p className="text-sm font-semibold tracking-wide text-white/90">OFFERS</p>
            <h3 className="mt-2 text-2xl font-black">Save more on your next booking</h3>
            <p className="mt-2 text-white/90 text-sm max-w-2xl">
              Use code <span className="font-extrabold">ROUTEIQ20</span> and get up to 20% off on selected routes.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/book"
                className="bg-[#F9FAFB] text-[#4F6BF6] px-4 py-2.5 rounded-xl font-extrabold hover:bg-[#22D3EE]/10 transition"
              >
                View Deals
              </Link>
              <Link
                to="/"
                className="bg-white/10 border border-white/15 text-white px-4 py-2.5 rounded-xl font-extrabold hover:bg-white/15 transition"
              >
                Get Help
              </Link>
            </div>
          </div>

          <div className="bg-[#111827]/80 border border-[#374151]/30 rounded-3xl p-6 backdrop-blur-md">
            <p className="text-sm font-extrabold text-[#F9FAFB]">Quick Help</p>
            <p className="mt-1 text-sm text-[#9CA3AF]">Cancellations, refunds & live tracking support.</p>
            <div className="mt-4 grid gap-2">
              <Link
                to="/"
                className="rounded-2xl border border-[#374151]/30 bg-[#0A0E1A]/40 hover:bg-[#4F6BF6]/5 hover:border-[#4F6BF6]/20 transition-all p-4"
              >
                <p className="font-bold text-[#F9FAFB]">Contact Support</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">24×7 help center</p>
              </Link>
              <Link
                to="/BusMapPreview"
                className="rounded-2xl border border-[#374151]/30 bg-[#0A0E1A]/40 hover:bg-[#22D3EE]/5 hover:border-[#22D3EE]/20 transition-all p-4"
              >
                <p className="font-bold text-[#F9FAFB]">Track My Bus</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Live location + ETA</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
