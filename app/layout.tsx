import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, IBM_Plex_Mono, Work_Sans } from "next/font/google";
import { AnalyticsProvider } from "@/components/analytics-provider";
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

const GA_ID = "G-9VVXS7BY20";

export const metadata: Metadata = {
  metadataBase: new URL("https://kivov.work"),
  title: "Kivov Digital — Workflow-First AI for Small Business",
  description:
    "Your business should not have to fit the system. We help growing businesses understand how their work actually happens, find where time is being lost, and build practical AI systems around the way their people already work.",
  verification: {
    google: "V86yYgZYa0b2uAqQxbhb9teevK2zoUKKHVYPdT3IZHo",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
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
        <AnalyticsProvider />
        {/* Termly consent banner + auto-blocker. `beforeInteractive` puts it in
            the server-rendered HTML ahead of every other script, which is what
            lets autoBlock hold gtag below until the visitor consents. */}
        <Script
          id="termly-resource-blocker"
          src="https://app.termly.io/resource-blocker/bcb72aea-8085-4411-86c7-033c05bb3a33?autoBlock=on"
          strategy="beforeInteractive"
        />
        {/* Google tag (gtag.js) — parity with nuxt.config.ts */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
