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
    preserveSymlinks: true, // Preserve symlinks from npm link
  },
  optimizeDeps: {
    include: ['@open-source-economy/api-types'], // Pre-bundle the linked package
  },
  server: {
    port: 5173,
    open: false,
    fs: {
      allow: ['..'], // Allow serving files from parent directories (for linked packages)
    },
  },
  preview: {
    port: 5173,
  },
});

