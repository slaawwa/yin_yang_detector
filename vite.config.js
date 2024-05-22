import fs from 'fs'
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
  // publicDir: 'assets',
  server: {
    proxy: {
      '^/api': {
        target: 'https://slaawwa.github.io/yin_yang_detector/',
        secure: false,
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log(' - req.url:22 >', req.method, req.url); // eslint-disable-line no-console
            const syncResponse = fs.readFileSync('./dist/api.json', 'utf-8');
            res.end(syncResponse);
          })
        },
      }
    }
  }
})
