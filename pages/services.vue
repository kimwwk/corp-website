<script setup lang="ts">
useSeoMeta({
  title: 'Services — Kivov Digital',
  description: 'Free AI tools assessments, AI automation, and custom software development for small and mid-sized businesses.',
  ogTitle: 'Services — Kivov Digital',
  ogDescription: 'Free AI tools assessments, AI automation, and custom software development for small and mid-sized businesses.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const services = [
  {
    title: 'AI Tools Assessment',
    badge: 'Free · Start here',
    description: 'A 45-minute conversation about how your business runs, followed by a written report of practical AI quick wins — mostly off-the-shelf tools you can switch on in days — and a 30-minute walkthrough. No card, no commitment.',
    icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.045.022M14.25 3.104c.251.023.501.05.75.082M19.5 6.75a48.56 48.56 0 00-1.5-.082M19.5 6.75v5.25',
  },
  {
    title: 'AI Automation',
    badge: 'Project',
    description: 'We take the repetitive work off your team\'s plate — lead follow-up, client intake, reporting, and the busywork between your tools. We fix the process first, then automate it, so you\'re not just speeding up inefficiency.',
    icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  },
  {
    title: 'Custom Software Development',
    badge: 'Project',
    description: 'When off-the-shelf doesn\'t fit, we design and build it. Full-stack product engineering — from architecture and APIs to interfaces and deployment — with AI built in where it genuinely helps.',
    icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
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
        Start free. Grow from there.
      </h1>
      <p class="text-gray-400 text-lg leading-relaxed">
        Every engagement starts with a free assessment, so we both know exactly where the value is before any money changes hands. We work with a small number of clients and focus deeply on each one.
      </p>
    </div>

    <div class="grid gap-6 max-w-3xl">
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
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
            <h2 class="text-white font-semibold text-lg">{{ service.title }}</h2>
            <span class="text-brand text-xs font-mono uppercase tracking-widest">{{ service.badge }}</span>
          </div>
          <p class="text-gray-400 leading-relaxed">{{ service.description }}</p>
        </div>
      </article>
    </div>

    <div class="mt-12 pt-8 border-t border-gray-800 max-w-3xl">
      <p class="text-gray-400 mb-4">Not sure where to start? That's exactly what the assessment is for.</p>
      <NuxtLink to="/contact" class="btn-primary">
        Book your free assessment
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>
