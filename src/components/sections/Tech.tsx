import { useTranslation } from "react-i18next";

interface TechItem {
  title: string;
  desc: string;
  alt: string;
}

// Image order is fixed by the design, so it lives here rather than in the
// translations: the copy changes per language, the photographs do not.
// Dimensions are the real ones from `scripts/images.mjs`, which crops each
// source to 4:5 — a wrong pair here reserves the wrong box and shifts layout.
const IMAGES = [
  { file: "scan-3d", width: 752, height: 940 },
  { file: "catiana-gbt", width: 900, height: 1125 },
  { file: "whitening", width: 900, height: 1125 },
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
                  srcSet={
                    `/images/${IMAGES[index].file}-600.webp 600w, ` +
                    `/images/${IMAGES[index].file}.webp ${IMAGES[index].width}w`
                  }
                  // `sizes` is read by the preload scanner before any CSS
                  // exists, so it cannot use a custom property — the gutter is
                  // written out literally.
                  sizes="(max-width: 719px) calc(100vw - 40px), (max-width: 1099px) 45vw, 400px"
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
