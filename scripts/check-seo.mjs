#!/usr/bin/env node
/*
 * SEO check over the built site. Run after `npm run build`:
 *
 *   node scripts/check-seo.mjs [outDir]     (default: out)
 *
 * For every page in the site-restructure spec table it reads
 * `<outDir>/<route>/index.html` and checks:
 *   - exactly one <h1>;
 *   - <title> contains every word of the page's primary keyword (word-level,
 *     case-insensitive; pages with no keyword are skipped);
 *   - a meta description, at most 160 characters;
 *   - a canonical link equal to SITE_URL + route (skipped on noindex pages:
 *     Thanks and the legal pages are kept out of the index, so a canonical
 *     has no job there);
 *   - every JSON-LD block parses as JSON;
 *   - no internal <a href> points at a route that is missing from outDir.
 * It also fails if "TODO(copy)" appears in any built HTML file, llms.txt or
 * sitemap.xml.
 *
 * Prints a table and exits 1 on any failure. No dependencies: string parsing
 * of Next's static HTML only.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const OUT = resolve(process.argv[2] ?? "out");
const SITE_URL = "https://kivov.ca";
const MAX_DESCRIPTION = 160;
const TODO = "TODO(copy)";

/* The spec table: route → the keyword its title must contain (null = none). */
const PAGES = [
  ["/", null],
  ["/services/", null],
  ["/services/ai-consulting/", "ai consultant toronto"],
  ["/services/website-management/", "website maintenance"],
  ["/services/ai-automation/", "ai automation agency"],
  ["/services/app-development/", "app development toronto"],
  ["/use-cases/", null],
  ["/use-cases/wordpress-support/", "wordpress support toronto"],
  ["/use-cases/local-seo/", "local seo toronto"],
  ["/use-cases/law-firm-seo/", "law firm seo"],
  ["/use-cases/invoice-automation/", "invoice automation"],
  ["/use-cases/missed-call-text-back/", "missed call text back"],
  ["/use-cases/ai-receptionist/", "ai receptionist for small business"],
  ["/use-cases/ai-follow-up-emails/", null],
  ["/resources/", null],
  ["/resources/generative-engine-optimization/", "generative engine optimization"],
  ["/resources/ai-automation/", "ai automation"],
  ["/resources/wordpress-seo/", "wordpress seo"],
  ["/ai-packages/", null],
  ["/about/", null],
  ["/contact/", null],
  ["/fit-check/", null],
  ["/audit/", null],
  ["/book/", null],
  ["/thanks/", null],
  ["/privacy/", null],
  ["/terms/", null],
  ["/cookies/", null],
];

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decode(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
    if (code[0] === "#") {
      const n = code[1] === "x" || code[1] === "X" ? parseInt(code.slice(2), 16) : Number(code.slice(1));
      return String.fromCodePoint(n);
    }
    return ENTITIES[code.toLowerCase()] ?? match;
  });
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"));
  return m ? decode(m[1]) : null;
}

