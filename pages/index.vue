<script setup lang="ts">
useSeoMeta({
  title: 'Kivov Digital — We build intelligent software.',
  description: 'We design and develop AI-powered applications that solve real problems — from productivity tools to autonomous systems. Based in Ontario, Canada.',
  ogTitle: 'Kivov Digital — We build intelligent software.',
  ogDescription: 'We design and develop AI-powered applications that solve real problems — from productivity tools to autonomous systems. Based in Ontario, Canada.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <!-- Hero section -->
    <section class="px-6 pt-24 pb-20 md:pt-36 md:pb-32 max-w-5xl mx-auto">
      <div class="max-w-3xl">
        <!-- Subtle label -->
        <p class="text-brand text-sm font-mono font-medium tracking-widest uppercase mb-6">
          AI Software Studio
        </p>

        <h1 class="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
          We build intelligent software.
        </h1>

        <p class="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl">
          We design and develop AI-powered applications that solve real problems — from productivity tools to autonomous systems. Based in Ontario, Canada.
        </p>

        <NuxtLink to="/services" class="btn-primary">
          See our products
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>
    </section>

    <!-- Divider with subtle grid -->
    <div class="border-t border-gray-800/60 max-w-5xl mx-auto px-6" />

    <!-- Brief highlights -->
    <section class="px-6 py-16 md:py-24 max-w-5xl mx-auto" aria-label="What we do">
      <div class="grid md:grid-cols-3 gap-6">
        <div class="card">
          <div class="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center mb-4" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.045.022M14.25 3.104c.251.023.501.05.75.082M19.5 6.75a48.56 48.56 0 00-1.5-.082M19.5 6.75v5.25" />
            </svg>
          </div>
          <h2 class="text-white font-semibold mb-2">AI Applications</h2>
          <p class="text-gray-400 text-sm leading-relaxed">Consumer and business tools built on modern AI — practical, fast, and built to last.</p>
        </div>

        <div class="card">
          <div class="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center mb-4" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
          </div>
          <h2 class="text-white font-semibold mb-2">Full-Stack Development</h2>
          <p class="text-gray-400 text-sm leading-relaxed">End-to-end product design and engineering, from architecture to deployment.</p>
        </div>

        <div class="card">
          <div class="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center mb-4" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h2 class="text-white font-semibold mb-2">Technical Consulting</h2>
          <p class="text-gray-400 text-sm leading-relaxed">AI architecture, automation strategy, and system design for teams moving fast.</p>
        </div>
      </div>
    </section>
  </div>
</template>
