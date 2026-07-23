import React from "react";

export function Badge({ variant = "default", className = "", children, ...props }) {
  const variants = {
    default: "bg-rose-500/10 text-rose-300 border-rose-500/20",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    info: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    slate: "bg-slate-800 text-slate-300 border-slate-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-black uppercase tracking-wider rounded-full border ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
