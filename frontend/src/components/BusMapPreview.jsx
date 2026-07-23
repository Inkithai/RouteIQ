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

// Expressway E04 / A1 Waypoints: Colombo Bastian Mawatha → Kandy Goods Shed
const COLOMBO_KANDY_POLYLINE = [
  [6.9271, 79.8612], // Colombo Bastian Mawatha Bus Station
  [7.0840, 79.9926], // Kadawatha Interchange
  [7.2000, 79.9800], // Nittambuwa Station
  [7.2483, 80.3458], // Mawanella Stop
  [7.2906, 80.6337], // Kandy Goods Shed Bus Stand
];

const SRI_LANKA_STOPS = [
  { name: "Colombo Bastian Mawatha Stand", lat: 6.9271, lng: 79.8612, stopSeq: 1 },
  { name: "Kadawatha Highway Interchange", lat: 7.0840, lng: 79.9926, stopSeq: 2 },
  { name: "Mawanella Central Stop", lat: 7.2483, lng: 80.3458, stopSeq: 3 },
  { name: "Kandy Goods Shed Stand", lat: 7.2906, lng: 80.6337, stopSeq: 4 },
];

function createBusIcon(status = "Active") {
  const isDelayed = status === "Delayed";
  const color = isDelayed ? "#f43f5e" : "#e11d48";

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
        background: #10b981;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 8px #10b981;
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

  // Default to Sri Lanka Central Center (Colombo)
  const validCenter = useMemo(() => {
    const firstValid = activeFleet.find(
      (b) => Number.isFinite(parseFloat(b.latitude)) && Number.isFinite(parseFloat(b.longitude))
    );
    return firstValid
      ? [parseFloat(firstValid.latitude), parseFloat(firstValid.longitude)]
      : [6.9271, 79.8612];
  }, [activeFleet]);

  return (
    <div className="h-[520px] sm:h-[620px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative group">
      {/* Sri Lanka Live Telemetry Overlay */}
      <div className="absolute top-4 left-4 z-[1000] bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700 shadow-lg flex items-center gap-3 text-xs font-extrabold text-white">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
        <Radio className="w-4 h-4 text-rose-500" /> 🇱🇰 Sri Lanka Express Telemetry Radar
      </div>

      <MapContainer center={validCenter} zoom={9} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OSM</a>'
        />
        <AutoPan center={validCenter} />

        {/* Highway Polyline Overlay */}
        <Polyline
          positions={COLOMBO_KANDY_POLYLINE}
          pathOptions={{ color: "#e11d48", weight: 5, opacity: 0.85, dashArray: "10, 8" }}
        />

        {/* Bus Stop Circle Markers */}
        {SRI_LANKA_STOPS.map((stop, i) => (
          <CircleMarker
            key={i}
            center={[stop.lat, stop.lng]}
            radius={8}
            pathOptions={{ color: "#2563eb", fillColor: "#ffffff", fillOpacity: 1, weight: 3 }}
          >
            <Popup>
              <div className="p-1">
                <p className="font-extrabold text-slate-900 text-xs flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" /> {stop.name}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">Station #{stop.stopSeq} - Express Corridor</p>
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
                  <div className="flex items-center justify-between border-b pb-2 mb-2">
                    <span className="font-black text-slate-900 text-base">{bus.busNumber}</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-black rounded-full ${
                        bus.status === "Delayed"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {bus.status || "Active"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mb-1">
                    📍 <strong>Route:</strong> {bus.route}
                  </p>
                  <p className="text-xs text-slate-600 font-medium mb-1">
                    👤 <strong>Driver:</strong> {bus.driverName}
                  </p>
                  <div className="mt-2 pt-2 border-t flex items-center justify-between text-[11px] font-mono">
                    <span className="text-emerald-600 font-bold">⚡ {bus.speedKmph || 50} km/h</span>
                    <span className="text-rose-600 font-bold">⏱ ETA: {etaMinutes} mins</span>
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
