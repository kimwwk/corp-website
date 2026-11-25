/*
 * How to reach Kim: one source for the contact page, the booking page and
 * anywhere else that shows contact details.
 */
export const contact = {
  email: "hello@kivov.ca",
  phoneDisplay: "(647) 212-4563",
  phoneHref: "tel:+16472124563",
  whatsappHref: "https://wa.me/16472124563",
  city: "Toronto",
  reach: "Clients across Canada and the US",
  languages: "English, Cantonese, Mandarin",
  reply: "I reply within 1 business day.",
};

/* Where people can message Kim directly (profiles that take DMs). */
export const messageProfiles = [
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/kim-wong-wwk/" },
  { key: "x", label: "X", href: "https://x.com/kimwong_wwk" },
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591254942653",
  },
] as const;
