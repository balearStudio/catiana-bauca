import { useTranslation } from "react-i18next";

interface Review {
  quote: string;
  source: string;
}

/**
 * Section 6. Verbatim Google reviews, in Spanish in both language versions —
 * re-voicing a patient in Catalan would make them the clinic's copywriting.
 * `lang="es"` on each quote keeps screen readers and search engines honest
 * about that on the Catalan page.
 */
export function Reviews() {
  const { t } = useTranslation("home");
  const items = t("reviews.items", { returnObjects: true }) as Review[];

  return (
    <section className="section container">
      <h2 className="h2">{t("reviews.title")}</h2>

      <div className="reviews__grid">
        {items.map((review) => (
          <figure className="reviews__card" key={review.quote}>
            <p className="quote" lang="es">
              {review.quote}
            </p>
            <figcaption>{review.source}</figcaption>
          </figure>
        ))}
      </div>

      <p className="reviews__average">{t("reviews.average")}</p>
    </section>
  );
}
