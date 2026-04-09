import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      // Assuming you might need ws proxy natively via Vite as well (optional, but good practice if not using explicit wss logic in dev)
    }
  }
})
