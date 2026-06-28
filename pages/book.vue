<script setup lang="ts">
useSeoMeta({
  title: 'Book Your Free AI Assessment — Kivov Digital',
  description: 'Pick a time that works — weekdays 10am–4pm ET, starting tomorrow. A free 45-minute call about how your business runs, then a written report of practical AI quick wins.',
  ogTitle: 'Book Your Free AI Assessment — Kivov Digital',
  ogDescription: 'Pick a time that works — weekdays 10am–4pm ET, starting tomorrow. A free 45-minute call about how your business runs, then a written report of practical AI quick wins.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const walkAway = [
  'A written report of practical AI quick wins',
  'Recommendations mapped by effort vs. impact',
  'The hours each fix gives back to your team',
  'A 30-minute walkthrough call to get you started',
]
</script>

<template>
  <!-- Wider than the standard .section (max-w-5xl) so the Calendly iframe
       clears ~1000px and renders its two-column horizontal layout. -->
  <div class="px-6 py-16 md:py-24 max-w-6xl mx-auto">
    <div class="max-w-3xl mb-10">
      <p class="eyebrow text-brand text-xs font-medium mb-6">
        Book Your Assessment
      </p>
      <h1 class="font-display text-3xl md:text-5xl font-semibold text-ink tracking-tight mb-4">
        Pick a time. We'll do the rest.
      </h1>
      <p class="text-body text-lg leading-relaxed">
        45 minutes live, on Zoom, about how your business actually runs. Free, no card, no commitment. Within 48 hours you'll have your written report.
      </p>
    </div>

    <BookingWidget />

    <!-- Benefits live below the scheduler now, so the calendar leads. -->
    <ul class="mt-12 grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl">
      <li v-for="item in walkAway" :key="item" class="flex items-start gap-2 text-body text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-brand flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        {{ item }}
      </li>
    </ul>

    <div class="mt-8 max-w-3xl">
      <p class="text-muted text-sm">
        Prefer to write a few lines first instead?
        <NuxtLink to="/contact" class="text-brand hover:text-brand-deep transition-colors font-medium">Send an inquiry</NuxtLink>
        — we reply within one business day.
      </p>
    </div>
  </div>
</template>
