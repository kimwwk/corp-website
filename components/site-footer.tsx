import Image from "next/image";
import Link from "next/link";

import { ConsentPreferencesLink } from "@/components/consent-preferences-link";
import { MonoLabel } from "@/components/sections/mono-label";
import {
  FacebookIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/social-icons";
import { TrackedExternalLink } from "@/components/tracked-link";
import { footerGroups } from "@/content/navigation";
import { cn } from "@/lib/utils";

/* Legal row, under the sitemap columns. */
const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Terms of Use", href: "/terms" },
];

const footerLinkClass =
  "rounded-sm py-2 text-sm text-caption underline-offset-[5px] transition-colors hover:text-foreground hover:underline hover:decoration-primary hover:decoration-2";

// URLs from Kim's Popl business card (popl.co/card/qd4lm671/1).
const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/kivov",
    Icon: LinkedInIcon,
  },
  { label: "X", href: "https://x.com/kimwong_wwk", Icon: XIcon },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591254942653",
    Icon: FacebookIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@kivov-digital",
    Icon: YouTubeIcon,
  },
];

/*
 * Footer: wordmark + social row, then every page in the tree as link columns
 * (Services, Use Cases, Resources, Company — built from content/navigation.ts),
 * then the legal row.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-4">
            <Link href="/" className="rounded-sm" aria-label="Kivov Digital — Home">
              <Image
                src="/kivov-wordmark.png"
                alt="Kivov Digital"
                width={120}
                height={50}
                className="h-5 w-auto opacity-80"
              />
            </Link>
            <p className="font-mono text-xs tracking-[0.14em] text-caption uppercase">
              © 2026 Kivov Digital · Toronto
            </p>
          </div>
          <ul className="flex items-center gap-1">
            {socialLinks.map(({ label, href, Icon }) => (
              <li key={label}>
                <TrackedExternalLink
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Kivov Digital on ${label}`}
                  event="social_link_clicked"
                  eventProps={{
                    network: label.toLowerCase(),
                    cta_location: "footer",
                  }}
                  className="flex size-11 items-center justify-center rounded-full text-caption transition-colors outline-none hover:bg-muted hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Icon className="size-5" aria-hidden="true" />
                </TrackedExternalLink>
              </li>
            ))}
          </ul>
        </div>
        <nav
          aria-label="Site map"
          className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 md:grid-cols-4"
        >
          {footerGroups.map((group) => (
            <div key={group.label}>
              <MonoLabel tone="ink">{group.label}</MonoLabel>
              <ul className="mt-3 flex flex-col">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        footerLinkClass,
                        "inline-flex min-h-9 items-center",
                        link.indent && "pl-3",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <nav
          aria-label="Legal"
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border pt-4 sm:justify-start"
        >
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href} className={footerLinkClass}>
              {link.label}
            </Link>
          ))}
          <ConsentPreferencesLink className={footerLinkClass} />
        </nav>
      </div>
    </footer>
  );
}
