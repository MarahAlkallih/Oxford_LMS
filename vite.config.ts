import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Tailwind should be configured via PostCSS (postcss.config.js).
  plugins: [react()
      
  ],

  server: {
    proxy: {
      '/api': {
        //https://oxford-lms.onrender.com
        //http://localhost:3000
        target: 'https://oxford-lms.onrender.com',
        changeOrigin: true,

        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})