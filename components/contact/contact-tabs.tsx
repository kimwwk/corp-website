"use client";

import * as React from "react";
import { CalendarDays, Send } from "lucide-react";

import { BookingWidget } from "@/components/booking-widget";
import { ContactForm } from "@/components/contact-form";
import { CheckGlyph, cardSurface } from "@/components/sections";
import { capture, gaEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/*
 * "Send a message" | "Book a call" in one place: a segmented switch over the
 * form and the Cal.com calendar, so booking never leaves the contact page.
 */
const TABS = [
  { key: "message", label: "Send a message", short: "Message", icon: Send },
  { key: "book", label: "Book a free 30-min call", short: "Free 30-min call", icon: CalendarDays },
] as const;
type TabKey = (typeof TABS)[number]["key"];

/* What the free call covers, shown above the calendar. */
const CALL_COVERS = [
  "Where you are now, and what you want fixed or built",
  "What I'd do first, and roughly what it involves",
  "Whether I'm the right fit, honestly",
];

export function ContactTabs() {
  const [tab, setTab] = React.useState<TabKey>("message");
  const id = React.useId();

  return (
    <div>
      <div
        role="tablist"
        aria-label="How would you like to get in touch?"
        className="grid w-full grid-cols-2 rounded-full bg-muted p-1 ring-1 ring-border sm:inline-grid sm:w-auto"
      >
        {TABS.map((t) => {
          const selected = tab === t.key;
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              id={`${id}-${t.key}-tab`}
              aria-selected={selected}
              aria-controls={`${id}-${t.key}-panel`}
              onClick={() => {
                setTab(t.key);
                capture("contact_tab_selected", { tab: t.key });
                gaEvent("contact_tab_select", { tab: t.key });
              }}
              className={cn(
                "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-3 py-1.5 text-center text-sm leading-tight font-medium whitespace-nowrap transition-all duration-200 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:px-5",
                selected
                  ? "bg-card text-foreground shadow-sm ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="hidden size-4 shrink-0 sm:inline" aria-hidden="true" />
              <span className="sm:hidden">{t.short}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${id}-message-panel`}
        aria-labelledby={`${id}-message-tab`}
        hidden={tab !== "message"}
        className={cn(cardSurface, "mt-6 p-6 sm:p-8")}
      >
        <React.Suspense fallback={<div style={{ minHeight: "34rem" }} />}>
          <ContactForm />
        </React.Suspense>
      </div>
      <div
        role="tabpanel"
        id={`${id}-book-panel`}
        aria-labelledby={`${id}-book-tab`}
        hidden={tab !== "book"}
        className="mt-6"
      >
        {tab === "book" ? (
          <>
            <p className="leading-relaxed text-foreground">
              30 minutes on Google Meet, at a time that suits you.
            </p>
            <ul className="mt-4 mb-6 grid gap-3 md:grid-cols-3">
              {CALL_COVERS.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <CheckGlyph className="mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <BookingWidget sourcePage="contact" />
          </>
        ) : null}
      </div>
    </div>
  );
}
