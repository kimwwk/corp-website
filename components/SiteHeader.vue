<script setup lang="ts">
const route = useRoute()
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/services' },
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
  <header class="border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm sticky top-0 z-50">
    <div class="max-w-5xl mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo / wordmark -->
        <NuxtLink
          to="/"
          class="text-white font-semibold text-lg tracking-tight hover:text-brand transition-colors"
          aria-label="Kivov Digital — Home"
        >
          Kivov Digital
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
            class="inline-flex items-center gap-2 px-4 py-2 bg-brand text-gray-950 text-sm font-semibold rounded-lg hover:bg-emerald-400 transition-colors"
            :aria-current="route.path === '/book' ? 'page' : undefined"
          >
            Free Assessment
          </NuxtLink>
        </nav>

        <!-- Mobile menu button -->
        <button
          class="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
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
      class="md:hidden border-t border-gray-800 bg-gray-950"
    >
      <nav aria-label="Mobile navigation" class="flex flex-col px-6 py-4 gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="py-3 px-3 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-sm font-medium"
          :class="{ 'text-white bg-gray-800': route.path === link.to }"
          :aria-current="route.path === link.to ? 'page' : undefined"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink
          to="/book"
          class="mt-2 py-3 px-3 rounded-lg bg-brand text-gray-950 text-sm font-semibold text-center hover:bg-emerald-400 transition-colors"
          :aria-current="route.path === '/book' ? 'page' : undefined"
        >
          Book a Free Assessment
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
