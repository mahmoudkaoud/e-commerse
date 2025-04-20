import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/e-commerse/', // اسم الريبو هنا
  plugins: [react()]
})
