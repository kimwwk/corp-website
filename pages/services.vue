<script setup lang="ts">
useSeoMeta({
  title: 'Services — Kivov Digital',
  description: 'AI-powered applications, full-stack software development, and technical consulting for AI architecture and automation.',
  ogTitle: 'Services — Kivov Digital',
  ogDescription: 'AI-powered applications, full-stack software development, and technical consulting for AI architecture and automation.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const services = [
  {
    title: 'AI-powered applications',
    description: 'Consumer and business tools built on modern AI — designed to be fast, reliable, and genuinely useful. We build products that automate the repetitive and amplify the important.',
    icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.045.022M14.25 3.104c.251.023.501.05.75.082M19.5 6.75a48.56 48.56 0 00-1.5-.082M19.5 6.75v5.25',
  },
  {
    title: 'Software development',
    description: 'Full-stack product design and engineering. From architecture and API design to front-end interfaces and deployment pipelines — we own the whole stack.',
    icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
  },
  {
    title: 'Technical consulting',
    description: 'AI architecture, automation strategy, and system design. We help teams understand what\'s worth building, how to build it, and how to keep it running at scale.',
    icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  },
]
</script>

<template>
  <div class="section">
    <div class="max-w-3xl mb-12">
      <p class="text-brand text-sm font-mono font-medium tracking-widest uppercase mb-6">
        Services
      </p>
      <h1 class="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
        What we do
      </h1>
      <p class="text-gray-400 text-lg leading-relaxed">
        We work with a small number of clients and focus deeply on each engagement.
      </p>
    </div>

    <div class="grid md:grid-cols-1 gap-6 max-w-3xl">
      <article
        v-for="service in services"
        :key="service.title"
        class="card flex gap-6"
      >
        <div class="flex-shrink-0 w-11 h-11 rounded-lg bg-brand/10 flex items-center justify-center mt-0.5" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="service.icon" />
          </svg>
        </div>
        <div>
          <h2 class="text-white font-semibold text-lg mb-2">{{ service.title }}</h2>
          <p class="text-gray-400 leading-relaxed">{{ service.description }}</p>
        </div>
      </article>
    </div>

    <div class="mt-12 pt-8 border-t border-gray-800 max-w-3xl">
      <p class="text-gray-400 mb-4">Interested in working together?</p>
      <NuxtLink to="/contact" class="btn-primary">
        Get in touch
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>
