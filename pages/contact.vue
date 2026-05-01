<script setup lang="ts">
useSeoMeta({
  title: 'Contact — Kivov Digital',
  description: 'Get in touch with Kivov Digital. We\'d love to hear about your project.',
  ogTitle: 'Contact — Kivov Digital',
  ogDescription: 'Get in touch with Kivov Digital. We\'d love to hear about your project.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="section">
    <div class="max-w-2xl">
      <p class="text-brand text-sm font-mono font-medium tracking-widest uppercase mb-6">
        Contact
      </p>

      <h1 class="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
        Let's talk.
      </h1>

      <p class="text-gray-400 text-lg leading-relaxed mb-12">
        Have a project in mind? Questions about our work? We'd love to hear from you.
      </p>

      <div class="card inline-flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <div>
          <p class="text-gray-500 text-xs uppercase tracking-widest mb-0.5">Email</p>
          <a
            href="mailto:kimwong.wwk@gmail.com"
            class="text-white font-medium hover:text-brand transition-colors"
            aria-label="Send email to kimwong.wwk@gmail.com"
          >
            kimwong.wwk@gmail.com
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
