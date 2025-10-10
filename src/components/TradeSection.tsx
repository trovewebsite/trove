"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { Instrument_Serif } from "next/font/google";

// custom components
import Chip from "./Chip";
import { Button } from "./ui/button";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const TradeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx: any;
    let gsapAny: any = null;
    let st: any = null;

    (async () => {
      try {
        const [gsapModule, ScrollTriggerModule] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        gsapAny = gsapModule?.default ?? gsapModule;
        const ScrollTrigger =
          ScrollTriggerModule?.default ??
          ScrollTriggerModule?.ScrollTrigger ??
          ScrollTriggerModule;

        if (!gsapAny) return;

        if (typeof gsapAny.registerPlugin === "function") {
          gsapAny.registerPlugin(ScrollTrigger);
        }

        // respect user's reduced motion preference
        const prefersReduced = window.matchMedia?.(
          "(prefers-reduced-motion: reduce)"
        )?.matches;

        ctx = gsapAny.context(() => {
          const container = containerRef.current;
          const items = container?.querySelectorAll(".ts-animate");
          if (!container || !items || items.length === 0) return;

          // set initial state
          gsapAny.set(items, { y: 30, autoAlpha: 0 });

          if (!prefersReduced) {
            // create timeline that plays when the section enters the viewport
            const tl = gsapAny.timeline({
              scrollTrigger: {
                trigger: container,
                start: "top center+=80",
                toggleActions: "play none none reverse",
                markers: false,
              },
            });

            tl.to(items, {
              y: 0,
              autoAlpha: 1,
              stagger: 0.12,
              duration: 0.7,
              ease: "power3.out",
            });

            st = tl.scrollTrigger;
          } else {
            // reduced motion: show immediately without animation
            gsapAny.set(items, { y: 0, autoAlpha: 1 });
          }

          // button animations are handled globally by the shared Button component
        }, containerRef);
      } catch {
        // ignore import/animation failures
      }
    })();

    return () => {
      try {
        // cleanup gsap context
        if (ctx && typeof ctx.revert === "function") ctx.revert();

        // kill ScrollTrigger if present
        if (st && typeof st.kill === "function") st.kill();
      } catch {}
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen w-full max-w-[600px] items-center justify-center"
    >
      <div className="flex w-full flex-col items-center justify-center gap-11 text-center">
        <div className="ts-animate">
          <Chip title="Built on Hyperliquid HIP-3" />
        </div>

        <div className={`${instrument.className} ts-animate`}>
          <p className="text-[100px] leading-[110px] text-white">
            Trade <span className="text-primary-foreground">Pokémon</span> Like
            Never Before
          </p>
        </div>

        <div className="text-primary-foreground/63 ts-animate">
          Speculate on iconic Pokémon cards, packs, and indices with real-time
          liquidity, leverage up to 10×, and blockchain transparency.
        </div>

        <div className="ts-animate flex gap-6">
          <Button
            className="h-full text-base text-black"
            variant="default"
            onClick={() => {}}
          >
            Launch App
          </Button>
          <Button
            className="ts-outline text-primary-foreground border-primary h-full text-base"
            variant="outline"
            onClick={() => {}}
          >
            View Markets
          </Button>
        </div>

        <div className="ts-animate flex w-full max-w-[600px] items-center justify-between gap-4">
          <div className="flex w-full flex-col gap-0 text-center">
            <span className="text-[36px] font-bold text-[#709C51]">10X</span>
            <span className="text-sm text-white">Max Leverage</span>
          </div>
          <div className="flex w-full flex-col gap-0 text-center">
            <span className="text-[36px] font-bold text-[#709C51]">24/7</span>
            <span className="text-sm text-white">Trading</span>
          </div>
          <div className="flex w-full flex-col gap-0 text-center">
            <span className="text-[36px] font-bold text-[#709C51]">0.05%</span>
            <span className="text-sm text-white">Max Low Fees</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeSection;
