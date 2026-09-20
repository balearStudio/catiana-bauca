import { languages, defaultLanguage, type Language } from "../languages";

const OG_LOCALE: Record<Language, string> = {
  es: "es_ES",
  en: "en_US",
};

export interface SeoInput {
  lang: Language;
  /** Route path relative to the language basename: "" or "/some-page". */
  path: string;
  title: string;
  description: string;
  /** Origin only, no trailing slash, e.g. "https://acme.dev.balearstudio.com". */
  siteOrigin: string;
  /** True on preview deploys: adds noindex and is read by robots.txt generation. */
  preview: boolean;
  /** Absolute-from-root path to a placeholder or client OG image. */
  ogImage: string;
}

export interface SeoTag {
  tag: "title" | "meta" | "link";
  attrs?: Record<string, string>;
  text?: string;
}

function urlFor(origin: string, lang: Language, path: string): string {
  const normalizedPath = path === "" ? "" : path.replace(/^\/?/, "/");
  return `${origin}/${lang}${normalizedPath}/`;
}

export function buildSeoTags(input: SeoInput): SeoTag[] {
  const { lang, path, title, description, siteOrigin, preview, ogImage } = input;
  const canonical = urlFor(siteOrigin, lang, path);

  const tags: SeoTag[] = [
    { tag: "title", text: title },
    { tag: "meta", attrs: { name: "description", content: description } },
    { tag: "link", attrs: { rel: "canonical", href: canonical } },
    ...languages.map((altLang) => ({
      tag: "link" as const,
      attrs: {
        rel: "alternate",
        hreflang: altLang,
        href: urlFor(siteOrigin, altLang, path),
      },
    })),
    {
      tag: "link",
      attrs: {
        rel: "alternate",
        hreflang: "x-default",
        href: urlFor(siteOrigin, defaultLanguage, path),
      },
    },
    { tag: "meta", attrs: { property: "og:type", content: "website" } },
    { tag: "meta", attrs: { property: "og:title", content: title } },
    { tag: "meta", attrs: { property: "og:description", content: description } },
    { tag: "meta", attrs: { property: "og:url", content: canonical } },
    { tag: "meta", attrs: { property: "og:locale", content: OG_LOCALE[lang] } },
    { tag: "meta", attrs: { property: "og:image", content: `${siteOrigin}${ogImage}` } },
    { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
  ];

  if (preview) {
    tags.push({ tag: "meta", attrs: { name: "robots", content: "noindex, nofollow" } });
  }

  return tags;
}

export function renderTagsToHtml(tags: SeoTag[]): string {
  return tags
    .map((tag) => {
      if (tag.tag === "title") return `<title>${escapeHtml(tag.text ?? "")}</title>`;
      const attrs = Object.entries(tag.attrs ?? {})
        .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
        .join(" ");
      return `<${tag.tag} ${attrs}>`;
    })
    .join("\n    ");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
