import React from "react";
import ReactDOM from "react-dom/client";
import './i18n';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./App.css";

// Service Worker PWA Registration
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.log("ServiceWorker registration failed: ", err);
    });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
