<script setup lang="ts">
const posthog = usePostHog()

function trackAssessmentCta(location: string) {
  posthog?.capture('assessment_cta_clicked', { source_page: 'home', cta_location: location })
}

function trackFounderBlock(destination: string) {
  posthog?.capture('founder_block_clicked', { destination })
}

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
    description: 'You talk, I listen. Where your time goes, what gets dropped when you\'re swamped, what you\'d love to never do again. On Zoom, no prep required.',
  },
  {
    number: '02',
    title: 'I do the homework',
    description: 'I analyze the conversation and research proven, off-the-shelf tools that fix your specific bottlenecks — most can be switched on in days, not months.',
  },
  {
    number: '03',
    title: 'You get a written report',
    description: 'Clear recommendations mapped by effort vs. impact, focused on quick wins — with the hours each one gives back to you and your team.',
  },
  {
    number: '04',
    title: 'A 30-minute walkthrough',
    description: 'I\'ll walk you through the report and show you exactly how to get started. What you do with it is entirely up to you.',
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

        <h1 class="text-4xl md:text-6xl font-display font-semibold text-ink leading-tight tracking-tight mb-6">
          Reclaim 5–10 hours a week with AI that fits how you already work.
        </h1>

        <p class="text-lg md:text-xl text-body leading-relaxed mb-10 max-w-2xl">
          I sit down with you for 45 minutes, learn how your business actually runs, and hand you a written report of practical AI quick wins. The assessment is free — and there's no obligation to go further.
        </p>

        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <NuxtLink to="/book" class="btn-primary" @click="trackAssessmentCta('hero')">
            Book your free assessment
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
          <a href="#how-it-works" class="text-body hover:text-ink transition-colors text-sm font-medium px-2 py-3 sm:py-0">
            How it works ↓
          </a>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="border-t border-line max-w-5xl mx-auto px-6" />

    <!-- How it works -->
    <section id="how-it-works" class="px-6 py-16 md:py-24 max-w-5xl mx-auto" aria-label="How the free assessment works">
      <div class="max-w-3xl mb-12">
        <p class="text-brand text-sm font-mono font-medium tracking-widest uppercase mb-6">
          How It Works
        </p>
        <h2 class="text-3xl md:text-4xl font-display font-semibold text-ink tracking-tight mb-4">
          One call. One report. Real hours back.
        </h2>
        <p class="text-body text-lg leading-relaxed">
          No jargon, no 40-page strategy deck. Just a clear look at where AI can quietly take work off your plate.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 gap-6">
        <div v-for="step in steps" :key="step.number" class="card">
          <p class="text-brand font-mono text-sm mb-3" aria-hidden="true">{{ step.number }}</p>
          <h3 class="text-ink font-semibold mb-2">{{ step.title }}</h3>
          <p class="text-body text-sm leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="border-t border-line max-w-5xl mx-auto px-6" />

    <!-- Founder -->
    <section class="px-6 py-16 md:py-24 max-w-5xl mx-auto" aria-label="Who you'll be talking to">
      <div class="max-w-3xl">
        <!--
          HEADSHOT DROPS IN HERE. When a real square photo of Kim exists at public/kim-headshot.jpg,
          uncomment the line below. Until then this block ships copy-only: no placeholder, no stock face.
          <img src="/kim-headshot.jpg" alt="Kim Wong" width="96" height="96" class="w-24 h-24 rounded-full mb-6">
        -->
        <p class="text-brand text-sm font-mono font-medium tracking-widest uppercase mb-6">
          Who You'll Be Talking To
        </p>
        <h2 class="text-3xl md:text-4xl font-display font-semibold text-ink tracking-tight mb-4">
          There's one person behind this. Me.
        </h2>
        <p class="text-body leading-relaxed mb-6">
          I'm Kim Wong. Six years in corporate IT consulting, most of it at Deloitte and EY, building integrations for large companies. Now I do that work for owners who don't have an IT department. The assessment call is with me. So is the build.
        </p>
        <p class="text-sm text-muted">
          <NuxtLink to="/about" class="text-body hover:text-ink transition-colors font-medium" @click="trackFounderBlock('about')">
            More about me →
          </NuxtLink>
          <span aria-hidden="true" class="mx-2">·</span>
          <NuxtLink to="/services" class="text-body hover:text-ink transition-colors font-medium" @click="trackFounderBlock('services')">
            How we work together →
          </NuxtLink>
        </p>
      </div>
    </section>

    <!-- Divider -->
    <div class="border-t border-line max-w-5xl mx-auto px-6" />

    <!-- Who it's for + CTA -->
    <section class="px-6 py-16 md:py-24 max-w-5xl mx-auto" aria-label="Who it's for">
      <div class="card md:p-12">
        <div class="max-w-2xl">
          <h2 class="text-2xl md:text-3xl font-display font-semibold text-ink tracking-tight mb-4">
            Built for owners who are busy <span class="text-brand">in</span> the business.
          </h2>
          <p class="text-body leading-relaxed mb-3">
            If you run a team of roughly 5–50 people and your week disappears into quoting, scheduling, follow-ups, reporting, or answering the same questions again and again — the assessment will almost certainly find you hours.
          </p>
          <p class="text-body leading-relaxed mb-8">
            You don't need to be technical. You don't need to know anything about AI. That's my job.
          </p>
          <NuxtLink to="/book" class="btn-primary" @click="trackAssessmentCta('bottom_cta')">
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
