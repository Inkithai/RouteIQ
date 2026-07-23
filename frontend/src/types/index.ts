export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'driver' | 'admin';
  emailVerified?: boolean;
}

export interface Bus {
  _id: string;
  busNumber: string;
  route: string;
  driverName: string;
  driverContact?: string;
  latitude: number;
  longitude: number;
  speedKmph?: number;
  busType?: 'AC' | 'Non-AC' | 'Sleeper' | 'Express';
  status?: 'Active' | 'Inactive' | 'Delayed' | 'On Route' | 'Maintenance';
  lastUpdatedAt?: string;
}

export interface Booking {
  _id: string;
  userId: string;
  userName: string;
  routeId: string;
  busNumber: string;
  from: string;
  to: string;
  travelDate: string;
  seats: string[];
  amount: number;
  status: 'confirmed' | 'cancelled';
  paymentStatus: 'paid' | 'pending';
}

export interface AiEtaPrediction {
  predictedMinutes: number;
  confidenceScore: number;
  modelType: string;
  factors: {
    trafficMultiplier: number;
    weatherMultiplier: number;
    effectiveSpeedKmph: number;
  };
}
