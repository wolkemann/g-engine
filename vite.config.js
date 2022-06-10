import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.IS_DEV !== "true" ? "./" : "/",
  build: {
    outDir: "build",
  },
});
