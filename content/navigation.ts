import { resourcePath, resources } from "@/content/resources";
import { servicePath, services } from "@/content/services";
import { pathForUseCase, useCases } from "@/content/use-cases";

/*
 * Site navigation, built from content/ so a new page shows up in the header
 * dropdowns, the mobile sheet and the footer at once.
 * Header: Services ▾ · Use Cases ▾ · AI Packages · Resources · About · [Contact us].
 */
export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };
export type NavGroup = {
  label: string;
  href: string;
  /** The "All …" link to the overview page, last in the dropdown. */
  all: NavLink;
  items: NavItem[];
};

/* AI Consulting's ways to start sit under it in the Services menu. */
const serviceChildren: Partial<Record<string, NavLink[]>> = {
  "ai-consulting": [
    { label: "Fit Check", href: "/fit-check" },
    { label: "AI Workflow Audit", href: "/audit" },
  ],
};

export const servicesNav: NavGroup = {
  label: "Services",
  href: "/services",
  all: { label: "All services", href: "/services" },
  items: services.map((s) => ({
    label: s.name,
    href: servicePath(s.slug),
    children: serviceChildren[s.slug],
  })),
};

export const useCasesNav: NavGroup = {
  label: "Use Cases",
  href: "/use-cases",
  all: { label: "All use cases", href: "/use-cases" },
  items: useCases.map((u) => ({ label: u.name, href: pathForUseCase(u.slug) })),
};

export const menuGroups = [servicesNav, useCasesNav];

export const primaryLinks: NavLink[] = [
  { label: "AI Packages", href: "/ai-packages" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export const contactLink: NavLink = { label: "Contact us", href: "/contact" };

/* Footer: every page in the tree, plus Book a call. Legal links stay in the
   footer's bottom row. */
export type FooterLink = NavLink & { indent?: boolean };

function flatten(group: NavGroup): FooterLink[] {
  return [
    group.all,
    ...group.items.flatMap((item) => [
      { label: item.label, href: item.href },
      ...(item.children ?? []).map((c) => ({ ...c, indent: true })),
    ]),
  ];
}

export const footerGroups: { label: string; links: FooterLink[] }[] = [
  { label: servicesNav.label, links: flatten(servicesNav) },
  { label: useCasesNav.label, links: flatten(useCasesNav) },
  {
    label: "Resources",
    links: [
      { label: "All resources", href: "/resources" },
      ...resources.map((r) => ({ label: r.shortName, href: resourcePath(r.slug) })),
    ],
  },
  {
    label: "Company",
    links: [
      { label: "AI Packages", href: "/ai-packages" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Book a call", href: "/book" },
    ],
  },
];
