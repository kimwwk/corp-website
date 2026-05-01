<script setup lang="ts">
useSeoMeta({
  title: 'Products — Kivov Digital',
  description: 'Applications we have built. AI-powered tools designed to be practical, fast, and useful.',
  ogTitle: 'Products — Kivov Digital',
  ogDescription: 'Applications we have built. AI-powered tools designed to be practical, fast, and useful.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const products = [
  {
    title: 'our-pot',
    tagline: 'AI-Assisted Expense Tracking',
    description: 'Your AI assistant for the household pot. Stop the tedious manual entry — our AI proposes expense entries for you to review and approve. You stay in control while your assistant does the heavy lifting.',
    status: 'Available on Android',
    primaryHref: 'https://drive.google.com/file/d/1q-_Q07lBgg8f0S_B11nVOp8cIu-FAAbx/view?usp=drive_link',
    primaryLabel: 'Download for Android',
  },
]
</script>

<template>
  <div class="section">
    <div class="max-w-3xl mb-12">
      <p class="text-brand text-sm font-mono font-medium tracking-widest uppercase mb-6">
        Products
      </p>
      <h1 class="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
        Applications we&#39;ve built
      </h1>
      <p class="text-gray-400 text-lg leading-relaxed">
        Practical AI-powered tools, shipped and in use today.
      </p>
    </div>

    <div class="grid md:grid-cols-1 gap-6 max-w-3xl">
      <article
        v-for="product in products"
        :key="product.title"
        class="card"
      >
        <div class="flex items-baseline justify-between gap-4 mb-3">
          <h2 class="text-white font-semibold text-xl">{{ product.title }}</h2>
          <span class="text-brand text-xs font-mono uppercase tracking-widest flex-shrink-0">
            {{ product.status }}
          </span>
        </div>
        <p class="text-gray-300 mb-2">{{ product.tagline }}</p>
        <p class="text-gray-400 leading-relaxed mb-6">{{ product.description }}</p>

        <a
          :href="product.primaryHref"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary"
        >
          {{ product.primaryLabel }}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </article>
    </div>

    <div class="mt-12 pt-8 border-t border-gray-800 max-w-3xl">
      <p class="text-gray-400 mb-4">More applications in development. Want to talk about a project?</p>
      <NuxtLink to="/contact" class="btn-primary">
        Get in touch
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>
