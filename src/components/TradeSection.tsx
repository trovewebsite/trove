import React from "react";
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
  return (
    <div className="flex w-full max-w-[600px] flex-col items-center justify-center gap-12 text-center">
      <Chip title="Built on Hyperliquid HIP-3" />
      <div className={`${instrument.className}`}>
        <p className="text-[100px] text-white">
          Trade <span className="text-primary-foreground">Pokémon</span> Like
          Never Before
        </p>
      </div>
      <div className="text-primary-foreground/63">
        Speculate on iconic Pokémon cards, packs, and indices with real-time
        liquidity, leverage up to 10×, and blockchain transparency.
      </div>
      <div className="flex gap-6">
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
          View Markets
        </Button>
      </div>
    </div>
  );
};

export default TradeSection;
