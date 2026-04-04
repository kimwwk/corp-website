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

  // Static Site Generation (works on Vercel + Cloudflare Pages)
  nitro: {
    preset: 'static',
  },

  // App-level head defaults
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'google-site-verification', content: 'V86yYgZYa0b2uAqQxbhb9teevK2zoUKKHVYPdT3IZHo' },
      ],
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
