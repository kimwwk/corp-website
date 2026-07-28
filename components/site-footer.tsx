import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "AI Audit", href: "/audit" },
  { label: "Fit Check", href: "/fit-check" },
  { label: "Showcase", href: "/showcase" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Terms of Use", href: "/terms" },
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
            <p className="font-mono text-xs tracking-[0.1em] text-caption uppercase">
              © 2026 Kivov Digital · Toronto
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
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
      </div>
    </footer>
  );
}
