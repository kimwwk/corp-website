<template>
  <div class="min-h-screen flex flex-col bg-gray-950">
    <SiteHeader />
    <main id="main-content" class="flex-1" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
