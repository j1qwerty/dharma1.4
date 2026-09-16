import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5183, strictPort: true },
  base: '/',
  build: {
    rollupOptions: {
      output: {
        // Split heavy vendor libs into their own chunks so the eager app
        // bundle stays small and caches independently across deploys.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('motion')) return 'motion'
          if (id.includes('phosphor-icons')) return 'icons'
          if (id.includes('react-router') || id.includes('@remix-run')) return 'router'
          if (id.includes('pretext')) return 'pretext'
          if (id.includes('react-dom') || id.includes('/react/')) return 'react'
          return 'vendor'
        },
      },
    },
  },
})

