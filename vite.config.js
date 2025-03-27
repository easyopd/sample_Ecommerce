import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 500, // Suppress warning
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor'; // React-related chunks
            if (id.includes('firebase')) return 'firebase-vendor'; // Firebase-related chunks
            if (id.includes('razorpay')) return 'razorpay-vendor'; // Razorpay-related chunks
            return 'vendor'; // General vendor chunk
          }
        },
      },
    },
  },
});
