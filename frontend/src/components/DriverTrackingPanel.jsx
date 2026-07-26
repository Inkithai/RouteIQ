import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthHeader } from "../lib/auth";
import { Play, Square, Radio, AlertCircle } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

export default function DriverTrackingPanel({ busId }) {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [coords, setCoords] = useState({ latitude: null, longitude: null, speed: 0 });
  const [error, setError] = useState("");

  const handleBroadcastToggle = () => {
    if (!isBroadcasting) {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        return;
      }
      setError("");
      setIsBroadcasting(true);
    } else {
      setIsBroadcasting(false);
    }
  };

  useEffect(() => {
    let watchId = null;

    if (isBroadcasting) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude, speed } = pos.coords;
          const speedKmph = speed ? Math.round(speed * 3.6) : 25;

          setCoords({ latitude, longitude, speed: speedKmph });

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
    <div className="bg-[#111827] border border-[#374151]/30 text-[#F9FAFB] rounded-3xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${isBroadcasting ? "bg-[#4F6BF6] animate-pulse" : "bg-[#1F2937]"}`}>
            <Radio className="w-6 h-6 text-[#F9FAFB]" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Driver GPS Broadcast</h3>
            <p className="text-xs text-[#9CA3AF]">Broadcasting telemetry live via WebSocket</p>
          </div>
        </div>

        <button
          onClick={handleBroadcastToggle}
          className={`px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            isBroadcasting
              ? "bg-[#4F6BF6] hover:bg-[#3B5BDB] text-white shadow-lg shadow-[#4F6BF6]/20"
              : "bg-[#34D399] hover:bg-[#2DD4BF] text-[#0A0E1A] shadow-lg shadow-[#34D399]/20"
          }`}
        >
          {isBroadcasting ? (
            <>
              <Square className="w-4 h-4 fill-white" /> Stop Live Broadcast
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-[#0A0E1A]" /> Start GPS Sharing
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-[#F87171]/10 border border-[#F87171]/20 text-[#F87171] text-xs rounded-xl mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {coords.latitude !== null && (
        <div className="grid grid-cols-3 gap-3 bg-[#1F2937]/80 rounded-2xl p-4 text-center">
          <div>
            <p className="text-[10px] uppercase text-[#9CA3AF] font-bold">Latitude</p>
            <p className="font-mono text-sm font-semibold text-[#F9FAFB]">{coords.latitude.toFixed(4)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9CA3AF] font-bold">Longitude</p>
            <p className="font-mono text-sm font-semibold text-[#F9FAFB]">{coords.longitude.toFixed(4)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#9CA3AF] font-bold">Speed</p>
            <p className="font-mono text-sm font-semibold text-[#34D399]">{coords.speed} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
}
