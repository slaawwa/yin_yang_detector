import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/yin_yang_detector/',
  // root: './',
  // build: {
  //     outDir: 'dist',
  // },
  // publicDir: 'assets'
})
