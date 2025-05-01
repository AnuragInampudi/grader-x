// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: 'https://anuraginampudi.github.io/Grader_x/',    
  plugins: [react()],
  server: { port: 3000 }
})
