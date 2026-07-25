"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eyebrow } from "@/components/eyebrow";
import { TrackedLink } from "@/components/tracked-link";
import { capture, trackLead } from "@/lib/analytics";
import { WEBHOOK_URL } from "@/lib/webhook";

/* ── Answer strings referenced by the scoring rules ───────────────────
   Named once so the questions and the result logic can never drift. */
const A = {
  timeUnderTwo: "Less than two hours",
  timeSixToTen: "Six to ten hours",
  timeOverTen: "More than ten hours",
  nothingDropped: "Nothing major gets dropped",
  ownerBottleneck: "The owner becomes the bottleneck",
  inMyHead: "It mostly lives in my head",
  knownNotDocumented: "The team knows it, but it isn't documented",
  documentedManual: "It's documented but still manual",
  disconnectedTools: "It moves through several disconnected tools",
  partlyAutomated: "Parts are already automated",
  processUnsure: "I'm not sure",
  toolsNotConnected: "We have several tools but they aren't connected",
  reduceOwnerDependence: "Reduce dependence on the owner",
  connectOurTools: "Connect our tools",
} as const;

type Question = {
  key: string;
  prompt: string;
  /** Guidance shown under the prompt for multi-select questions. */
  hint?: string;
  options: string[];
  /** Single-select questions auto-advance; multi-select need a Next click. */
  multi?: boolean;
  /** Maximum selections for a multi-select question. */
  max?: number;
};

const QUESTIONS: Question[] = [
  {
    key: "role",
    prompt: "Which best describes your role?",
    options: [
      "Owner or founder",
      "Operations or administration",
      "Sales or marketing",
      "Finance",
      "Team or department leader",
      "Other",
    ],
  },
  {
    key: "team_size",
    prompt: "How many people are on your team?",
    options: ["Just me", "2–5", "6–15", "16–50", "More than 50"],
  },
  {
    key: "stuck_where",
    prompt: "Where does work get stuck most often?",
    hint: "Select up to two.",
    multi: true,
    max: 2,
    options: [
      "Lead follow-up",
      "Quotes or proposals",
      "Scheduling",
      "Customer onboarding",
      "Data entry",
      "Invoices or approvals",
      "Reporting",
      "Customer questions",
      "Internal handoffs",
      "Finding information",
      "Other",
    ],
  },
  {
    key: "time_cost",
    prompt: "How much time does this work take each week?",
    options: [
      A.timeUnderTwo,
      "Two to five hours",
      A.timeSixToTen,
      A.timeOverTen,
      "I'm not sure",
    ],
  },
  {
    key: "when_busy",
    prompt: "What usually happens when your team gets busy?",
    hint: "Select all that apply.",
    multi: true,
    options: [
      "Follow-ups are delayed",
      "Customers wait longer",
      "Information gets missed",
      "Work has to be corrected",
      A.ownerBottleneck,
      "Reporting falls behind",
      "Revenue opportunities are missed",
      "Employees work after hours",
      A.nothingDropped,
    ],
  },
  {
    key: "process_today",
    prompt: "How is the process handled today?",
    options: [
      A.inMyHead,
      A.knownNotDocumented,
      A.documentedManual,
      A.disconnectedTools,
      A.partlyAutomated,
      A.processUnsure,
    ],
  },
  {
    key: "ai_today",
    prompt: "How are you currently using AI or automation?",
    options: [
      "We aren't using it",
      "We use tools such as ChatGPT or Claude",
      "We use a CRM or automation platform",
      A.toolsNotConnected,
      "We already have AI or automations in place",
      "I don't know what the team is using",
    ],
  },
  {
    key: "outcome",
    prompt: "What outcome matters most right now?",
    options: [
      "Save time",
      "Reduce errors",
      "Improve follow-up",
      "Make work easier for the team",
      A.connectOurTools,
      A.reduceOwnerDependence,
      "Understand where AI fits",
      "Build a custom solution",
    ],
  },
];

type ResultKey =
  | "automate"
  | "fix_flow"
  | "connect_systems"
  | "protect_owner"
  | "no_automation";

