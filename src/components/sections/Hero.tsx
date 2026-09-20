import { useTranslation } from "react-i18next";
import { DIRECTIONS_URL, PHONE_TEL } from "../../lib/contact";

interface Fact {
  label: string;
  value: string;
}

/**
 * Section 1. The signature composition: the doctor, cut out on a transparent
 * background, standing on a block of the clinic's own cyan and overflowing its
 * top edge, with the Google rating overlapping its left edge.
 */
export function Hero() {
  const { t } = useTranslation("home");
  const { t: tc } = useTranslation("common");
  const facts = t("facts", { returnObjects: true }) as Fact[];

  return (
    <section id="inici" className="hero container">
      <div className="hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="hero__rule" aria-hidden="true" />
            <span className="label">{t("hero.eyebrow")}</span>
          </p>

          <h1 className="hero__heading">
            {t("hero.headingLine1")}
            <br />
            {t("hero.headingLine2")}
          </h1>

          <p className="hero__lead">{t("hero.lead")}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href={`tel:${PHONE_TEL}`}>
              {tc("phoneLabel")}
            </a>
            <a
              className="btn btn--ghost"
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>
        </div>

        <div className="hero__figure">
          <div className="hero__stage">
            <div className="hero__panel" aria-hidden="true" />
            {/* The largest contentful paint on every breakpoint. `fetchPriority`
                moves it ahead of the font and script requests the preload
                scanner would otherwise start first. Never `loading="lazy"`. */}
            <img
              className="hero__portrait"
              src="/images/catiana-hero.webp"
              srcSet="/images/catiana-hero-480.webp 480w, /images/catiana-hero.webp 704w"
              sizes="(max-width: 1099px) 240px, 320px"
              alt={t("hero.portraitAlt")}
              width={704}
              height={1181}
              fetchPriority="high"
              decoding="async"
            />
            <div className="hero__rating">
              <div className="hero__rating-score">
                4,8<span aria-hidden="true">★</span>
              </div>
              <div className="hero__rating-count">{t("hero.ratingCount")}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="facts">
        {facts.map((fact) => (
          <div className="facts__item" key={fact.label}>
            <div className="facts__label">{fact.label}</div>
            <div className="facts__value">
              {fact.value === tc("phoneLabel") ? (
                <a href={`tel:${PHONE_TEL}`}>{fact.value}</a>
              ) : (
                fact.value
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
