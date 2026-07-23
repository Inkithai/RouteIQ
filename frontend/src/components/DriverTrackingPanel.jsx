import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthHeader } from "../lib/auth";
import { Navigation, Play, Square, Radio, AlertCircle } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

export default function DriverTrackingPanel({ busId }) {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [coords, setCoords] = useState({ latitude: null, longitude: null, speed: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    let watchId = null;

    if (isBroadcasting) {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        setIsBroadcasting(false);
        return;
      }

      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude, speed } = pos.coords;
          const speedKmph = speed ? Math.round(speed * 3.6) : 25;

          setCoords({ latitude, longitude, speed: speedKmph });

          // Post telemetry to API
          axios
            .post(
              `${API_BASE_URL}/api/drivers/broadcast-gps`,
              {
                busId,
                latitude,
                longitude,
                speedKmph,
              },
              { headers: getAuthHeader() }
            )
            .catch((err) => console.error("GPS Broadcast failed:", err));
        },
        (err) => {
          setError(`GPS Error: ${err.message}`);
          setIsBroadcasting(false);
        },
        { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }
      );
    }

    return () => {
      if (watchId !== null && navigator.geolocation) navigator.geolocation.clearWatch(watchId);
    };
  }, [isBroadcasting, busId]);

  return (
    <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${isBroadcasting ? "bg-rose-600 animate-pulse" : "bg-slate-800"}`}>
            <Radio className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Driver GPS Broadcast</h3>
            <p className="text-xs text-slate-400">Broadcasting telemetry live via WebSocket</p>
          </div>
        </div>

        <button
          onClick={() => setIsBroadcasting(!isBroadcasting)}
          className={`px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            isBroadcasting
              ? "bg-rose-600 hover:bg-rose-700 text-white"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
        >
          {isBroadcasting ? (
            <>
              <Square className="w-4 h-4 fill-white" /> Stop Live Broadcast
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" /> Start GPS Sharing
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-rose-950/80 border border-rose-800 text-rose-300 text-xs rounded-xl mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {coords.latitude !== null && (
        <div className="grid grid-cols-3 gap-3 bg-slate-800/80 rounded-2xl p-4 text-center">
          <div>
            <p className="text-[10px] uppercase text-slate-400 font-bold">Latitude</p>
            <p className="font-mono text-sm font-semibold">{coords.latitude.toFixed(4)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-slate-400 font-bold">Longitude</p>
            <p className="font-mono text-sm font-semibold">{coords.longitude.toFixed(4)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-slate-400 font-bold">Speed</p>
            <p className="font-mono text-sm font-semibold text-emerald-400">{coords.speed} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
}
