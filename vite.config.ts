// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import {dirname, join} from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/threejs-projects/',
  plugins: [vue()],
  resolve: {
    alias: {
      '~': join(__dirname, '.'),
      '@': join(__dirname, 'src')
    }
  }
});