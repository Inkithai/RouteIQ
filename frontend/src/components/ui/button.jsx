import React from "react";

export function Button({ variant = "primary", size = "md", className = "", children, disabled, ...props }) {
  const base = "font-extrabold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";
  
  const variants = {
    primary: "bg-[#4F6BF6] hover:bg-[#3B5BDB] text-white shadow-lg shadow-[#4F6BF6]/20 hover:shadow-[#4F6BF6]/30",
    secondary: "bg-[#111827] hover:bg-[#1F2937] text-[#F9FAFB] border border-[#374151]/40 hover:border-[#9CA3AF]",
    ghost: "bg-transparent text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]/60",
    success: "bg-[#34D399] hover:bg-[#2DD4BF] text-[#0A0E1A] shadow-lg shadow-[#34D399]/20",
    danger: "bg-[#F87171] hover:bg-[#EF4444] text-white shadow-lg shadow-[#F87171]/20",
    accent: "bg-gradient-to-r from-[#4F6BF6] to-[#8B5CF6] hover:from-[#3B5BDB] hover:to-[#7C3AED] text-white shadow-lg shadow-[#4F6BF6]/20",
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
