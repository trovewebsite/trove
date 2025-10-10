import React from "react";
import { Instrument_Serif } from "next/font/google";
import { Button } from "./ui/button";
import Image from "next/image";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const ReadySection: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full max-w-[1278px] items-center justify-center">
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <Image
          src="/icons/star03.png"
          alt="star"
          width={1160}
          height={590}
          className="object-contain"
        />
      </div>
      <div className="z-10 flex w-full flex-col items-center justify-center gap-11 text-center">
        <p
          className={`${instrument.className} max-w-[900px] text-[80px] leading-[90px] text-white`}
        >
          Ready to <span className="text-primary-foreground">Start</span>&nbsp;
          Trading?
        </p>
        <div className="text-primary-foreground/63 max-w-[530px]">
          Join the future of Pokémon collectibles trading. Connect your wallet
          and start trading in minutes.
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
            Join Discord
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReadySection;
