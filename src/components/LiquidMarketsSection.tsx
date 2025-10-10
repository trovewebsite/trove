import React from "react";
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
  return (
    <div className="relative flex min-h-screen w-full max-w-[990px] items-center justify-center">
      <Image
        src="/icons/star01.svg"
        alt="star"
        width={69}
        height={66}
        className="absolute -top-6 left-50 -z-10 object-contain"
      />
      <div className="flex w-full flex-col items-center gap-11 text-center">
        <span
          className={`${instrument.className} text-[80px] leading-[90px] text-white`}
        >
          Four Highly Liquid Markets
        </span>
        <div className="text-primary-foreground/63 max-w-[600px]">
          Trade perpetual futures on the most sought-after Pokémon collectibles
          with real-time pricing and deep liquidity.
        </div>
        <div className="grid w-full grid-cols-2 gap-11">
          {liquidMarkets.map((item, index) => (
            <div className="col-span-2 lg:col-span-1" key={index}>
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
