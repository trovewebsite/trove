"use client";

import React, { useEffect } from "react";

// custom components
import Header from "@/components/Header";
import TradeSection from "@/components/TradeSection";
import LiquidMarketsSection from "@/components/LiquidMarketsSection";
import GuideSection from "@/components/GuideSection";
import TradingInterfaceSection from "@/components/TradingInterfaceSection";
import IntroductionSection from "@/components/IntroductionSection";
import ReadySection from "@/components/ReadySection";

export default function Home() {
  useEffect(() => {
    // run only on client
    if (typeof window === "undefined") return;
    // dynamically import gsap modules (works better with Next/SSR and different bundlers)
    let ctx: any;
    (async () => {
      try {
        const gsapModule = await import("gsap");
        const ScrollTriggerModule = await import("gsap/ScrollTrigger");

        // support various export shapes (default, named 'gsap', or direct)
        const _gsap: any =
          gsapModule?.default ?? gsapModule?.gsap ?? gsapModule;
        const ScrollTrigger: any =
          ScrollTriggerModule?.default ??
          ScrollTriggerModule?.ScrollTrigger ??
          ScrollTriggerModule;

        // register if available
        if (typeof _gsap.registerPlugin === "function") {
          _gsap.registerPlugin(ScrollTrigger);
        }

        // use gsap.context for safe scoping (helps with React strict mode)
        ctx = _gsap.context(() => {
          const sections = _gsap.utils.toArray(".snap-section");

          sections.forEach((section: any) => {
            _gsap
              .timeline({
                scrollTrigger: {
                  trigger: section,
                  start: "top top",
                  end: "bottom top",
                  scrub: true,
                  pin: true,
                  pinSpacing: false,
                },
              })
              .fromTo(section, { autoAlpha: 1 }, { autoAlpha: 0 });
          });
        });
      } catch (err) {
        // swallow import errors in environments without window or gsap
        // console.warn("GSAP dynamic import failed:", err);
      }
    })();

    return () => {
      try {
        if (ctx && typeof ctx.revert === "function") ctx.revert();

        // try to kill any remaining ScrollTriggers (best-effort)
        const ST =
          (window as any)?.ScrollTrigger ??
          (window as any)?.gsap?.ScrollTrigger;
        if (ST && typeof ST.getAll === "function") {
          ST.getAll().forEach((s: any) => s.kill && s.kill());
        }
      } catch (e) {
        // ignore cleanup errors during unmount
      }
    };
  }, []);
  return (
    <div className="mx-auto min-h-screen w-full max-w-[1440px] px-2 lg:px-8 xl:px-16">
      <div className="fixed top-16 right-0 left-0 z-10 flex w-full justify-center">
        <Header />
      </div>
      <div className="relative flex h-full w-full flex-col items-center">
        <div className="snap-section">
          <TradeSection />
        </div>

        <div className="snap-section">
          <LiquidMarketsSection />
        </div>

        <div className="snap-section">
          <GuideSection />
        </div>

        <div className="snap-section">
          <TradingInterfaceSection />
        </div>

        <div className="snap-section">
          <IntroductionSection />
        </div>

        <div className="snap-section">
          <ReadySection />
        </div>
      </div>
    </div>
  );
}
