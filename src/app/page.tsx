"use client";

import React from "react";

// custom components
import Header from "@/components/Header";
import TradeSection from "@/components/TradeSection";
import TradeInsightSection from "@/components/TradeInsightSection";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[1440px] p-2 lg:p-8 xl:p-16">
      <div className="sticky top-8 z-10 flex w-full justify-center">
        <Header />
      </div>
      <div className="relative mt-[133px] flex h-full w-full flex-col items-center">
        <TradeSection />
        <TradeInsightSection />
      </div>
    </div>
  );
}
