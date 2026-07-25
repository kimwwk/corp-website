"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { capture, trackLead } from "@/lib/analytics";

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
  "https://automation.getjustgo.com/webhook/kivov-assessment-lead";

const COMPANY_SIZES = ["Just me", "2–10", "11–50", "51–200", "200+"];
const INTERESTS = [
  "Free AI Tools Assessment",
  "AI Automation (project)",
  "Custom Software Development (project)",
  "Not sure — want to discuss",
];

type Status = "idle" | "sending" | "success" | "error";

const labelClass =
  "mb-2 block font-mono text-sm font-normal text-muted-foreground";

export function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [companySize, setCompanySize] = React.useState<string | null>(null);
  const [interest, setInterest] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    // Native validation handles this in the browser; guard for safety.
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          companySize: companySize ?? "",
          interest: interest ?? "",
          message,
          source: "kivov-website",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`status-${res.status}`);
      setStatus("success");
      trackLead("contact_form");
      capture("contact_form_submitted", {
        company_size: companySize ?? "",
        interest: interest ?? "",
      });
    } catch (err) {
      console.error("Form submission failed:", err);
      setStatus("error");
      capture("contact_form_failed");
    }
  }

  if (status === "success") {
    return (
      <Card className="ring-2 ring-primary/40 [--card-spacing:--spacing(6)]" role="status">
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
                Thanks — we got it.
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                You&apos;ll hear from us within one business day with a couple
                of proposed times for your free assessment call. Talk soon.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={submit} noValidate={false}>
      <div className="space-y-6">
        <div>
          <Label htmlFor="name" className={labelClass}>
            01 / Your name <span className="text-primary">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 bg-card"
          />
        </div>

        <div>
          <Label htmlFor="email" className={labelClass}>
            02 / Work email <span className="text-primary">*</span>
          </Label>
          <Input
            id="email"
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
          <Label htmlFor="company" className={labelClass}>
            03 / Company
          </Label>
          <Input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Your company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="h-11 bg-card"
          />
        </div>

        <div>
          <Label htmlFor="companySize" className={labelClass}>
            04 / Company size
          </Label>
          <Select value={companySize} onValueChange={setCompanySize}>
            <SelectTrigger id="companySize" className="h-11 w-full bg-card">
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {COMPANY_SIZES.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="interest" className={labelClass}>
            05 / What you&apos;re after
          </Label>
          <Select value={interest} onValueChange={setInterest}>
            <SelectTrigger id="interest" className="h-11 w-full bg-card">
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {INTERESTS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="message" className={labelClass}>
            06 / Tell us about your situation{" "}
            <span className="text-primary">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="What does your business do, and where does your time go? A few honest lines are perfect."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="resize-y bg-card"
          />
        </div>
      </div>

      {status === "error" && (
        <Card
          className="mt-6 bg-destructive/5 ring-destructive/30 [--card-spacing:--spacing(5)]"
          role="alert"
        >
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Hmm — something went wrong sending your message. Please email us
              directly at{" "}
              <a
                href="mailto:hello@kivov.work?subject=Free%20AI%20assessment"
                className="rounded-sm font-medium text-primary transition-colors hover:text-primary-hover"
              >
                hello@kivov.work
              </a>{" "}
              — we read everything.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="mt-8">
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
              Book my free assessment
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </>
          )}
        </Button>
        <p className="mt-4 text-sm text-caption">
          First reply within 1 business day · Free, no commitment
        </p>
      </div>
    </form>
  );
}
