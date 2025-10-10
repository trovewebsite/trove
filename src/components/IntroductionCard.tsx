import { IIntroductionCardProps } from "@/interfaces";
import React from "react";
import { Inria_Serif, Instrument_Serif } from "next/font/google";

const inria = Inria_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const IntroductionCard: React.FC<IIntroductionCardProps> = (props) => {
  const { title, description } = props;
  return (
    <div className="h-[300px] w-full rounded-[17px] border-x border-white/20 bg-white/5 p-8 pt-7">
      <div className="flex h-full flex-col justify-between text-start">
        <span
          className={`${instrument.className} max-w-[240px] text-[50px] leading-[55px] text-white`}
        >
          {title}
        </span>
        <div className="text-primary-foreground/63 max-w-[309px] pt-3 text-base">
          {description}
        </div>
      </div>
    </div>
  );
};

export default IntroductionCard;
