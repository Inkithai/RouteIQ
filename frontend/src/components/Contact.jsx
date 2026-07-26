import React from "react";
import { Mail, Phone, MapPin, Clock, ShieldCheck, Sparkles } from "lucide-react";

function Contact() {
  return (
    <div className="bg-gradient-to-b from-[#0A0E1A] via-[#111827] to-[#0A0E1A] px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#111827]/80 backdrop-blur-xl rounded-3xl border border-[#374151]/30 shadow-[0_20px_50px_rgba(0,0,0,.3)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 bg-gradient-to-br from-[#4F6BF6]/10 via-[#8B5CF6]/8 to-[#22D3EE]/5 p-8 sm:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#374151]/30">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#22D3EE]/10 border border-[#22D3EE]/15 rounded-lg text-[11px] font-extrabold uppercase tracking-[.13em] text-[#22D3EE]">
                <Sparkles size={13} /> HELP CENTER
              </span>
              <h1 className="mt-4 text-3xl sm:text-4xl font-black text-[#F9FAFB] leading-tight tracking-[-0.04em]">
                We're here for<br />your operation.
              </h1>
              <p className="mt-3 text-[#9CA3AF] text-sm max-w-md leading-relaxed">
                Fleet support, booking help, live tracking assistance, and route optimization — all in one place.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="bg-[#0A0E1A]/60 border border-[#374151]/30 rounded-xl p-3">
                  <p className="text-[8px] text-[#9CA3AF] uppercase tracking-wider">Response time</p>
                  <p className="mt-1 text-sm font-bold text-[#34D399]">&lt; 2 min</p>
                </div>
                <div className="bg-[#0A0E1A]/60 border border-[#374151]/30 rounded-xl p-3">
                  <p className="text-[8px] text-[#9CA3AF] uppercase tracking-wider">Uptime</p>
                  <p className="mt-1 text-sm font-bold text-[#4F6BF6]">99.9%</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-2xl font-black text-[#F9FAFB]">Support & Contact</h2>
                  <p className="text-[#9CA3AF] mt-1 text-sm">
                    Reach us anytime — we'll get you back on track.
                  </p>
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-[.13em] text-[#34D399] bg-[#34D399]/10 border border-[#34D399]/15 px-3 py-1 rounded-lg">
                  24×7
                </span>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 border border-[#374151]/30 p-4 rounded-2xl bg-[#0A0E1A]/30 hover:border-[#4F6BF6]/20 hover:bg-[#4F6BF6]/5 transition">
                  <Phone className="text-[#4F6BF6] w-5 h-5 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-[#F9FAFB] text-sm">Customer Care</h3>
                    <p className="text-[#9CA3AF] text-xs">+94 11 234 5678</p>
                    <p className="text-[#9CA3AF]/60 text-[10px] mt-1">Booking, cancellations, and trip help</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border border-[#374151]/30 p-4 rounded-2xl bg-[#0A0E1A]/30 hover:border-[#4F6BF6]/20 hover:bg-[#4F6BF6]/5 transition">
                  <Mail className="text-[#4F6BF6] w-5 h-5 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-[#F9FAFB] text-sm">Email Support</h3>
                    <p className="text-[#9CA3AF] text-xs">support@routeiq.lk</p>
                    <p className="text-[#9CA3AF]/60 text-[10px] mt-1">Refunds and invoices</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border border-[#374151]/30 p-4 rounded-2xl bg-[#0A0E1A]/30 hover:border-[#4F6BF6]/20 hover:bg-[#4F6BF6]/5 transition">
                  <MapPin className="text-[#4F6BF6] w-5 h-5 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-[#F9FAFB] text-sm">Head Office</h3>
                    <p className="text-[#9CA3AF] text-xs">Colombo 01, Sri Lanka</p>
                    <p className="text-[#9CA3AF]/60 text-[10px] mt-1">Mon–Sat</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border border-[#374151]/30 p-4 rounded-2xl bg-[#0A0E1A]/30 hover:border-[#4F6BF6]/20 hover:bg-[#4F6BF6]/5 transition">
                  <Clock className="text-[#4F6BF6] w-5 h-5 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-[#F9FAFB] text-sm">Live Tracking Help</h3>
                    <p className="text-[#9CA3AF] text-xs">GPS + ETA support</p>
                    <p className="text-[#9CA3AF]/60 text-[10px] mt-1">Get route & location updates</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#8B5CF6]/15 bg-[#8B5CF6]/5 p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#8B5CF6] mt-0.5" />
                <p className="text-sm text-[#9CA3AF]">
                  Never share OTP, password, or payment details with anyone. RouteIQ support will never ask for sensitive information.
                </p>
              </div>

              <div className="mt-6 text-xs text-[#9CA3AF]/60">
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
