"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TrackedLink } from "@/components/tracked-link";
import { capture, trackLead } from "@/lib/analytics";
import { WEBHOOK_URL } from "@/lib/webhook";
import { cn } from "@/lib/utils";

/*
 * What the visitor wants help with: the four services, plus the two AI
 * Starters offers people ask about from here. `key` is the `?interest=` value
 * a CTA can pass (`/contact?interest=build-with-you`) to tick it in advance.
 */
const INTERESTS = [
  { key: "website", label: "Website Management", hint: "Maintenance, updates, redesigns" },
  { key: "ai-automation", label: "AI Automation", hint: "One workflow, automated in your tools" },
  { key: "audit", label: "AI Workflow Audit", hint: "Where AI fits, before any tool" },
  { key: "build-with-you", label: "Build With You", hint: "Two strategy calls a month" },
  { key: "app", label: "App Development", hint: "Starts with a discovery session" },
  { key: "not-sure", label: "Not sure yet", hint: "Tell me what's going on" },
] as const;
type InterestKey = (typeof INTERESTS)[number]["key"];

/* Older links: Build For You lives on the AI Automation page. */
const INTEREST_ALIASES: Record<string, InterestKey> = {
  "build-for-you": "ai-automation",
};

function interestFromParam(param: string | null): InterestKey | null {
  if (!param) return null;
  if (param in INTEREST_ALIASES) return INTEREST_ALIASES[param];
  return INTERESTS.some((i) => i.key === param) ? (param as InterestKey) : null;
}

/* Same bands as the Fit Check's team-size question, so both forms send the
   n8n intake comparable `companySize` values. */
const TEAM_SIZES = ["Just me", "2–5", "6–15", "16–50", "More than 50"];

const DEFAULT_PLACEHOLDER =
  "What does your business do, and where does your time go? A few honest lines are perfect.";
/* With exactly one choice ticked, the message box asks for what that work needs. */
const PLACEHOLDERS: Partial<Record<InterestKey, string>> = {
  website: "Your website address, and what you'd like looked after or changed.",
  "ai-automation":
    "Which task takes the most time, and which tools you use for it today.",
  app: "What the app should do, and who will use it.",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "success" | "error";
type Field = "message" | "name" | "email";
type Errors = Partial<Record<Field, string>>;

const labelClass =
  "mb-2 block font-mono text-sm font-normal text-muted-foreground";
const errorClass = "mt-2 text-sm text-destructive";
/* Steps 02 and 03 sit under a hairline; step bodies indent past the index
   on wider screens so the numbers read as a column. */
const stepClass = "border-t border-border pt-8";
const stepBody = "mt-5 sm:pl-10";
/* In a fieldset the legend floats (so it lays out like a block) and carries
   the gap itself: a top margin on the cleared body would collapse into it. */
const fieldsetBody = "clear-left sm:pl-10";

/*
 * Choice cards: the Fit Check's option look (white card, hairline ring, green
 * ring when picked, square checkbox mark), on native inputs so the form keeps
 * keyboard and screen-reader behaviour for free. The label is `relative` so
 * the visually hidden input sits inside it: focusing it never scrolls the page.
 */
function ChoiceCard({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  hint: string;
}) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer items-start gap-3 rounded-xl bg-card px-4 py-3.5 text-left text-sm ring-1 transition-all duration-200 has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
        checked
          ? "text-foreground ring-2 ring-primary"
          : "text-muted-foreground ring-border hover:text-foreground hover:ring-primary/50",
      )}
    >
      <input
        type="checkbox"
        name="interest"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "mt-px flex size-5 shrink-0 items-center justify-center rounded-[0.3rem] border-2 transition-colors",
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border",
        )}
      >
        {checked ? <Check className="size-3" strokeWidth={3} /> : null}
      </span>
      <span>
        <span className={cn("block", checked && "font-medium")}>{label}</span>
        <span className="mt-0.5 block text-caption">{hint}</span>
      </span>
    </label>
  );
}

/* A pill for a short single choice (team size). Same states as ChoiceCard. */
function ChoicePill({
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
        "relative inline-flex min-h-11 cursor-pointer items-center rounded-full bg-card px-4 text-sm ring-1 transition-all duration-200 has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
        checked
          ? "font-medium text-foreground ring-2 ring-primary"
          : "text-muted-foreground ring-border hover:text-foreground hover:ring-primary/50",
      )}
    >
      <input
        type="radio"
        name="teamSize"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {label}
    </label>
  );
}

/* A step's heading: the mono index (as in "What happens after you send")
   and a title in the page's side-heading recipe. */
