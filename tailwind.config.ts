import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Light "studio" palette
        canvas: '#F7F6F2',  // page background (warm off-white)
        surface: '#FFFFFF', // cards / panels
        ink: '#15191F',     // headings / strong text
        inkdeep: '#10141A', // dark sections (CTA bands, For-you card)
        body: '#54606E',    // body copy
        muted: '#8A93A0',   // captions / secondary
        line: '#E7E5DE',    // borders / dividers
        brand: {
          DEFAULT: '#0A6E48', // deep mint — text/links/CTA on light (AA)
          deep: '#085639',    // hover
          dark: '#085639',    // legacy alias
          mint: '#6EE7B7',    // bright accent on dark surfaces only
          soft: '#EAF6F0',    // soft mint background for badges
        },
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
