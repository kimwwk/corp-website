<script setup lang="ts">
definePageMeta({
  layout: 'standalone',
})

useSeoMeta({
  title: 'Privacy Policy — Corp',
  description: 'Privacy Policy for Corp.',
  robots: 'noindex',
})
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-gray-100">
    <div class="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <!-- Minimal header for standalone / iframe use -->
      <div class="mb-10">
        <NuxtLink
          to="/"
          class="text-gray-500 hover:text-gray-300 transition-colors text-sm mb-8 inline-flex items-center gap-2"
          aria-label="Back to Corp homepage"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Corp
        </NuxtLink>
      </div>

      <h1 class="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
        Privacy Policy
      </h1>
      <p class="text-gray-500 text-sm mb-10">Last updated: April 2026</p>

      <div class="prose prose-invert prose-sm max-w-none">
        <p class="text-gray-400 leading-relaxed text-base">
          <strong class="text-gray-200">Coming Soon.</strong> This page will contain our privacy policy.
        </p>
        <p class="text-gray-500 mt-4 text-sm leading-relaxed">
          Our privacy policy is currently being prepared. Please check back soon for the full policy detailing how we collect, use, and protect your information.
        </p>
      </div>
    </div>
  </div>
</template>
