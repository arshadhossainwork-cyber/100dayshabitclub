import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      manifest: {
        name: '100 Days Habit Club',
        short_name: 'Habit Club',
        description: 'Build lasting habits in 100 days. Track your progress with a beautiful grid, streaks, and milestones.',
        theme_color: '#080A10',
        background_color: '#080A10',
        display: 'standalone',
        start_url: '/',
        id: '/',
        orientation: 'portrait',
        categories: ['productivity', 'lifestyle', 'health'],
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        globIgnores: ['**/og-image.png'],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api/, /^\/auth/],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // Never cache Supabase API responses
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkOnly',
          },
          {
            // Never cache Vercel analytics
            urlPattern: /^https:\/\/.*\.vercel-analytics\.com\/.*/i,
            handler: 'NetworkOnly',
          },
        ],
      },
    }),
  ],
})
