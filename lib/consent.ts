"use client";

/**
 * Cookie consent — opt-out model.
 *
 * Analytics runs unless the visitor turns it off. That is what PIPEDA (implied
 * consent for non-sensitive analytics, with notice and an easy opt-out) and the
 * US state privacy laws allow, and we do not serve the EU, Brazil or Quebec.
 * A browser broadcasting Global Privacy Control flips the default to off —
 * that signal is legally binding in California and Colorado.
 *
 * Deliberately ~60 lines and dependency-free: one category, one boolean, no
 * third-party script, no vendor bill.
 */

const STORAGE_KEY = "kivov:cookie-consent:v1";
const CHANGED_EVENT = "kivov:consent-changed";
const OPEN_EVENT = "kivov:consent-open";

export type ConsentChoice = "granted" | "denied";

function readStored(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null; // private mode / storage disabled
  }
}

/** True when the browser is broadcasting Global Privacy Control. */
function gpcEnabled(): boolean {
  return (
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
}

/** Whether the visitor has answered the notice yet. */
export function hasChosen(): boolean {
  return typeof window !== "undefined" && readStored() !== null;
}

/** Stored choice if there is one, otherwise the default for this visitor. */
export function analyticsAllowed(): boolean {
  if (typeof window === "undefined") return false;
  const stored = readStored();
  if (stored) return stored === "granted";
  return !gpcEnabled();
}

export function setConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Choice can't be persisted; it still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent(CHANGED_EVENT));
}

export function onConsentChange(handler: () => void): () => void {
  window.addEventListener(CHANGED_EVENT, handler);
  return () => window.removeEventListener(CHANGED_EVENT, handler);
}

/** Re-open the notice — what the footer's "Consent Preferences" link does. */
export function openConsentPreferences(): void {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function onOpenPreferences(handler: () => void): () => void {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
