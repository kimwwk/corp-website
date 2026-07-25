import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — deployed as a plain asset directory on Cloudflare Pages,
  // same shape as the Nuxt site's .output/public.
  output: "export",
  // Emit pages as directory/index.html (same shape as the Nuxt static
  // build). Critical for the legal pages: without it, the exported /cookies
  // and /privacy routes overwrite the Termly public/cookies.html and
  // public/privacy.html files their iframes point at.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Pin the workspace root so Turbopack never walks up past the repo.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
