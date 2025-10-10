"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef } from "react";
import { Instrument_Serif } from "next/font/google";
import { Button } from "./ui/button";
import Image from "next/image";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const ReadySection: React.FC = () => {
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
      className="relative flex min-h-screen w-full max-w-[1278px] items-center justify-center"
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <Image
          src="/icons/star03.png"
          alt="star"
          width={1160}
          height={590}
          className="ts-animate object-contain"
        />
      </div>
      <div className="z-10 flex w-full flex-col items-center justify-center gap-11 text-center">
        <p
          className={`${instrument.className} ts-animate max-w-[900px] text-[80px] leading-[90px] text-white`}
        >
          Ready to <span className="text-primary-foreground">Start</span>&nbsp;
          Trading?
        </p>
        <div className="text-primary-foreground/63 ts-animate max-w-[530px]">
          Join the future of Pokémon collectibles trading. Connect your wallet
          and start trading in minutes.
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
            className="text-primary-foreground border-primary h-full text-base"
            variant="outline"
            onClick={() => {}}
          >
            Join Discord
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReadySection;
