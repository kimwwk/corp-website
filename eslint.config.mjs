import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Wrangler (Cloudflare Pages local dev) scratch files
    ".wrangler/**",
    // Legacy Nuxt build artifacts and local design scratch (all git-ignored)
    ".nuxt/**",
    ".output/**",
    "dist/**",
    "prototypes/**",
    "n8n/**",
  ]),
]);

export default eslintConfig;
