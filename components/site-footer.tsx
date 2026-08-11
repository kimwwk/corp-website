import Image from "next/image";
import Link from "next/link";

import {
  FacebookIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/social-icons";
import { TrackedExternalLink } from "@/components/tracked-link";

const footerLinks = [
  { label: "Showcase", href: "/showcase" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Terms of Use", href: "/terms" },
];

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

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-4">
            <Image
              src="/kivov-wordmark.png"
              alt="Kivov Digital"
              width={120}
              height={50}
              className="h-5 w-auto opacity-80"
            />
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
          aria-label="Footer navigation"
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border pt-4 sm:justify-start"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-sm py-2 text-sm text-caption underline-offset-[5px] transition-colors hover:text-foreground hover:underline hover:decoration-primary hover:decoration-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
