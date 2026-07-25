/**
 * The single n8n intake endpoint. Every client-side lead form (contact form,
 * fit check) posts the same field shape here so the automation stays one
 * workflow. Overridable per-environment at build time.
 */
export const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
  "https://automation.getjustgo.com/webhook/kivov-assessment-lead";
