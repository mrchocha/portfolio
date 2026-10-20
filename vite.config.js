import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is served from https://mrchocha.github.io/portfolio/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