function StepHeading({
  index,
  hint,
  children,
}: {
  index: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <span className="flex gap-4">
      <span
        className="mt-0.5 shrink-0 font-mono text-sm text-primary"
        aria-hidden="true"
      >
        {index}
      </span>
      <span>
        <span className="block font-display text-lg font-extrabold tracking-tight text-foreground">
          {children}
        </span>
        {hint ? (
          <span className="mt-1 block text-sm font-normal text-caption">
            {hint}
          </span>
        ) : null}
      </span>
    </span>
  );
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const preset = interestFromParam(searchParams.get("interest"));

  const [interests, setInterests] = React.useState<InterestKey[]>(
    preset ? [preset] : [],
  );
  const [message, setMessage] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [teamSize, setTeamSize] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<Errors>({});
  const [status, setStatus] = React.useState<Status>("idle");
  const [sentInterests, setSentInterests] = React.useState<InterestKey[]>([]);

  const placeholder =
    (interests.length === 1 && PLACEHOLDERS[interests[0]]) ||
    DEFAULT_PLACEHOLDER;

  function toggleInterest(key: InterestKey) {
    setInterests((current) =>
      current.includes(key)
        ? current.filter((k) => k !== key)
        : // Keep the list in the order the cards show.
          INTERESTS.map((i) => i.key).filter(
            (k) => k === key || current.includes(k),
          ),
    );
  }

  function validate(): Errors {
    const found: Errors = {};
    if (!message.trim()) found.message = "A line or two is enough.";
    if (!name.trim()) found.name = "Please add your name.";
    if (!email.trim()) found.email = "Please add your email.";
    else if (!EMAIL_PATTERN.test(email.trim()))
      found.email = "That email doesn't look right.";
    return found;
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
    const found = validate();
    setErrors(found);
    const firstInvalid = (["message", "name", "email"] as const).find(
      (f) => found[f],
    );
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    const interestLabels = INTERESTS.filter((i) =>
      interests.includes(i.key),
    ).map((i) => i.label);

    setStatus("sending");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          companySize: teamSize ?? "",
          interest: interestLabels.join(", "),
          message,
          source: "kivov-website",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`status-${res.status}`);
      setSentInterests(interests);
      setStatus("success");
      trackLead("contact_form");
      capture("contact_form_submitted", {
        company_size: teamSize ?? "",
        interest: interestLabels.join(", "),
      });
    } catch (err) {
      console.error("Form submission failed:", err);
      setStatus("error");
      capture("contact_form_failed");
    }
  }

  if (status === "success") {
    return (
      <Card
        className="ring-2 ring-primary/40 [--card-spacing:--spacing(6)]"
        role="status"
      >
        <CardContent>
          <div className="flex items-start gap-4">
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary"
              aria-hidden="true"
            >
              <Check className="size-5 text-primary" />
            </div>
            <div>
              <h2 className="mb-2 font-semibold text-foreground">
                Thanks, I got it.
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {sentInterests.includes("audit")
                  ? "You'll hear from me within one business day with the intake questionnaire and available times for your mapping session."
                  : "You'll hear from me within one business day."}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Rather talk it through sooner?{" "}
                <TrackedLink
                  href="/book"
                  event="booking_cta_clicked"
                  eventProps={{
                    source_page: "contact",
                    cta_location: "form_success",
                  }}
                  className="rounded-sm font-medium text-primary underline decoration-2 decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  Book a call
                </TrackedLink>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-8">
      {/* 01: what they want help with */}
      <fieldset className={stepClass}>
        <legend className="float-left w-full pb-5">
          <StepHeading index="01" hint="Pick any that fit.">
            What can I help with?
          </StepHeading>
        </legend>
        <div className={cn(fieldsetBody, "grid gap-3 sm:grid-cols-2")}>
          {INTERESTS.map((item) => (
            <ChoiceCard
              key={item.key}
              checked={interests.includes(item.key)}
              onChange={() => toggleInterest(item.key)}
              label={item.label}
              hint={item.hint}
            />
          ))}
        </div>
      </fieldset>

      {/* 02: the situation */}
      <div className={stepClass}>
        <label htmlFor="message" className="block">
          <StepHeading index="02">
            Tell me about your situation{" "}
            <span className="text-primary" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </StepHeading>
        </label>
        <div className={stepBody}>
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
      </div>

      {/* 03: how to reply */}
      <fieldset className={stepClass}>
        <legend className="float-left w-full pb-5">
          <StepHeading index="03">Where should I reply?</StepHeading>
        </legend>
        <div className={cn(fieldsetBody, "space-y-6")}>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
            <div>
              <Label htmlFor="name" className={labelClass}>
                Your name <span className="text-primary">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Jane Doe"
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
                placeholder="jane@yourcompany.com"
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
            <Label htmlFor="company" className={labelClass}>
              Business name
            </Label>
            <Input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Your business"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="h-11 bg-card"
            />
          </div>

          <fieldset>
            <legend className={labelClass}>Team size</legend>
            <div className="flex flex-wrap gap-2">
              {TEAM_SIZES.map((size) => (
                <ChoicePill
                  key={size}
                  checked={teamSize === size}
                  onChange={() => setTeamSize(size)}
                  label={size}
                />
              ))}
            </div>
          </fieldset>
        </div>
      </fieldset>

      {status === "error" && (
        <Card
          className="bg-destructive/5 ring-destructive/30 [--card-spacing:--spacing(5)]"
          role="alert"
        >
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Something went wrong sending your message. Please email me
              directly at{" "}
              <a
                href="mailto:hello@kivov.ca?subject=Website%20enquiry"
                className="rounded-sm font-medium text-primary transition-colors hover:text-primary-hover"
              >
                hello@kivov.ca
              </a>{" "}
              and I&apos;ll pick it up from there.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="border-t border-border pt-8 sm:pl-10">
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
              Send it over
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </>
          )}
        </Button>
        <p className="mt-4 text-sm text-caption">
          First reply within 1 business day
        </p>
      </div>
    </form>
  );
}
