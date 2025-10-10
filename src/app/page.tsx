"use client";

import React from "react";

// custom components
import Header from "@/components/Header";
import TradeSection from "@/components/TradeSection";
import LiquidMarketsSection from "@/components/LiquidMarketsSection";
import GuideSection from "@/components/GuideSection";
import TradingInterfaceSection from "@/components/TradingInterfaceSection";
import IntroductionSection from "@/components/IntroductionSection";
import ReadySection from "@/components/ReadySection";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[1440px] px-2 lg:px-8 xl:px-16">
      <div className="fixed top-16 right-0 left-0 z-10 flex w-full justify-center">
        <Header />
      </div>
      <div className="relative flex h-full w-full flex-col items-center">
        <TradeSection />
        <LiquidMarketsSection />
        <GuideSection />
        <TradingInterfaceSection />
        <IntroductionSection />
        <ReadySection />
      </div>
    </div>
  );
}
