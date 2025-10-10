import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  return (
    <div className="relative flex h-[70px] w-full max-w-[1200px] items-center py-3 pr-3 pl-5">
      <div className="absolute inset-0 -z-10 rounded-[17px] border border-white/20 bg-white/15 backdrop-blur-xs" />
      <div className="z-30 flex w-full items-center justify-between">
        <Image src="/icons/logo.svg" alt="logo" width={120} height={25} />
        <div className="flex items-center gap-4">
          <Button
            className="text-primary-foreground text-base"
            variant="ghost"
            onClick={() => {}}
          >
            Login
          </Button>
          <Button
            className="h-full text-base text-black"
            variant="default"
            onClick={() => {}}
          >
            Launch App
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
