"use client";

import { openConsentPreferences } from "@/lib/consent";

/** Footer link that re-opens the cookie notice. Client leaf of `SiteFooter`. */
export function ConsentPreferencesLink({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={openConsentPreferences}>
      Consent Preferences
    </button>
  );
}
