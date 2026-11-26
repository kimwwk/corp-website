import Image from "next/image";
import { Mail, Phone } from "lucide-react";

import { contact } from "@/content/contact";
import { LinkedInIcon, WhatsAppIcon } from "@/components/social-icons";
import { TrackedExternalLink } from "@/components/tracked-link";
import { cn } from "@/lib/utils";

/* Kim, named and pictured: who reads the message. `detail` adds a quiet
   caption line (who she works with, languages) under the role; `linkedin`
   puts her LinkedIn mark beside her name, where buyers go to check who she
   is (the site footer keeps X and Facebook). */
export function KimCard({
  className,
  detail = false,
  linkedin,
}: {
  className?: string;
  detail?: boolean;
  /* source_page for the LinkedIn click event; omit for no LinkedIn mark. */
  linkedin?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Image
        src="/kim-avatar.jpg"
        alt="Kim Wong"
        width={320}
        height={320}
        className="size-14 shrink-0 rounded-full object-cover ring-1 ring-border"
      />
      <div>
        <p className="flex items-center font-medium text-foreground">
          Kim Wong
          {linkedin ? (
            <TrackedExternalLink
              href={contact.linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kim Wong on LinkedIn"
              event="contact_channel_clicked"
              eventProps={{ source_page: linkedin, channel: "linkedin" }}
              ga={{
                event: "contact_click",
                params: { method: "linkedin", source_page: linkedin, cta_location: "name" },
              }}
              className="-my-3 -ml-1 flex size-11 items-center justify-center rounded-full text-primary transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <LinkedInIcon className="size-5" />
            </TrackedExternalLink>
          ) : null}
        </p>
        <p className="text-sm text-muted-foreground">
          Founder, Kivov Digital · {contact.city}
        </p>
        {detail ? (
          <p className="mt-0.5 text-xs text-caption">
            <span className="whitespace-nowrap">{contact.reach}</span>
            {" · "}
            <span className="whitespace-nowrap">{contact.languages}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* Three one-tap tiles: WhatsApp, call, email. */
export function ChannelTiles({ sourcePage }: { sourcePage: string }) {
  const tiles = [
    {
      key: "whatsapp",
      label: "WhatsApp",
      value: contact.phoneDisplay,
      href: contact.whatsappHref,
      icon: <WhatsAppIcon className="size-5" />,
      external: true,
    },
    {
      key: "phone",
      label: "Call or text",
      value: contact.phoneDisplay,
      href: contact.phoneHref,
      icon: <Phone className="size-5" strokeWidth={1.6} />,
      external: false,
    },
    {
      key: "email",
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: <Mail className="size-5" strokeWidth={1.6} />,
      external: false,
    },
  ];
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {tiles.map((t) => (
        <li key={t.key}>
          <TrackedExternalLink
            href={t.href}
            {...(t.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            event="contact_channel_clicked"
            eventProps={{ source_page: sourcePage, channel: t.key }}
            ga={{
              event: "contact_click",
              params: { method: t.key, source_page: sourcePage, cta_location: "tiles" },
            }}
            className="group flex min-h-11 items-center gap-3 rounded-xl bg-card px-4 py-3.5 ring-1 ring-border transition-all duration-200 outline-none hover:ring-primary/50 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"
              aria-hidden="true"
            >
              {t.icon}
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-xs font-medium tracking-[0.14em] text-caption uppercase">
                {t.label}
              </span>
              <span className="block truncate text-sm font-medium text-foreground group-hover:text-primary">
                {t.value}
              </span>
            </span>
          </TrackedExternalLink>
        </li>
      ))}
    </ul>
  );
}
