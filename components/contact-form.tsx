"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TrackedExternalLink } from "@/components/tracked-link";
import { contact } from "@/content/contact";
import { capture, trackLead } from "@/lib/analytics";
import { WEBHOOK_URL } from "@/lib/webhook";
import { cn } from "@/lib/utils";

/*
 * What the message is about, in the visitor's words rather than package
 * names. `key` is the `?interest=` value; older CTA values map onto these.
 */
const TOPICS = [
  { key: "website", label: "Website & SEO" },
  { key: "automation", label: "AI automation" },
  { key: "ai-advice", label: "AI advice & training" },
  { key: "app", label: "App development" },
  { key: "partner", label: "Partnership or referral" },
  { key: "other", label: "Something else" },
] as const;
type TopicKey = (typeof TOPICS)[number]["key"];

const TOPIC_ALIASES: Record<string, TopicKey> = {
  "website-management": "website",
  "ai-automation": "automation",
  "build-for-you": "automation",
  audit: "ai-advice",
  "build-with-you": "ai-advice",
  "ai-consulting": "ai-advice",
};

function topicFromParam(param: string | null): TopicKey | null {
  if (!param) return null;
  if (param in TOPIC_ALIASES) return TOPIC_ALIASES[param];
  return TOPICS.some((t) => t.key === param) ? (param as TopicKey) : null;
}

const DEFAULT_PLACEHOLDER =
  "What does your business do, and what would you like help with?";
