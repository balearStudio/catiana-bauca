import { useLayoutEffect } from "react";
import { buildSeoTags } from "../lib/seo";
import { useSiteConfig } from "../config/SiteConfig";

const MANAGED_ATTR = "data-seo-managed";

interface SeoProps {
  path: string;
  title: string;
  description: string;
}

/**
 * Applies the exact same tags the SSR pass baked into the static HTML.
 * On first client render this is a no-op (the tags already match); it only
 * does real work on client-side navigation between pages after hydration.
 */
export function Seo({ path, title, description }: SeoProps) {
  const { lang, siteOrigin, preview, ogImage } = useSiteConfig();

  useLayoutEffect(() => {
    const tags = buildSeoTags({ lang, path, title, description, siteOrigin, preview, ogImage });

    document.querySelectorAll(`[${MANAGED_ATTR}]`).forEach((node) => node.remove());

    for (const tag of tags) {
      if (tag.tag === "title") {
        document.title = tag.text ?? "";
        continue;
      }
      const el = document.createElement(tag.tag);
      el.setAttribute(MANAGED_ATTR, "true");
      for (const [key, value] of Object.entries(tag.attrs ?? {})) {
        el.setAttribute(key, value);
      }
      document.head.appendChild(el);
    }
  }, [lang, path, title, description, siteOrigin, preview, ogImage]);

  return null;
}
