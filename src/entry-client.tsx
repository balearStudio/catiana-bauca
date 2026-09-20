import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { App } from "./App";
import { createI18n } from "./i18n";
import { SiteConfigProvider, type SiteConfig } from "./config/SiteConfig";
import { isLanguage, defaultLanguage } from "./languages";
import "./styles/global.css";

function readSiteConfig(): SiteConfig {
  const el = document.getElementById("__SITE_CONFIG__");
  if (el?.textContent) {
    return JSON.parse(el.textContent) as SiteConfig;
  }
  // `vite dev` serves the raw index.html with no SSR pass, so there is no
  // config script to read yet. Infer enough to render during development.
  const segment = window.location.pathname.split("/")[1] ?? "";
  const lang = isLanguage(segment) ? segment : defaultLanguage;
  return {
    lang,
    siteOrigin: window.location.origin,
    preview: true,
    ogImage: "/og-image.svg",
  };
}

const siteConfig = readSiteConfig();
const i18n = createI18n(siteConfig.lang);

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <BrowserRouter basename={`/${siteConfig.lang}`}>
      <I18nextProvider i18n={i18n}>
        <SiteConfigProvider value={siteConfig}>
          <App />
        </SiteConfigProvider>
      </I18nextProvider>
    </BrowserRouter>
  </StrictMode>,
);
