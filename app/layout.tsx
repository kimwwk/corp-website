import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/components/analytics-provider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const GA_ID = "G-9VVXS7BY20";

export const metadata: Metadata = {
  metadataBase: new URL("https://kivov.work"),
  title: "Kivov Digital — Free AI Tools Assessment for Small Business",
  description:
    "Reclaim 5–10 hours a week with AI tools that fit how you already work. Book a free AI assessment — a 45-minute call, a written report of practical quick wins, no obligation.",
  verification: {
    google: "V86yYgZYa0b2uAqQxbhb9teevK2zoUKKHVYPdT3IZHo",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Kivov Digital — Free AI Tools Assessment for Small Business",
    description:
      "Reclaim 5–10 hours a week with AI tools that fit how you already work. Book a free AI assessment — a 45-minute call, a written report of practical quick wins, no obligation.",
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
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <AnalyticsProvider />
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
