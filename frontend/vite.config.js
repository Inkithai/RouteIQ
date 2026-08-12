import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * plugin-react 6 / Vite 8 no longer export RefreshRuntime.getRefreshReg.
 * Cached or older transforms still call it and crash the app with a blank page:
 *   TypeError: RefreshRuntime.getRefreshReg is not a function
 */
function reactRefreshCompat() {
  return {
    name: 'react-refresh-getRefreshReg-compat',
    enforce: 'pre',
    transform(code, id) {
      const isRefreshRuntime =
        id === '/@react-refresh' ||
        id.endsWith('/@react-refresh') ||
        id.includes('refresh-runtime.js');

      if (!isRefreshRuntime || code.includes('export function getRefreshReg')) {
        return null;
      }

      return {
        code: `${code}

export function getRefreshReg(filename) {
  return (type, id) => {
    register(type, filename + ' ' + id);
  };
}
`,
        map: null
      };
    }
  };
}

export default defineConfig({
  plugins: [react(), reactRefreshCompat(), tailwindcss()],
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
