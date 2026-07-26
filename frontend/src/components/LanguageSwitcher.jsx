import React from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-1 bg-[#111827] border border-[#374151]/30 p-1 rounded-2xl">
      <div className="px-2 text-[#9CA3AF] text-xs flex items-center gap-1 font-bold">
        <Languages className="w-3.5 h-3.5 text-[#4F6BF6]" />
      </div>

      <button
        onClick={() => changeLanguage("en")}
        className={`px-2.5 py-1 text-[11px] font-extrabold rounded-xl transition ${
          i18n.language === "en"
            ? "bg-[#4F6BF6] text-white shadow-lg shadow-[#4F6BF6]/20"
            : "text-[#9CA3AF] hover:text-[#F9FAFB]"
        }`}
      >
        EN
      </button>

      <button
        onClick={() => changeLanguage("si")}
        className={`px-2.5 py-1 text-[11px] font-extrabold rounded-xl transition ${
          i18n.language === "si"
            ? "bg-[#4F6BF6] text-white shadow-lg shadow-[#4F6BF6]/20"
            : "text-[#9CA3AF] hover:text-[#F9FAFB]"
        }`}
      >
        සිංහල
      </button>

      <button
        onClick={() => changeLanguage("ta")}
        className={`px-2.5 py-1 text-[11px] font-extrabold rounded-xl transition ${
          i18n.language === "ta"
            ? "bg-[#4F6BF6] text-white shadow-lg shadow-[#4F6BF6]/20"
            : "text-[#9CA3AF] hover:text-[#F9FAFB]"
        }`}
      >
        தமிழ்
      </button>
    </div>
  );
}
