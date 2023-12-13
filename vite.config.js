import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_ID': JSON.stringify(env.REACT_APP_ID),
      'process.env.REACT_APP_APIKEY': JSON.stringify(env.REACT_APP_APIKEY)
    },
    plugins: [react()],
    server: {
      watch: {
        usePolling: true
      },
      host: true,
      strictPort: true,
      port: 5173,
    }
  }
})