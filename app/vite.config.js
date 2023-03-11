import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import inject from "@rollup/plugin-inject";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    rollupOptions: {
      plugins: [
        inject({
          include: ["node_modules/@ledgerhq/**"],
          modules: { Buffer: ["buffer", "Buffer"] },
        }),
      ],
    },
  },
  define: {
    "process.env": {},
    "Buffer": {}
  },
  base: "./",
});
