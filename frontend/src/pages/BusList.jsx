import React from "react";
import { Bus } from "lucide-react";

export default function BusList({ buses = [] }) {
  return (
    <div className="bg-[#111827]/80 border border-[#374151]/30 rounded-3xl p-6 backdrop-blur-md">
      <h2 className="text-xl font-black text-[#F9FAFB] mb-4 flex items-center gap-2">
        <Bus className="w-5 h-5 text-[#4F6BF6]" /> Fleet Vehicle Roster ({buses.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-[#0A0E1A]/60 border-b border-[#374151]/30 text-[#9CA3AF] uppercase text-[11px] font-bold">
              <th className="p-3">Bus Number</th>
              <th className="p-3">Route</th>
              <th className="p-3">Driver</th>
              <th className="p-3">Coordinates</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#374151]/20">
            {buses.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-[#9CA3AF]">
                  No buses registered in fleet database.
                </td>
              </tr>
            ) : (
              buses.map((bus) => (
                <tr key={bus._id || bus.busNumber} className="hover:bg-[#4F6BF6]/5 transition">
                  <td className="p-3 font-extrabold text-[#F9FAFB]">{bus.busNumber}</td>
                  <td className="p-3 font-medium text-[#9CA3AF]">{bus.route}</td>
                  <td className="p-3 text-[#9CA3AF]">{bus.driverName}</td>
                  <td className="p-3 font-mono text-xs text-[#9CA3AF]">
                    {bus.latitude?.toFixed(4)}, {bus.longitude?.toFixed(4)}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full ${
                        bus.status === "Delayed"
                          ? "bg-[#F87171]/10 text-[#F87171] border border-[#F87171]/20"
                          : "bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/20"
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
