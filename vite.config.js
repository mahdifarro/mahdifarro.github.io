import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config tuned for GitHub Pages (repo: mahdifarro.github.io)
export default defineConfig({
  plugins: [react()],
  base: "/mahdifarro.github.io/",
  build: {
    outDir: "dist"
  }
});
