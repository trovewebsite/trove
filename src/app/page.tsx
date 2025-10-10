"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

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
          const sections: any[] = _gsap.utils.toArray(".snap-section");
          if (!sections || sections.length === 0) return;

          // initialize sections: show first, hide others
          sections.forEach((s, i) => {
            _gsap.set(s, { autoAlpha: i === 0 ? 1 : 0 });
          });

          const stepCount = Math.max(1, sections.length - 1);

          // create a single ScrollTrigger that snaps the scroll to section increments
          const st = ScrollTrigger?.create
            ? ScrollTrigger.create({
                start: "top top",
                end: () => "+=" + window.innerHeight * stepCount,
                snap: {
                  // snap progress to the nearest section step
                  snapTo: (value: number) =>
                    Math.round(value * stepCount) / stepCount,
                  duration: 0.45,
                  ease: "power1.inOut",
                },
                onUpdate: (self: any) => {
                  const index = Math.round(self.progress * stepCount);
                  // toggle visibility
                  sections.forEach((s, i) => {
                    if (i === index) {
                      if (s._visible !== true) {
                        _gsap.to(s, { autoAlpha: 1, duration: 0.35 });
                        s._visible = true;
                      }
                    } else {
                      if (s._visible !== false) {
                        _gsap.to(s, { autoAlpha: 0, duration: 0.35 });
                        s._visible = false;
                      }
                    }
                  });
                },
              })
            : null;

          // store scrollTrigger on context so cleanup can find it
          if (st && ctx) ctx._st = st;

          // fallback: if ScrollTrigger wasn't created (import issues), listen for wheel to change sections
          if (!st) {
            let idx = 0;
            let locked = false;
            const clamp = (v: number) =>
              Math.max(0, Math.min(v, sections.length - 1));
            const onWheel = (e: WheelEvent) => {
              if (locked) return;
              if (e.deltaY > 20) {
                idx = clamp(idx + 1);
                locked = true;
                _gsap.to(window, {
                  scrollTo: window.innerHeight * idx,
                  duration: 0.5,
                });
                setTimeout(() => (locked = false), 600);
              } else if (e.deltaY < -20) {
                idx = clamp(idx - 1);
                locked = true;
                _gsap.to(window, {
                  scrollTo: window.innerHeight * idx,
                  duration: 0.5,
                });
                setTimeout(() => (locked = false), 600);
              }
            };
            window.addEventListener("wheel", onWheel, { passive: true });
            if (ctx) ctx._wheel = onWheel;
          }
        });
      } catch {
        // swallow import errors in environments without window or gsap
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
      } catch {
        // ignore cleanup errors during unmount
      }
    };
  }, []);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // build pager based on number of sections
    const sections = Array.from(document.querySelectorAll(".snap-section"));
    if (sections.length) setCount(sections.length);

    let current = 0;

    const goTo = (index: number) => {
      const idx = Math.max(0, Math.min(index, sections.length - 1));
      const y = window.innerHeight * idx;
      // try to use gsap if available for smooth scrolling
      const gsapAny = (window as any)?.gsap ?? null;
      if (gsapAny && typeof gsapAny.to === "function") {
        gsapAny.to(window, {
          scrollTo: y,
          duration: 0.6,
          ease: "power1.inOut",
        });
      } else {
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      current = idx;
    };

    const onKey = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName))
        return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(sections.length - 1);
      }
    };

    window.addEventListener("keydown", onKey);

    // single-wheel-per-section handler
    let wheelLocked = false;
    const onWheel = (e: WheelEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(tag)) return;
      // small deltas are ignored
      if (Math.abs(e.deltaY) < 10) return;

      // prevent default scrolling so we control navigation (requires passive: false)
      try {
        e.preventDefault();
      } catch {
        // some browsers may ignore; continue
      }

      if (wheelLocked) return;
      wheelLocked = true;

      if (e.deltaY > 0) {
        goTo(current + 1);
      } else {
        goTo(current - 1);
      }

      // unlock after animation completes
      setTimeout(() => {
        wheelLocked = false;
      }, 1000);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
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
        {/* pager (dots) */}
        {count > 0 && (
          <div className="fixed top-1/2 right-6 z-20 flex -translate-y-1/2 flex-col gap-3">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to section ${i + 1}`}
                onClick={() =>
                  window.scrollTo({
                    top: window.innerHeight * i,
                    behavior: "smooth",
                  })
                }
                className="h-3 w-3 rounded-full bg-white/40 hover:bg-white"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
