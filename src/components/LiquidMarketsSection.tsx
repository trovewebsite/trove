import React from "react";
import { Instrument_Serif } from "next/font/google";
import Card from "./Card";
import Image from "next/image";

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
          <div className="col-span-2 lg:col-span-1">
            <Card
              chipTitle="Up to 5x"
              title="Charizard Holo PSA 10"
              description="The most iconic Pokémon card from the 1999 Base Set"
              price={52450}
              percentChange={12.5}
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Card
              chipTitle="Up to 5x"
              title="1st Edition Booster Pack"
              description="Sealed 1st Edition Base Set booster pack"
              price={8920}
              percentChange={8.3}
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Card
              chipTitle="Up to 5x"
              title="Unlimited Booster Pack"
              description="Sealed Unlimited Base Set booster pack"
              price={1240}
              percentChange={-2.1}
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Card
              chipTitle="Up to 10x"
              title="Pokémon Liquid Index"
              description="Weighted index of top 5 most liquid PSA 10 cards"
              price={24680}
              percentChange={5.7}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidMarketsSection;
