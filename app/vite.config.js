import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import inject from "@rollup/plugin-inject";
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
		rollupOptions: {
			// plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
		},
	},
  define: {
    "process.env": {},
    // "Buffer": {}
  },
  base: "./",
});
