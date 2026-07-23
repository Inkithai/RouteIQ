import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Bus, Navigation, Ticket, ShieldCheck, Zap, Radio, Clock } from "lucide-react";
import BusMapPreview from "../components/BusMapPreview";
import { Card, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-rose-500 selection:text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-rose-600/10 blur-[120px] pointer-events-none rounded-full" />

      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <Badge variant="default" className="mx-auto">
            <Zap className="w-3.5 h-3.5 text-rose-400" /> {t("hero_badge")}
          </Badge>

          <h1 className="text-4xl sm:text-7xl font-black tracking-tight text-white leading-[1.1]">
            {t("hero_title_1")}{" "}
            <span className="bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400 bg-clip-text text-transparent">
              {t("hero_title_2")}
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto font-medium">
            {t("hero_sub")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/BusMapPreview">
              <Button size="lg" variant="primary">
                <Navigation className="w-5 h-5" /> {t("btn_launch_map")}
              </Button>
            </Link>
            <Link to="/book">
              <Button size="lg" variant="secondary">
                <Ticket className="w-5 h-5 text-rose-400" /> {t("btn_book_now")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <Card>
            <div className="p-3 bg-rose-500/10 text-rose-400 w-fit rounded-2xl mb-4 border border-rose-500/20">
              <Radio className="w-6 h-6" />
            </div>
            <CardTitle>Live Driver Telemetry</CardTitle>
            <CardDescription className="mt-2">
              Continuous HTML5 Geolocation streaming directly over WebSockets for zero-latency vehicle coordinate tracking.
            </CardDescription>
          </Card>

          <Card>
            <div className="p-3 bg-blue-500/10 text-blue-400 w-fit rounded-2xl mb-4 border border-blue-500/20">
              <Clock className="w-6 h-6" />
            </div>
            <CardTitle>Haversine Traffic ETA</CardTitle>
            <CardDescription className="mt-2">
              Automated spherical coordinate calculations predicting precise arrival times adjusted for dynamic congestion speeds.
            </CardDescription>
          </Card>

          <Card>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 w-fit rounded-2xl mb-4 border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <CardTitle>PWA Offline Ticket Vault</CardTitle>
            <CardDescription className="mt-2">
              Service Worker caching & IndexedDB local ticket storage enabling instant ticket validation offline without signal.
            </CardDescription>
          </Card>
        </div>

        <div className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-rose-500" /> Interactive Fleet Radar Map
            </h2>
            <Badge variant="success">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Dynamic Tiles Connected
            </Badge>
          </div>

          <BusMapPreview />
        </div>
      </section>
    </div>
  );
}
