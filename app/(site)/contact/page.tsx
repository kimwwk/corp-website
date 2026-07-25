import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = {
  title: "Contact — Kivov Digital",
  description:
    "Send me a few lines about where work is getting stuck. I reply within one business day. Or take the free Workflow Fit Check first.",
  openGraph: {
    title: "Contact — Kivov Digital",
    description:
      "Send me a few lines about where work is getting stuck. I reply within one business day. Or take the free Workflow Fit Check first.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const afterYouSend = [
  {
    when: "Within 1 business day",
    what: "My first reply, with any questions I need answered before I can be useful.",
  },
  {
    when: "If you're booking the audit",
    what: "The intake questionnaire, plus times for your 60-minute workflow-mapping session.",
  },
  {
    when: "If you're not sure yet",
    what: "I'll point you at the smallest useful next step, even when that isn't hiring me.",
  },
];

/* The form reads `?interest=` via useSearchParams, so it has to sit inside a
   Suspense boundary for the static export build to prerender this page. */
function FormFallback() {
  return (
    <div
      aria-hidden="true"
      className="space-y-6"
      style={{ minHeight: "42rem" }}
    >
      {[11, 11, 11, 11, 11, 24].map((h, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-32 rounded bg-muted" />
          <div
            className="w-full rounded-lg bg-muted"
            style={{ height: `${h * 0.25}rem` }}
          />
        </div>
      ))}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        {/* Left column: intro + form */}
        <div className="lg:col-span-3">
          <Eyebrow className="mb-6 tracking-widest">Contact</Eyebrow>

          <h1 className="mb-6 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Send me a few lines.
          </h1>

          <p className="mb-4 text-lg leading-relaxed">
            Tell me what your business does and where the work is getting
            stuck. I reply within one business day, and I read everything
            myself.
          </p>
          <p className="mb-12 text-lg leading-relaxed">
            Not sure what to ask for yet? Take the{" "}
            <Link
              href="/fit-check"
              className="rounded-sm font-medium text-primary transition-colors hover:text-primary-hover"
            >
              free fit check
            </Link>{" "}
            first, or read how the{" "}
            <Link
              href="/audit"
              className="rounded-sm font-medium text-primary transition-colors hover:text-primary-hover"
            >
              Workflow-First AI Audit
            </Link>{" "}
            works.
          </p>

          <React.Suspense fallback={<FormFallback />}>
            <ContactForm />
          </React.Suspense>
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
              Other ways to reach me
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Would rather talk it through?{" "}
              <Link
                href="/book"
                className="rounded-sm font-medium text-primary transition-colors hover:text-primary-hover"
              >
                Book a call
              </Link>{" "}
              and pick a time directly.
            </p>
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
