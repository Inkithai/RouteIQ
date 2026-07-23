import React from "react";
import { Bus, MapPin, Navigation } from "lucide-react";

export default function BusList({ buses = [] }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
        <Bus className="w-5 h-5 text-rose-600" /> Fleet Vehicle Roster ({buses.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] font-bold">
              <th className="p-3">Bus Number</th>
              <th className="p-3">Route</th>
              <th className="p-3">Driver</th>
              <th className="p-3">Coordinates</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {buses.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-slate-400">
                  No buses registered in fleet database.
                </td>
              </tr>
            ) : (
              buses.map((bus) => (
                <tr key={bus._id || bus.busNumber} className="hover:bg-slate-50/80 transition">
                  <td className="p-3 font-extrabold text-slate-900">{bus.busNumber}</td>
                  <td className="p-3 font-medium text-slate-700">{bus.route}</td>
                  <td className="p-3 text-slate-600">{bus.driverName}</td>
                  <td className="p-3 font-mono text-xs text-slate-500">
                    {bus.latitude?.toFixed(4)}, {bus.longitude?.toFixed(4)}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full ${
                        bus.status === "Delayed"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {bus.status || "Active"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
