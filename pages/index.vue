<script setup lang="ts">
useSeoMeta({
  title: 'Kivov Digital — Free AI Tools Assessment for Small Business',
  description: 'Reclaim 5–10 hours a week with AI tools that fit how you already work. Book a free AI assessment — a 45-minute call, a written report of practical quick wins, no obligation.',
  ogTitle: 'Kivov Digital — Free AI Tools Assessment for Small Business',
  ogDescription: 'Reclaim 5–10 hours a week with AI tools that fit how you already work. Book a free AI assessment — a 45-minute call, a written report of practical quick wins, no obligation.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const steps = [
  {
    number: '01',
    title: 'A 45-minute conversation',
    description: 'You talk, we listen. Where your time goes, what gets dropped when you\'re swamped, what you\'d love to never do again. On Zoom, no prep required.',
  },
  {
    number: '02',
    title: 'We do the homework',
    description: 'We analyze the conversation and research proven, off-the-shelf tools that fix your specific bottlenecks — most can be switched on in days, not months.',
  },
  {
    number: '03',
    title: 'You get a written report',
    description: 'Clear recommendations mapped by effort vs. impact, focused on quick wins — with the hours each one gives back to you and your team.',
  },
  {
    number: '04',
    title: 'A 30-minute walkthrough',
    description: 'We walk through the report together and show you exactly how to get started. What you do with it is entirely up to you.',
  },
]
</script>

<template>
  <div>
    <!-- Hero section -->
    <section class="px-6 pt-24 pb-20 md:pt-36 md:pb-28 max-w-5xl mx-auto">
      <div class="max-w-3xl">
        <!-- Subtle label -->
        <p class="text-brand text-sm font-mono font-medium tracking-widest uppercase mb-6">
          Free AI Assessment · For Small & Mid-Sized Businesses
        </p>

        <h1 class="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
          Reclaim 5–10 hours a week with AI that fits how you already work.
        </h1>

        <p class="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl">
          We sit down with you for 45 minutes, learn how your business actually runs, and hand you a written report of practical AI quick wins. The assessment is free — and there's no obligation to go further.
        </p>

        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <NuxtLink to="/book" class="btn-primary">
            Book your free assessment
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
          <a href="#how-it-works" class="text-gray-400 hover:text-white transition-colors text-sm font-medium px-2 py-3 sm:py-0">
            How it works ↓
          </a>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="border-t border-gray-800/60 max-w-5xl mx-auto px-6" />

    <!-- How it works -->
    <section id="how-it-works" class="px-6 py-16 md:py-24 max-w-5xl mx-auto" aria-label="How the free assessment works">
      <div class="max-w-3xl mb-12">
        <p class="text-brand text-sm font-mono font-medium tracking-widest uppercase mb-6">
          How It Works
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
          One call. One report. Real hours back.
        </h2>
        <p class="text-gray-400 text-lg leading-relaxed">
          No jargon, no 40-page strategy deck. Just a clear look at where AI can quietly take work off your plate.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 gap-6">
        <div v-for="step in steps" :key="step.number" class="card">
          <p class="text-brand font-mono text-sm mb-3" aria-hidden="true">{{ step.number }}</p>
          <h3 class="text-white font-semibold mb-2">{{ step.title }}</h3>
          <p class="text-gray-400 text-sm leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="border-t border-gray-800/60 max-w-5xl mx-auto px-6" />

    <!-- Beyond the assessment -->
    <section class="px-6 py-16 md:py-24 max-w-5xl mx-auto" aria-label="What we do">
      <div class="max-w-3xl mb-12">
        <p class="text-brand text-sm font-mono font-medium tracking-widest uppercase mb-6">
          Beyond the Assessment
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
          When you want more than quick wins.
        </h2>
        <p class="text-gray-400 text-lg leading-relaxed">
          Most clients start with the free assessment. If you want help going further, that's what we do best.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div class="card">
          <div class="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center mb-4" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.045.022M14.25 3.104c.251.023.501.05.75.082M19.5 6.75a48.56 48.56 0 00-1.5-.082M19.5 6.75v5.25" />
            </svg>
          </div>
          <h3 class="text-white font-semibold mb-2">AI Tools Assessment</h3>
          <p class="text-gray-400 text-sm leading-relaxed">The free starting point. A 45-minute call, a written report of quick wins, and a walkthrough — no strings attached.</p>
        </div>

        <div class="card">
          <div class="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center mb-4" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h3 class="text-white font-semibold mb-2">AI Automation</h3>
          <p class="text-gray-400 text-sm leading-relaxed">We fix the process first, then automate it — lead follow-up, intake, reporting, and the busywork in between your tools.</p>
        </div>

        <div class="card">
          <div class="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center mb-4" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
          </div>
          <h3 class="text-white font-semibold mb-2">Custom Software Development</h3>
          <p class="text-gray-400 text-sm leading-relaxed">When off-the-shelf doesn't fit, we design and build it — full-stack, AI-powered, and made for how your team works.</p>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="border-t border-gray-800/60 max-w-5xl mx-auto px-6" />

    <!-- Who it's for + CTA -->
    <section class="px-6 py-16 md:py-24 max-w-5xl mx-auto" aria-label="Who it's for">
      <div class="card md:p-12">
        <div class="max-w-2xl">
          <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
            Built for owners who are busy <span class="text-brand">in</span> the business.
          </h2>
          <p class="text-gray-400 leading-relaxed mb-3">
            If you run a team of roughly 5–50 people and your week disappears into quoting, scheduling, follow-ups, reporting, or answering the same questions again and again — the assessment will almost certainly find you hours.
          </p>
          <p class="text-gray-400 leading-relaxed mb-8">
            You don't need to be technical. You don't need to know anything about AI. That's our job.
          </p>
          <NuxtLink to="/book" class="btn-primary">
            Book your free assessment
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
