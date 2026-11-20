import type { Proof, ProofId } from "@/content/types";

/*
 * Proof items, transcribed verbatim from the former /showcase page (and its
 * products from components/showcase-products.tsx). Placement is in
 * SITE-STRUCTURE-DECISION.md "Proof on each page": each page lists the ids it
 * shows. The "Coaching cards" track-record item was dropped. The law firm
 * item is new and never names the client.
 */
export const proof: Proof[] = [
  {
    id: "executive-assistant",
    label: "Client build",
    title: "Executive-assistant work",
    body: "After every call, AI drafts the follow-up email in your voice, ready to review and send. It never sends on its own.",
    from: "15 to 30 minutes per follow-up",
    to: "a 2-minute review",
    stats: [
      { n: "89%", label: "Less time on follow-up" },
      { n: "208 hrs", label: "Back per year" },
      { n: "$6,240", label: "Back per year" },
    ],
    foot: "A worked example. Live build with a Toronto mortgage team.",
    pullLine: "The follow-up email is just the first thing we taught it.",
  },
  {
    id: "file-and-document-management",
    label: "Client build",
    title: "File and document management",
    body: "Built for a $10M+ revenue company. Vendor invoices arrive as PDFs, every layout different. AI reads them, checks its own totals, and clean data goes into the ERP.",
    from: "1 hour a day, typed by hand",
    to: "5 minutes of review",
    stats: [
      { n: "92%", label: "Less time on entry" },
      { n: "238 hrs", label: "Back per year" },
      { n: "$7,150", label: "Back per year" },
    ],
    foot: "A worked example at $30/hr. Not a quote.",
  },
  {
    id: "law-firm-work",
    label: "Client build",
    title: "Law firm work: website, SEO and AI search",
    body: "For a law firm client, we fixed the contact forms and their emails, made every phone number tappable and tracked, set up Search Console and Bing, rewrote the Google Business Profile description, put the firm's Google reviews on its homepage, and publish its posts with the lawyer's wording unchanged.",
  },
  {
    id: "conversational-ai",
    // Open item 2 in the decision file: "Capability" or "Demo" is Kim's call.
    label: "Capability",
    title: "Conversational AI",
    body: "Agents that talk with your customers naturally, by text or voice: qualify, answer, book.",
  },
  {
    id: "sprinting-run",
    label: "Our product",
    title: "sprinting.run",
    body: "Periodization software for sprint coaches, with AI session planning built in.",
    status: "Live on Web",
    href: "https://sprinting.run",
    icon: "/sprinting-run-icon.png",
  },
  {
    id: "our-pot",
    label: "Our product",
    title: "our-pot",
    body: "Household expense tracking. Say what you spent, review the entry, approve.",
    status: "Available on Android",
    href: "https://our-pot-site.kivov-digital.workers.dev/",
    icon: "/our-pot-icon.png",
  },
];

/** Resolve a page's proof ids, in the order the page lists them. */
export function proofItems(ids: ProofId[]): Proof[] {
  return ids.map((id) => {
    const item = proof.find((p) => p.id === id);
    if (!item) throw new Error(`Unknown proof id: ${id}`);
    return item;
  });
}
