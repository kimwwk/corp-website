<script setup lang="ts">
useSeoMeta({
  title: 'About — Kivov Digital',
  description: 'I\'m Kim Wong. Six years in corporate IT consulting, most of it at Deloitte and EY. Now I build practical AI and automation for small businesses, from Toronto, Canada.',
  ogTitle: 'About — Kivov Digital',
  ogDescription: 'I\'m Kim Wong. Six years in corporate IT consulting, most of it at Deloitte and EY. Now I build practical AI and automation for small businesses, from Toronto, Canada.',
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

      <!-- Portrait-orientation photo (614x1024); object-cover + upward bias keeps the crop on the face, not the coffee cup. -->
      <img src="/kim-headshot.jpg" alt="Kim Wong" width="128" height="128" class="w-32 h-32 rounded-2xl object-cover object-[center_20%] mb-8">
      <h1 class="font-display text-3xl md:text-5xl font-semibold text-ink tracking-tight mb-10">
        Hi, I'm Kim Wong.
      </h1>

      <div class="space-y-6 text-body leading-relaxed text-lg">
        <p>
          I spent six years in corporate IT consulting, most of it at Deloitte and EY. Enterprise integration work: APIs, data migrations, the systems large companies run on. I worked out of Hong Kong first, then Toronto.
        </p>
        <p>
          Working at Deloitte and EY pushed me onto enterprise-scale projects I couldn't have imagined before. It wasn't just a career move. It changed me at the core. I left earlier this year to build Kivov.
        </p>
        <p>
          Every one of those companies could afford someone to look at how the work actually flows before buying software. Small businesses can't. So they buy the tool they're told is best, then bend their work around it. I work the other way round: figure out your flow first, then find or build the system that fits it.
        </p>
        <p>
          I run my own stack at home. My own AI agents, my own automation, my own data on my own hardware. I test most of what I recommend on myself first.
        </p>
      </div>

      <div class="mt-12 pt-8 border-t border-line">
        <dl class="flex flex-col sm:flex-row gap-8">
          <div>
            <dt class="text-muted text-sm mb-1">Experience</dt>
            <dd class="text-ink font-medium">corporate IT consulting</dd>
          </div>
          <div>
            <dt class="text-muted text-sm mb-1">Based in</dt>
            <dd class="text-ink font-medium">Toronto, Canada</dd>
          </div>
        </dl>

        <p class="mt-8 text-sm text-muted">
          <a href="https://www.linkedin.com/in/kim-wong-wwk/" target="_blank" rel="noopener noreferrer" class="text-body hover:text-ink transition-colors font-medium">LinkedIn</a>
          <span aria-hidden="true" class="mx-2">·</span>
          <a href="https://github.com/kimwwk" target="_blank" rel="noopener noreferrer" class="text-body hover:text-ink transition-colors font-medium">GitHub</a>
        </p>
      </div>
    </div>
  </div>
</template>
