import React from "react";

export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`bg-[#111827]/80 border border-[#374151]/30 rounded-2xl p-6 shadow-xl backdrop-blur-md hover:border-[#4F6BF6]/20 hover:translate-y-[-2px] hover:shadow-[0_20px_40px_rgba(0,0,0,.2)] transition-all duration-300 ${className}`}
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
  return <h3 className={`text-xl font-black tracking-tight text-[#F9FAFB] ${className}`} {...props}>{children}</h3>;
}

export function CardDescription({ className = "", children, ...props }) {
  return <p className={`text-xs font-medium text-[#9CA3AF] ${className}`} {...props}>{children}</p>;
}

export function CardContent({ className = "", children, ...props }) {
  return <div className={`pt-2 ${className}`} {...props}>{children}</div>;
}
