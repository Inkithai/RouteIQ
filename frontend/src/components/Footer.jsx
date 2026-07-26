import React from "react";
import { Bus, MapPinned, ShieldCheck, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0A0E1A] border-t border-[#374151]/30 text-[#9CA3AF] py-16 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#4F6BF6] rounded-lg text-white shadow-lg shadow-[#4F6BF6]/20">
                <Bus className="w-4 h-4" />
              </div>
              <p className="text-xl font-black tracking-tight text-[#F9FAFB]">
                Route<span className="text-[#4F6BF6]">IQ</span>
              </p>
            </div>
            <p className="mt-4 text-sm text-[#9CA3AF] max-w-md leading-relaxed">
              The operating system for modern bus operations. Real-time tracking, AI route optimization, and online ticketing — one platform for Sri Lankan transit.
            </p>
            <div className="mt-6 flex items-center gap-3 text-[10px] font-bold text-[#9CA3AF]">
              <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-[#4F6BF6]" /> SOC 2 Type II</span>
              <span className="flex items-center gap-1"><Globe2 size={14} className="text-[#4F6BF6]" /> GDPR Ready</span>
              <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-[#34D399]" /> 99.9% Uptime</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[.13em] text-[#F9FAFB] mb-4">Product</p>
            <div className="space-y-3">
              <Link to="/" className="text-sm hover:text-[#4F6BF6] transition">Home</Link>
              <Link to="/BusMapPreview" className="text-sm hover:text-[#4F6BF6] transition flex items-center gap-1">
                <MapPinned size={14} className="text-[#22D3EE]" /> Live Tracking
              </Link>
              <Link to="/book" className="text-sm hover:text-[#4F6BF6] transition">Book Tickets</Link>
              <Link to="/BusList" className="text-sm hover:text-[#4F6BF6] transition">Fleet List</Link>
              <a href="#" className="text-sm hover:text-[#4F6BF6] transition">Route Intelligence</a>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[.13em] text-[#F9FAFB] mb-4">Company</p>
            <div className="space-y-3">
              <a href="#" className="text-sm hover:text-[#4F6BF6] transition">About Us</a>
              <a href="#" className="text-sm hover:text-[#4F6BF6] transition">Careers</a>
              <a href="#" className="text-sm hover:text-[#4F6BF6] transition">Blog</a>
              <a href="#" className="text-sm hover:text-[#4F6BF6] transition">Contact</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[.13em] text-[#F9FAFB] mb-4">Legal</p>
            <div className="space-y-3">
              <a href="#" className="text-sm hover:text-[#4F6BF6] transition">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-[#4F6BF6] transition">Terms of Service</a>
              <a href="#" className="text-sm hover:text-[#4F6BF6] transition">Security</a>
              <a href="#" className="text-sm hover:text-[#4F6BF6] transition">Compliance</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#374151]/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} <span className="font-bold text-[#F9FAFB]">RouteIQ</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="text-[#9CA3AF] hover:text-[#4F6BF6] transition">Facebook</a>
            <a href="#" className="text-[#9CA3AF] hover:text-[#4F6BF6] transition">Twitter</a>
            <a href="#" className="text-[#9CA3AF] hover:text-[#4F6BF6] transition">LinkedIn</a>
            <a href="#" className="text-[#9CA3AF] hover:text-[#4F6BF6] transition">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
