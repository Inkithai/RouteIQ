import React from "react";
import { MapPinned, Ticket, Sparkles, BarChart3 } from "lucide-react";

function Features() {
  const features = [
    { title: "Real-Time Fleet Tracking", desc: "Track every bus live with GPS data. See ETAs, delays, and route progress across your entire operation.", icon: MapPinned },
    { title: "AI Route Optimization", desc: "AI evaluates thousands of route combinations in seconds, reducing fuel costs and improving on-time performance.", icon: Sparkles },
    { title: "Online Ticket Booking", desc: "Let passengers book and pay online. Instant confirmation, QR tickets, and seamless cancellations.", icon: Ticket },
    { title: "Fleet Management Dashboard", desc: "One command center for buses, drivers, routes, and analytics. Replace spreadsheets and phone calls.", icon: BarChart3 },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4F6BF6]/10 border border-[#4F6BF6]/15 rounded-lg text-[11px] font-extrabold uppercase tracking-[.13em] text-[#4F6BF6]">
            <span className="w-[17px] h-[1px] bg-[#4F6BF6]" /> BUILT FOR BUS OPERATORS
          </span>
          <h3 className="mt-4 text-[36px] sm:text-[44px] font-black leading-[1.1] tracking-[-0.04em] text-[#F9FAFB]">
            Everything you need,<br />one platform.
          </h3>
          <p className="mt-3 text-[#9CA3AF] max-w-2xl text-[15px] leading-[1.7]">
            Real-time tracking, AI optimization, ticketing, and fleet management — the operating system for modern bus operations.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={i} className="bg-[#0A0E1A]/60 border border-[#374151]/30 rounded-[16px] p-6 text-left hover:translate-y-[-2px] hover:shadow-[0_20px_40px_rgba(0,0,0,.2)] transition-all group">
              <div className="h-[38px] w-[38px] grid place-items-center rounded-[8px] bg-[#4F6BF6]/12 text-[#4F6BF6] group-hover:bg-[#4F6BF6]/20 transition">
                <f.icon size={20} />
              </div>
              <h4 className="text-[19px] font-bold text-[#F9FAFB] mb-2 mt-4 tracking-[-0.025em]">{f.title}</h4>
              <p className="text-[12px] text-[#9CA3AF] leading-[1.7]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
