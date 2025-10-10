"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef } from "react";
import { Instrument_Serif } from "next/font/google";
import Card from "./Card";
import Image from "next/image";
import liquidMarkets from "@/assets/jsons/liquid-market.json";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const LiquidMarketsSection: React.FC = () => {
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

        const prefersReduced = window.matchMedia?.(
          "(prefers-reduced-motion: reduce)"
        )?.matches;

        ctx = gsapAny.context(() => {
          const container = containerRef.current;
          const items = container?.querySelectorAll(".ts-animate");
          if (!container || !items || items.length === 0) return;

          gsapAny.set(items, { y: 30, autoAlpha: 0 });

          if (!prefersReduced) {
            const tl = gsapAny.timeline({
              scrollTrigger: {
                trigger: container,
                start: "top center+=80",
                toggleActions: "play none none reverse",
                markers: false,
                onEnter: () => {
                  try {
                    tl.restart();
                  } catch {}
                },
                onEnterBack: () => {
                  try {
                    tl.restart();
                  } catch {}
                },
                onLeave: () => {
                  try {
                    tl.pause();
                    tl.seek(0);
                  } catch {}
                },
                onLeaveBack: () => {
                  try {
                    tl.pause();
                    tl.seek(0);
                  } catch {}
                },
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
            gsapAny.set(items, { y: 0, autoAlpha: 1 });
          }
        }, containerRef);
      } catch {
        // ignore
      }
    })();

    return () => {
      try {
        if (ctx && typeof ctx.revert === "function") ctx.revert();
        if (st && typeof st.kill === "function") st.kill();
      } catch {}
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full max-w-[990px] items-center justify-center"
    >
      <Image
        src="/icons/star01.svg"
        alt="star"
        width={69}
        height={66}
        className="ts-animate absolute -top-6 left-50 -z-10 object-contain"
      />
      <div className="flex w-full flex-col items-center gap-11 text-center">
        <span
          className={`${instrument.className} ts-animate text-[80px] leading-[90px] text-white`}
        >
          Four Highly Liquid Markets
        </span>
        <div className="text-primary-foreground/63 ts-animate max-w-[600px]">
          Trade perpetual futures on the most sought-after Pokémon collectibles
          with real-time pricing and deep liquidity.
        </div>
        <div className="grid w-full grid-cols-2 gap-11">
          {liquidMarkets.map((item, index) => (
            <div className="ts-animate col-span-2 lg:col-span-1" key={index}>
              <Card
                chipTitle={item.chipTitle}
                title={item.title}
                description={item.description}
                price={item.price}
                percentChange={item.percentChange}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiquidMarketsSection;
