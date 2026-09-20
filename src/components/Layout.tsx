import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "../languages";
import { useSiteConfig } from "../config/SiteConfig";
import { PHONE_TEL } from "../lib/contact";

/**
 * The header and footer from the design, plus the language switch the design
 * did not draw (it only ever showed the Catalan page). The switch is set in
 * the same small type as the nav so it reads as part of it.
 *
 * The footer has no legal-notice or privacy links yet: Spanish law requires
 * both on a business site and neither page exists, so rather than ship two
 * dead anchors the footer carries the address. See `.studio/requests.md`
 * item 3 — this blocks launch, not preview.
 */
export function Layout({ children }: { children: ReactNode }) {
  const { t } = useTranslation("common");
  const { lang } = useSiteConfig();

  return (
    <div className="layout">
      <header className="header">
        <div className="header__inner container">
          {/* The name is hidden below 420px, which would leave this link with
              no accessible name at all — the logo is decorative. The label
              carries it at every width. */}
          <a className="header__brand" href="#inici" aria-label={t("brand")}>
            <img className="header__logo" src="/images/logo-cb.webp" alt="" />
            <span className="header__name" aria-hidden="true">
              {t("brand")}
            </span>
          </a>

          <nav className="header__nav" aria-label={t("nav.label")}>
            <a href="#clinica">{t("nav.clinic")}</a>
            <a href="#tractaments">{t("nav.treatments")}</a>
            <a href="#tecnologia">{t("nav.tech")}</a>
            <a href="#contacte">{t("nav.contact")}</a>
          </nav>

          <ul className="header__lang" aria-label={t("languageSwitch.label")}>
            {languages.map((altLang) => (
              <li key={altLang}>
                <a
                  href={`/${altLang}/`}
                  aria-current={altLang === lang ? "true" : undefined}
                  hrefLang={altLang}
                >
                  {altLang}
                </a>
              </li>
            ))}
          </ul>

          <a className="header__cta" href={`tel:${PHONE_TEL}`}>
            {t("phoneLabel")}
          </a>
        </div>
      </header>

      <main className="layout__main">{children}</main>

      <footer className="footer">
        <div className="footer__inner container">
          <div className="footer__brand">
            <img src="/images/logo-cb.webp" alt="" />
            <span>{t("brandShort")}</span>
          </div>
          <div className="footer__links">
            <span>{t("footer.address")}</span>
            <a href={`tel:${PHONE_TEL}`}>{t("phoneLabel")}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
