import React from "react";

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 text-slate-600 py-12 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xl font-extrabold text-slate-900 tracking-tight">
              Route<span className="text-blue-600">IQ</span>
            </p>
            <p className="mt-2 text-sm text-slate-600 max-w-md">
              Sri Lanka's smart bus booking &amp; live tracking platform — Colombo metro routes, expressways &amp; island-wide journeys.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <a href="#" className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors">
              Facebook
            </a>
            <a href="#" className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors">
              Twitter
            </a>
            <a href="#" className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors">
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm">
            © {new Date().getFullYear()} <span className="font-semibold text-slate-900">RouteIQ</span>. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">Book tickets, track buses, and travel smarter.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
