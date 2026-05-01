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
    description: 'Your AI assistant for the household pot. Tell it what you spent, review the proposed entry, approve.',
    status: 'Available on Android',
    href: 'https://our-pot.com',
    icon: '/our-pot-icon.png',
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
      <a
        v-for="product in products"
        :key="product.title"
        :href="product.href"
        target="_blank"
        rel="noopener noreferrer"
        class="card group flex gap-5 items-start hover:border-brand transition-colors"
        :aria-label="`Learn more about ${product.title}`"
      >
        <img
          :src="product.icon"
          :alt="`${product.title} icon`"
          class="w-16 h-16 rounded-xl flex-shrink-0"
          width="64"
          height="64"
        >
        <div class="flex-1 min-w-0">
          <div class="flex items-baseline justify-between gap-4 mb-2">
            <h2 class="text-white font-semibold text-xl group-hover:text-brand transition-colors">
              {{ product.title }}
            </h2>
            <span class="text-brand text-xs font-mono uppercase tracking-widest flex-shrink-0">
              {{ product.status }}
            </span>
          </div>
          <p class="text-gray-300 text-sm mb-1">{{ product.tagline }}</p>
          <p class="text-gray-400 text-sm leading-relaxed">{{ product.description }}</p>
        </div>
      </a>
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
