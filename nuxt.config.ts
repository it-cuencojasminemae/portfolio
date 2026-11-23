// https://nuxt.com/docs/api/configuration/nuxt-config
import { readdirSync } from 'node:fs'

// The certificate viewer (a modal) isn't on the page when the site is prerendered, so its
// full-size WebP images would never be generated. List them here so the build creates them.
// Must match the URL the modal's <NuxtImg> asks for (format webp, quality 85, no resize).
const certificateImages = readdirSync(new URL('./public/certificates', import.meta.url))
  .filter(file => file.endsWith('.png'))
  .map(file => `/_ipx/f_webp&q_85/certificates/${file}`)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Nuxt UI also brings in @nuxt/icon, @nuxt/fonts and @nuxtjs/color-mode for us.
  modules: ['@nuxt/ui', '@nuxt/image', 'motion-v/nuxt'],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },

  // Light mode first; visitors can still switch with the toggle in the header.
  colorMode: {
    preference: 'light'
  },

  // Plus Jakarta Sans + JetBrains Mono are picked up from main.css automatically.
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700, 800]
    }
  },

  // Always output a plain static site. Without this, Nuxt detects Cloudflare's build
  // environment and switches to a server (Worker) build, which skips prerendering.
  nitro: {
    preset: 'static',
    prerender: {
      routes: certificateImages
    }
  },

  // Images are optimized at build time (nuxt generate) and shipped as static files.
  // Pinning 'ipx' stops @nuxt/image from switching to a host's paid image CDN.
  image: {
    provider: 'ipx',
    quality: 85,
    format: ['webp']
  }
})
