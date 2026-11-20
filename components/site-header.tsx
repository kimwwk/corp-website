"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronDown, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TrackedLink } from "@/components/tracked-link";
import {
  contactLink,
  menuGroups,
  primaryLinks,
  type NavGroup,
} from "@/content/navigation";

/*
 * Header: Services ▾ · Use Cases ▾ · AI Packages · Resources · About ·
 * [Contact us]. The two dropdowns and the mobile sheet are built from
 * content/navigation.ts. Contact us is the one highlighted button.
 *
 * The dropdown contents are kept mounted, so their links are in the static
 * HTML. The mobile sheet's links are not: Base UI portals render only on the
 * client. The desktop dropdowns (in the HTML at every width) cover them.
 *
 * Mobile sheet: Contact us first, then the five top-level rows. Services and
 * Use Cases are collapsible groups, closed each time the sheet opens, so the
 * button and every top-level link fit the first screen of a small phone.
 */

/* Desktop nav from lg: six items plus the button don't fit a 768px header,
   so tablets get the sheet. Top-level link and trigger share one recipe, and
   every top-level item is active anywhere in its section (Resources on a
   post, Services on a service page). */
const topItem =
  "px-3 py-2 font-medium underline-offset-[6px] hover:underline hover:decoration-primary hover:decoration-2";
const topItemIdle = "text-muted-foreground hover:text-foreground";
const topItemActive = "text-foreground underline decoration-primary decoration-2";

/* Mobile sheet row: ≥44px tall for touch. The current page's row takes the
   muted wash. A top-level row (group trigger or link) in the current section
   takes ink text and the desktop's active underline on its label. */
const sheetRow = "rounded-lg px-3 py-3 text-sm font-medium transition-colors";
const sheetRowIdle = "text-muted-foreground hover:bg-muted hover:text-foreground";
const sheetRowActive = "bg-muted text-foreground";
const sheetRowSection = "text-foreground hover:bg-muted";
const sheetSectionMark =
  "underline decoration-primary decoration-2 underline-offset-[6px]";

/* A sheet group (Services, Use Cases): a disclosure row that opens the
   group's pages, indented beneath it, with the "All …" link last. Base UI's
   Collapsible gives the trigger aria-expanded / aria-controls; the panel
   eases its height on the system curve. px-1/-mx-1 keeps focus rings clear
   of the panel's overflow clip. */
