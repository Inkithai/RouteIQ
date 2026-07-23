import { io } from "socket.io-client";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

export const socket = io(API_BASE_URL, {
  transports: ["websocket", "polling"],
  autoConnect: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 2000,
});
