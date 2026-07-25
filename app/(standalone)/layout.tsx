import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/*
 * Standalone shell for legal pages — no site header/footer, just a minimal
 * back link (mirrors the Nuxt `standalone` layout used for iframe-friendly
 * Termly pages).
 */
export default function StandaloneLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main id="main-content" className="flex-1">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <div className="mb-10">
          <Link
            href="/"
            aria-label="Back to Kivov Digital homepage"
            className="inline-flex items-center gap-2 rounded-sm text-sm text-caption transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Kivov Digital
          </Link>
        </div>
        {children}
      </div>
    </main>
  );
}
