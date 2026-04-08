import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@home': path.resolve(__dirname, '../home'),
    },
  },
  server: {
    allowedHosts: [
      'staging1.testlinksdesign.com',
    ],
    port: 5173,
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
    proxy: {
      '/api': {
        target: 'https://staging1-backend.testlinksdesign.com',
        changeOrigin: true,
      },
    },
  },
});
