import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { socket } from "../lib/socket";
import { estimateTrafficEta } from "../lib/geo";
import { Radio, MapPin } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

// Colombo Metropolitan & Expressway Routes
const COLOMBO_KANDY_POLYLINE = [
  [6.9271, 79.8612],
  [6.9487, 79.8593],
  [7.0840, 79.9926],
  [7.2000, 79.9800],
  [7.2483, 80.3458],
  [7.2906, 80.6337],
];

const COLOMBO_GALLE_POLYLINE = [
  [6.9271, 79.8612],
  [6.8890, 79.8531],
  [6.7905, 79.9057],
  [6.6833, 79.9000],
  [6.5833, 80.1500],
  [6.0535, 80.2208],
];

const COLOMBO_NEGOMBO_POLYLINE = [
  [6.9271, 79.8612],
  [7.0033, 79.8833],
  [7.0833, 79.8833],
  [7.1500, 79.8500],
  [7.2100, 79.8300],
];

const COLOMBO_MATARA_POLYLINE = [
  [6.9271, 79.8612],
  [6.6833, 79.9000],
  [6.4500, 80.0500],
  [6.2500, 80.1000],
  [6.0535, 80.2208],
  [5.9485, 80.5353],
];

const SRI_LANKA_STOPS = [
  { name: "Colombo Fort Bus Station", lat: 6.9271, lng: 79.8612, stopSeq: 1 },
  { name: "Colombo Pettah Stand", lat: 6.9487, lng: 79.8593, stopSeq: 2 },
  { name: "Kadawatha Highway Interchange", lat: 7.0840, lng: 79.9926, stopSeq: 3 },
  { name: "Mawanella Central Stop", lat: 7.2483, lng: 80.3458, stopSeq: 4 },
  { name: "Kandy Goods Shed Stand", lat: 7.2906, lng: 80.6337, stopSeq: 5 },
  { name: "Wellawatte Junction", lat: 6.8890, lng: 79.8531, stopSeq: 6 },
  { name: "Panadura Bus Stand", lat: 6.7905, lng: 79.9057, stopSeq: 7 },
  { name: "Kalutara South", lat: 6.6833, lng: 79.9000, stopSeq: 8 },
  { name: "Galle Main Stand", lat: 6.0535, lng: 80.2208, stopSeq: 9 },
  { name: "Matara Bus Complex", lat: 5.9485, lng: 80.5353, stopSeq: 10 },
  { name: "Ja-Ela Junction", lat: 7.0033, lng: 79.8833, stopSeq: 11 },
  { name: "Katunayake Airport", lat: 7.1500, lng: 79.8500, stopSeq: 12 },
  { name: "Negombo Bus Stand", lat: 7.2100, lng: 79.8300, stopSeq: 13 },
];

function createBusIcon(status = "Active") {
  const isDelayed = status === "Delayed";
  const color = isDelayed ? "#F87171" : "#4F6BF6";

  const svgMarker = `
    <div style="
      position: relative;
      width: 44px;
      height: 44px;
      background: ${color};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      border: 3px solid #ffffff;
      transition: transform 0.3s ease;
    ">
      <span style="font-size: 22px; line-height: 1;">🚌</span>
      <span style="
        position: absolute;
        top: -2px;
        right: -2px;
        width: 12px;
        height: 12px;
        background: #34D399;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 8px #34D399;
      "></span>
    </div>
  `;

  return L.divIcon({
    html: svgMarker,
    className: "",
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -22],
  });
}

function AutoPan({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && Number.isFinite(center[0]) && Number.isFinite(center[1])) {
      map.setView(center, map.getZoom(), { animate: true });
    }
  }, [center, map]);
  return null;
}

