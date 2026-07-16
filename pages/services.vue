<script setup lang="ts">
const posthog = usePostHog()

useSeoMeta({
  title: 'Services — Kivov Digital',
  description: 'Start free with an AI Tools Assessment, then grow: Do It With You coaching at $1,000/mo, or Do It For You builds priced per project. Practical AI and automation for small & mid-sized businesses.',
  ogTitle: 'Services — Kivov Digital',
  ogDescription: 'Start free with an AI Tools Assessment, then grow: Do It With You coaching, or Do It For You builds. Practical AI and automation for small & mid-sized businesses.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

onMounted(() => {
  // Hero hand-off meter load sweep
  const hero = document.getElementById('heroMeter')
  if (hero) requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('run')))

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    })
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 })
  document.querySelectorAll('.reveal').forEach(el => io.observe(el))
})
</script>

<template>
  <div>
    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
      <div class="grid lg:grid-cols-12 gap-12 lg:gap-10 items-end">
        <div class="lg:col-span-7">
          <p class="eyebrow text-xs text-brand mb-6">Services</p>
          <h1 class="font-display text-[2.6rem] leading-[1.04] md:text-6xl md:leading-[1.02] tracking-tight text-ink font-semibold">
            Start free.<br><span class="italic font-normal text-body">Grow from there.</span>
          </h1>
          <p class="mt-6 text-lg leading-relaxed text-body max-w-xl">
            We fix the process first, then automate it. Pick the amount of help you want — from a free read of where AI pays off, to a team that builds it <em class="not-italic text-ink font-medium">with</em> you, to one that builds it <em class="not-italic text-ink font-medium">for</em> you.
          </p>
          <div class="mt-8 flex flex-wrap items-center gap-4">
            <NuxtLink to="/book" class="btn-primary">
              Book your free assessment
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </NuxtLink>
            <span class="text-sm text-muted">No card, no commitment.</span>
          </div>
        </div>

        <!-- hero hand-off meter: the thesis device -->
        <div class="lg:col-span-5">
          <div class="bg-surface border border-line rounded-2xl p-6 md:p-7 shadow-[0_1px_0_rgba(16,20,26,.02),0_12px_30px_-18px_rgba(16,20,26,.18)]">
            <div class="flex items-center justify-between mb-5">
              <span class="eyebrow text-[0.7rem] text-muted">Who holds the work</span>
              <span class="eyebrow text-[0.7rem] text-brand">You&nbsp;→&nbsp;Us</span>
            </div>
            <div class="hero-meter" id="heroMeter">
              <div class="meter-track">
                <div class="meter-fill hero-fill" />
                <div class="meter-knob hero-knob" />
              </div>
            </div>
            <div class="mt-4 grid grid-cols-3 text-[0.7rem] font-mono uppercase tracking-wider">
              <div class="text-ink">Assess</div>
              <div class="text-center text-body">With&nbsp;you</div>
              <div class="text-right text-body">For&nbsp;you</div>
            </div>
            <p class="mt-5 text-sm leading-relaxed text-body">
              The deeper you go, the more of the work moves to us. You decide how far — and you can move along it over time.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Three ways to work together ──────────────────────────── -->
    <section class="max-w-6xl mx-auto px-6 py-14 md:py-20">
      <div class="max-w-2xl mb-10 reveal">
        <h2 class="font-display text-3xl md:text-4xl tracking-tight text-ink font-semibold">Three ways to work together</h2>
        <p class="mt-3 text-body leading-relaxed">Most clients start with the free assessment, then move into hands-on work once we both know where the real wins are.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-5 items-stretch">

        <!-- 1. Assessment (free) -->
        <article class="reveal flex flex-col bg-surface border-2 border-brand/30 rounded-2xl p-7">
          <!-- aligned header zone: tab → name → price -->
          <div class="min-h-[8.5rem] flex flex-col">
            <span class="eyebrow self-start text-[0.65rem] text-white bg-brand px-2.5 py-1 rounded-full">Start here</span>
            <h3 class="font-display text-2xl text-ink font-semibold mt-3">AI Tools Assessment</h3>
            <div class="mt-auto flex items-baseline gap-2 pt-3">
              <span class="font-display text-3xl text-brand font-semibold">Free</span>
              <span class="text-sm text-muted">· 45 min + report</span>
            </div>
          </div>
          <p class="text-sm leading-relaxed text-body mt-4 mb-3">
            A 45-minute conversation about how your business runs, then a written report of practical AI quick wins — mostly off-the-shelf tools you can switch on in days — plus a 30-minute walkthrough.
          </p>
          <p class="text-xs text-muted mb-5">No card, no commitment.</p>
          <div class="mt-auto">
            <div class="mb-5">
              <div class="flex justify-between eyebrow text-[0.6rem] text-muted mb-2"><span>You</span><span>Us</span></div>
              <div class="meter-track" style="--to-us:16%"><div class="meter-fill" /><div class="meter-knob" /></div>
            </div>
            <NuxtLink to="/book" class="btn-primary w-full">
              Book your free assessment
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </NuxtLink>
          </div>
        </article>

        <!-- 2. Do It With You -->
        <article class="reveal flex flex-col bg-surface border border-line rounded-2xl p-7">
          <div class="min-h-[8.5rem] flex flex-col">
            <span class="eyebrow self-start text-[0.65rem] text-brand bg-brand-soft px-2.5 py-1 rounded-full">Ongoing</span>
            <h3 class="font-display text-2xl text-ink font-semibold mt-3">Do It With You</h3>
            <div class="mt-auto flex items-baseline gap-2 pt-3">
              <span class="font-display text-3xl text-ink font-semibold">$1,000</span>
              <span class="text-sm text-muted">/ month</span>
            </div>
          </div>
          <p class="text-sm leading-relaxed text-body mt-4 mb-4">
            Two 45-minute strategy calls a month — one every two weeks. We work side by side on what's actually slowing you down. Each call, hands-on:
          </p>
          <ol class="space-y-2.5 mb-3">
            <li class="flex gap-3 text-sm text-body"><span class="font-mono text-xs text-brand pt-0.5 shrink-0">01</span><span><span class="text-ink font-medium">You screen-share your real workflows</span> — we watch how the work actually happens.</span></li>
            <li class="flex gap-3 text-sm text-body"><span class="font-mono text-xs text-brand pt-0.5 shrink-0">02</span><span><span class="text-ink font-medium">We build custom Claude skills</span> around those workflows.</span></li>
            <li class="flex gap-3 text-sm text-body"><span class="font-mono text-xs text-brand pt-0.5 shrink-0">03</span><span><span class="text-ink font-medium">We automate the repetitive parts</span> of your workflow.</span></li>
          </ol>
          <p class="text-xs text-muted mb-1.5">Billed every 4 weeks — two bi-weekly calls.</p>
          <p class="text-xs text-brand font-medium mb-5">100% money-back guarantee — if you're not satisfied with the results, you get a full refund.</p>
          <div class="mt-auto">
            <div class="mb-5">
              <div class="flex justify-between eyebrow text-[0.6rem] text-muted mb-2"><span>You</span><span>Us</span></div>
              <div class="meter-track" style="--to-us:55%"><div class="meter-fill" /><div class="meter-knob" /></div>
            </div>
            <NuxtLink to="/contact" class="btn-secondary w-full" @click="posthog?.capture('service_inquiry_clicked', { service_tier: 'do_it_with_you' })">Get in touch</NuxtLink>
          </div>
        </article>

        <!-- 3. Do It For You (dark) -->
        <article class="reveal flex flex-col bg-inkdeep rounded-2xl p-7 border border-inkdeep">
          <div class="min-h-[8.5rem] flex flex-col">
            <span class="eyebrow self-start text-[0.65rem] text-brand-mint border border-brand-mint/40 px-2.5 py-1 rounded-full">Project work</span>
            <h3 class="font-display text-2xl text-white font-semibold mt-3">Do It For You</h3>
            <div class="mt-auto flex items-baseline gap-2 pt-3">
              <span class="font-display text-3xl text-white font-semibold">Per project</span>
            </div>
          </div>
          <p class="text-sm leading-relaxed text-white/70 mt-4 mb-4">
            We start with a discovery phase, then build. Two tracks come out of discovery:
          </p>
          <ul class="space-y-2.5 mb-3">
            <li class="flex gap-3 text-sm text-white/80"><svg class="h-4 w-4 text-brand-mint mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg><span><span class="text-white font-medium">AI &amp; automation</span> — built around the process we mapped.</span></li>
            <li class="flex gap-3 text-sm text-white/80"><svg class="h-4 w-4 text-brand-mint mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg><span><span class="text-white font-medium">Custom software development</span> — when off-the-shelf won't fit.</span></li>
          </ul>
          <p class="text-xs text-white/50 mb-5">Scoped and priced per project after discovery.</p>
          <div class="mt-auto">
            <div class="mb-5">
              <div class="flex justify-between eyebrow text-[0.6rem] text-white/45 mb-2"><span>You</span><span>Us</span></div>
              <div class="meter-track on-dark" style="--to-us:90%"><div class="meter-fill on-dark" /><div class="meter-knob on-dark" /></div>
            </div>
            <NuxtLink to="/contact" class="inline-flex items-center justify-center gap-2 px-6 py-3 w-full border border-white/25 text-white font-semibold rounded-xl hover:border-white/50 transition-colors" @click="posthog?.capture('service_inquiry_clicked', { service_tier: 'do_it_for_you' })">Get in touch</NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <!-- ── Shared benefits ──────────────────────────────────────── -->
    <section class="max-w-6xl mx-auto px-6 py-14 md:py-16">
      <div class="bg-surface border border-line rounded-2xl p-8 md:p-10 reveal">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
          <div>
            <h2 class="font-display text-2xl md:text-3xl tracking-tight text-ink font-semibold">What's included, either way</h2>
            <p class="mt-2 text-body">Every paid package — Do It With You <span class="text-muted">and</span> Do It For You — comes with all three.</p>
          </div>
          <span class="eyebrow text-[0.65rem] text-brand bg-brand-soft px-3 py-1.5 rounded-full self-start md:self-auto">Both paid packages</span>
        </div>

        <div class="grid md:grid-cols-3 gap-px bg-line rounded-xl overflow-hidden border border-line">
          <div class="bg-surface p-6">
            <svg class="h-6 w-6 text-brand mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.84L3 20l1.04-3.12A7.94 7.94 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            <h3 class="text-ink font-semibold mb-1.5">Always-on between sessions</h3>
            <p class="text-sm leading-relaxed text-body">Unlimited quick questions over text, so you're never stuck waiting for the next call.</p>
            <p class="text-xs text-muted mt-2">Quick async text so nothing leaves you hanging mid-week.</p>
          </div>
          <div class="bg-surface p-6">
            <svg class="h-6 w-6 text-brand mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 class="text-ink font-semibold mb-1.5">12 business-hour response SLA</h3>
            <p class="text-sm leading-relaxed text-body">A guaranteed response window during business hours — you always know when you'll hear back.</p>
          </div>
          <div class="bg-surface p-6">
            <svg class="h-6 w-6 text-brand mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <h3 class="text-ink font-semibold mb-1.5">A documentation hub of every transcript &amp; note</h3>
            <p class="text-sm leading-relaxed text-body">A quantified list of takeaways, action items, and decisions after every session.</p>
            <p class="text-xs text-muted mt-2">Notion by default — but we'll set it up wherever works for you.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FAQ ──────────────────────────────────────────────────── -->
    <section class="max-w-3xl mx-auto px-6 py-14 md:py-16">
      <h2 class="font-display text-2xl md:text-3xl tracking-tight text-ink font-semibold mb-8 reveal">A few honest answers</h2>
      <div class="divide-y divide-line border-y border-line reveal">
        <details class="group py-5">
          <summary class="flex items-center justify-between cursor-pointer list-none text-ink font-medium">
            Do I have to commit to anything for the free assessment?
            <svg class="h-5 w-5 text-muted transition-transform group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          </summary>
          <p class="mt-3 text-sm leading-relaxed text-body">No. The assessment is genuinely free — no card, no commitment. You get the conversation, a written report, and a walkthrough. If nothing's a fit, that's a fine outcome.</p>
        </details>
        <details class="group py-5">
          <summary class="flex items-center justify-between cursor-pointer list-none text-ink font-medium">
            What's the difference between "with you" and "for you"?
            <svg class="h-5 w-5 text-muted transition-transform group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          </summary>
          <p class="mt-3 text-sm leading-relaxed text-body"><span class="text-ink font-medium">Do It With You</span> keeps you in the driver's seat — we coach, build Claude skills, and automate alongside you on a monthly rhythm. <span class="text-ink font-medium">Do It For You</span> hands the build to us: discovery, then AI &amp; automation or custom software, scoped per project.</p>
        </details>
        <details class="group py-5">
          <summary class="flex items-center justify-between cursor-pointer list-none text-ink font-medium">
            How does billing work on the monthly package?
            <svg class="h-5 w-5 text-muted transition-transform group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          </summary>
          <p class="mt-3 text-sm leading-relaxed text-body">Do It With You is $1,000, billed every 4 weeks — that covers your two bi-weekly strategy calls plus always-on text support and your documentation hub in between.</p>
        </details>
        <details class="group py-5">
          <summary class="flex items-center justify-between cursor-pointer list-none text-ink font-medium">
            What does "always-on between sessions" actually mean?
            <svg class="h-5 w-5 text-muted transition-transform group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          </summary>
          <p class="mt-3 text-sm leading-relaxed text-body">Between calls you can text us quick questions and get unstuck fast — within a 12 business-hour SLA — so a small blocker never sits for two weeks waiting for the next session.</p>
        </details>
      </div>
    </section>

    <!-- ── Closing CTA ──────────────────────────────────────────── -->
    <section class="px-6 pb-16">
      <div class="max-w-6xl mx-auto bg-inkdeep rounded-3xl px-8 py-14 md:py-20 text-center">
        <p class="eyebrow text-xs text-brand-mint mb-5">No card, no commitment</p>
        <h2 class="font-display text-3xl md:text-5xl tracking-tight text-white font-semibold leading-[1.05]">
          See where AI pays off —<br><span class="italic font-normal text-white/70">before you spend a thing.</span>
        </h2>
        <NuxtLink to="/book" class="mt-8 inline-flex items-center gap-2 px-7 py-4 bg-brand-mint hover:bg-white text-ink font-semibold rounded-xl transition-colors">
          Book your free assessment
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
