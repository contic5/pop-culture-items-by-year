import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pop-culture-items-by-year/', // Match GitHub repo name exactly
  build: {
    outDir: 'build' // Optional — only if you want `build` instead of `dist`
  },

})
