import Image from "next/image";
import { Mail, Phone } from "lucide-react";

import { contact, messageProfiles } from "@/content/contact";
import {
  FacebookIcon,
  LinkedInIcon,
  WhatsAppIcon,
  XIcon,
} from "@/components/social-icons";
import { TrackedExternalLink } from "@/components/tracked-link";
import { cn } from "@/lib/utils";

const profileIcons = { linkedin: LinkedInIcon, x: XIcon, facebook: FacebookIcon };

/* Kim, named and pictured: who reads the message. `detail` adds a quiet
   caption line (who she works with, languages) under the role. */
export function KimCard({
  className,
  detail = false,
}: {
  className?: string;
  detail?: boolean;
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
        <p className="font-medium text-foreground">Kim Wong</p>
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

/* "Or message me on" + the profiles that take DMs. */
export function MessageProfiles({
  sourcePage,
  className,
}: {
  sourcePage: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-2 gap-y-1", className)}>
      <p className="mr-1 text-sm text-muted-foreground">Or message me on</p>
      {messageProfiles.map((p) => {
        const Icon = profileIcons[p.key];
        return (
          <TrackedExternalLink
            key={p.key}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Message Kim on ${p.label}`}
            event="contact_channel_clicked"
            eventProps={{ source_page: sourcePage, channel: p.key }}
            className="flex size-11 items-center justify-center rounded-full text-caption transition-colors hover:text-primary"
          >
            <Icon className="size-5" />
          </TrackedExternalLink>
        );
      })}
    </div>
  );
}
