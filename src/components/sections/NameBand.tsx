import { useTranslation } from "react-i18next";

/**
 * Section 2. Not a rule and not a heading: the name set to the exact width of
 * the container (see `.nameband__name` in sections.css) so the typography
 * itself is what separates the hero from the body of the page.
 *
 * The name is the business's own, so it is not translated.
 */
export function NameBand() {
  const { t } = useTranslation("home");
  const labels = t("nameBand.labels", { returnObjects: true }) as string[];

  return (
    <section className="nameband container" aria-hidden="true">
      <div className="nameband__labels">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="nameband__name">CATIANA BAUÇÀ</div>
    </section>
  );
}
