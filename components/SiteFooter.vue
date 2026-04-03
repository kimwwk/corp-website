<template>
  <footer class="border-t border-gray-800 bg-gray-950">
    <div class="max-w-5xl mx-auto px-6 py-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-gray-500 text-sm">
          © 2026 Corp. All rights reserved.
        </p>
        <nav aria-label="Footer navigation" class="flex items-center gap-6">
          <NuxtLink
            to="/privacy"
            class="text-gray-500 hover:text-gray-300 transition-colors text-sm"
          >
            Privacy Policy
          </NuxtLink>
          <NuxtLink
            to="/terms"
            class="text-gray-500 hover:text-gray-300 transition-colors text-sm"
          >
            Terms of Use
          </NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>
