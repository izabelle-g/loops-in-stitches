import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Make sure your backend is running on this port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
