import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is served from https://mrchocha.github.io/me/
export default defineConfig({
  base: '/me/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
