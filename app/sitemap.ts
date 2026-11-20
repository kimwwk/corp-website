import type { MetadataRoute } from "next";
import { resourcePath, resources } from "@/content/resources";
import { servicePath, services } from "@/content/services";
import { pathForUseCase, useCases } from "@/content/use-cases";
import { absoluteUrl } from "@/lib/seo";

// Required for `output: "export"` — the sitemap is emitted at build time.
export const dynamic = "force-static";

/* Legal pages (/privacy, /cookies, /terms) are noindex — kept out, matching
   the Nuxt sitemap exclude list.

   URLs carry trailing slashes (`trailingSlash: true`): the non-slash form
   308-redirects, and sitemaps should list final URLs only.

   No `lastModified`: it used to be `new Date()`, stamping every page with the
   build time on every deploy. Google ignores lastmod once it proves
   inaccurate, so omitting it beats faking it. Add real per-page dates here
   when a page's content actually changes (e.g. once a blog exists). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/services",
    ...services.map((s) => servicePath(s.slug)),
    "/use-cases",
    ...useCases.map((u) => pathForUseCase(u.slug)),
    "/resources",
    ...resources.map((r) => resourcePath(r.slug)),
    "/ai-starters",
    "/fit-check",
    "/audit",
    "/about",
    "/book",
    "/contact",
  ].map((path) => ({ url: absoluteUrl(path) }));
}
