import { useTranslation } from "react-i18next";
import { DIRECTIONS_URL, PHONE_TEL } from "../../lib/contact";

/**
 * Section 7. Phone first — it is the clinic's only proven channel, and no
 * booking vendor is integrated. There is no email row: the research found no
 * address, and a `[pendent]` placeholder is worse than an honest omission.
 * See `.studio/requests.md` item 4.
 */
export function Contact() {
  const { t } = useTranslation("home");

  return (
    <section id="contacte" className="section container">
      <div className="contact__grid">
        <div className="contact__copy">
          <h2 className="h2">{t("contact.title")}</h2>
          <p>{t("contact.lead")}</p>

          <div className="contact__actions">
            <a className="btn btn--primary" href={`tel:${PHONE_TEL}`}>
              {t("contact.ctaPrimary")}
            </a>
            <a
              className="btn btn--ghost"
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
            >
              {t("contact.ctaSecondary")}
            </a>
          </div>

          <dl className="contact__details">
            <div className="contact__row">
              <dt>{t("contact.addressLabel")}</dt>
              <dd>
                {t("contact.addressValue")}
                <br />
                {t("contact.addressValue2")}
              </dd>
            </div>
            <div className="contact__row">
              <dt>{t("contact.hoursLabel")}</dt>
              <dd>
                {t("contact.hoursValue")}
                <br />
                {t("contact.hoursValue2")}
              </dd>
            </div>
          </dl>
        </div>

        <div className="contact__aside">
          <img
            className="contact__photo"
            src="/images/storefront-day.webp"
            srcSet="/images/storefront-day-700.webp 700w, /images/storefront-day.webp 1200w"
            sizes="(max-width: 760px) 100vw, 45vw"
            alt={t("contact.photoAlt")}
            width={1200}
            height={900}
            loading="lazy"
          />
          <p className="contact__caption">{t("contact.caption")}</p>
        </div>
      </div>
    </section>
  );
}
