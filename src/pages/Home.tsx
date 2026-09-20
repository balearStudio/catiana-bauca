import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { Seo } from "../components/Seo";

export function Home() {
  const { t } = useTranslation("home");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-heading, .hero-subheading, .hero-cta", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Seo path="" title={t("meta.title")} description={t("meta.description")} />
      <div ref={heroRef} className="hero">
        <p className="hero-eyebrow">{t("hero.eyebrow")}</p>
        <h1 className="hero-heading">{t("hero.heading")}</h1>
        <p className="hero-subheading">{t("hero.subheading")}</p>
        <a className="hero-cta" href="#contact">
          {t("hero.cta")}
        </a>
      </div>
    </>
  );
}
