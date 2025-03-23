import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' 
          ? 'https://loops-in-stitches.onrender.com'
          : 'http://localhost:8000',  // Local development
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
