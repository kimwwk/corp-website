import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = {
  title: "Book a Free AI Assessment — Kivov Digital",
  description:
    "Send us a few lines — we reply within one business day. The assessment is a free 45-minute call, no card, no commitment.",
  openGraph: {
    title: "Book a Free AI Assessment — Kivov Digital",
    description:
      "Send us a few lines — we reply within one business day. The assessment is a free 45-minute call, no card, no commitment.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const afterYouSend = [
  {
    when: "Within 1 business day",
    what: "First reply, with a couple of proposed times for your free assessment call.",
  },
  {
    when: "The assessment call",
    what: "45 minutes on Zoom about how your business actually runs. No prep needed — you talk, we listen.",
  },
  {
    when: "Within 48 hours of the call",
    what: "Your written report: practical AI quick wins mapped by effort vs. impact, with the hours each gives back.",
  },
  {
    when: "A 30-minute walkthrough",
    what: "We go through the report together. What you do next is entirely up to you.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        {/* Left column: intro + form */}
        <div className="lg:col-span-3">
          <Eyebrow className="mb-6 tracking-widest">
            Contact · Book Your Assessment
          </Eyebrow>

          <h1 className="mb-6 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Send us a few lines.
          </h1>

          <p className="mb-4 text-lg leading-relaxed">
            We reply within one business day. The assessment is a free
            45-minute call to understand how your business runs and where AI
            can give you time back. No card required, no commitment to go
            further.
          </p>
          <p className="mb-12 text-lg leading-relaxed">
            If we spot real opportunities, you&apos;ll have them in writing
            within 48 hours. Want to skip the back-and-forth?{" "}
            <Link
              href="/book"
              className="rounded-sm font-medium text-primary transition-colors hover:text-primary-hover"
            >
              Pick a time directly
            </Link>
            .
          </p>

          <ContactForm />
        </div>

        {/* Right column: what happens next + other ways */}
        <aside className="space-y-10 lg:col-span-2">
          <div>
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              What happens after you send
            </h2>
            <ol className="space-y-5">
              {afterYouSend.map((item, i) => (
                <li key={item.when} className="flex gap-4">
                  <span
                    className="mt-0.5 shrink-0 font-mono text-sm text-primary"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="mb-1 text-sm font-medium text-foreground">
                      {item.when}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.what}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Other ways to reach us
            </h2>
            <Card className="ring-border [--card-spacing:--spacing(5)]">
              <CardContent>
                <div className="flex items-center gap-4">
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary"
                    aria-hidden="true"
                  >
                    <Mail className="size-5 text-primary" strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="mb-0.5 font-mono text-[0.65rem] tracking-[0.2em] uppercase text-caption">
                      Email
                    </p>
                    <a
                      href="mailto:hello@kivov.work"
                      className="rounded-sm font-medium text-foreground transition-colors hover:text-primary"
                      aria-label="Send email to hello@kivov.work"
                    >
                      hello@kivov.work
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
