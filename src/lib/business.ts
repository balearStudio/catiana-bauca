// The client's verified facts, in the shape schema.org wants.
//
// Everything here came from `.studio/sources/places.json` or `.studio/brief.md`
// — nothing is inferred. This is what feeds Google's local pack for a business
// with a physical address, which for a clinic with no website at all is the
// single highest-value piece of SEO on the site.
//
// Anything unconfirmed is simply absent rather than guessed: an `email` the
// research never found, and no `priceRange`, because none is published.
// See `.studio/requests.md`.
import { PHONE_TEL } from "./contact";

export const business = {
  // A Dentist is a LocalBusiness and a MedicalBusiness; naming the subtype is
  // what lets Google treat it as a clinic rather than a generic shop.
  type: "Dentist",
  name: "Clínica Dental Catiana Bauçà",
  street: "Avinguda Gran Via de Colom 15, Local 6",
  locality: "Inca",
  region: "Illes Balears",
  postalCode: "07300",
  country: "ES",
  phone: PHONE_TEL,
  // Google Places, not a map guess.
  latitude: 39.7190245,
  longitude: 2.9094883,
  rating: 4.8,
  reviewCount: 68,
  // Google's hours. Directory listings disagree (they say a split shift), and
  // the clinic has not confirmed either — `.studio/requests.md` item 5.
  opens: "10:00",
  closes: "19:00",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  image: "/images/storefront-day.webp",
  sameAs: ["https://www.facebook.com/catiana.bauca/"],
} as const;

export function businessJsonLd(siteOrigin: string, lang: string) {
  return {
    "@context": "https://schema.org",
    "@type": business.type,
    "@id": `${siteOrigin}/#business`,
    name: business.name,
    url: `${siteOrigin}/${lang}/`,
    image: `${siteOrigin}${business.image}`,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      addressLocality: business.locality,
      addressRegion: business.region,
      postalCode: business.postalCode,
      addressCountry: business.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.latitude,
      longitude: business.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...business.days],
        opens: business.opens,
        closes: business.closes,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
    },
    sameAs: [...business.sameAs],
    availableLanguage: ["ca", "es"],
  };
}
