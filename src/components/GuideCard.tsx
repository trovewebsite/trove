import { IGuideCardProps } from "@/interfaces";
import React, { useState } from "react";
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
  const [isHover, setIsHover] = useState(false);

  // functions
  const handleMouseOver = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      className={`rounded-[17px] border-x pt-4 pr-4 pb-8 pl-8 ${
        isHover
          ? "border-[#E1FFA7]/63 bg-[#E1FFA7]"
          : "border-white/20 bg-white/5"
      } transition-shadow duration-300 ease-in-out hover:shadow-[0px_0px_35px_#E1FFA7]`}
      onMouseOver={() => handleMouseOver()}
      onMouseLeave={() => handleMouseLeave()}
    >
      <div className="flex w-full justify-end">
        <span
          className={`${inria.className} text-[30px] ${isHover ? "text-black" : "text-white"}`}
        >
          {number}
        </span>
      </div>
      <div className="flex flex-col pt-8 text-start">
        <span
          className={`${instrument.className} max-w-[240px] text-[50px] leading-[55px] ${isHover ? "text-black" : "text-white"}`}
        >
          {title}
        </span>
        <div
          className={`${isHover ? "text-[#456D28]" : "text-primary-foreground/63"} max-w-[309px] pt-3 text-base`}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default GuideCard;
