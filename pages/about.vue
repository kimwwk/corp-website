<script setup lang="ts">
useSeoMeta({
  title: 'About — Corp',
  description: 'We\'re a small, independent software studio focused on practical AI. Founded in 2026. Ontario, Canada.',
  ogTitle: 'About — Corp',
  ogDescription: 'We\'re a small, independent software studio focused on practical AI. Founded in 2026. Ontario, Canada.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="section">
    <div class="max-w-2xl">
      <p class="text-brand text-sm font-mono font-medium tracking-widest uppercase mb-6">
        About
      </p>

      <h1 class="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10">
        Small team. Practical tools.
      </h1>

      <div class="space-y-6 text-gray-400 leading-relaxed text-lg">
        <p>
          We're a small, independent software studio focused on practical AI. We believe the best tools are the ones that work quietly in the background — doing the hard work so people don't have to.
        </p>
        <p>
          We're not building hype. We're building software that solves real problems, ships reliably, and gets better over time.
        </p>
      </div>

      <div class="mt-12 pt-8 border-t border-gray-800">
        <dl class="flex flex-col sm:flex-row gap-8">
          <div>
            <dt class="text-gray-500 text-sm mb-1">Founded</dt>
            <dd class="text-white font-medium">2026</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-sm mb-1">Location</dt>
            <dd class="text-white font-medium">Ontario, Canada</dd>
          </div>
          <div>
            <dt class="text-gray-500 text-sm mb-1">Focus</dt>
            <dd class="text-white font-medium">AI Software</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
