// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
  ],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  // Cloudflare Workers deployment
  nitro: {
    preset: 'cloudflare-pages',
  },

  // App-level head defaults
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  // Site config for SEO modules
  site: {
    url: 'https://kuma544514.shop',
    name: 'Corp',
  },

  typescript: {
    strict: true,
  },
})