export default function BusMapPreview({ buses = [] }) {
  const [liveBuses, setLiveBuses] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/buses`)
      .then((res) => setLiveBuses(Array.isArray(res.data) ? res.data : []))
      .catch(() => setLiveBuses([]));
  }, []);

  useEffect(() => {
    const handleLocationUpdate = (data) => {
      if (!data) return;
      const busId = data.busId || data._id;
      const lat = parseFloat(data.latitude);
      const lng = parseFloat(data.longitude);

      if (!busId || !Number.isFinite(lat) || !Number.isFinite(lng)) return;

      setLiveBuses((prev) => {
        const next = [...prev];
        const index = next.findIndex((b) => b._id === busId);
        if (index !== -1) {
          next[index] = {
            ...next[index],
            latitude: lat,
            longitude: lng,
            speedKmph: data.speedKmph ?? next[index].speedKmph,
            status: data.status ?? next[index].status,
            lastUpdatedAt: data.updatedAt || new Date().toISOString(),
          };
        }
        return next;
      });
    };

    socket.on("updateBusLocation", handleLocationUpdate);
    return () => {
      socket.off("updateBusLocation", handleLocationUpdate);
    };
  }, []);

  const activeFleet = buses && buses.length > 0 ? buses : liveBuses;

  const validCenter = useMemo(() => {
    const firstValid = activeFleet.find(
      (b) => Number.isFinite(parseFloat(b.latitude)) && Number.isFinite(parseFloat(b.longitude))
    );
    return firstValid
      ? [parseFloat(firstValid.latitude), parseFloat(firstValid.longitude)]
      : [6.9271, 79.8612];
  }, [activeFleet]);

  return (
    <div className="h-[520px] sm:h-[620px] w-full rounded-3xl overflow-hidden shadow-2xl border border-[#374151]/30 relative group">
      {/* Sri Lanka Live Telemetry Overlay */}
      <div className="absolute top-4 left-4 z-[1000] bg-[#111827]/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#374151]/30 shadow-lg flex items-center gap-3 text-xs font-extrabold text-[#F9FAFB]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] animate-ping"></span>
        <Radio className="w-4 h-4 text-[#4F6BF6]" /> 🇱🇰 Sri Lanka Express Telemetry Radar
      </div>

      {/* Colombo Route Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-[#111827]/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#374151]/30 shadow-lg text-xs text-[#F9FAFB] space-y-1.5 max-w-[240px]">
        <p className="font-extrabold text-[#F9FAFB] text-[10px] uppercase tracking-wider mb-2">🗺️ Colombo Route Corridors</p>
        <div className="flex items-center gap-2">
          <span className="w-4 h-1 rounded-full bg-[#4F6BF6]"></span>
          <span className="text-[11px]">Colombo → Kandy (A1)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-1 rounded-full bg-[#8B5CF6]"></span>
          <span className="text-[11px]">Colombo → Galle (E01)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-1 rounded-full bg-[#34D399]"></span>
          <span className="text-[11px]">Colombo → Negombo (A3)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-1 rounded-full bg-[#FBBF24]"></span>
          <span className="text-[11px]">Colombo → Matara (Southern)</span>
        </div>
      </div>

      <MapContainer center={validCenter} zoom={9} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OSM</a>'
        />
        <AutoPan center={validCenter} />

        {/* Colombo → Kandy Expressway (A1) */}
        <Polyline
          positions={COLOMBO_KANDY_POLYLINE}
          pathOptions={{ color: "#4F6BF6", weight: 5, opacity: 0.85, dashArray: "10, 8" }}
        />
        {/* Colombo → Galle Southern Expressway (E01) */}
        <Polyline
          positions={COLOMBO_GALLE_POLYLINE}
          pathOptions={{ color: "#8B5CF6", weight: 4, opacity: 0.7, dashArray: "8, 6" }}
        />
        {/* Colombo → Negombo / Airport (A3) */}
        <Polyline
          positions={COLOMBO_NEGOMBO_POLYLINE}
          pathOptions={{ color: "#34D399", weight: 4, opacity: 0.7, dashArray: "8, 6" }}
        />
        {/* Colombo → Matara Southern Route */}
        <Polyline
          positions={COLOMBO_MATARA_POLYLINE}
          pathOptions={{ color: "#FBBF24", weight: 3, opacity: 0.6, dashArray: "6, 5" }}
        />

        {/* Bus Stop Circle Markers */}
        {SRI_LANKA_STOPS.map((stop, i) => (
          <CircleMarker
            key={i}
            center={[stop.lat, stop.lng]}
            radius={8}
            pathOptions={{ color: "#4F6BF6", fillColor: "#ffffff", fillOpacity: 1, weight: 3 }}
          >
            <Popup>
              <div className="p-1">
                <p className="font-extrabold text-[#0A0E1A] text-xs flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#4F6BF6]" /> {stop.name}
                </p>
                <p className="text-[10px] text-[#9CA3AF] font-medium">Station #{stop.stopSeq} - Express Corridor</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* Sri Lanka Fleet Bus Markers */}
        {activeFleet.map((bus) => {
          const lat = parseFloat(bus.latitude);
          const lng = parseFloat(bus.longitude);

          if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

          const etaMinutes = estimateTrafficEta(lat, lng, 7.2906, 80.6337, bus.speedKmph || 50);

          return (
            <Marker key={bus._id || bus.busNumber} position={[lat, lng]} icon={createBusIcon(bus.status)}>
              <Popup className="custom-popup">
                <div className="p-1 min-w-[200px]">
                  <div className="flex items-center justify-between border-b border-[#374151]/30 pb-2 mb-2">
                    <span className="font-black text-[#F9FAFB] text-base">{bus.busNumber}</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-black rounded-full ${
                        bus.status === "Delayed"
                          ? "bg-[#F87171]/10 text-[#F87171] border border-[#F87171]/20"
                          : "bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/20"
                      }`}
                    >
                      {bus.status || "Active"}
                    </span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] font-medium mb-1">
                    📍 <strong>Route:</strong> {bus.route}
                  </p>
                  <p className="text-xs text-[#9CA3AF] font-medium mb-1">
                    👤 <strong>Driver:</strong> {bus.driverName}
                  </p>
                  <div className="mt-2 pt-2 border-t border-[#374151]/30 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#34D399] font-bold">⚡ {bus.speedKmph || 50} km/h</span>
                    <span className="text-[#4F6BF6] font-bold">⏱ ETA: {etaMinutes} mins</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