const RESULTS: Record<ResultKey, { title: string; body: string }> = {
  automate: {
    title: "A clear automation opportunity",
    body: "You may have a strong opportunity to automate or simplify part of this workflow. Because the process is already relatively clear, the next step is to measure its volume, steps, exceptions, and current time cost.",
  },
  fix_flow: {
    title: "Fix the flow first",
    body: "AI may eventually help, but automating an unclear process creates more confusion. Your best first step is to document how the work currently moves and find where decisions, information, or ownership become unclear.",
  },
  connect_systems: {
    title: "Connect the systems",
    body: "Your strongest opportunity may not require new software. Connecting or reconfiguring the tools you already use could remove repeated work and reduce missed information.",
  },
  protect_owner: {
    title: "Protect the owner's time",
    body: "Your biggest opportunity may be capturing the knowledge, decisions, and steps currently held by one person. The right system helps the team move work forward without waiting on the same person every time.",
  },
  no_automation: {
    title: "No immediate automation needed",
    body: "Not every process needs AI. Based on your answers, this may not be the most valuable place to invest right now. Start by tracking how often the work occurs and what it costs before buying another tool.",
  },
};

type Answers = Record<string, string[]>;

/** First match wins, in the order the rules are listed. */
export function scoreFitCheck(answers: Answers): ResultKey {
  const picked = (key: string) => answers[key] ?? [];
  const has = (key: string, value: string) => picked(key).includes(value);

  if (has("time_cost", A.timeUnderTwo) && has("when_busy", A.nothingDropped)) {
    return "no_automation";
  }
  if (
    has("process_today", A.inMyHead) ||
    has("when_busy", A.ownerBottleneck) ||
    has("outcome", A.reduceOwnerDependence)
  ) {
    return "protect_owner";
  }
  if (
    has("process_today", A.disconnectedTools) ||
    has("ai_today", A.toolsNotConnected) ||
    has("outcome", A.connectOurTools)
  ) {
    return "connect_systems";
  }
  if (
    has("process_today", A.knownNotDocumented) ||
    has("process_today", A.processUnsure)
  ) {
    return "fix_flow";
  }
  if (
    has("process_today", A.documentedManual) ||
    has("process_today", A.partlyAutomated)
  ) {
    return "automate";
  }
  return has("time_cost", A.timeSixToTen) || has("time_cost", A.timeOverTen)
    ? "automate"
    : "fix_flow";
}

type Phase = "intro" | "questions" | "contact" | "result";
type Status = "idle" | "sending";

const labelClass =
  "mb-2 block font-mono text-sm font-normal text-muted-foreground";

