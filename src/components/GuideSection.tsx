import React from "react";
import { Instrument_Serif } from "next/font/google";
import GuideCard from "./GuideCard";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const GuideSection: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full max-w-[1200px] items-center justify-center">
      <div className="flex w-full flex-col items-center gap-11 text-center">
        <span
          className={`${instrument.className} text-[80px] leading-[90px] text-white`}
        >
          How It Works
        </span>
        <div className="text-primary-foreground/63 max-w-[600px]">
          Start trading Pokémon collectibles in three simple steps
        </div>
        <div className="grid w-full grid-cols-3 gap-4">
          <div className="col-span-3 lg:col-span-1">
            <GuideCard
              number="01"
              title="Pick Your Asset"
              description="Select from Charizard PSA 10, 1st Edition Booster Pack, Unlimited Booster Pack, or the Pokémon Liquid Index."
            />
          </div>
          <div className="col-span-3 lg:col-span-1">
            <GuideCard
              number="02"
              title="Go Long or Short"
              description="Choose your position type, leverage (1×–10×), and order type. Execute trades with instant liquidity."
            />
          </div>
          <div className="col-span-3 lg:col-span-1">
            <GuideCard
              number="03"
              title="Earn, Hedge, Discover"
              description="Monitor positions in real-time, hedge your physical collection, or discover new trading opportunities."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideSection;
