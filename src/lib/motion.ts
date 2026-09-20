import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * All of the page's motion, in one place.
 *
 * Two rules from the plugin's `guidelines/motion.md` shape this file:
 *
 * 1. **"From" states are set here, never in CSS.** The site is prerendered to
 *    static HTML; if the initial `opacity: 0` lived in a stylesheet, a visitor
 *    with JavaScript disabled — or one whose bundle fails — would get a blank
 *    page. Everything below reads the element's final, already-painted state
 *    and animates *away from* it, so the HTML alone is correct.
 * 2. **One signature moment.** That is the hero: the cyan panel wipes up and
 *    the doctor rises into it. Everything else is subordinate and small.
 *
 * With `prefers-reduced-motion: reduce` the hook returns before touching
 * anything, which leaves the page in exactly that final state.
 */
export function useHomeMotion(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* --- Signature: the hero, on load ------------------------------- */
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.9 },
      });

      tl.from(".hero__panel", { scaleY: 0, transformOrigin: "50% 100%" })
        .from(".hero__portrait", { yPercent: 9, opacity: 0, duration: 1 }, "-=0.62")
        .from(".hero__rating", { y: 16, opacity: 0, duration: 0.5 }, "-=0.34")
        .from(".hero__rule", { scaleX: 0, duration: 0.6 }, 0.08)
        .from(".hero__eyebrow span:last-child", { opacity: 0, x: -8, duration: 0.5 }, 0.2)
        .from(
          [".hero__heading", ".hero__lead", ".hero__actions"],
          { y: 22, opacity: 0, duration: 0.8, stagger: 0.09 },
          0.26,
        )
        .from(".facts", { y: 18, opacity: 0, duration: 0.7 }, "-=0.45");

      /* --- The header condenses once the hero is behind us ------------ */
      ScrollTrigger.create({
        trigger: ".hero",
        start: "bottom 80px",
        onEnter: () => document.querySelector(".header")?.classList.add("header--condensed"),
        onLeaveBack: () =>
          document.querySelector(".header")?.classList.remove("header--condensed"),
      });

      /* --- The name band drifts: a plane at a different speed --------- */
      gsap.fromTo(
        ".nameband__name",
        { xPercent: -2.5 },
        {
          xPercent: 2.5,
          ease: "none",
          scrollTrigger: {
            trigger: ".nameband",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );

      /* --- Treatment rows arrive once, in order ----------------------- */
      gsap.from(".treatments__row", {
        y: 14,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: { trigger: ".treatments__list", start: "top 78%" },
      });

      /* --- Depth in the dark section: scale, not a reveal ------------- */
      gsap.utils.toArray<HTMLElement>(".tech__frame img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.09 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom 30%",
              scrub: 0.8,
            },
          },
        );
      });

      /* --- Review cards ------------------------------------------------ */
      gsap.from(".reviews__card", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".reviews__grid", start: "top 80%" },
      });
    }, el);

    return () => ctx.revert();
  }, [root]);
}
