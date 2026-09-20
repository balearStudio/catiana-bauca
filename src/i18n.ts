import i18next, { type i18n } from "i18next";
import { initReactI18next } from "react-i18next";
import { defaultLanguage, type Language } from "./languages";

// Every `src/content/<lang>/<namespace>.json` file is loaded eagerly and
// synchronously (no i18next-http-backend, no lazy chunks) so that both the
// SSR render pass and the client hydration pass have resources available on
// the same tick. This is what makes `renderToString` produce real, final
// text instead of loading placeholders.
const modules = import.meta.glob<{ default: Record<string, unknown> }>(
  "./content/*/*.json",
  { eager: true },
);

type ResourceTree = Record<string, Record<string, Record<string, unknown>>>;

function buildResources(): ResourceTree {
  const resources: ResourceTree = {};
  const pattern = /\.\/content\/([^/]+)\/([^/]+)\.json$/;
  for (const path in modules) {
    const match = pattern.exec(path);
    if (!match) continue;
    const [, lang, namespace] = match;
    resources[lang] ??= {};
    resources[lang][namespace] = modules[path].default;
  }
  return resources;
}

const resources = buildResources();

export const namespaces = Array.from(
  new Set(Object.values(resources).flatMap((byNs) => Object.keys(byNs))),
);

/**
 * A fresh i18next instance per render. SSR renders one page per (lang, path)
 * combination and must never share mutable i18next state across them; the
 * client creates exactly one instance at boot.
 */
export function createI18n(lang: Language): i18n {
  const instance = i18next.createInstance();
  void instance.use(initReactI18next).init({
    lng: lang,
    fallbackLng: defaultLanguage,
    ns: namespaces,
    defaultNS: "common",
    resources,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    // Preloaded resources + no backend means init can complete on this
    // tick. Required for SSR: entry-server calls i18n.t() immediately
    // after createI18n() without awaiting a promise.
    initImmediate: false,
  });
  return instance;
}
