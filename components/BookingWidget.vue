<script setup lang="ts">
// Direct iframe embed. Calendly serves its scheduling page with
// `x-frame-options: ALLOWALL`, so we don't need the widget.js script at all —
// this renders in any browser, with or without JavaScript.
const calendlyUrl = 'https://calendly.com/kimwong-wwk/let-s-meet'
// `embed_domain` is required for Calendly to post booking events
// (calendly.event_scheduled) back to the parent window — that's what we listen
// for below to fire the GA4 `generate_lead` conversion.
const embedSrc = `${calendlyUrl}?hide_gdpr_banner=1&embed_type=Inline&embed_domain=kivov.work`

// Fire the GA conversion when a visitor completes a booking in the Calendly iframe.
function onCalendlyMessage(e: MessageEvent) {
  if (e.origin !== 'https://calendly.com') return
  const data = e.data as { event?: unknown } | null | undefined
  if (data?.event === 'calendly.event_scheduled') trackLead('book_call')
}

onMounted(() => window.addEventListener('message', onCalendlyMessage))
onBeforeUnmount(() => window.removeEventListener('message', onCalendlyMessage))
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
