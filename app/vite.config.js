import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { Buffer } from 'Buffer';

export default defineConfig({
  plugins: [
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  define: {
    'process.env': {},
    'Buffer': Buffer || {}
  },
  base: './'
});