const PLACEHOLDERS: Partial<Record<TopicKey, string>> = {
  website: "Your website address, and what you'd like fixed or looked after.",
  automation: "Which task takes the most time, and which tools you use for it.",
  app: "What the app should do, and who will use it.",
  partner: "Who you are, and the kind of clients or work you have in mind.",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "success" | "error";
type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const labelClass =
  "mb-2 block font-mono text-sm font-normal text-muted-foreground";
const errorClass = "mt-2 text-sm text-destructive";

/* A topic chip: a checkbox drawn as a pill (Fit Check states: hairline ring,
   green ring and check when picked). `relative` keeps the hidden input inside
   the label, so focusing it never scrolls the page. */
function TopicChip({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label
      className={cn(
        "relative inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-card px-4 text-sm ring-1 transition-all duration-200 has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
        checked
          ? "font-medium text-foreground ring-2 ring-primary"
          : "text-muted-foreground ring-border hover:text-foreground hover:ring-primary/50",
      )}
    >
      <input
        type="checkbox"
        name="topic"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {checked ? (
        <Check className="size-4 text-primary" strokeWidth={2.5} aria-hidden="true" />
      ) : null}
      {label}
    </label>
  );
}

export function ContactForm({ sourcePage = "contact" }: { sourcePage?: string }) {
  const searchParams = useSearchParams();
  const preset = topicFromParam(searchParams.get("interest"));

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [topics, setTopics] = React.useState<TopicKey[]>(preset ? [preset] : []);
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState<Errors>({});
  const [status, setStatus] = React.useState<Status>("idle");

  const placeholder =
    (topics.length === 1 && PLACEHOLDERS[topics[0]]) || DEFAULT_PLACEHOLDER;

  function toggleTopic(key: TopicKey) {
    setTopics((current) =>
      current.includes(key)
        ? current.filter((k) => k !== key)
        : TOPICS.map((t) => t.key).filter((k) => k === key || current.includes(k)),
    );
  }

  function clearError(field: Field) {
    if (!errors[field]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const found: Errors = {};
    if (!name.trim()) found.name = "Please add your name.";
    if (!email.trim()) found.email = "Please add your email.";
    else if (!EMAIL_PATTERN.test(email.trim()))
      found.email = "That email doesn't look right.";
    if (!message.trim()) found.message = "Please add a line or two about it.";
    setErrors(found);
    const firstInvalid = (["name", "email", "message"] as const).find((f) => found[f]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    const topicLabels = TOPICS.filter((t) => topics.includes(t.key)).map((t) => t.label);
    setStatus("sending");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: "",
          companySize: "",
          interest: topicLabels.join(", "),
          // The n8n email lists the known fields; the phone rides in the
          // message too, so it reaches Kim either way.
          message: phone.trim()
            ? `${message}\n\nPhone / WhatsApp: ${phone.trim()}`
            : message,
          source: "kivov-website",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`status-${res.status}`);
      setStatus("success");
      trackLead("contact_form", sourcePage);
      capture("contact_form_submitted", {
        interest: topicLabels.join(", "),
        has_phone: Boolean(phone.trim()),
        source_page: sourcePage,
      });
    } catch (err) {
      console.error("Form submission failed:", err);
      setStatus("error");
      capture("contact_form_failed");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex items-start gap-4 py-2">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary"
          aria-hidden="true"
        >
          <Check className="size-5 text-primary" />
        </div>
        <div>
          <h2 className="mb-2 font-semibold text-foreground">Thanks, I got it.</h2>
          <p className="leading-relaxed text-muted-foreground">
            {contact.reply} If it&apos;s urgent, WhatsApp me on{" "}
            <TrackedExternalLink
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              event="contact_channel_clicked"
              eventProps={{ source_page: sourcePage, channel: "whatsapp", cta_location: "form_success" }}
              ga={{
                event: "contact_click",
                params: { method: "whatsapp", source_page: sourcePage, cta_location: "form_success" },
              }}
              className="rounded-sm font-medium text-primary underline decoration-2 decoration-primary/30 underline-offset-4 hover:decoration-primary"
            >
              {contact.phoneDisplay}
            </TrackedExternalLink>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
        <div>
          <Label htmlFor="name" className={labelClass}>
            Name <span className="text-primary">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="h-11 bg-card"
          />
          {errors.name ? (
            <p id="name-error" className={errorClass}>
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="email" className={labelClass}>
            Email <span className="text-primary">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="h-11 bg-card"
          />
          {errors.email ? (
            <p id="email-error" className={errorClass}>
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <Label htmlFor="phone" className={labelClass}>
          Phone or WhatsApp <span className="text-caption">(optional)</span>
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-11 bg-card"
        />
      </div>

      <fieldset>
        <legend className={labelClass}>What&apos;s it about?</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <TopicChip
              key={t.key}
              checked={topics.includes(t.key)}
              onChange={() => toggleTopic(t.key)}
              label={t.label}
            />
          ))}
        </div>
      </fieldset>

      <div>
        <Label htmlFor="message" className={labelClass}>
          Message <span className="text-primary">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={placeholder}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            clearError("message");
          }}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="min-h-32 resize-y bg-card"
        />
        {errors.message ? (
          <p id="message-error" className={errorClass}>
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === "error" && (
        <Card
          className="bg-destructive/5 ring-destructive/30 [--card-spacing:--spacing(5)]"
          role="alert"
        >
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Something went wrong sending your message. Please email{" "}
              <TrackedExternalLink
                href={`mailto:${contact.email}?subject=Website%20enquiry`}
                event="contact_channel_clicked"
                eventProps={{ source_page: sourcePage, channel: "email", cta_location: "form_error" }}
                ga={{
                  event: "contact_click",
                  params: { method: "email", source_page: sourcePage, cta_location: "form_error" },
                }}
                className="rounded-sm font-medium text-primary hover:text-primary-hover"
              >
                {contact.email}
              </TrackedExternalLink>{" "}
              or WhatsApp {contact.phoneDisplay}.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
        <Button
          type="submit"
          size="xl"
          disabled={status === "sending"}
          className={cn("rounded-full", status === "sending" && "cursor-wait")}
        >
          {status === "sending" ? (
            "Sending…"
          ) : (
            <>
              Send message
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </>
          )}
        </Button>
        <p className="text-sm text-caption">{contact.reply}</p>
      </div>
    </form>
  );
}