function words(text) {
  return text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

/* Does `target` (an internal path, query and hash removed) exist in OUT? */
function existsInOut(target) {
  const clean = decodeURIComponent(target);
  if (clean === "/" || clean === "") return existsSync(join(OUT, "index.html"));
  const rel = clean.replace(/^\//, "");
  if (clean.endsWith("/")) return existsSync(join(OUT, rel, "index.html"));
  const file = join(OUT, rel);
  if (existsSync(file) && statSync(file).isFile()) return true;
  return existsSync(join(OUT, rel, "index.html"));
}

function internalPath(href) {
  if (!href || href.startsWith("#")) return null;
  let path;
  if (href.startsWith(SITE_URL)) path = href.slice(SITE_URL.length) || "/";
  else if (href.startsWith("/") && !href.startsWith("//")) path = href;
  else return null; // external, mailto:, tel:, relative
  return path.split("#")[0].split("?")[0] || "/";
}

function checkPage(route, keyword) {
  const file = join(OUT, route.replace(/^\//, ""), "index.html");
  const row = { route, problems: [] };
  if (!existsSync(file)) {
    row.problems.push(`missing ${file}`);
    return { ...row, h1: "-", title: "-", desc: "-", canonical: "-", jsonld: "-", links: "-" };
  }
  const html = readFileSync(file, "utf8");

  // JSON-LD first, then drop every <script> (the RSC payload) and inline <svg>
  // (icon <title>s) so counts only see rendered markup.
  const ldBlocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  let ldBad = 0;
  for (const block of ldBlocks) {
    try {
      JSON.parse(block);
    } catch (err) {
      ldBad++;
      row.problems.push(`JSON-LD does not parse: ${err.message}`);
    }
  }
  const markup = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "");

  // h1
  const h1s = (markup.match(/<h1[\s>]/gi) ?? []).length;
  if (h1s !== 1) row.problems.push(`${h1s} <h1> elements (want 1)`);

  // title
  const titleMatch = markup.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decode(titleMatch[1]).trim() : "";
  let titleCell = "-";
  if (!title) {
    row.problems.push("no <title>");
    titleCell = "missing";
  } else if (keyword) {
    const have = new Set(words(title));
    const missing = words(keyword).filter((w) => !have.has(w));
    titleCell = missing.length ? `missing: ${missing.join(" ")}` : "ok";
    if (missing.length) row.problems.push(`title "${title}" lacks "${missing.join(" ")}" from "${keyword}"`);
  } else {
    titleCell = "no keyword";
  }

  // meta description
  const metaTags = markup.match(/<meta\s[^>]*>/gi) ?? [];
  const descTag = metaTags.find((t) => attr(t, "name") === "description");
  const desc = descTag ? attr(descTag, "content") ?? "" : null;
  let descCell;
  if (desc == null || desc.trim() === "") {
    descCell = "missing";
    row.problems.push("no meta description");
  } else {
    const len = [...desc].length;
    descCell = String(len);
    if (len > MAX_DESCRIPTION) row.problems.push(`meta description is ${len} chars (max ${MAX_DESCRIPTION})`);
  }

  // canonical (noindex pages are exempt)
  const robotsTag = metaTags.find((t) => attr(t, "name") === "robots");
  const noindex = /noindex/i.test(robotsTag ? attr(robotsTag, "content") ?? "" : "");
  const linkTags = markup.match(/<link\s[^>]*>/gi) ?? [];
  const canonTag = linkTags.find((t) => attr(t, "rel") === "canonical");
  const canonical = canonTag ? attr(canonTag, "href") : null;
  const wantCanonical = SITE_URL + route;
  let canonCell = "ok";
  if (!canonical && noindex) {
    canonCell = "noindex, skip";
  } else if (!canonical) {
    canonCell = "missing";
    row.problems.push("no canonical link");
  } else if (canonical !== wantCanonical) {
    canonCell = "wrong";
    row.problems.push(`canonical ${canonical} (want ${wantCanonical})`);
  }

  // internal links
  const hrefs = [...markup.matchAll(/<a\s[^>]*>/gi)].map((m) => attr(m[0], "href"));
  const internal = [...new Set(hrefs.map(internalPath).filter(Boolean))];
  const broken = internal.filter((p) => !existsInOut(p));
  for (const p of broken) row.problems.push(`internal link to missing route ${p}`);

  return {
    ...row,
    h1: String(h1s),
    title: titleCell,
    desc: descCell,
    canonical: canonCell,
    jsonld: ldBad ? `${ldBad}/${ldBlocks.length} bad` : `${ldBlocks.length} ok`,
    links: broken.length ? `${broken.length} broken / ${internal.length}` : `${internal.length} ok`,
  };
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

if (!existsSync(OUT)) {
  console.error(`No build output at ${OUT}. Run \`npm run build\` first.`);
  process.exit(2);
}

const rows = PAGES.map(([route, keyword]) => checkPage(route, keyword));

const columns = [
  ["Route", "route"],
  ["h1", "h1"],
  ["Title keyword", "title"],
  ["Desc len", "desc"],
  ["Canonical", "canonical"],
  ["JSON-LD", "jsonld"],
  ["Internal links", "links"],
  ["Result", "result"],
];
for (const r of rows) r.result = r.problems.length ? "FAIL" : "pass";
const widths = columns.map(([head, key]) => Math.max(head.length, ...rows.map((r) => String(r[key]).length)));
const line = (cells) => `| ${cells.map((c, i) => String(c).padEnd(widths[i])).join(" | ")} |`;
console.log(line(columns.map(([head]) => head)));
console.log(`|${widths.map((w) => "-".repeat(w + 2)).join("|")}|`);
for (const r of rows) console.log(line(columns.map(([, key]) => r[key])));

// TODO(copy) markers anywhere in the built HTML, llms.txt or sitemap.xml.
const todoFiles = [
  ...walk(OUT).filter((p) => p.endsWith(".html")),
  join(OUT, "llms.txt"),
  join(OUT, "sitemap.xml"),
].filter((p) => existsSync(p) && readFileSync(p, "utf8").includes(TODO));

const failed = rows.filter((r) => r.problems.length);
console.log("");
if (failed.length) {
  console.log("Failures:");
  for (const r of failed) for (const p of r.problems) console.log(`  ${r.route}: ${p}`);
}
console.log(
  todoFiles.length
    ? `${TODO} found in ${todoFiles.length} file(s):\n${todoFiles.map((p) => `  ${p.slice(OUT.length + 1)}`).join("\n")}`
    : `${TODO}: none in out/**/*.html, llms.txt, sitemap.xml`,
);
console.log(`\n${rows.length - failed.length}/${rows.length} pages pass.`);

process.exit(failed.length || todoFiles.length ? 1 : 0);
