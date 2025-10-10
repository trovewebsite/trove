import React from "react";
import Image from "next/image";
import { Instrument_Serif } from "next/font/google";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const TradingInterfaceSection: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full max-w-[1278px] items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-11 text-center">
        <p
          className={`${instrument.className} max-w-[500px] text-[80px] leading-[90px] text-white`}
        >
          Professional <span className="text-primary-foreground">Trading</span>
          &nbsp;Interface
        </p>
        <div className="text-primary-foreground/63">
          Real-time charts, order books, and position management built for
          serious traders
        </div>
        <Image
          src="/trading-interface.png"
          alt="Trading Interface"
          width={1200}
          height={654}
        />
      </div>
    </div>
  );
};

export default TradingInterfaceSection;
