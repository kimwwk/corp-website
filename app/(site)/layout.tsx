import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { organization, person, website } from "@/lib/seo";

/* Standard site chrome. Legal pages live in (standalone) without it.
   The Organization / WebSite / Person JSON-LD graph rides along on every
   site page so search and AI engines always see the same entity. */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd graph={[organization, website, person]} />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
