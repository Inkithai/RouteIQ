import React from "react";

export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 shadow-xl backdrop-blur-md hover:border-slate-700/80 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }) {
  return <div className={`flex flex-col space-y-1.5 pb-4 ${className}`} {...props}>{children}</div>;
}

export function CardTitle({ className = "", children, ...props }) {
  return <h3 className={`text-xl font-black tracking-tight text-white ${className}`} {...props}>{children}</h3>;
}

export function CardDescription({ className = "", children, ...props }) {
  return <p className={`text-xs font-medium text-slate-400 ${className}`} {...props}>{children}</p>;
}

export function CardContent({ className = "", children, ...props }) {
  return <div className={`pt-2 ${className}`} {...props}>{children}</div>;
}
