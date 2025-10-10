import React from "react";
import { Instrument_Serif } from "next/font/google";
import IntroductionCard from "./IntroductionCard";
import introductions from "@/assets/jsons/introduction.json";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const IntroductionSection: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full max-w-[1200px] items-center justify-center">
      <div className="flex w-full flex-col items-center gap-11 text-center">
        <p
          className={`${instrument.className} max-w-[500px] text-[80px] leading-[90px] text-white`}
        >
          Why <span className="text-primary-foreground">PokéPerps</span>?
        </p>
        <div className="text-primary-foreground/63">
          Built for traders who demand speed, transparency, and reliability
        </div>
        <div className="grid w-full grid-cols-3 gap-4">
          {introductions.map((intro, index) => (
            <div className="col-span-3 lg:col-span-1" key={index}>
              <IntroductionCard
                title={intro.title}
                description={intro.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroductionSection;
