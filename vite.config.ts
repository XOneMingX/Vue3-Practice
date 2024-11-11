import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
// Export the Vite configuration
export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/Vue3-Practice/' : '/', // Set base for production, default to root for other modes
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      outDir: 'dist', // Specify the output directory
      sourcemap: true // Enable source maps for easier debugging
    }
  }
})
