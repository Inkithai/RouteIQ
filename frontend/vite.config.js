import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fromNodeModules = (...segments) => path.resolve(__dirname, 'node_modules', ...segments);

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: []
      },
      fastRefresh: false
    }),
    tailwindcss()
  ],
  resolve: {
    alias: [
      // Keep every React entrypoint on the same physical package. This prevents
      // Vite's dependency optimizer from serving mixed React instances after it
      // discovers new deps during development, which causes "Invalid hook call".
      { find: /^react$/, replacement: fromNodeModules('react', 'index.js') },
      { find: /^react\/jsx-runtime$/, replacement: fromNodeModules('react', 'jsx-runtime.js') },
      { find: /^react\/jsx-dev-runtime$/, replacement: fromNodeModules('react', 'jsx-dev-runtime.js') },
      { find: /^react-dom$/, replacement: fromNodeModules('react-dom', 'index.js') },
      { find: /^react-dom\/client$/, replacement: fromNodeModules('react-dom', 'client.js') }
    ],
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
    entries: ['index.html', 'src/**/*.{js,jsx,ts,tsx}'],
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
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
