import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['framer-motion'],
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Proxy API requests to the server-side Node server at port 3001
      '/graphql': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Set the chunk size warning limit to 1000 KB (1 MB)
  },
});