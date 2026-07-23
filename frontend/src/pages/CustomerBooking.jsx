import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthHeader, isLoggedIn } from "../lib/auth";
import { saveTicketsOffline } from "../lib/offlineStorage";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, MapPin, Ticket, CreditCard, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

export default function CustomerBooking() {
  const [buses, setBuses] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [paymentStep, setPaymentStep] = useState("seats"); // "seats" | "stripe" | "confirmed"

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/buses`)
      .then((res) => setBuses(res.data))
      .catch(() => setBuses([]));
  }, []);

  const handleSelectSeatsModal = async (bus) => {
    if (!isLoggedIn()) {
      navigate("/Login");
      return;
    }

    setSelectedBus(bus);
    setSelectedSeats([]);
    setPaymentStep("seats");
    setMessage({ type: "", text: "" });

    try {
      const res = await axios.get(`${API_BASE_URL}/api/bookings/seats`, {
        params: { routeId: bus._id, travelDate: date },
      });
      setBookedSeats(res.data?.bookedSeats || []);
    } catch {
      setBookedSeats([]);
    }
  };

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      if (selectedSeats.length >= 6) {
        setMessage({ type: "error", text: "Maximum 6 seats per booking." });
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      setMessage({ type: "error", text: "Please select at least one seat." });
      return;
    }
    setPaymentStep("stripe");
    setMessage({ type: "", text: "" });
  };

  const handleConfirmStripePayment = async () => {
    setLoading(true);
    try {
      const amount = selectedSeats.length * 450;

      // 1. Stripe Payment Intent Initialization
      await axios.post(
        `${API_BASE_URL}/api/payment/create-payment-intent`,
        {
          amount,
          seats: selectedSeats,
          busNumber: selectedBus.busNumber,
          travelDate: date,
        },
        { headers: getAuthHeader() }
      );

      // 2. Persist Booking
      const payload = {
        routeId: selectedBus._id,
        busNumber: selectedBus.busNumber,
        from: from || "Central Station",
        to: to || "Terminal Hub",
        travelDate: date,
        seats: selectedSeats,
        amount,
      };

      const bookingRes = await axios.post(`${API_BASE_URL}/api/bookings`, payload, {
        headers: getAuthHeader(),
      });

      // 3. Save ticket to IndexedDB for offline viewing
      await saveTicketsOffline([bookingRes.data]);

      setMessage({ type: "success", text: "Payment Approved! Ticket Saved Locally for Offline Viewing." });
      setPaymentStep("confirmed");

      setTimeout(() => {
        navigate("/my-bookings");
      }, 1800);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Payment transaction failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  const seatList = [];
  ["A", "B", "C", "D"].forEach((row) => {
    for (let i = 1; i <= 8; i++) {
      seatList.push(`${row}${i}`);
    }
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-rose-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-500/30">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-200 uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Stripe Commercial Checkout
          </div>
          <h1 className="text-3xl font-black">Reserve Bus Tickets</h1>
          <p className="text-rose-100 text-sm mt-1">
            Real-time seat lock, Stripe checkout encryption & PWA offline ticket storage.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-black/20 backdrop-blur p-4 rounded-2xl border border-white/10">
            <input
              type="text"
              placeholder="From City"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="px-4 py-2 bg-slate-900/80 text-white placeholder-slate-400 rounded-xl focus:outline-none border border-slate-700 text-sm"
            />
            <input
              type="text"
              placeholder="To City"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="px-4 py-2 bg-slate-900/80 text-white placeholder-slate-400 rounded-xl focus:outline-none border border-slate-700 text-sm"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-4 py-2 bg-slate-900/80 text-white rounded-xl focus:outline-none border border-slate-700 text-sm"
            />
          </div>
        </div>

        {/* Bus List */}
        <div className="space-y-4">
          {buses.map((bus) => (
            <div
              key={bus._id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-md hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 font-bold text-[10px] rounded-full uppercase tracking-wider border border-emerald-500/30">
                  {bus.busType || "AC Express"}
                </span>
                <h3 className="text-xl font-black text-white mt-2">{bus.busNumber}</h3>
                <p className="text-sm font-semibold text-slate-300">{bus.route}</p>
                <p className="text-xs text-slate-500 mt-1">Driver: {bus.driverName}</p>
              </div>

              <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6">
                <p className="text-2xl font-black text-rose-500">LKR 450</p>
                <p className="text-xs text-slate-500">per seat</p>
                <button
                  onClick={() => handleSelectSeatsModal(bus)}
                  className="mt-3 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Select Seats
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Seat Matrix & Stripe Checkout */}
        {selectedBus && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-800 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-black text-white">{selectedBus.busNumber}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{date}</p>
                </div>
                <button
                  onClick={() => setSelectedBus(null)}
                  className="text-slate-500 hover:text-white font-bold text-xl"
                >
                  ✕
                </button>
              </div>

              {message.text && (
                <div
                  className={`mt-4 p-3 rounded-xl text-xs font-bold ${
                    message.type === "error"
                      ? "bg-rose-950 text-rose-300 border border-rose-800"
                      : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                  }`}
                >
                  {message.text}
                </div>
              )}

              {paymentStep === "seats" && (
                <div className="mt-4">
                  <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
                    Interactive Seat Grid (Max 6)
                  </p>

                  <div className="grid grid-cols-8 gap-2 bg-slate-950 p-4 rounded-2xl border border-slate-850">
                    {seatList.map((seat) => {
                      const isBooked = bookedSeats.includes(seat);
                      const isSelected = selectedSeats.includes(seat);

                      return (
                        <button
                          key={seat}
                          disabled={isBooked}
                          onClick={() => toggleSeat(seat)}
                          className={`py-2 text-xs font-bold rounded-lg transition ${
                            isBooked
                              ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                              : isSelected
                              ? "bg-rose-600 text-white shadow"
                              : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700"
                          }`}
                        >
                          {seat}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Seats: {selectedSeats.join(", ") || "None"}</p>
                      <p className="text-2xl font-black text-white">LKR {selectedSeats.length * 450}</p>
                    </div>
                    <button
                      onClick={handleProceedToPayment}
                      disabled={selectedSeats.length === 0}
                      className="px-6 py-2.5 bg-rose-600 text-white font-bold text-xs rounded-xl shadow hover:bg-rose-700 disabled:opacity-50"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}

              {paymentStep === "stripe" && (
                <div className="mt-4 space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span>Card Payment Gateway</span>
                      <CreditCard className="w-4 h-4 text-rose-500" />
                    </div>
                    <p className="text-2xl font-black text-emerald-400">LKR {selectedSeats.length * 450}</p>
                    <p className="text-[10px] text-slate-500 mt-1">Encrypted via 256-bit Stripe SSL</p>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      defaultValue="Alex Johnson"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Card Number (•••• •••• •••• 4242)"
                      defaultValue="4242 4242 4242 4242"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        defaultValue="123"
                        className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmStripePayment}
                    disabled={loading}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition shadow flex items-center justify-center gap-2"
                  >
                    {loading ? "Processing Encryption..." : "Pay Now with Stripe"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
