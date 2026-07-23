/**
 * Haversine distance formula to calculate great-circle distance between two GPS coordinates in kilometers.
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  if (!Number.isFinite(lat1) || !Number.isFinite(lon1) || !Number.isFinite(lat2) || !Number.isFinite(lon2)) {
    return 0;
  }
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Calculates dynamic traffic-aware Estimated Time of Arrival (ETA) in minutes.
 */
export function estimateTrafficEta(currentLat, currentLng, destLat, destLng, speedKmph = 30) {
  const distanceKm = calculateHaversineDistance(currentLat, currentLng, destLat, destLng);
  // Fallback speed buffer for urban congestion
  const effectiveSpeed = Number.isFinite(speedKmph) && speedKmph > 5 ? speedKmph : 25;
  const durationHours = distanceKm / effectiveSpeed;
  return Math.max(1, Math.round(durationHours * 60));
}
