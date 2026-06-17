<script setup lang="ts">
useSeoMeta({
  title: 'About — Kivov Digital',
  description: 'We\'re a small, independent software studio focused on practical AI. Founded in 2026. Ontario, Canada.',
  ogTitle: 'About — Kivov Digital',
  ogDescription: 'We\'re a small, independent software studio focused on practical AI. Founded in 2026. Ontario, Canada.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="section">
    <div class="max-w-2xl">
      <p class="eyebrow text-brand text-xs font-medium mb-6">
        About
      </p>

      <h1 class="font-display text-3xl md:text-5xl font-semibold text-ink tracking-tight mb-10">
        Small studio. Practical tools.
      </h1>

      <div class="space-y-6 text-body leading-relaxed text-lg">
        <p>
          We're a small, independent software studio focused on practical AI. We believe the best tools are the ones that work quietly in the background — doing the hard work so people don't have to.
        </p>
        <p>
          We help small and mid-sized businesses put AI to work — starting with a free assessment that finds the quick wins, and going as deep as automation projects and custom-built software when it's worth it.
        </p>
        <p>
          We're not building hype. We're building software that solves real problems, ships reliably, and gets better over time.
        </p>
      </div>

      <div class="mt-12 pt-8 border-t border-line">
        <dl class="flex flex-col sm:flex-row gap-8">
          <div>
            <dt class="text-muted text-sm mb-1">Founded</dt>
            <dd class="text-ink font-medium">2026</dd>
          </div>
          <div>
            <dt class="text-muted text-sm mb-1">Location</dt>
            <dd class="text-ink font-medium">Ontario, Canada</dd>
          </div>
          <div>
            <dt class="text-muted text-sm mb-1">Focus</dt>
            <dd class="text-ink font-medium">AI Software</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