function SheetGroup({
  group,
  active,
  link,
}: {
  group: NavGroup;
  active: boolean;
  link: (href: string, label: string, indent?: 1 | 2) => React.ReactNode;
}) {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger
        className={cn(
          sheetRow,
          "group flex w-full items-center justify-between gap-4 text-left",
          active ? sheetRowSection : sheetRowIdle,
        )}
      >
        <span className={cn(active && sheetSectionMark)}>{group.label}</span>
        <ChevronDown
          className="size-4 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-data-panel-open:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </Collapsible.Trigger>
      <Collapsible.Panel className="-mx-1 h-(--collapsible-panel-height) overflow-hidden px-1 transition-[height] duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none">
        <div className="flex flex-col pb-2">
          {group.items.map((item) => (
            <React.Fragment key={item.href}>
              {link(item.href, item.label, 1)}
              {item.children?.map((c) => link(c.href, c.label, 2))}
            </React.Fragment>
          ))}
          {link(group.all.href, group.all.label, 1)}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

function DropdownPanel({
  group,
  isActive,
}: {
  group: NavGroup;
  isActive: (href: string) => boolean;
}) {
  const link = (href: string, label: string, child = false) => (
    <NavigationMenuLink
      closeOnClick
      render={<Link href={href} />}
      aria-current={isActive(href) ? "page" : undefined}
      className={cn(
        "rounded-md px-3 py-2",
        child
          ? "pl-6 text-muted-foreground hover:text-foreground"
          : "font-medium text-foreground",
        isActive(href) && "bg-muted",
      )}
    >
      {label}
    </NavigationMenuLink>
  );
  return (
    <ul className="flex flex-col">
      {group.items.map((item) => (
        <li key={item.href}>
          {link(item.href, item.label)}
          {item.children?.length ? (
            <ul className="flex flex-col">
              {item.children.map((c) => (
                <li key={c.href}>{link(c.href, c.label, true)}</li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
      <li className="mt-1 border-t border-border pt-1">
        {link(group.all.href, group.all.label)}
      </li>
    </ul>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  // trailingSlash is on (static export), so the pathname is "/services/"
  // while nav hrefs are "/services" — strip it before comparing.
  const currentPath = pathname.replace(/\/+$/, "") || "/";
  const isActive = (href: string) => currentPath === href;
  // A top-level item's section: its own page and every page under it.
  const inSection = (href: string) =>
    currentPath === href || currentPath.startsWith(`${href}/`);
  // Every link inside the sheet closes it via onClick, so no
  // route-change effect is needed.
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Rows inside a group are indented; a top-level row (no indent) also
  // marks its section.
  const sheetLink = (href: string, label: string, indent?: 1 | 2) => {
    const section = !indent && inSection(href);
    return (
      <Link
        key={href}
        href={href}
        aria-current={isActive(href) ? "page" : undefined}
        onClick={() => setMobileOpen(false)}
        className={cn(
          sheetRow,
          indent === 1 && "pl-7",
          indent === 2 && "pl-11",
          isActive(href)
            ? sheetRowActive
            : section
              ? sheetRowSection
              : sheetRowIdle,
        )}
      >
        {section ? <span className={sheetSectionMark}>{label}</span> : label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / wordmark */}
          <Link
            href="/"
            className="flex items-center rounded-sm"
            aria-label="Kivov Digital — Home"
          >
            <Image
              src="/kivov-wordmark.png"
              alt="Kivov Digital"
              width={170}
              height={71}
              priority
              className="h-8 w-auto md:h-9"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-4 lg:flex">
            <NavigationMenu aria-label="Main navigation">
              <NavigationMenuList className="gap-1">
                {menuGroups.map((group) => (
                  <NavigationMenuItem key={group.label} value={group.href}>
                    <NavigationMenuTrigger
                      className={cn(
                        topItem,
                        "h-auto",
                        inSection(group.href) ? topItemActive : topItemIdle,
                      )}
                    >
                      {group.label}
                    </NavigationMenuTrigger>
                    {/* keepMounted: the dropdown links ship in the server HTML
                        (hidden until opened), so crawlers see the header's links. */}
                    <NavigationMenuContent keepMounted className="w-72 p-2">
                      <DropdownPanel group={group} isActive={isActive} />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
                {primaryLinks.map((link) => (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink
                      render={<Link href={link.href} />}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        topItem,
                        inSection(link.href) ? topItemActive : topItemIdle,
                      )}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Button
              size="lg"
              className="rounded-full px-5 font-semibold"
              render={
                <TrackedLink
                  href={contactLink.href}
                  event="contact_cta_clicked"
                  eventProps={{ cta_location: "header" }}
                />
              }
              aria-current={isActive(contactLink.href) ? "page" : undefined}
            >
              {contactLink.label}
            </Button>
          </div>

          {/* Mobile nav — shadcn Sheet */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Toggle navigation menu"
                />
              }
            >
              <Menu aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              {/* mt-12 starts the scroll area below the absolutely-positioned close
                  button (top-3, 28px), so rows never scroll under it; pt-2 leaves
                  room for the pill's focus ring. */}
              <nav
                aria-label="Mobile navigation"
                className="mt-12 flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-2 pb-8"
              >
                <Button
                  size="xl"
                  className="w-full shrink-0 rounded-full"
                  render={
                    <TrackedLink
                      href={contactLink.href}
                      event="contact_cta_clicked"
                      eventProps={{ cta_location: "mobile_menu" }}
                    />
                  }
                  aria-current={isActive(contactLink.href) ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  {contactLink.label}
                </Button>
                <div className="mt-6 flex flex-col">
                  {menuGroups.map((group) => (
                    <SheetGroup
                      key={group.label}
                      group={group}
                      active={inSection(group.href)}
                      link={sheetLink}
                    />
                  ))}
                  {primaryLinks.map((link) => sheetLink(link.href, link.label))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
