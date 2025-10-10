import React from "react";
import Chip from "./Chip";
import { Instrument_Serif } from "next/font/google";
import { ICardProps } from "../interfaces";
import { getNumberWithCommas } from "../lib/utils";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const Card: React.FC<ICardProps> = (props) => {
  const { chipTitle, title, description, price, percentChange } = props;
  return (
    <div className="rounded-[17px] border-x border-white/20 bg-white/15 pt-4 pr-4 pb-8 pl-8">
      <div className="flex w-full justify-end">
        <Chip title={chipTitle} />
      </div>
      <div className="flex flex-col pt-4 text-start">
        <span className={`${instrument.className} text-[36px] text-white`}>
          {title}
        </span>
        <div className="text-primary-foreground/63 max-w-[215px] pt-3 text-sm">
          {description}
        </div>
        <div className="flex items-start justify-between pt-7">
          <div className="flex flex-col">
            <div className="text-2xl font-bold text-white">
              ${getNumberWithCommas(price)}
            </div>
            <div className="max-w-[215px] text-xs text-[#709C51]">
              Current Price
            </div>
          </div>
          <div
            className={`pt-2 ${percentChange > 0 ? "text-[#A9FD09]" : "text-[#FF1255]"}`}
          >
            {percentChange > 0 ? "+" : ""}
            {percentChange}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
