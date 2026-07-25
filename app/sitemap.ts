import type { MetadataRoute } from "next";

// Required for `output: "export"` — the sitemap is emitted at build time.
export const dynamic = "force-static";

const SITE_URL = "https://kivov.work";

/* Legal pages (/privacy, /cookies, /terms) are noindex — kept out, matching
   the Nuxt sitemap exclude list. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services", "/about", "/book", "/contact", "/showcase"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
    }),
  );
}
