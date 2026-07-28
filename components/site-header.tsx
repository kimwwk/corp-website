"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "AI Audit", href: "/audit" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  // Every link inside the sheet closes it via onClick, so no
  // route-change effect is needed.
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
          <div className="hidden items-center gap-4 md:flex">
            <NavigationMenu aria-label="Main navigation">
              <NavigationMenuList className="gap-1">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink
                      render={<Link href={link.href} />}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className={cn(
                        "px-3 py-2 font-medium underline-offset-[6px] hover:underline hover:decoration-primary hover:decoration-2",
                        pathname === link.href
                          ? "text-foreground underline decoration-primary decoration-2"
                          : "text-muted-foreground hover:text-foreground",
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
              render={<Link href="/fit-check" />}
              aria-current={pathname === "/fit-check" ? "page" : undefined}
            >
              Free Fit Check
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          </div>

          {/* Mobile nav — shadcn Sheet */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Toggle navigation menu"
                />
              }
            >
              <Menu aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <Image
                  src="/kivov-wordmark.png"
                  alt="Kivov Digital"
                  width={120}
                  height={50}
                  className="h-6 w-auto"
                />
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  size="xl"
                  className="mt-3 w-full rounded-full"
                  render={<Link href="/fit-check" />}
                  aria-current={pathname === "/fit-check" ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  Free Fit Check
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
