<script setup lang="ts">
definePageMeta({
  layout: 'standalone',
})

useSeoMeta({
  title: 'Privacy Policy — Kivov Digital',
  description: 'Privacy Policy for Kivov Digital.',
  robots: 'noindex',
})
</script>

<template>
  <div class="min-h-screen bg-canvas text-body">
    <div class="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <!-- Minimal header for standalone / iframe use -->
      <div class="mb-10">
        <NuxtLink
          to="/"
          class="text-muted hover:text-ink transition-colors text-sm mb-8 inline-flex items-center gap-2"
          aria-label="Back to Kivov Digital homepage"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kivov Digital
        </NuxtLink>
      </div>

      <h1 class="font-display text-2xl md:text-3xl font-semibold text-ink tracking-tight mb-3">
        Privacy Policy
      </h1>
      <p class="text-muted text-sm mb-10">Last updated: June 20, 2026</p>

      <iframe
        src="/privacy.html"
        class="w-full h-screen border-0 bg-white"
        title="Privacy Policy"
      />
    </div>
  </div>
</template>
