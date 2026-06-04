<script setup lang="ts">
useSeoMeta({
  title: 'Book a Free AI Assessment — Kivov Digital',
  description: 'Send us a few lines — we reply within one business day. The assessment is a free 45-minute call, no card, no commitment.',
  ogTitle: 'Book a Free AI Assessment — Kivov Digital',
  ogDescription: 'Send us a few lines — we reply within one business day. The assessment is a free 45-minute call, no card, no commitment.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const config = useRuntimeConfig()

const form = reactive({
  name: '',
  email: '',
  company: '',
  companySize: '',
  interest: '',
  timeline: '',
  message: '',
})

const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

async function submit() {
  if (status.value === 'sending') return
  // Native validation handles this in the browser; guard for safety
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
  status.value = 'sending'
  try {
    const url = config.public.n8nWebhookUrl
    if (!url) throw new Error('webhook-not-configured')
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        source: 'kivov-website',
        submittedAt: new Date().toISOString(),
      }),
    })
    if (!res.ok) throw new Error(`status-${res.status}`)
    status.value = 'success'
  } catch (err) {
    console.error('Form submission failed:', err)
    status.value = 'error'
  }
}

const afterYouSend = [
  {
    when: 'Within 1 business day',
    what: 'First reply, with a couple of proposed times for your free assessment call.',
  },
  {
    when: 'The assessment call',
    what: '45 minutes on Zoom about how your business actually runs. No prep needed — you talk, we listen.',
  },
  {
    when: 'Within 48 hours of the call',
    what: 'Your written report: practical AI quick wins mapped by effort vs. impact, with the hours each gives back.',
  },
  {
    when: 'A 30-minute walkthrough',
    what: 'We go through the report together. What you do next is entirely up to you.',
  },
]
</script>

<template>
  <div class="section">
    <div class="grid lg:grid-cols-5 gap-12 lg:gap-16">
      <!-- Left column: intro + form -->
      <div class="lg:col-span-3">
        <p class="text-brand text-sm font-mono font-medium tracking-widest uppercase mb-6">
          Contact · Book Your Assessment
        </p>

        <h1 class="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
          Send us a few lines.
        </h1>

        <p class="text-gray-400 text-lg leading-relaxed mb-4">
          We reply within one business day. The assessment is a free 45-minute call to understand how your business runs and where AI can give you time back. No card required, no commitment to go further.
        </p>
        <p class="text-gray-400 text-lg leading-relaxed mb-12">
          If we spot real opportunities, you'll have them in writing within 48 hours. Want to skip the back-and-forth?
          <NuxtLink to="/book" class="text-brand hover:text-emerald-400 transition-colors font-medium">Pick a time directly</NuxtLink>.
        </p>

        <!-- Success state -->
        <div v-if="status === 'success'" class="card border-brand/40" role="status">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 class="text-white font-semibold mb-2">Thanks — we got it.</h2>
              <p class="text-gray-400 leading-relaxed">
                You'll hear from us within one business day with a couple of proposed times for your free assessment call. Talk soon.
              </p>
            </div>
          </div>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="submit">
          <div class="space-y-6">
            <div>
              <label for="name" class="form-label">01 / Your name <span class="text-brand">*</span></label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                name="name"
                required
                autocomplete="name"
                class="form-input"
                placeholder="Jane Doe"
              >
            </div>

            <div>
              <label for="email" class="form-label">02 / Work email <span class="text-brand">*</span></label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                name="email"
                required
                autocomplete="email"
                class="form-input"
                placeholder="jane@yourcompany.com"
              >
            </div>

            <div>
              <label for="company" class="form-label">03 / Company</label>
              <input
                id="company"
                v-model="form.company"
                type="text"
                name="company"
                autocomplete="organization"
                class="form-input"
                placeholder="Your company name"
              >
            </div>

            <div class="grid sm:grid-cols-2 gap-6">
              <div>
                <label for="companySize" class="form-label">04 / Company size</label>
                <select id="companySize" v-model="form.companySize" name="companySize" class="form-input" :class="{ 'text-gray-500': !form.companySize }">
                  <option value="" disabled>Select…</option>
                  <option>Just me</option>
                  <option>2–10</option>
                  <option>11–50</option>
                  <option>51–200</option>
                  <option>200+</option>
                </select>
              </div>

              <div>
                <label for="timeline" class="form-label">05 / When would you like to start</label>
                <select id="timeline" v-model="form.timeline" name="timeline" class="form-input" :class="{ 'text-gray-500': !form.timeline }">
                  <option value="" disabled>Select…</option>
                  <option>As soon as possible</option>
                  <option>Next 1–3 months</option>
                  <option>Exploring — no fixed date</option>
                </select>
              </div>
            </div>

            <div>
              <label for="interest" class="form-label">06 / What you're after</label>
              <select id="interest" v-model="form.interest" name="interest" class="form-input" :class="{ 'text-gray-500': !form.interest }">
                <option value="" disabled>Select…</option>
                <option>Free AI Tools Assessment</option>
                <option>AI Automation (project)</option>
                <option>Custom Software Development (project)</option>
                <option>Not sure — want to discuss</option>
              </select>
            </div>

            <div>
              <label for="message" class="form-label">07 / Tell us about your situation <span class="text-brand">*</span></label>
              <textarea
                id="message"
                v-model="form.message"
                name="message"
                required
                rows="5"
                class="form-input resize-y"
                placeholder="What does your business do, and where does your time go? A few honest lines are perfect."
              />
            </div>
          </div>

          <!-- Error state -->
          <div v-if="status === 'error'" class="mt-6 card border-red-900/60" role="alert">
            <p class="text-gray-300 text-sm leading-relaxed">
              Hmm — something went wrong sending your message. Please email us directly at
              <a
                href="mailto:kimwong.wwk@gmail.com?subject=Free%20AI%20assessment"
                class="text-brand hover:text-emerald-400 transition-colors font-medium"
              >kimwong.wwk@gmail.com</a>
              — we read everything.
            </p>
          </div>

          <div class="mt-8">
            <button type="submit" class="btn-primary" :disabled="status === 'sending'" :class="{ 'opacity-60 cursor-wait': status === 'sending' }">
              {{ status === 'sending' ? 'Sending…' : 'Book my free assessment' }}
              <svg v-if="status !== 'sending'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <p class="text-gray-500 text-sm mt-4">
              First reply within 1 business day · Free, no commitment
            </p>
          </div>
        </form>
      </div>

      <!-- Right column: what happens next + other ways -->
      <aside class="lg:col-span-2 space-y-10">
        <div>
          <h2 class="text-white font-semibold text-lg mb-6">What happens after you send</h2>
          <ol class="space-y-5">
            <li v-for="(item, i) in afterYouSend" :key="i" class="flex gap-4">
              <span class="text-brand font-mono text-sm flex-shrink-0 mt-0.5" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
              <div>
                <p class="text-white text-sm font-medium mb-1">{{ item.when }}</p>
                <p class="text-gray-400 text-sm leading-relaxed">{{ item.what }}</p>
              </div>
            </li>
          </ol>
        </div>

        <div>
          <h2 class="text-white font-semibold text-lg mb-4">Other ways to reach us</h2>
          <div class="card flex items-center gap-4">
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
      </aside>
    </div>
  </div>
</template>
