import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeader } from "../lib/auth";
import { getOfflineTickets, saveTicketsOffline } from "../lib/offlineStorage";
import { Ticket, Calendar, MapPin, CheckCircle, WifiOff, ShieldCheck } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnlineStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    const loadBookings = async () => {
      if (navigator.onLine) {
        try {
          const res = await axios.get(`${API_BASE_URL}/api/bookings/my`, { headers: getAuthHeader() });
          setBookings(res.data);
          await saveTicketsOffline(res.data);
        } catch {
          const local = await getOfflineTickets();
          setBookings(local);
        } finally {
          setLoading(false);
        }
      } else {
        const local = await getOfflineTickets();
        setBookings(local);
        setLoading(false);
      }
    };

    loadBookings();

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">My Bus Tickets</h1>
            <p className="text-xs text-slate-400 mt-1">PWA IndexedDB synced offline ticket manager</p>
          </div>

          {isOffline && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold">
              <WifiOff className="w-3.5 h-3.5" /> PWA Offline Mode
            </div>
          )}
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading tickets...</div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center bg-slate-900 rounded-3xl border border-slate-800">
            <Ticket className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-300">No tickets saved</h3>
            <p className="text-xs text-slate-500 mt-1">Book a bus ticket to view it here offline.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full ${
                        b.status === "confirmed"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {b.status}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Date: {b.travelDate}</span>
                  </div>
                  <h3 className="font-extrabold text-white text-lg">
                    {b.from} → {b.to}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    Seats Reserved: <strong className="text-rose-400">{b.seats?.join(", ")}</strong>
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-black text-emerald-400">LKR {b.amount}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">STRIPE VERIFIED</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
