import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  plugins: [
    solidPlugin(),
    // NodeGlobalsPolyfillPlugin({
    //   buffer: true
    // })
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  define: {
    'process.env': {},
    // 'Buffer': {}
  },
  base: './'
});
