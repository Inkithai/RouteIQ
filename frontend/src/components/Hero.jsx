import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Bus, MapPinned, Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden w-full min-h-[85vh] flex items-center bg-[#0A0E1A]">
      {/* Background orbs */}
      <div className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full bg-[#4F6BF6]/12 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-[#22D3EE]/8 blur-[80px] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'linear-gradient(rgba(79,107,246,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(79,107,246,.06) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage: 'linear-gradient(to bottom, black 40%, transparent 90%)',
      }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#22D3EE]/10 border border-[#22D3EE]/20 rounded-lg text-[11px] font-extrabold uppercase tracking-[.13em] text-[#22D3EE]">
              <span className="w-[7px] h-[7px] rounded-full bg-[#34D399] shadow-[0_0_0_5px_rgba(52,211,153,.15)]" />
              AI-powered transit intelligence
            </div>

            <h2 className="mt-6 text-[44px] sm:text-[56px] lg:text-[64px] font-black leading-[1.06] tracking-[-0.04em] text-[#F9FAFB]">
              The operating system<br />for modern <em className="text-[#4F6BF6] not-italic">bus operations</em>.
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#9CA3AF] font-medium max-w-2xl leading-relaxed">
              RouteIQ gives bus operators real-time fleet tracking, AI-powered route optimization, and online ticketing — one platform to run your entire operation.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/Signup"
                className="inline-flex items-center gap-2 h-12 px-5 bg-[#4F6BF6] hover:bg-[#3B5BDB] text-white rounded-[10px] font-extrabold text-[13px] shadow-lg shadow-[#4F6BF6]/20 transition hover:translate-y-[-2px]"
              >
                Start free trial <ArrowRight size={17} />
              </Link>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 h-12 px-5 border border-[#374151] bg-[#1F2937]/44 text-[#F9FAFB] rounded-[10px] font-extrabold text-[13px] transition hover:translate-y-[-2px] hover:border-[#9CA3AF]"
              >
                <span className="w-[21px] h-[21px] rounded-full bg-[#F9FAFB] text-[#0A0E1A] grid place-items-center"><Play size={12} fill="currentColor" /></span> Watch 2-min demo
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-1.5">
                <span className="w-[25px] h-[25px] rounded-full bg-[#4F6BF6]/15 text-[#4F6BF6] border-2 border-[#0A0E1A] grid place-items-center text-[8px] font-extrabold">SL</span>
                <span className="w-[25px] h-[25px] rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6] border-2 border-[#0A0E1A] grid place-items-center text-[8px] font-extrabold">CT</span>
                <span className="w-[25px] h-[25px] rounded-full bg-[#22D3EE]/15 text-[#22D3EE] border-2 border-[#0A0E1A] grid place-items-center text-[8px] font-extrabold">PK</span>
                <span className="w-[25px] h-[25px] rounded-full bg-[#374151] text-[#9CA3AF] border-2 border-[#0A0E1A] grid place-items-center text-[8px] font-extrabold">+</span>
              </div>
              <span className="text-[11px] text-[#9CA3AF]">
                Trusted by <b className="text-[#F9FAFB]">120+ operators</b> across Sri Lanka
              </span>
            </div>

            {/* Popular routes */}
            <div className="mt-8">
              <p className="text-[11px] font-extrabold text-[#F9FAFB] uppercase tracking-wider">Popular routes</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Colombo → Kandy", "Colombo → Galle", "Colombo → Jaffna", "Expressway E01", "Colombo → Negombo"].map((d) => (
                  <span
                    key={d}
                    className="text-[12px] bg-[#1F2937]/60 border border-[#374151]/40 hover:border-[#4F6BF6]/30 hover:bg-[#4F6BF6]/8 transition px-3 py-1.5 rounded-full text-[#9CA3AF] hover:text-[#F9FAFB]"
                  >
                    <MapPinned size={12} className="inline mr-1 opacity-60" /> {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Dashboard Preview */}
          <div className="hidden lg:block">
            <div className="relative rounded-[16px] border border-[#374151]/20 bg-[#111827] shadow-[0_30px_70px_rgba(0,0,0,.4)] overflow-hidden p-6">
              {/* Mock dashboard header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-[23px] h-[23px] rounded-[5px] bg-[#4F6BF6]/15 text-[#4F6BF6] grid place-items-center">
                    <Bus size={13} />
                  </span>
                  <span className="text-[10px] font-extrabold text-[#F9FAFB]">RouteIQ</span>
                  <span className="w-[1px] h-[12px] bg-[#374151]" />
                  <span className="text-[10px] font-extrabold text-[#9CA3AF]">Command center</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#34D399] shadow-[0_0_0_3px_rgba(52,211,153,.2)]" />
                  <span className="text-[10px] font-extrabold text-[#34D399]">Live</span>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-[#1F2937]/60 border border-[#374151]/30 rounded-xl p-3">
                  <p className="text-[8px] text-[#9CA3AF] uppercase tracking-wider">Active buses</p>
                  <p className="text-[16px] font-bold text-[#F9FAFB] mt-1 font-mono">42</p>
                </div>
                <div className="bg-[#1F2937]/60 border border-[#374151]/30 rounded-xl p-3">
                  <p className="text-[8px] text-[#9CA3AF] uppercase tracking-wider">On-time</p>
                  <p className="text-[16px] font-bold text-[#34D399] mt-1 font-mono">98.4%</p>
                </div>
                <div className="bg-[#1F2937]/60 border border-[#374151]/30 rounded-xl p-3">
                  <p className="text-[8px] text-[#9CA3AF] uppercase tracking-wider">Routes</p>
                  <p className="text-[16px] font-bold text-[#4F6BF6] mt-1 font-mono">18</p>
                </div>
              </div>

              {/* Route list */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 bg-[#1F2937]/30 border border-[#374151]/20 rounded-lg px-3 py-2">
                  <span className="w-[6px] h-[24px] rounded-[5px] bg-[#34D399]" />
                  <div className="flex-1">
                    <b className="text-[10px] text-[#F9FAFB]">Colombo → Kandy</b>
                    <small className="text-[8px] text-[#9CA3AF] block">12 stops · 98% on time</small>
                  </div>
                  <strong className="text-[10px] font-mono text-[#F9FAFB]">09:42</strong>
                </div>
                <div className="flex items-center gap-2 bg-[#1F2937]/30 border border-[#374151]/20 rounded-lg px-3 py-2">
                  <span className="w-[6px] h-[24px] rounded-[5px] bg-[#4F6BF6]" />
                  <div className="flex-1">
                    <b className="text-[10px] text-[#F9FAFB]">Colombo → Galle</b>
                    <small className="text-[8px] text-[#9CA3AF] block">8 stops · In transit</small>
                  </div>
                  <strong className="text-[10px] font-mono text-[#F9FAFB]">10:16</strong>
                </div>
                <div className="flex items-center gap-2 bg-[#1F2937]/30 border border-[#374151]/20 rounded-lg px-3 py-2">
                  <span className="w-[6px] h-[24px] rounded-[5px] bg-[#8B5CF6]" />
                  <div className="flex-1">
                    <b className="text-[10px] text-[#F9FAFB]">Expressway E01</b>
                    <small className="text-[8px] text-[#9CA3AF] block">5 stops · Ready</small>
                  </div>
                  <strong className="text-[10px] font-mono text-[#F9FAFB]">11:05</strong>
                </div>
              </div>

              {/* AI suggestion */}
              <div className="mt-4 flex items-center gap-2 bg-[#8B5CF6]/8 border border-[#8B5CF6]/15 rounded-lg px-3 py-2">
                <Sparkles size={15} className="text-[#8B5CF6]" />
                <span className="text-[8px] text-[#8B5CF6]">
                  <b>AI suggestion:</b> Reassign Bus 17 to reduce 23 min delay on Route 04.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
