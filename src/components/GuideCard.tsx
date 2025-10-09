import { IGuideCardProps } from "@/interfaces";
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

const GuideCard: React.FC<IGuideCardProps> = (props) => {
  const { number, title, description } = props;
  return (
    <div className="rounded-[17px] border-x border-white/20 bg-white/15 pt-4 pr-4 pb-8 pl-8">
      <div className="flex w-full justify-end">
        <span className={`${inria.className} text-[30px] text-white`}>
          {number}
        </span>
      </div>
      <div className="flex flex-col pt-8 text-start">
        <span
          className={`${instrument.className} max-w-[240px] text-[50px] leading-[55px] text-white`}
        >
          {title}
        </span>
        <div className="text-primary-foreground/63 max-w-[215px] max-w-[309px] pt-3 text-base">
          {description}
        </div>
      </div>
    </div>
  );
};

export default GuideCard;
