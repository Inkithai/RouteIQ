import React from "react";

export function Badge({ variant = "default", className = "", children, ...props }) {
  const variants = {
    default: "bg-[#4F6BF6]/10 text-[#4F6BF6] border-[#4F6BF6]/20",
    success: "bg-[#34D399]/10 text-[#34D399] border-[#34D399]/20",
    warning: "bg-[#FBBF24]/10 text-[#FBBF24] border-[#FBBF24]/20",
    info: "bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/20",
    secondary: "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20",
    slate: "bg-[#1F2937] text-[#9CA3AF] border-[#374151]/40",
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
