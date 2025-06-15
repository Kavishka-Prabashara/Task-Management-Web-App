import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // No 'base' property needed for Vercel deployment!
  build: {
    outDir: 'dist', // This is the default, Vercel will pick it up automatically
  },
});