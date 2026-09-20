import { useTranslation } from "react-i18next";

interface TechItem {
  title: string;
  desc: string;
  alt: string;
}

// Image order is fixed by the design, so it lives here rather than in the
// translations: the copy changes per language, the photographs do not.
// Dimensions are the real ones from `scripts/images.mjs`, which crops each
// source to 4:3 — a wrong pair here reserves the wrong box and shifts layout.
const IMAGES = [
  { file: "scan-3d", width: 752, height: 564 },
  { file: "catiana-gbt", width: 900, height: 675 },
  { file: "whitening", width: 900, height: 675 },
] as const;

/**
 * Section 5. The page's one dark section, full bleed — the only inversion,
 * so it lands as a chapter break rather than as decoration. Content is the
 * clinic's real differentiator: you are shown your own mouth before anything
 * is done to it.
 */
export function Tech() {
  const { t } = useTranslation("home");
  const items = t("tech.items", { returnObjects: true }) as TechItem[];

  return (
    <section id="tecnologia" className="tech">
      <div className="container">
        <div className="section-head">
          <h2 className="h2">{t("tech.title")}</h2>
          <p>{t("tech.intro")}</p>
        </div>

        <div className="tech__grid">
          {items.map((item, index) => (
            <div className="tech__item" key={item.title}>
              <div className="tech__frame">
                <img
                  src={`/images/${IMAGES[index].file}.webp`}
                  alt={item.alt}
                  width={IMAGES[index].width}
                  height={IMAGES[index].height}
                  loading="lazy"
                />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
