import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import Components from 'unplugin-vue-components/vite'
import Unfonts from 'unplugin-fonts/vite'
import Vuetify from 'vite-plugin-vuetify'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Vuetify({
      autoImport: {
        labs: true,
      },
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/stores', 'src/utils', 'src/composable'],
    }),
    TurboConsole(),
    Components({
      dirs: ['src/components'],
      dts: 'src/components.d.ts',
    }),
    Unfonts({
      google: {
        families: [
          {
            name: 'Sarabun',
            styles: 'wght@400;500;600;700',
          },
        ],
      },
    }),
    VueI18nPlugin({
      include: [path.resolve(__dirname, './src/locales/**.yml')],
      defaultSFCLang: 'yml',
      compositionOnly: true,
      strictMessage: false,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'CMS',
        short_name: 'CMS',
        description: 'CMS Application',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
