import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { languages } from "../languages";
import { useSiteConfig } from "../config/SiteConfig";

export function Layout({ children }: { children: ReactNode }) {
  const { t } = useTranslation("common");
  const { lang } = useSiteConfig();
  const location = useLocation();

  return (
    <div className="layout">
      <header className="layout__header">
        <nav aria-label={t("nav.home")}>
          <a href={`/${lang}/`}>{t("nav.home")}</a>
        </nav>
        <ul aria-label={t("languageSwitch.label")} className="layout__lang-switch">
          {languages.map((altLang) => (
            <li key={altLang}>
              <a
                href={`/${altLang}${location.pathname}`}
                aria-current={altLang === lang ? "true" : undefined}
                hrefLang={altLang}
              >
                {altLang.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <main className="layout__main">{children}</main>

      <footer className="layout__footer">
        <p>{t("footer.rights")}</p>
      </footer>
    </div>
  );
}
