import React from "react";

export function Button({ variant = "primary", size = "md", className = "", children, disabled, ...props }) {
  const base = "font-extrabold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";
  
  const variants = {
    primary: "bg-gradient-to-r from-lime-400 to-lime-300 hover:from-lime-300 hover:to-lime-400 text-slate-950 shadow-lg shadow-lime-400/20 hover:shadow-lime-400/35",
    secondary: "bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 hover:border-slate-700",
    ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/60",
    success: "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg shadow-emerald-600/30",
    danger: "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30",
  };

  const sizes = {
    sm: "px-3.5 py-2 text-xs",
    md: "px-5 py-2.5 text-xs",
    lg: "px-7 py-3.5 text-sm",
  };

  return (
    <button
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
