import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
  preview: {
    port: 5173,
  },
});

