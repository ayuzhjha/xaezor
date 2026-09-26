import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Allow large video files to be served in dev
  server: {
    fs: {
      allow: ['..'],
    },
  },
  // Increase chunk size warning limit for video assets
  build: {
    chunkSizeWarningLimit: 1500,
  },
  // Ensure video files are treated as assets
  assetsInclude: ['**/*.mp4', '**/*.webp'],
});
