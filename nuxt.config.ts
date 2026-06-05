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

  // Public config — override at build time with NUXT_PUBLIC_N8N_WEBHOOK_URL
  runtimeConfig: {
    public: {
      n8nWebhookUrl: 'https://automation.getjustgo.com/webhook/kivov-assessment-lead',
      n8nBookingWebhookUrl: 'https://automation.getjustgo.com/webhook/kivov-assessment-booking',
    },
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
    url: 'https://kivov.work',
    name: 'Kivov Digital',
  },

  typescript: {
    strict: true,
  },
})
