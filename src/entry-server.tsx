import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { App } from "./App";
import { createI18n } from "./i18n";
import { SiteConfigProvider, type SiteConfig } from "./config/SiteConfig";
import { buildSeoTags, renderTagsToHtml } from "./lib/seo";
import type { Language } from "./languages";
import type { PageDef } from "./pages";

// Re-exported so scripts/prerender.mjs (a plain Node script, not part of the
// React module graph) has one source of truth for which URLs to generate.
export { pages } from "./pages";
export { languages, defaultLanguage } from "./languages";

export interface RenderOptions {
  siteOrigin: string;
  preview: boolean;
  ogImage: string;
}

export interface RenderResult {
  appHtml: string;
  headHtml: string;
}

export function render(lang: Language, page: PageDef, options: RenderOptions): RenderResult {
  const i18n = createI18n(lang);
  const title = i18n.t(`${page.key}:meta.title`);
  const description = i18n.t(`${page.key}:meta.description`);

  const siteConfig: SiteConfig = {
    lang,
    siteOrigin: options.siteOrigin,
    preview: options.preview,
    ogImage: options.ogImage,
  };

  const seoTags = buildSeoTags({
    lang,
    path: page.path,
    title,
    description,
    siteOrigin: options.siteOrigin,
    preview: options.preview,
    ogImage: options.ogImage,
  });

  // Hands the client the exact config the server rendered with, so
  // hydration never has to re-derive (and can't drift from) siteOrigin/preview.
  const configScript = `<script id="__SITE_CONFIG__" type="application/json">${JSON.stringify(
    siteConfig,
  ).replace(/</g, "\\u003c")}</script>`;

  // StaticRouter (like BrowserRouter) expects the *full* URL including the
  // basename — it strips basename internally before matching <Route path>.
  const routerPath = page.path === "" ? `/${lang}/` : `/${lang}/${page.path}`;

  const appHtml = renderToString(
    <StaticRouter location={routerPath} basename={`/${lang}`}>
      <I18nextProvider i18n={i18n}>
        <SiteConfigProvider value={siteConfig}>
          <App />
        </SiteConfigProvider>
      </I18nextProvider>
    </StaticRouter>,
  );

  return {
    appHtml,
    headHtml: `${renderTagsToHtml(seoTags)}\n    ${configScript}`,
  };
}
