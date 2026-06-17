<script setup lang="ts">
const route = useRoute()
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

// Close mobile menu on route change
watch(() => route.path, () => {
  mobileOpen.value = false
})

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
}
</script>

<template>
  <header class="border-b border-transparent bg-canvas/85 backdrop-blur-sm sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo / wordmark -->
        <NuxtLink
          to="/"
          class="flex items-center"
          aria-label="Kivov Digital — Home"
        >
          <img src="/kivov-wordmark.png" alt="Kivov Digital" class="h-8 md:h-9 w-auto" width="170" height="71">
        </NuxtLink>

        <!-- Desktop nav -->
        <nav aria-label="Main navigation" class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link"
            :class="{ 'active': route.path === link.to }"
            :aria-current="route.path === link.to ? 'page' : undefined"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink
            to="/book"
            class="btn-primary px-5 py-2.5 text-sm"
            :aria-current="route.path === '/book' ? 'page' : undefined"
          >
            Book a call
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </nav>

        <!-- Mobile menu button -->
        <button
          class="md:hidden p-2 rounded-md text-body hover:text-ink hover:bg-black/5 transition-colors"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          @click="toggleMobile"
        >
          <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="mobileOpen"
      id="mobile-menu"
      class="md:hidden border-t border-line bg-canvas"
    >
      <nav aria-label="Mobile navigation" class="flex flex-col px-6 py-4 gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="py-3 px-3 rounded-md text-body hover:text-ink hover:bg-black/5 transition-colors text-sm font-medium"
          :class="{ 'text-ink bg-black/5': route.path === link.to }"
          :aria-current="route.path === link.to ? 'page' : undefined"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink
          to="/book"
          class="btn-primary mt-2 w-full"
          :aria-current="route.path === '/book' ? 'page' : undefined"
        >
          Book a call
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