export function FitCheck() {
  const [phase, setPhase] = React.useState<Phase>("intro");
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Answers>({});
  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [business, setBusiness] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [result, setResult] = React.useState<ResultKey | null>(null);

  const headingRef = React.useRef<HTMLDivElement>(null);
  const advanceTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const movedRef = React.useRef(false);

  React.useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    [],
  );

  // Move focus to the new prompt on every step change so keyboard and screen
  // reader users land on the question, not back at the top of the document.
  // Skipped on first paint so the intro never steals focus.
  React.useEffect(() => {
    if (!movedRef.current) {
      movedRef.current = true;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step, phase]);

  const question = QUESTIONS[step];
  const selected = question ? (answers[question.key] ?? []) : [];
  const atCap = Boolean(
    question?.max && selected.length >= (question.max ?? 0),
  );

  function goForward(from: number) {
    const q = QUESTIONS[from];
    capture("fit_check_step_completed", {
      step: from + 1,
      question_key: q.key,
    });
    if (from === QUESTIONS.length - 1) {
      setPhase("contact");
    } else {
      setStep(from + 1);
    }
  }

  function choose(option: string) {
    if (!question) return;
    if (question.multi) {
      setAnswers((prev) => {
        const current = prev[question.key] ?? [];
        // Cap enforced here as well as in the UI: clicking a new option once
        // the limit is reached is a no-op, deselecting always works.
        const next = current.includes(option)
          ? current.filter((v) => v !== option)
          : question.max && current.length >= question.max
            ? current
            : [...current, option];
        return { ...prev, [question.key]: next };
      });
      return;
    }
    setAnswers((prev) => ({ ...prev, [question.key]: [option] }));
    // Brief pause so the selection is visible before the step changes.
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    const from = step;
    advanceTimer.current = setTimeout(() => goForward(from), 180);
  }

  function goBack() {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    if (phase === "contact") {
      setPhase("questions");
      setStep(QUESTIONS.length - 1);
      return;
    }
    if (step === 0) {
      setPhase("intro");
      return;
    }
    setStep((s) => s - 1);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    if (!firstName.trim() || !email.trim()) return;
    setStatus("sending");

    const key = scoreFitCheck(answers);
    const transcript = QUESTIONS.map(
      (q) => `${q.prompt}: ${(answers[q.key] ?? []).join(", ")}`,
    ).join("\n");

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: firstName,
          email,
          company: business,
          companySize: answers.team_size?.[0] ?? "",
          interest: "Workflow Fit Check",
          message: `Fit Check result: ${RESULTS[key].title}\n\n${transcript}\nWebsite: ${website}`,
          source: "kivov-website-fit-check",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`status-${res.status}`);
      trackLead("fit_check");
      capture("fit_check_lead_submitted", { result: key });
    } catch (err) {
      // A failed hand-off is my problem, not the visitor's: show the result.
      console.error("Fit check submission failed:", err);
      capture("fit_check_lead_failed");
    }

    setResult(key);
    setPhase("result");
    setStatus("idle");
    capture("fit_check_result_viewed", { result: key });
  }

  /* ── Intro ─────────────────────────────────────────────────────── */
  if (phase === "intro") {
    return (
      <div className="rise">
        <Eyebrow className="mb-6 text-xs">Free · Three minutes</Eyebrow>
        <h1 className="font-display text-[2.5rem] leading-[1.06] font-semibold tracking-tight text-foreground md:text-5xl">
          Where is work getting stuck?
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed">
          Take this three-minute Workflow Fit Check to see where repetitive
          work, disconnected tools, or unclear processes may be costing your
          team time. You&apos;ll get a high-level result and one practical
          place to begin. No technical knowledge required.
        </p>
        <Button
          size="xl"
          className="mt-8"
          onClick={() => {
            capture("fit_check_started");
            setPhase("questions");
          }}
        >
          Start the check
          <ArrowRight data-icon="inline-end" aria-hidden="true" />
        </Button>
        <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] tracking-[0.15em] uppercase text-caption">
          <span>8 questions</span>
          <span aria-hidden="true" className="text-primary">
            ·
          </span>
          <span>No technical knowledge required</span>
          <span aria-hidden="true" className="text-primary">
            ·
          </span>
          <span>No call needed</span>
        </p>
      </div>
    );
  }

  /* ── Result ────────────────────────────────────────────────────── */
  if (phase === "result" && result) {
    const copy = RESULTS[result];
    return (
      <div className="rise">
        <Eyebrow className="mb-6 text-xs">Your result</Eyebrow>
        <h1 className="font-display text-[2.25rem] leading-[1.08] font-semibold tracking-tight text-foreground md:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed">{copy.body}</p>

        <Card className="mt-10 ring-border [--card-spacing:--spacing(7)]">
          <CardContent>
            <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-caption">
              Want the full picture?
            </p>
            <p className="mt-4 leading-relaxed">
              The Workflow-First AI Audit maps this workflow end to end and
              gives you a written 30-day action plan.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <Button
                size="xl"
                render={
                  <TrackedLink
                    href="/audit"
                    event="audit_cta_clicked"
                    eventProps={{
                      source_page: "fit_check",
                      cta_location: "result",
                    }}
                  />
                }
              >
                Explore the audit
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
              <Link
                href="/contact"
                className="rounded-sm text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
              >
                Or send me a note →
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-sm text-caption">
          A copy is on its way to {email || "your inbox"}.
        </p>
      </div>
    );
  }

  /* ── Contact step ──────────────────────────────────────────────── */
  if (phase === "contact") {
    return (
      <div>
        <ProgressRail current={QUESTIONS.length} total={QUESTIONS.length} />
        <div
          ref={headingRef}
          tabIndex={-1}
          className="mt-8 outline-none"
          aria-live="polite"
        >
          <h2 className="font-display text-2xl leading-snug font-semibold tracking-tight text-foreground md:text-3xl">
            Where should I send your result?
          </h2>
        </div>

        <form onSubmit={submit} className="mt-8 max-w-lg">
          <div className="space-y-6">
            <div>
              <Label htmlFor="fc-first-name" className={labelClass}>
                First name <span className="text-primary">*</span>
              </Label>
              <Input
                id="fc-first-name"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
                placeholder="Jane"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-11 bg-card"
              />
            </div>
            <div>
              <Label htmlFor="fc-email" className={labelClass}>
                Email <span className="text-primary">*</span>
              </Label>
              <Input
                id="fc-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="jane@yourcompany.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 bg-card"
              />
            </div>
            <div>
              <Label htmlFor="fc-business" className={labelClass}>
                Business name
              </Label>
              <Input
                id="fc-business"
                name="business"
                type="text"
                autoComplete="organization"
                placeholder="Your business"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                className="h-11 bg-card"
              />
            </div>
            <div>
              <Label htmlFor="fc-website" className={labelClass}>
                Website
              </Label>
              <Input
                id="fc-website"
                name="website"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="yourbusiness.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="h-11 bg-card"
              />
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-caption">
            You&apos;ll see your result immediately. I&apos;ll also send it to
            your email, along with one practical next step. No spam, no drip
            sequence.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              type="submit"
              size="xl"
              disabled={status === "sending"}
              className={status === "sending" ? "cursor-wait" : undefined}
            >
              {status === "sending" ? (
                "Sending…"
              ) : (
                <>
                  See my result
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </>
              )}
            </Button>
            <BackButton onClick={goBack} />
          </div>
        </form>
      </div>
    );
  }

  /* ── Questions ─────────────────────────────────────────────────── */
  if (!question) return null;

  return (
    <div>
      <ProgressRail current={step} total={QUESTIONS.length} />

      <div
        ref={headingRef}
        tabIndex={-1}
        className="mt-8 outline-none"
        aria-live="polite"
      >
        <h2 className="font-display text-2xl leading-snug font-semibold tracking-tight text-foreground md:text-3xl">
          {question.prompt}
        </h2>
        {question.hint ? (
          <p className="mt-3 font-mono text-[0.7rem] tracking-[0.15em] uppercase text-caption">
            {question.hint}
          </p>
        ) : null}
      </div>

      <div
        role="group"
        aria-label={question.prompt}
        className="mt-8 grid gap-3 sm:grid-cols-2"
      >
        {question.options.map((option) => {
          const isSelected = selected.includes(option);
          const isBlocked = Boolean(question.multi && atCap && !isSelected);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isSelected}
              aria-disabled={isBlocked || undefined}
              onClick={() => choose(option)}
              className={cn(
                "flex items-center gap-3 rounded-xl bg-card px-4 py-3.5 text-left text-sm ring-1 transition-all duration-200 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                isSelected
                  ? "font-medium text-foreground ring-2 ring-primary"
                  : "text-muted-foreground ring-border hover:ring-primary/50 hover:text-foreground",
                isBlocked && "opacity-45 hover:ring-border",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center border-2 transition-colors",
                  question.multi ? "rounded-[0.3rem]" : "rounded-full",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border",
                )}
              >
                {isSelected ? <Check className="size-3" strokeWidth={3} /> : null}
              </span>
              {option}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <BackButton onClick={goBack} />
        {question.multi ? (
          <Button
            size="xl"
            disabled={selected.length === 0}
            onClick={() => goForward(step)}
          >
            {step === QUESTIONS.length - 1 ? "Continue" : "Next"}
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="lg"
      onClick={onClick}
      className="text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft data-icon="inline-start" aria-hidden="true" />
      Back
    </Button>
  );
}

/** Mono step counter over a hairline progress bar. */
function ProgressRail({ current, total }: { current: number; total: number }) {
  const label =
    current >= total ? "Last step" : `Question ${current + 1} of ${total}`;
  const pct = Math.round((current / total) * 100);
  return (
    <div>
      <div className="mb-3 flex items-center justify-between font-mono text-[0.7rem] tracking-[0.2em] uppercase">
        <span className="text-primary">{label}</span>
        <span className="text-caption tabular-nums">{pct}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label="Fit check progress"
        className="h-1 w-full overflow-hidden rounded-full bg-border"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
