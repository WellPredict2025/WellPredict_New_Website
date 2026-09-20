import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'plugin-inspect-react-code'

/** Public ngrok tunnel host (override with NGROK_HOST in .env.local). */
const NGROK_HOST =
  process.env.NGROK_HOST ?? "unfreeze-pulse-trance.ngrok-free.dev"

/** Set NGROK=true when serving through the ngrok tunnel so HMR uses wss on port 443. */
const useNgrok =
  process.env.NGROK === "true" ||
  process.env.NGROK === "1" ||
  process.env.npm_lifecycle_event === "dev:ngrok"

const isProduction = process.env.NODE_ENV === 'production'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    !isProduction ? inspectAttr() : undefined,
    react(),
  ].filter(Boolean),
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['motion/react'],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: [NGROK_HOST, ".ngrok-free.app", ".ngrok.io"],
    ...(useNgrok && {
      hmr: {
        host: NGROK_HOST,
        protocol: "wss",
        clientPort: 443,
      },
    }),
  },
});
