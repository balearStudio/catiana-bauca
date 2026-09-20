import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { useHomeMotion } from "../lib/motion";
import { Hero } from "../components/sections/Hero";
import { NameBand } from "../components/sections/NameBand";
import { Clinic } from "../components/sections/Clinic";
import { Treatments } from "../components/sections/Treatments";
import { Tech } from "../components/sections/Tech";
import { Reviews } from "../components/sections/Reviews";
import { Contact } from "../components/sections/Contact";

/**
 * One page, seven sections, in the order of the storyboard in DESIGN.md.
 * The clinic has no website at all today, so everything a visitor needs has
 * to be reachable by scrolling; the header's links are anchors, not routes.
 */
export function Home() {
  const { t } = useTranslation("home");
  const root = useRef<HTMLDivElement>(null);

  useHomeMotion(root);

  return (
    <div ref={root}>
      <Seo path="" title={t("meta.title")} description={t("meta.description")} />
      <Hero />
      <NameBand />
      <Clinic />
      <Treatments />
      <Tech />
      <Reviews />
      <Contact />
    </div>
  );
}
