import { useTranslation } from "react-i18next";

/**
 * Section 3. What kind of place it is, before what it does. The patient's
 * review sits in the right column in the serif — the only typeface a patient
 * ever speaks in — so their voice is visibly not the clinic's marketing voice.
 * Quotes stay verbatim in Spanish in both language versions.
 */
export function Clinic() {
  const { t } = useTranslation("home");

  return (
    <section id="clinica" className="section container">
      <div className="clinic__grid">
        <div className="clinic__copy">
          <h2 className="h2">{t("clinic.title")}</h2>
          <p>{t("clinic.p1")}</p>
          <p>{t("clinic.p2")}</p>
        </div>

        <div className="clinic__aside">
          <blockquote className="clinic__quote">
            <p className="quote" lang="es">
              {t("clinic.quote")}
            </p>
            <footer>{t("clinic.quoteSource")}</footer>
          </blockquote>
          <img
            className="clinic__photo"
            src="/images/arcade.webp"
            alt={t("clinic.photoAlt")}
            width={749}
            height={496}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
