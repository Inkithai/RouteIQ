import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { isLoggedIn, getUserRole, logoutUser, getAuthUser } from "../lib/auth";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { Bus, Navigation, Ticket, ShieldCheck, LogOut, Menu, X } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

export default function Navbar() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [busCount, setBusCount] = useState(0);
  const [authState, setAuthState] = useState(() => ({
    loggedIn: isLoggedIn(),
    role: getUserRole(),
    user: getAuthUser(),
  }));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const syncAuth = () => {
      setAuthState({
        loggedIn: isLoggedIn(),
        role: getUserRole(),
        user: getAuthUser(),
      });
    };
    window.addEventListener("auth_changed", syncAuth);
    return () => window.removeEventListener("auth_changed", syncAuth);
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/buses`)
      .then((res) => setBusCount(res.data.length))
      .catch(() => setBusCount(0));
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/Login");
  };

  const isActive = (path) => location.pathname === path;

  const navItemClass = (path) =>
    `px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
      isActive(path)
        ? "bg-[#4F6BF6]/15 text-[#4F6BF6] shadow-lg shadow-[#4F6BF6]/10"
        : "text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]/80"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0E1A]/80 border-b border-[#374151]/60 backdrop-blur-xl text-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-[#4F6BF6] rounded-lg text-white shadow-lg shadow-[#4F6BF6]/20 group-hover:scale-105 transition-transform">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-[#F9FAFB]">
                  Route<span className="text-[#4F6BF6]">IQ</span>
                </span>
                <span className="px-2 py-0.5 text-[9px] uppercase tracking-widest font-black bg-[#8B5CF6]/15 text-[#8B5CF6] rounded-full border border-[#8B5CF6]/25">
                  AI-POWERED
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/" className={navItemClass("/")}>
              {t("nav_home")}
            </Link>
            <Link to="/BusMapPreview" className={navItemClass("/BusMapPreview")}>
              <Navigation className="w-3.5 h-3.5 text-[#22D3EE]" /> {t("nav_tracker")}
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse"></span>
            </Link>
            <Link to="/book" className={navItemClass("/book")}>
              <Ticket className="w-3.5 h-3.5 text-[#4F6BF6]" /> {t("nav_book")}
            </Link>
            <Link to="/BusList" className={navItemClass("/BusList")}>
              {t("nav_fleet")} ({busCount})
            </Link>

            {authState.role === "admin" && (
              <Link to="/dashboard/admin" className={navItemClass("/dashboard/admin")}>
                <ShieldCheck className="w-3.5 h-3.5 text-[#FBBF24]" /> {t("nav_admin")}
              </Link>
            )}

            {authState.loggedIn && authState.role === "customer" && (
              <Link to="/my-bookings" className={navItemClass("/my-bookings")}>
                {t("nav_my_tickets")}
              </Link>
            )}
          </div>

          {/* Language Switcher & Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />

            {authState.loggedIn ? (
              <div className="flex items-center gap-3 pl-2 border-l border-[#374151]">
                <div className="text-right">
                  <p className="text-xs font-extrabold text-[#F9FAFB]">{authState.user?.name || "User"}</p>
                  <p className="text-[10px] uppercase font-bold text-[#4F6BF6] tracking-wider">
                    {authState.role}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-[#9CA3AF] hover:text-[#4F6BF6] hover:bg-[#1F2937] rounded-xl transition"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/Login"
                  className="px-3 py-2 text-xs font-bold text-[#9CA3AF] hover:text-[#F9FAFB] transition"
                >
                  Log In
                </Link>
                <Link
                  to="/Signup"
                  className="px-4 py-2 text-xs font-extrabold bg-[#4F6BF6] hover:bg-[#3B5BDB] text-white rounded-xl transition shadow-lg shadow-[#4F6BF6]/20"
                >
                  Start Free Trial
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Drawer Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#9CA3AF] hover:text-[#F9FAFB]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#374151]/60 bg-[#0A0E1A] px-4 pt-3 pb-6 space-y-2">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className={navItemClass("/")}>
            {t("nav_home")}
          </Link>
          <Link to="/BusMapPreview" onClick={() => setMobileMenuOpen(false)} className={navItemClass("/BusMapPreview")}>
            {t("nav_tracker")}
          </Link>
          <Link to="/book" onClick={() => setMobileMenuOpen(false)} className={navItemClass("/book")}>
            {t("nav_book")}
          </Link>
          <Link to="/BusList" onClick={() => setMobileMenuOpen(false)} className={navItemClass("/BusList")}>
            {t("nav_fleet")}
          </Link>

          {authState.role === "admin" && (
            <Link to="/dashboard/admin" onClick={() => setMobileMenuOpen(false)} className={navItemClass("/dashboard/admin")}>
              {t("nav_admin")}
            </Link>
          )}

          {authState.loggedIn && (
            <Link to="/my-bookings" onClick={() => setMobileMenuOpen(false)} className={navItemClass("/my-bookings")}>
              {t("nav_my_tickets")}
            </Link>
          )}

          <div className="pt-4 border-t border-[#374151]/60">
            {authState.loggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-[#111827] border border-[#374151]/60 text-[#4F6BF6] font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/Login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center font-extrabold text-xs text-[#9CA3AF] bg-[#111827] border border-[#374151]/60 rounded-xl"
                >
                  Log In
                </Link>
                <Link
                  to="/Signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center font-extrabold text-xs text-white bg-[#4F6BF6] rounded-xl shadow-lg shadow-[#4F6BF6]/20"
                >
                  Start Free Trial
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
