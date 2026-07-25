import React from "react";
import { Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";

function Contact() {
  return (
    <div className="bg-gradient-to-b from-white via-blue-50/30 to-white px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="h-full min-h-[240px] lg:min-h-[420px] relative">
                <img
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
                  alt="Bus travel support"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
                <div className="relative p-6 sm:p-8">
                  <p className="text-xs font-semibold tracking-wider text-white/90 bg-white/10 border border-white/15 px-3 py-1 rounded-full w-fit">
                    HELP CENTER
                  </p>
                  <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                    We’re here for your journey
                  </h1>
                  <p className="mt-2 text-white/90 text-sm max-w-md">
                    Booking help, live tracking support, refunds, and trip updates — all in one place.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Support & Contact</h2>
                  <p className="text-slate-600 mt-1">
                    Reach us anytime — we’ll get you back on track.
                  </p>
                </div>
                <span className="text-xs font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                  24x7
                </span>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 border border-slate-200 p-4 rounded-2xl hover:shadow-sm transition">
                  <Phone className="text-blue-600 w-6 h-6 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Customer Care</h3>
                    <p className="text-slate-600 text-sm">+94 11 234 5678</p>
                    <p className="text-slate-500 text-xs mt-1">Booking, cancellations, and trip help</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border border-slate-200 p-4 rounded-2xl hover:shadow-sm transition">
                  <Mail className="text-blue-600 w-6 h-6 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Email Support</h3>
                    <p className="text-slate-600 text-sm">support@routeiq.example</p>
                    <p className="text-slate-500 text-xs mt-1">Refunds and invoices</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border border-slate-200 p-4 rounded-2xl hover:shadow-sm transition">
                  <MapPin className="text-blue-600 w-6 h-6 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Head Office</h3>
                    <p className="text-slate-600 text-sm">Colombo 01, Sri Lanka</p>
                    <p className="text-slate-500 text-xs mt-1">Mon–Sat</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border border-slate-200 p-4 rounded-2xl hover:shadow-sm transition">
                  <Clock className="text-blue-600 w-6 h-6 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Live Tracking Help</h3>
                    <p className="text-slate-600 text-sm">GPS + ETA support</p>
                    <p className="text-slate-500 text-xs mt-1">Get route & location updates</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-700 mt-0.5" />
                <p className="text-sm text-slate-700">
                  Never share OTP, password, or payment details with anyone. RouteIQ support will never ask for sensitive information.
                </p>
              </div>

              <div className="mt-6 text-xs text-slate-500">
                © {new Date().getFullYear()} RouteIQ. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
