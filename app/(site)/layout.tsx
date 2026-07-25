import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/* Standard site chrome. Legal pages live in (standalone) without it. */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
