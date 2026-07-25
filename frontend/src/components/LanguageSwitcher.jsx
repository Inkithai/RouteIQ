import React from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-2xl">
      <div className="px-2 text-slate-400 text-xs flex items-center gap-1 font-bold">
        <Languages className="w-3.5 h-3.5 text-blue-500" />
      </div>

      <button
        onClick={() => changeLanguage("en")}
        className={`px-2.5 py-1 text-[11px] font-extrabold rounded-xl transition ${
          i18n.language === "en"
            ? "bg-blue-600 text-white shadow-sm"
            : "text-slate-400 hover:text-white"
        }`}
      >
        EN
      </button>

      <button
        onClick={() => changeLanguage("si")}
        className={`px-2.5 py-1 text-[11px] font-extrabold rounded-xl transition ${
          i18n.language === "si"
            ? "bg-blue-600 text-white shadow-sm"
            : "text-slate-400 hover:text-white"
        }`}
      >
        සිංහල
      </button>

      <button
        onClick={() => changeLanguage("ta")}
        className={`px-2.5 py-1 text-[11px] font-extrabold rounded-xl transition ${
          i18n.language === "ta"
            ? "bg-blue-600 text-white shadow-sm"
            : "text-slate-400 hover:text-white"
        }`}
      >
        தமிழ்
      </button>
    </div>
  );
}
