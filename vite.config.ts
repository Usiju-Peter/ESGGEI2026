import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { compression } from 'vite-plugin-compression2';

import { imagetools } from 'vite-imagetools';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(), 
      imagetools(),
      compression({ algorithms: ['gzip', 'brotliCompress'] })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about/index.html'),
          projects: path.resolve(__dirname, 'projects/index.html'),
          gallery: path.resolve(__dirname, 'gallery/index.html'),
          team: path.resolve(__dirname, 'team/index.html'),
          partner: path.resolve(__dirname, 'partner/index.html'),
        },
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            motion: ['motion'],
            lucide: ['lucide-react']
          }
        }
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
