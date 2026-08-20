import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://lms.oxfordtraining.uk',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // <--- أضيفي هذا السطر لحذف /api عند تحويل الطلب
        headers: {
          'Cookie': 'plesk_technical_domain=1'
        }
      }
    }
  }
});

