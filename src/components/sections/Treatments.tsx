import { useTranslation } from "react-i18next";

interface Treatment {
  name: string;
  desc: string;
}

/**
 * Section 4. A numbered index with hairlines, deliberately **not** a card
 * grid: the competing clinic on the same street uses cards, and DESIGN.md
 * bans them for this client. This is also the page's quietest section —
 * eight rows of one heading and one line, no ornament at all.
 */
export function Treatments() {
  const { t } = useTranslation("home");
  const items = t("treatments.items", { returnObjects: true }) as Treatment[];

  return (
    <section id="tractaments" className="section container">
      <div className="section-head">
        <h2 className="h2">{t("treatments.title")}</h2>
        <p>{t("treatments.intro")}</p>
      </div>

      <div className="treatments__list">
        {items.map((item, index) => (
          <div className="treatments__row" key={item.name}>
            <span className="treatments__num" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="treatments__name">{item.name}</h3>
            <p className="treatments__desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
