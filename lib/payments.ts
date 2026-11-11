/**
 * Stripe Payment Link for the AI Workflow Audit at the founding-client
 * price (CAD $495). The link is created in the Stripe Dashboard from
 * product prod_V1glRpUvHIiPvw / price_1U1dNXLaWiqibBctaOFN3GMF; after a
 * successful payment Stripe redirects the customer to /thanks/.
 */
export const AUDIT_PAYMENT_URL = "https://buy.stripe.com/00w00k5S2ai56Ni23WaIM00";

/** Audit prices in CAD. `current` is what checkout charges and what the
 *  structured data advertises (Google requires schema prices to match the
 *  visible price). When the founding offer ends, change `current` here and
 *  the struck-through "$750" copy on /audit and /services. */
export const AUDIT_PRICE = { current: 495, standard: 750 } as const;
