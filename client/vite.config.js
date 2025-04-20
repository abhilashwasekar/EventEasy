import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: "/", // 👈 necessary for proper routing when deployed
  build: {
    outDir: "dist", // 👈 makes sure Vite outputs to /dist for Vercel
  },
});
