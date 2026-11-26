import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

import { ChannelTiles, KimCard } from "@/components/contact/contact-channels";
import { ContactTabs } from "@/components/contact/contact-tabs";
import { Band } from "@/components/sections";

export const metadata: Metadata = pageMetadata({
  title: "Contact | Kivov Digital",
  description:
    "WhatsApp, call or email Kim Wong in Toronto, send a message, or book a free 30-minute call. I reply within 1 business day.",
  path: "/contact",
});

/*
 * Contact (2026-11-25, picked by Kim and six client personas): the green band
 * carries who and the direct lines (Kim, WhatsApp, call or text, email, DMs);
 * below it, one switch between the message form and the Cal.com calendar.
 * The band's bottom padding is trimmed on phones so the switch starts close
 * to the first screen; the cream column is B's width (max-w-4xl), left-aligned
 * with the band's content.
 */
export default function ContactPage() {
  return (
    <>
      <Band hero="page" eyebrow="Contact" title="Let’s talk." depth="top-right" className="pb-12">
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-xl text-lg leading-relaxed">
            WhatsApp me, book a call, or send a message. I read and answer
            everything myself.
          </p>
          <KimCard className="shrink-0" detail linkedin="contact" />
        </div>
        <div className="mt-8 md:mt-10">
          <ChannelTiles sourcePage="contact" />
        </div>
      </Band>
      <section className="px-6 pt-8 pb-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <ContactTabs />
          </div>
        </div>
      </section>
    </>
  );
}
