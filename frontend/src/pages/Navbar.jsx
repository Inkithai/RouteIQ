import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { isLoggedIn, getUserRole, logoutUser, getAuthUser } from "../lib/auth";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { Bus, Navigation, Ticket, ShieldCheck, LogOut, User, Menu, X, Radio } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

export default function Navbar() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [busCount, setBusCount] = useState(0);
  const [authState, setAuthState] = useState({ loggedIn: false, role: null, user: null });
  const navigate = useNavigate();
  const location = useLocation();

  const syncAuth = () => {
    setAuthState({
      loggedIn: isLoggedIn(),
      role: getUserRole(),
      user: getAuthUser(),
    });
  };

  useEffect(() => {
    syncAuth();
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
        ? "bg-lime-400 text-slate-950 shadow-lg shadow-lime-400/20"
        : "text-slate-300 hover:text-white hover:bg-slate-800/80"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-xl text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-gradient-to-tr from-lime-400 to-lime-400 rounded-lg text-slate-950 shadow-lg shadow-lime-400/20 group-hover:scale-105 transition-transform">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white">
                  Route<span className="text-lime-400">IQ</span>
                </span>
                <span className="px-2 py-0.5 text-[9px] uppercase tracking-widest font-black bg-lime-400/20 text-lime-200 rounded-full border border-lime-400/30">
                  ENTERPRISE
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
              <Navigation className="w-3.5 h-3.5 text-lime-300" /> {t("nav_tracker")}
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </Link>
            <Link to="/book" className={navItemClass("/book")}>
              <Ticket className="w-3.5 h-3.5 text-blue-400" /> {t("nav_book")}
            </Link>
            <Link to="/BusList" className={navItemClass("/BusList")}>
              {t("nav_fleet")} ({busCount})
            </Link>

            {authState.role === "admin" && (
              <Link to="/dashboard/admin" className={navItemClass("/dashboard/admin")}>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> {t("nav_admin")}
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
              <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
                <div className="text-right">
                  <p className="text-xs font-extrabold text-slate-200">{authState.user?.name || "User"}</p>
                  <p className="text-[10px] uppercase font-bold text-lime-300 tracking-wider">
                    {authState.role}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-lime-300 hover:bg-slate-800 rounded-xl transition"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/Login"
                  className="px-3 py-2 text-xs font-bold text-slate-300 hover:text-white transition"
                >
                  Log In
                </Link>
                <Link
                  to="/Signup"
                  className="px-4 py-2 text-xs font-extrabold bg-lime-400 hover:bg-lime-400 text-slate-950 rounded-xl transition shadow-lg shadow-lime-400/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Drawer Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-2">
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

          <div className="pt-4 border-t border-slate-800">
            {authState.loggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-slate-900 border border-slate-800 text-lime-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/Login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center font-extrabold text-xs text-white bg-slate-900 border border-slate-800 rounded-xl"
                >
                  Log In
                </Link>
                <Link
                  to="/Signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center font-extrabold text-xs text-slate-950 bg-lime-400 rounded-xl shadow-lg shadow-lime-400/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
