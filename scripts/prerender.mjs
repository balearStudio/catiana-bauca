// Post-build static-site generation. Runs after both Vite builds
// (`vite build --outDir dist` and `vite build --ssr src/entry-server.tsx
// --outDir dist-ssr`). Renders every (language, page) combination with
// react-dom/server and writes real, final HTML files into `dist/` — no
// headless browser, no extra SSG dependency. See docs/build-path.md Task 1.3
// for why this was chosen over vite-react-ssg or a Playwright prerender.
import { readFile, writeFile, rm, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const distDir = resolve(root, "dist");
const ssrDir = resolve(root, "dist-ssr");
const preview = process.env.PREVIEW === "true";
const ogImage = "/og-image.svg";

async function readClientSlug() {
  try {
    const raw = await readFile(resolve(root, ".studio/client.json"), "utf-8");
    const parsed = JSON.parse(raw);
    if (typeof parsed.slug === "string" && parsed.slug.length > 0) return parsed.slug;
  } catch {
    // No .studio/client.json: this is the raw template repo, not a client
    // repo created from it. Fall back to a placeholder origin.
  }
  return null;
}

async function main() {
  const slug = await readClientSlug();
  const siteOrigin = slug
    ? `https://${slug}.dev.balearstudio.com`
    : "https://example.dev.balearstudio.com";

  const { render, pages, languages, defaultLanguage } = await import(
    pathToFileURL(resolve(ssrDir, "entry-server.js")).href
  );

  const template = await readFile(resolve(distDir, "index.html"), "utf-8");

  const urls = [];

  for (const lang of languages) {
    for (const page of pages) {
      const { appHtml, headHtml } = render(lang, page, { siteOrigin, preview, ogImage });

      const html = template
        .replace('<html lang="en">', `<html lang="${lang}">`)
        .replace("<!--app-head-->", headHtml)
        .replace("<!--app-html-->", appHtml);

      const outDir =
        page.path === "" ? resolve(distDir, lang) : resolve(distDir, lang, page.path);
      await mkdir(outDir, { recursive: true });
      await writeFile(resolve(outDir, "index.html"), html, "utf-8");

      urls.push({ lang, page });
    }
  }

  await writeFile(resolve(distDir, "index.html"), rootRedirectHtml(defaultLanguage), "utf-8");
  await writeFile(resolve(distDir, "sitemap.xml"), sitemapXml(urls, siteOrigin, languages), "utf-8");
  await writeFile(resolve(distDir, "robots.txt"), robotsTxt(preview, siteOrigin), "utf-8");

  await rm(ssrDir, { recursive: true, force: true });

  console.log(
    `Prerendered ${urls.length} page(s) across ${languages.length} language(s). ` +
      `siteOrigin=${siteOrigin} preview=${preview}`,
  );
}

function rootRedirectHtml(defaultLanguage) {
  const target = `/${defaultLanguage}/`;
  return `<!doctype html>
<html lang="${defaultLanguage}">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="${target}" />
  </head>
  <body>
    <script>location.replace(${JSON.stringify(target)});</script>
    <p><a href="${target}">Continue</a></p>
  </body>
</html>
`;
}

function sitemapXml(urls, siteOrigin, languages) {
  const entries = urls
    .map(({ lang, page }) => {
      const path = page.path === "" ? "" : `/${page.path}`;
      const loc = `${siteOrigin}/${lang}${path}/`;
      const alternates = languages
        .map(
          (altLang) =>
            `\n    <xhtml:link rel="alternate" hreflang="${altLang}" href="${siteOrigin}/${altLang}${path}/" />`,
        )
        .join("");
      return `  <url>\n    <loc>${loc}</loc>${alternates}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
}

function robotsTxt(preview, siteOrigin) {
  if (preview) {
    return "User-agent: *\nDisallow: /\n";
  }
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
