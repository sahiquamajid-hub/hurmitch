import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Hurmitch Agent',
        short_name: 'Hurmitch',
        description: 'List your karhai work — send a photo and a voice note',
        start_url: '/agent',
        scope: '/',
        display: 'standalone',
        background_color: '#F5EDE0',
        theme_color: '#C1502E',
        icons: [
          { src: '/favicon.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/favicon.svg', sizes: '512x512', type: 'image/svg+xml' }
        ]
      }
    })
  ],
})