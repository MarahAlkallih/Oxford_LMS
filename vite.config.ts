import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://elastic-dirac.153-92-210-41.plesk.page',
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

