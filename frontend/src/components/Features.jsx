import React from "react";

function Features() {
  const features = [
    { title: "Real-Time Tracking", desc: "Track buses live with accurate GPS data." },
    { title: "Easy Ticket Booking", desc: "Book your seats in just a few clicks." },
    { title: "Instant Cancellation", desc: "Cancel quickly on select routes with instant confirmation." },
    { title: "Trusted Operators", desc: "Choose from reliable operators with ratings and reviews." },
  ];

  return (
    <section className="py-10 sm:py-14 text-center">
      <div className="flex flex-col items-center">
        <span className="text-xs font-semibold tracking-wider text-rose-700 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full">
          WHY ROUTEIQ
        </span>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 mb-3">
          Everything you need in one place
        </h3>
        <p className="text-slate-600 max-w-2xl">
          A fast, mobile-first experience inspired by top travel apps — built for everyday journeys.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 text-left">
            <div className="h-10 w-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-4 text-rose-600 font-bold">
              {i + 1}
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h4>
            <p className="text-slate-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
