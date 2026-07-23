import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthHeader } from "../lib/auth";
import { Ticket, Search, Filter } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h1 className="text-2xl font-black text-slate-900">Global Bookings Audit Log</h1>
          <p className="text-xs text-slate-500 mt-1">Review all passenger ticket reservations across routes</p>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading audit log...</div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] font-bold">
                <tr>
                  <th className="p-4">Passenger</th>
                  <th className="p-4">Route</th>
                  <th className="p-4">Travel Date</th>
                  <th className="p-4">Seats</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td className="p-4">
                      <p className="font-bold text-slate-900">{b.userName}</p>
                      <p className="text-xs text-slate-400">{b.userEmail}</p>
                    </td>
                    <td className="p-4 font-semibold text-slate-700">
                      {b.from} → {b.to}
                    </td>
                    <td className="p-4 font-mono text-xs text-slate-600">{b.travelDate}</td>
                    <td className="p-4 font-bold text-rose-600">{b.seats?.join(", ")}</td>
                    <td className="p-4 font-extrabold text-slate-900">LKR {b.amount}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full ${
                          b.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
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
