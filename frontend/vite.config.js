import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Keep the official React refresh runtime unmodified. Patching it can cause Vite to
// load incompatible React runtime modules, which in turn produces invalid-hook-call
// errors even when a component follows the Rules of Hooks.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: [
      'react',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-dom',
      'react-dom/client',
      'react-router',
      'react-router-dom'
    ]
  },
  optimizeDeps: {
    include: [
      'axios',
      'i18next',
      'leaflet',
      'lucide-react',
      'react',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-dom',
      'react-dom/client',
      'react-i18next',
      'react-leaflet',
      'react-router-dom',
      'socket.io-client'
    ]
  },
  server: {
    port: 5173,
    host: true,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
