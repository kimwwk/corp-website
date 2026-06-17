<template>
  <footer class="border-t border-line bg-canvas">
    <div class="max-w-6xl mx-auto px-6 py-10">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <img src="/kivov-wordmark.png" alt="Kivov Digital" class="h-5 w-auto opacity-80" width="120" height="50">
          <p class="text-muted text-sm">© 2026 Kivov Digital</p>
        </div>
        <nav aria-label="Footer navigation" class="flex items-center gap-6">
          <NuxtLink
            to="/showcase"
            class="text-muted hover:text-ink transition-colors text-sm"
          >
            Showcase
          </NuxtLink>
          <NuxtLink
            to="/privacy"
            class="text-muted hover:text-ink transition-colors text-sm"
          >
            Privacy Policy
          </NuxtLink>
          <NuxtLink
            to="/terms"
            class="text-muted hover:text-ink transition-colors text-sm"
          >
            Terms of Use
          </NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>
