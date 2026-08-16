import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Work_Sans } from "next/font/google";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

/* Green Ledger type system: Archivo (display), Work Sans (body), IBM Plex
   Mono (labels). globals.css @theme maps roles by literal family name. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kivov.work"),
  title: "Kivov Digital — Workflow-First AI for Small Business",
  description:
    "Your business should not have to fit the system. We help growing businesses understand how their work actually happens, find where time is being lost, and build practical AI systems around the way their people already work.",
  verification: {
    google: "V86yYgZYa0b2uAqQxbhb9teevK2zoUKKHVYPdT3IZHo",
  },
  /* No `icons` key on purpose. The app icons are file-based
     (`app/favicon.ico`, `app/icon.png`, `app/icon1.png`, `app/apple-icon.png`)
     so Next derives `type`/`sizes` and content-hashes the URLs. A `metadata.icons`
     entry here would take precedence and silently suppress all four. */
  openGraph: {
    title: "Kivov Digital — Workflow-First AI for Small Business",
    description:
      "Your business should not have to fit the system. We help growing businesses understand how their work actually happens, find where time is being lost, and build practical AI systems around the way their people already work.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${workSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        {/* Consent is ours: `components/cookie-consent.tsx` owns the notice,
            `lib/consent.ts` the state, and `lib/analytics.ts` only loads gtag
            once that state allows it. No third-party consent script — which
            also means no DOM injected around React's tree at hydration. */}
        <CookieConsent />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
