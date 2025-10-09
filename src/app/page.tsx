"use client";

import React from "react";

// custom components
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[1440px] p-2 lg:p-8 xl:p-16">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <Header />
      </div>
    </div>
  );
}
