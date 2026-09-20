import { businessJsonLd } from "../lib/business";
import { useSiteConfig } from "../config/SiteConfig";

/**
 * schema.org JSON-LD for the business.
 *
 * Rendered inside the React tree rather than injected into `<head>` by
 * `Seo.tsx`, for one reason: `Seo` does its work in `useLayoutEffect`, which
 * never runs during `renderToString`, so anything it adds is missing from the
 * prerendered HTML — exactly where a crawler looks. JSON-LD in the body is
 * valid and is what search engines read.
 */
export function StructuredData() {
  const { lang, siteOrigin } = useSiteConfig();
  const json = JSON.stringify(businessJsonLd(siteOrigin, lang));

  return (
    <script
      type="application/ld+json"
      // The payload is our own object, serialised by JSON.stringify; the only
      // escape that matters is `</script>` appearing inside a string value.
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
    />
  );
}
