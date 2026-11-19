import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Optional Vite configuration for developers preferring Vite's ultra-fast SPA dev server
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 3000,
  },
});
