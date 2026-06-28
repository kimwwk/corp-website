type LeadMethod = 'contact_form' | 'book_call'

/**
 * Fire a GA4 `generate_lead` conversion. gtag is loaded globally in nuxt.config.ts.
 * Client-only and defensive: no-ops during SSG/prerender or if gtag is unavailable.
 */
export function trackLead(method: LeadMethod): void {
  if (!import.meta.client) return
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  if (typeof gtag !== 'function') return
  gtag('event', 'generate_lead', { method })
}
