"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

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
import { MonoLabel } from "@/components/sections/mono-label";
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
 */

/* Desktop nav from lg: six items plus the button don't fit a 768px header,
   so tablets get the sheet. Top-level link and trigger share one recipe. */
const topItem =
  "px-3 py-2 font-medium underline-offset-[6px] hover:underline hover:decoration-primary hover:decoration-2";
const topItemIdle = "text-muted-foreground hover:text-foreground";
const topItemActive = "text-foreground underline decoration-primary decoration-2";

/* Mobile sheet row: ≥44px tall for touch. */
const sheetRow = "rounded-lg px-3 py-3 text-sm font-medium transition-colors";
const sheetRowIdle = "text-muted-foreground hover:bg-muted hover:text-foreground";
const sheetRowActive = "bg-muted text-foreground";

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
  const inGroup = (group: NavGroup) =>
    currentPath === group.href || currentPath.startsWith(`${group.href}/`);
  // Every link inside the sheet closes it via onClick, so no
  // route-change effect is needed.
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const sheetLink = (href: string, label: string, child = false) => (
    <Link
      key={href}
      href={href}
      aria-current={isActive(href) ? "page" : undefined}
      onClick={() => setMobileOpen(false)}
      className={cn(
        sheetRow,
        child && "pl-7",
        isActive(href) ? sheetRowActive : sheetRowIdle,
      )}
    >
      {label}
    </Link>
  );

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
                        inGroup(group) ? topItemActive : topItemIdle,
                      )}
                    >
                      {group.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-72 p-2">
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
                        isActive(link.href) ? topItemActive : topItemIdle,
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
              {/* pt-14 clears the absolutely-positioned close button (top-3, 28px). */}
              <nav
                aria-label="Mobile navigation"
                className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-14 pb-8"
              >
                {menuGroups.map((group) => (
                  <div key={group.label} className="mb-4 flex flex-col">
                    <MonoLabel tone="caption" className="px-3 pb-1">
                      {group.label}
                    </MonoLabel>
                    {group.items.map((item) => (
                      <React.Fragment key={item.href}>
                        {sheetLink(item.href, item.label)}
                        {item.children?.map((c) => sheetLink(c.href, c.label, true))}
                      </React.Fragment>
                    ))}
                    {sheetLink(group.all.href, group.all.label)}
                  </div>
                ))}
                <div className="flex flex-col border-t border-border pt-4">
                  {primaryLinks.map((link) => sheetLink(link.href, link.label))}
                </div>
                <Button
                  size="xl"
                  className="mt-4 w-full shrink-0 rounded-full"
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
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
