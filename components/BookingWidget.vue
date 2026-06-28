<script setup lang="ts">
// Direct iframe embed. Calendly serves its scheduling page with
// `x-frame-options: ALLOWALL`, so we don't need the widget.js script at all —
// this renders in any browser, with or without JavaScript.
const calendlyUrl = 'https://calendly.com/kimwong-wwk/let-s-meet'
const embedSrc = `${calendlyUrl}?hide_gdpr_banner=1&embed_type=Inline`
</script>

<template>
  <div>
    <!--
      Calendly switches to its two-column horizontal layout once the iframe is
      ≥ ~1000px wide; below that it renders single-column (tall). So we give it
      a short height on wide screens (two-column fits in ~700px) and a tall
      height on narrow/mobile screens (single-column needs the room).
    -->
    <iframe
      :src="embedSrc"
      title="Schedule a meeting with Kivov Digital"
      frameborder="0"
      loading="lazy"
      class="w-full h-[1180px] min-[1100px]:h-[720px]"
      style="min-width:320px;border:0;"
    />
    <p class="text-muted text-sm mt-4 text-center">
      Calendar not loading?
      <a
        :href="calendlyUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-brand hover:text-brand-deep transition-colors font-medium"
      >Open the scheduler in a new tab →</a>
    </p>
  </div>
</template>
