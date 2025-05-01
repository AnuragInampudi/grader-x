import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/grader-x/',      // ← must exactly match your repo name on GitHub Pages
  plugins: [react()],
  server: { port: 3000 }
})
