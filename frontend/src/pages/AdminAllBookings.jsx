import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthHeader } from "../lib/auth";
// No lucide-react icons needed in this component

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

export default function AdminAllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/bookings`, { headers: getAuthHeader() })
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0E1A] p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-[#111827] p-6 rounded-3xl border border-[#374151]/30 shadow-xl backdrop-blur-md">
          <h1 className="text-2xl font-black text-[#F9FAFB]">Global Bookings Audit Log</h1>
          <p className="text-xs text-[#9CA3AF] mt-1">Review all passenger ticket reservations across routes</p>
        </div>

        {loading ? (
          <div className="p-8 text-center text-[#9CA3AF]">Loading audit log...</div>
        ) : (
          <div className="bg-[#111827] border border-[#374151]/30 rounded-3xl overflow-hidden shadow-xl backdrop-blur-md">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0A0E1A]/60 border-b border-[#374151]/30 text-[#9CA3AF] uppercase text-[11px] font-bold">
                <tr>
                  <th className="p-4">Passenger</th>
                  <th className="p-4">Route</th>
                  <th className="p-4">Travel Date</th>
                  <th className="p-4">Seats</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#374151]/20">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-[#4F6BF6]/5 transition">
                    <td className="p-4">
                      <p className="font-bold text-[#F9FAFB]">{b.userName}</p>
                      <p className="text-xs text-[#9CA3AF]">{b.userEmail}</p>
                    </td>
                    <td className="p-4 font-semibold text-[#9CA3AF]">
                      {b.from} → {b.to}
                    </td>
                    <td className="p-4 font-mono text-xs text-[#9CA3AF]">{b.travelDate}</td>
                    <td className="p-4 font-bold text-[#4F6BF6]">{b.seats?.join(", ")}</td>
                    <td className="p-4 font-extrabold text-[#F9FAFB]">LKR {b.amount}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full ${
                          b.status === "confirmed"
                            ? "bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/20"
                            : "bg-[#4F6BF6]/10 text-[#4F6BF6] border border-[#4F6BF6]/20"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
