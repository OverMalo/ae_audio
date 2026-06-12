import { defineConfig } from 'vite'

export default defineConfig({
  base: '/ae_audio/',
  server: {
    port: 5174,
    proxy: {
      // Proxy para evitar CORS al descargar el soundtrack desde R2 en desarrollo local
      '/r2-dev': {
        target: 'https://pub-b47f7ae963d64ec19adbb45d2c202bdb.r2.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/r2-dev/, '')
      }
    }
  }
})